import { A_Concept, A_Context } from "@adaas/a-concept";
import { UIContainer } from "./containers/UI.container";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { A_Config, ENVConfigReader } from "@adaas/a-utils/a-config";


/**
 * Node-side entry point for the Lazy Loading example.
 *
 * The UIContainer below is a *backend*: it
 *   1. builds the browser app bundle AND a separate JS bundle per "lazy"
 *      component (code-split so they share the framework runtime singletons),
 *   2. serves the static SPA,
 *   3. exposes a `/api/components` manifest endpoint so the browser app can
 *      discover, at runtime, which components exist and where to fetch them.
 *
 * The browser then loads each lazy component on demand (dynamic `import()`),
 * registers the returned class into the live scope, and renders it into an
 * already-mounted tree — no full reload, no pre-registration at bootstrap.
 */
(async () => {
    try {
        const Application = new UIContainer({
            name: 'ARE Lazy Loading',
            components: [
                A_Polyfill,
                ENVConfigReader,
                A_Logger,
            ],
            fragments: [
                new A_Config({
                    defaults: {
                        PORT: 8083,
                        CONFIG_VERBOSE: true,
                        DEV_MODE: true,
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-lazy-loading',
            components: [A_Logger, A_Polyfill, ENVConfigReader],
            containers: [Application],
        });

        await concept.load();
        await concept.start();

    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }
})();
