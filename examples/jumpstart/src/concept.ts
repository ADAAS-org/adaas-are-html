import { A_Concept, A_Context } from "@adaas/a-concept"
// import { SignInComponent } from "./components/SignInComponent.component"
import { ABtn } from "./components/A-Btn.component";
// import { AInput } from "./components/A-Input.component";
// import { ANavigation } from "./components/A-Navigation.component";
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus, A_SignalState } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { AreApp } from "src/containers/AreWebApp.container";
import { AreRoot } from "src/lib/AreRoot/AreRoot.component";
import { AreHTMLEngine } from "src/engine/AreHTML.engine";
import { AreInit } from "@adaas/are";
import { AreRoute } from "@adaas/are";
import { AreContext } from "@adaas/are";
import { AreHTMLEngineContext } from "src/engine/AreHTML.context";
import { ListComponent } from "./components/List.component";
import { AreDirectiveIf } from "src/directives/AreDirectiveIf.directive";
import { AreDirectiveFor } from "src/directives/AreDirectiveFor.directive";


// //  TODO: Fix for build system ---
// window.process = { env: { NODE_ENV: 'production' }, cwd: () => "/" } as any; // --- IGNORE ---
// window.__dirname = "/"; // --- IGNORE ---

(async () => {
    try {

        const container = new AreApp({
            name: 'ARE Jumpstart',
            components: [
                // ----------------------------------
                // Allowed Entities 
                // ----------------------------------
                // ............
                // ----------------------------------
                // Allowed Commands 
                // ----------------------------------
                // ............
                // ----------------------------------
                // UI Components 
                // ----------------------------------
                ABtn,
                ListComponent,
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
                // ............
                AreInit,
                AreRoute
            ],
            fragments: [
                new A_SignalState([AreRoute]),
                new AreHTMLEngineContext(document.body.innerHTML),

                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-jumpstart',
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