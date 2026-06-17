import { A_Concept, A_Context } from "@adaas/a-concept"
import { UIContainer } from "./containers/UI.container"
import { A_Logger, A_LoggerEnvVariables } from "@adaas/a-utils/a-logger";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { A_Config, ENVConfigReader } from "@adaas/a-utils/a-config";


(async () => {
    try {
        const Application = new UIContainer({
            name: 'ARE For-Perf',
            components: [
                A_Polyfill,
                ENVConfigReader,
                A_Logger
            ],
            fragments: [
                new A_Config({
                    defaults: {
                        PORT: 8085,
                        CONFIG_VERBOSE: true,
                        DEV_MODE: true,
                        // Logger at debug so $for transform/update traces are visible
                        [A_LoggerEnvVariables.A_LOGGER_LEVEL]: 'debug',
                    }
                }),
            ]
        });


        const concept = new A_Concept({
            name: 'adaas-are-example-for-perf',
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
