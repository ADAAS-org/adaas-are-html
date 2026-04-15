import { A_Concept, A_Context } from "@adaas/a-concept"
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { AreInit, AreRoute, AreContainer } from "@adaas/are";
import { DashboardApp } from "./components/DashboardApp.component";
import { DashboardHeader } from "./components/DashboardHeader.component";
import { DashboardLogo } from "./components/DashboardLogo.component";
import { DashboardNav } from "./components/DashboardNav.component";
import { DashboardNavItem } from "./components/DashboardNavItem.component";
import { DashboardSidebar } from "./components/DashboardSidebar.component";
import { DashboardUserCard } from "./components/DashboardUserCard.component";
import { DashboardMenu } from "./components/DashboardMenu.component";
import { DashboardMain } from "./components/DashboardMain.component";
import { DashboardStats } from "./components/DashboardStats.component";
import { DashboardStatCard } from "./components/DashboardStatCard.component";
import { DashboardTable } from "./components/DashboardTable.component";
import { AreDirectiveIf, AreDirectiveFor, AreHTMLEngineContext, AreHTMLEngine, AreRoot } from "src";


(async () => {
    try {

        const container = new AreContainer({
            name: 'ARE Dashboard',
            components: [
                // ----------------------------------
                // UI Components 
                // ----------------------------------
                DashboardApp,
                DashboardHeader,
                DashboardLogo,
                DashboardNav,
                DashboardNavItem,
                DashboardSidebar,
                DashboardUserCard,
                DashboardMenu,
                DashboardMain,
                DashboardStats,
                DashboardStatCard,
                DashboardTable,
                // ----------------------------------
                // Directives
                // ----------------------------------
                AreDirectiveIf,
                AreDirectiveFor,

                // ----------------------------------
                // Addons 
                // ----------------------------------
                A_SignalBus,
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
                new AreHTMLEngineContext({ container: document }),

                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-dashboard',
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

        await concept.load();
        await concept.start();

    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }
})();
