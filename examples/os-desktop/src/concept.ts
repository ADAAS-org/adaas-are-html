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

// ── OS shell components (eager) ─────────────────────────────────────────────
import { OsDesktop } from "./os/Desktop.component";
import { MenuBar } from "./os/MenuBar.component";
import { OsHud } from "./os/Hud.component";
import { OsDock } from "./os/Dock.component";
import { AppStage } from "./os/AppStage.component";
import { AppWindow } from "./os/AppWindow.component";
import { OsLaunchpad } from "./os/Launchpad.component";

// ── Runtime (app catalogue + lazy resolver) ─────────────────────────────────
import { AppRegistry, AppDescriptor } from "./runtime/AppRegistry.fragment";
import { AppComponentResolver } from "./runtime/AppComponentResolver.fragment";

// ── OS signals ──────────────────────────────────────────────────────────────
import { OSRoute } from "./signals/OSRoute.signal";
import { MouseState } from "./signals/MouseState.signal";
import { SelectionState } from "./signals/SelectionState.signal";


(async () => {
    try {
        // 1. Discover the installable apps from the OS kernel. Each descriptor
        //    carries the app's bundle URL + the component tags that bundle
        //    provides, so the resolver can lazily import it on demand.
        const available: AppDescriptor[] = await fetch('/api/apps')
            .then(res => res.json())
            .catch(() => []);

        // The catalogue starts with nothing installed — the user installs apps
        // from the Launchpad, which is exactly the flow this example shows.
        const registry = new AppRegistry({ available });

        // The engine consults this whenever it renders an unregistered tag: it
        // imports the owning app's bundle (one per app) and hands back the class.
        const componentResolver = new AppComponentResolver({ registry });

        // Empty signals context: <are-root id="os"> just renders its body
        // (<os-desktop>); all OS routing is done by the AppStage reacting to
        // OSRoute, not by are-root conditions.
        const signalsContext = new AreSignalsContext({});

        const container = new AreContainer({
            name: 'ARE OS Desktop',
            components: [
                // ── OS shell ─────────────────────────────────────────────
                OsDesktop,
                MenuBar,
                OsHud,
                OsDock,
                AppStage,
                AppWindow,
                OsLaunchpad,
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
                OSRoute,
                MouseState,
                SelectionState,
            ],
            fragments: [
                // EVERY dispatched signal type must appear here too, or
                // state.has() returns false and the bus drops the signal.
                new A_SignalState([AreInit, OSRoute, MouseState, SelectionState]),
                signalsContext,
                new AreHTMLEngineContext({ container: document }),
                registry,
                componentResolver,
                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    },
                }),
            ],
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-os-desktop',
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
