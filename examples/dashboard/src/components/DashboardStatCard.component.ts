import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardStatCard extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="stat-card">
                <div class="stat-card-header">
                    <div class="stat-label">{{label1}}</div>
                    <div class="stat-icon stat-icon-purple">👤</div>
                </div>
                <div class="stat-value">{{value1}}</div>
                <div class="stat-change"><span class="stat-change-icon">↑</span> {{change1}}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div class="stat-label">{{label2}}</div>
                    <div class="stat-icon stat-icon-green">💰</div>
                </div>
                <div class="stat-value">{{value2}}</div>
                <div class="stat-change"><span class="stat-change-icon">↑</span> {{change2}}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div class="stat-label">{{label3}}</div>
                    <div class="stat-icon stat-icon-red">📊</div>
                </div>
                <div class="stat-value">{{value3}}</div>
                <div class="stat-change stat-change-down"><span class="stat-change-icon">↓</span> {{change3}}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div class="stat-label">{{label4}}</div>
                    <div class="stat-icon stat-icon-blue">🎯</div>
                </div>
                <div class="stat-value">{{value4}}</div>
                <div class="stat-change"><span class="stat-change-icon">↑</span> {{change4}}</div>
            </div>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            label1: 'Total Users',
            value1: '24,521',
            change1: '+12.5% from last month',

            label2: 'Revenue',
            value2: '$48,390',
            change2: '+8.2% from last month',

            label3: 'Active Sessions',
            value3: '1,429',
            change3: '-3.1% from last hour',

            label4: 'Conversion Rate',
            value4: '3.24%',
            change4: '+0.8% from last week',
        });
    }
}
