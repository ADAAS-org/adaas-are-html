import { A_Inject } from "@adaas/a-concept";
import { A_Caller } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


/**
 * Static informational strip. Kept presentational so the scene has more
 * components without competing for the grid's store.
 */
export class PerfControls extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <section class="hint">
                <span class="hint-icon">ℹ</span>
                <span class="hint-text">{{hint}}</span>
            </section>
        `);
    }

    @Are.Data
    data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            hint: 'Each button below mutates the store; the $for directive re-renders synchronously and the timing is logged.',
        });
    }
}
