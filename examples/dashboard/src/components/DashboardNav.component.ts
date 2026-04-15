import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardNav extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <nav class="nav">
                <dashboard-nav-item></dashboard-nav-item>
            </nav>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            section: 'navigation',
        });
    }
}
