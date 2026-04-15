import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardNavItem extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <span class="nav-item nav-item-active">{{label1}}</span>
            <span class="nav-item">{{label2}}</span>
            <span class="nav-item">{{label3}}</span>
            <span class="nav-item">{{label4}}</span>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            label1: 'Overview',
            label2: 'Analytics',
            label3: 'Reports',
            label4: 'Settings',
        });
    }
}
