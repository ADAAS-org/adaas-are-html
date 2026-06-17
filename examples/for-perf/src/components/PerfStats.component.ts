import { A_Inject } from "@adaas/a-concept";
import { A_Caller } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


/**
 * Presentational cards describing the available scenarios. Uses its own $for
 * over a small static list so the scene exercises the directive in more than
 * one place.
 */
export class PerfStats extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <section class="legend">
                <div class="legend-card" $for="card in cards track card.key">
                    <span class="legend-key">{{card.key}}</span>
                    <span class="legend-label">{{card.label}}</span>
                </div>
            </section>
        `);
    }

    @Are.Data
    data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            cards: [
                { key: 'render', label: 'Replace the whole list' },
                { key: 'append', label: 'Add rows at the end' },
                { key: 'prepend', label: 'Add rows at the start' },
                { key: 'shuffle', label: 'Reorder existing rows' },
                { key: 'update', label: 'Mutate every row in place' },
            ],
        });
    }
}
