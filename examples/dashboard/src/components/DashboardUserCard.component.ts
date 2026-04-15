import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardUserCard extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="user-card">
                <div class="user-avatar">{{initials}}</div>
                <div class="user-info">
                    <div class="user-name">{{fullName}}</div>
                    <div class="user-role">{{role}}</div>
                </div>
                <div class="user-status">
                    <span class="user-status-dot"></span>
                    {{status}}
                </div>
            </div>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            initials: 'JD',
            fullName: 'John Doe',
            role: 'Administrator',
            status: 'Online',
        });
    }
}
