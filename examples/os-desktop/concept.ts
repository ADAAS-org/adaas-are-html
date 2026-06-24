import { A_Concept, A_Context } from "@adaas/a-concept";
import { OSContainer } from "./containers/OS.container";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { A_Config, ENVConfigReader } from "@adaas/a-utils/a-config";


/**
 * Node-side entry point for the OS Desktop example.
 *
 * The OSContainer is the "kernel": it builds the OS shell bundle plus one
 * code-split bundle per app, serves the static desktop SPA, advertises the
 * installable apps at `/api/apps`, and routes each app's `/apps/<id>/api/*`
 * calls to that app's own backend.
 *
 * In the browser, the desktop boots, you install apps from the Launchpad (each
 * install lazily fetches that app's bundle), open them in macOS-style windows,
 * and watch the OS-wide signals (route / mouse / selection) drive the menu bar,
 * dock and HUD independently.
 */
(async () => {
    try {
        const Application = new OSContainer({
            name: 'ARE OS Desktop',
            components: [
                A_Polyfill,
                ENVConfigReader,
                A_Logger,
            ],
            fragments: [
                new A_Config({
                    defaults: {
                        PORT: 8084,
                        CONFIG_VERBOSE: true,
                        DEV_MODE: true,
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-os-desktop',
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
