import { A_Concept, A_Context } from "@adaas/a-concept"
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus, A_SignalState } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { AreRoot } from "src/lib/AreRoot/AreRoot.component";
import { AreHTMLEngine } from "src/engine/AreHTML.engine";
import { AreContainer, AreInit } from "@adaas/are";
import { AreRoute } from "@adaas/are";
import { AreHTMLEngineContext } from "src/engine/AreHTML.context";
import { AreDirectiveIf } from "src/directives/AreDirectiveIf.directive";
import { AreDirectiveFor } from "src/directives/AreDirectiveFor.directive";

import { PerfApp } from "./components/PerfApp.component";
import { PerfHeader } from "./components/PerfHeader.component";
import { PerfControls } from "./components/PerfControls.component";
import { PerfStats } from "./components/PerfStats.component";
import { PerfGrid } from "./components/PerfGrid.component";


(async () => {
    try {

        const container = new AreContainer({
            name: 'ARE For-Perf',
            components: [
                // ----------------------------------
                // UI Components 
                // ----------------------------------
                PerfApp,
                PerfHeader,
                PerfControls,
                PerfStats,
                PerfGrid,
                // ----------------------------------
                // Directives 
                // ----------------------------------
                AreDirectiveIf,
                AreDirectiveFor,
                // ----------------------------------
                // Engine Components 
                // ----------------------------------
                A_SignalBus,
                // ----------------------------------
                // Addons 
                // ----------------------------------
                AreRoot,
                ConfigReader,
                AreHTMLEngine,
                A_Logger,
            ],
            entities: [
                AreInit,
                AreRoute
            ],
            fragments: [
                new A_SignalState([AreRoute]),
                new AreHTMLEngineContext({
                    container: document
                }),

                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error',
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-for-perf',
            fragments: [new A_Config({
                variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const,
                defaults: {
                    CONFIG_VERBOSE: true,
                    DEV_MODE: true
                }
            })],
            components: [A_Logger, ConfigReader, A_Polyfill],
            containers: [container]
        })

        console.log('Building Concept...');
        await concept.load();
        console.log('✓ Concept loaded successfully.');
        await concept.start();


    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }

})();
