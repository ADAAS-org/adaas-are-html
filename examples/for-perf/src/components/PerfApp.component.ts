import { A_Inject } from "@adaas/a-concept";
import { A_Caller } from "@adaas/a-concept";
import { Are } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


/**
 * Application shell. Composes the page out of several child components so the
 * scene contains "many components" while the heavy $for stress test lives in
 * <perf-grid>.
 */
export class PerfApp extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <div class="app">
                <perf-header></perf-header>
                <perf-stats></perf-stats>
                <perf-controls></perf-controls>
                <perf-grid></perf-grid>
            </div>
        `);
    }

    @Are.Data
    data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            appName: 'ARE $for Performance Lab',
        });
    }
}
