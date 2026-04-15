import { A_Concept, A_CONSTANTS__DEFAULT_ENV_VARIABLES_ARRAY, A_Context } from "@adaas/a-concept"
import { UIContainer } from "./containers/UI.container"
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { A_Config, ENVConfigReader } from "@adaas/a-utils/a-config";





(async () => {
    try {
        const Application = new UIContainer({
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
                // Addons 
                // ----------------------------------
                A_Polyfill,
                ENVConfigReader,
                A_Logger
                // A_ServerProxy

            ],
            fragments: [
                new A_Config({
                    defaults: {
                        PORT: 8080,
                        CONFIG_VERBOSE: true,
                        DEV_MODE: true
                    }
                }),
            ]
        });



        const concept = new A_Concept({
            name: 'adaas-are-example-jumpstart',
            components: [A_Logger, A_Polyfill, ENVConfigReader],
            containers: [Application],
        })

        await concept.load();
        await concept.start();


    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }
})();
