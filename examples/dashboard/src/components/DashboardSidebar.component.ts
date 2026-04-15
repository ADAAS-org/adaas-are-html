import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreEvent } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardSidebar extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <aside class="sidebar">
            {{section}}
                <dashboard-user-card></dashboard-user-card>
                <dashboard-menu></dashboard-menu>
            </aside>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            section: 'sidebar',
        });
    }

    @Are.EventHandler
    async menuItemClicked(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreStore) store: AreStore,
    ) {
        console.log('Sidebar clicked!', event.get('section'));

        store.set('section', event.get('section') );

    }
}
