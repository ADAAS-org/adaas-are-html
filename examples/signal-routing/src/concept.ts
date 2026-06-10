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

// ── Components ─────────────────────────────────────────────────────────────
import { AppShell } from "./components/AppShell.component";
import { NavBar } from "./components/NavBar.component";
import { HomePage } from "./components/HomePage.component";
import { AboutPage } from "./components/AboutPage.component";
import { SettingsPage } from "./components/SettingsPage.component";

// ── Signals ────────────────────────────────────────────────────────────────
// AreRoute must come from are-html (not @adaas/are) — it must match the class
// NavBar emits.  Using the base-lib class causes state.has() to return false
// and the bus silently drops every route signal.
import { AreRoute as AreRouteSignal } from "src/signals/AreRoute.signal";


(async () => {
    try {
        /**
         * AreSignalsContext maps (rootId → conditions).
         *
         * The outer <are-root id="app"> renders the AppShell unconditionally
         * via the `default` attribute in HTML — no routing config needed there.
         *
         * The inner <are-root id="page-outlet"> is the dynamic slot.
         * Each condition says: "when this AreRoute signal arrives, render this component".
         */
        const signalsContext = new AreSignalsContext({
            'page-outlet': {
                default: HomePage,
                pool: [HomePage, AboutPage, SettingsPage],
                // Route conditions are registered via @Are.Condition decorators
                // on each page component — no explicit conditions needed here.
                conditions: [],
            },
        });

        const container = new AreContainer({
            name: 'ARE Signal Routing',
            components: [
                // ── Pages ────────────────────────────────────────────────
                AppShell,
                NavBar,
                HomePage,
                AboutPage,
                SettingsPage,
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
                // Persist the current route so a hard refresh on /about still
                // renders the correct page.  Both AreInit AND AreRouteSignal
                // must be in this structure — if either is missing, state.has()
                // returns false and the bus silently drops the signal.
                new A_SignalState([AreInit, AreRouteSignal]),
                signalsContext,
                new AreHTMLEngineContext({ container: document,  }),
                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    },
                }),
            ],
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-signal-routing',
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
