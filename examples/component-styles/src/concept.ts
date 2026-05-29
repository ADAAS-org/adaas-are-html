import { A_Concept, A_Context } from "@adaas/a-concept";
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus, A_SignalState } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { AreContainer, AreInit, AreRoute } from "@adaas/are";
import { AreRoot, AreHTMLEngine, AreHTMLEngineContext, AreDirectiveIf, AreDirectiveFor } from "src";

// ── Components ─────────────────────────────────────────────────────────────
import { AppPage }   from "./components/AppPage.component";
import { TheCard }   from "./components/TheCard.component";
import { TheButton } from "./components/TheButton.component";
import { TheAlert }  from "./components/TheAlert.component";


(async () => {
    try {
        const container = new AreContainer({
            name: 'ARE Component Styles',
            components: [
                // ── UI Components ─────────────────────────────────────────
                AppPage,
                TheCard,
                TheButton,
                TheAlert,
                // ── Directives ────────────────────────────────────────────
                AreDirectiveIf,
                AreDirectiveFor,
                // ── Engine ────────────────────────────────────────────────
                A_SignalBus,
                AreRoot,
                ConfigReader,
                AreHTMLEngine,
                A_Logger,
            ],
            entities: [
                AreInit,
                AreRoute,
            ],
            fragments: [
                new AreHTMLEngineContext({ container: document }),
                new A_SignalState([AreRoute]),
                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'debug',
                    },
                }),
            ],
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-component-styles',
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
