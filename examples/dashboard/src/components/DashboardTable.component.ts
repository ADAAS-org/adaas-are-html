import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardTable extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="table-container">
                <div class="table-header">
                    <div>
                        <div class="table-title">{{tableTitle}}</div>
                        <div class="table-subtitle">{{tableSubtitle}}</div>
                    </div>
                    <div class="table-filter">
                        <button class="table-filter-btn table-filter-btn-active">{{filterAll}}</button>
                        <button class="table-filter-btn">{{filterActive}}</button>
                        <button class="table-filter-btn">{{filterPending}}</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>{{col1}}</th>
                            <th>{{col2}}</th>
                            <th>{{col3}}</th>
                            <th>{{col4}}</th>
                            <th>{{col5}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-cell-primary">{{r1c1}}</td>
                            <td>{{r1c2}}</td>
                            <td>{{r1c3}}</td>
                            <td><span class="status-badge status-active"><span class="status-dot"></span> {{r1c4}}</span></td>
                            <td class="table-cell-secondary">{{r1c5}}</td>
                        </tr>
                        <tr>
                            <td class="table-cell-primary">{{r2c1}}</td>
                            <td>{{r2c2}}</td>
                            <td>{{r2c3}}</td>
                            <td><span class="status-badge status-pending"><span class="status-dot"></span> {{r2c4}}</span></td>
                            <td class="table-cell-secondary">{{r2c5}}</td>
                        </tr>
                        <tr>
                            <td class="table-cell-primary">{{r3c1}}</td>
                            <td>{{r3c2}}</td>
                            <td>{{r3c3}}</td>
                            <td><span class="status-badge status-active"><span class="status-dot"></span> {{r3c4}}</span></td>
                            <td class="table-cell-secondary">{{r3c5}}</td>
                        </tr>
                        <tr>
                            <td class="table-cell-primary">{{r4c1}}</td>
                            <td>{{r4c2}}</td>
                            <td>{{r4c3}}</td>
                            <td><span class="status-badge status-inactive"><span class="status-dot"></span> {{r4c4}}</span></td>
                            <td class="table-cell-secondary">{{r4c5}}</td>
                        </tr>
                        <tr>
                            <td class="table-cell-primary">{{r5c1}}</td>
                            <td>{{r5c2}}</td>
                            <td>{{r5c3}}</td>
                            <td><span class="status-badge status-active"><span class="status-dot"></span> {{r5c4}}</span></td>
                            <td class="table-cell-secondary">{{r5c5}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="table-footer">
                    <span>{{footerText}}</span>
                    <div class="table-pagination">
                        <button class="table-page-btn table-page-btn-active">1</button>
                        <button class="table-page-btn">2</button>
                        <button class="table-page-btn">3</button>
                        <button class="table-page-btn">→</button>
                    </div>
                </div>
            </div>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            tableTitle: 'Recent Transactions',
            tableSubtitle: 'Last 30 days activity',

            filterAll: 'All',
            filterActive: 'Active',
            filterPending: 'Pending',

            col1: 'Transaction',
            col2: 'Customer',
            col3: 'Amount',
            col4: 'Status',
            col5: 'Date',

            r1c1: 'INV-001',
            r1c2: 'Alice Johnson',
            r1c3: '$1,250.00',
            r1c4: 'Active',
            r1c5: 'Mar 28, 2026',

            r2c1: 'INV-002',
            r2c2: 'Bob Williams',
            r2c3: '$890.00',
            r2c4: 'Pending',
            r2c5: 'Mar 27, 2026',

            r3c1: 'INV-003',
            r3c2: 'Carol Davis',
            r3c3: '$2,100.00',
            r3c4: 'Active',
            r3c5: 'Mar 26, 2026',

            r4c1: 'INV-004',
            r4c2: 'Dan Martinez',
            r4c3: '$450.00',
            r4c4: 'Inactive',
            r4c5: 'Mar 25, 2026',

            r5c1: 'INV-005',
            r5c2: 'Eve Thompson',
            r5c3: '$3,400.00',
            r5c4: 'Active',
            r5c5: 'Mar 24, 2026',

            footerText: 'Showing 1-5 of 24 results',
        });
    }
}
