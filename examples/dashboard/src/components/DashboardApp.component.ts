import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardApp extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="dashboard">
                <dashboard-header></dashboard-header>
                <dashboard-sidebar></dashboard-sidebar>
                <dashboard-main></dashboard-main>
            </div>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {

        store.set({
            appName: 'ARE Dashboard',
        });
    }
}
