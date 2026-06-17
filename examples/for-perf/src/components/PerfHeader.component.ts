import { A_Inject } from "@adaas/a-concept";
import { A_Caller } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class PerfHeader extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <header class="header">
                <div class="brand">
                    <span class="logo">▦</span>
                    <span class="title">{{title}}</span>
                </div>
                <span class="subtitle">{{subtitle}}</span>
            </header>
        `);
    }

    @Are.Data
    data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            title: 'ARE $for Performance Lab',
            subtitle: 'Open DevTools console — logger is at debug, perf metrics are printed on every action',
        });
    }
}
