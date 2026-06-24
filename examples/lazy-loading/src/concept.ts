import { A_Concept, A_Context } from "@adaas/a-concept";
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus, A_SignalState } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import {
    AreContainer,
    AreInit,
    AreSignalsContext,
} from "@adaas/are";
import {
    AreRoot,
    AreHTMLEngine,
    AreHTMLEngineContext,
    AreDirectiveIf,
    AreDirectiveFor,
    AreDirectiveShow,
    AreRouteWatcher,
} from "src";

// ── Eager components (shipped in this bundle) ───────────────────────────────
import { AppShell } from "./components/AppShell.component";
import { NavBar } from "./components/NavBar.component";
import { HomePage } from "./components/HomePage.component";
import { LazyOutlet } from "./components/LazyOutlet.component";

// ── Runtime ─────────────────────────────────────────────────────────────────
import { ComponentManifest, ComponentManifestEntry } from "./runtime/ComponentManifest.fragment";
import { LazyComponentResolver } from "./runtime/LazyComponentResolver.fragment";

// AreRoute must come from are-html (not @adaas/are) so state.has() matches the
// class NavBar emits — otherwise the bus silently drops every route signal.
import { AreRoute as AreRouteSignal } from "src/signals/AreRoute.signal";


(async () => {
    try {
        // 1. Discover available components from the backend BEFORE bootstrapping.
        //    The set of routes/components is server-driven; lazy ones carry a URL
        //    the LazyOutlet will dynamically import on first visit.
        const entries: ComponentManifestEntry[] = await fetch('/api/components')
            .then(res => res.json())
            .catch(() => []);

        const manifest = new ComponentManifest({ entries });

        // The engine consults this resolver whenever a node's tag does not match
        // a registered component: it imports the lazy bundle from the manifest
        // and the engine registers the returned class globally.
        const componentResolver = new LazyComponentResolver({ manifest });

        // Empty signals context: the outer <are-root id="app"> has no routing
        // config, so it renders its body (<app-shell>) and ignores route signals.
        // LazyOutlet does its own routing independently.
        const signalsContext = new AreSignalsContext({});

        const container = new AreContainer({
            name: 'ARE Lazy Loading',
            components: [
                // ── Eager UI ─────────────────────────────────────────────
                AppShell,
                NavBar,
                HomePage,
                LazyOutlet,
                // ── Directives ───────────────────────────────────────────
                AreDirectiveIf,
                AreDirectiveFor,
                AreDirectiveShow,
                // ── Engine ───────────────────────────────────────────────
                A_SignalBus,
                AreRoot,
                AreRouteWatcher,
                ConfigReader,
                AreHTMLEngine,
                A_Logger,
            ],
            entities: [
                AreInit,
                AreRouteSignal,
            ],
            fragments: [
                // Both AreInit AND AreRouteSignal must be in this state, or
                // state.has() returns false and the bus drops route signals.
                new A_SignalState([AreInit, AreRouteSignal]),
                signalsContext,
                new AreHTMLEngineContext({ container: document }),
                manifest,
                componentResolver,
                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    },
                }),
            ],
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-lazy-loading',
            fragments: [
                new A_Config({
                    variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const,
                    defaults: { CONFIG_VERBOSE: true, DEV_MODE: true },
                }),
            ],
            components: [A_Logger, ConfigReader, A_Polyfill],
            containers: [container],
        });

        await concept.load();
        await concept.start();

    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }
})();
