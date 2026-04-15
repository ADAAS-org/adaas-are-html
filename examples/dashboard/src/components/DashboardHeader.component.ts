import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardHeader extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <header class="header">
                <dashboard-logo></dashboard-logo>
                <dashboard-nav></dashboard-nav>
                <div class="header-actions">
                    <div class="header-search">
                        <span class="header-search-icon">⌕</span>
                        <span class="header-search-text">{{searchPlaceholder}}</span>
                    </div>
                    <div class="header-notification">
                        🔔
                        <span class="header-notification-badge"></span>
                    </div>
                </div>
            </header>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            title: 'Dashboard',
            searchPlaceholder: 'Search…',
        });
    }
}
