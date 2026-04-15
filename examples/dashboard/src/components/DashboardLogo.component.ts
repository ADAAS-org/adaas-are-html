import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardLogo extends Are {

    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="logo">
                <div class="logo-icon">A</div>
                <span class="logo-text">{{brandName}}</span>
            </div>
        `);
    }

    @Are.Data
    async data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            brandName: 'ARE Platform',
        });
    }
}
