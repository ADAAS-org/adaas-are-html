import { A_Inject } from "@adaas/a-concept";
import { A_Caller } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are } from "@adaas/are";
import { AreContext } from "@adaas/are";
import { AreEvent } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


const STATUSES = ['ok', 'warn', 'error', 'idle'];

let ROW_SEQ = 0;

function makeCells(rowId: number): Array<{ id: string; v: number }> {
    const cells: Array<{ id: string; v: number }> = [];
    for (let c = 0; c < 4; c++) {
        cells.push({ id: `${rowId}:${c}`, v: Math.floor(Math.random() * 1000) });
    }
    return cells;
}

function makeRows(count: number): Array<any> {
    const rows: Array<any> = [];
    for (let i = 0; i < count; i++) {
        const id = ++ROW_SEQ;
        rows.push({
            id,
            label: `Row ${id}`,
            status: STATUSES[id % STATUSES.length],
            value: Math.floor(Math.random() * 10000),
            active: id % 7 === 0,
            cells: makeCells(id),
        });
    }
    return rows;
}

/**
 * Wraps the store mutation with wall-clock + engine timers and dumps every
 * captured performance metric to the browser console.
 */
function commit(
    action: string,
    rows: Array<any>,
    context: AreContext,
    store: AreStore,
    logger: A_Logger,
) {
    const label = `$for: ${action}`;

    console.group(`%c${label}`, 'color:#7c3aed;font-weight:bold');

    const t0 = performance.now();
    context.startPerformance(label);

    // Synchronous: dispatch -> notify -> $for watcher update happens here.
    store.set('rows', rows);
    store.set('count', rows.length);

    context.endPerformance(label);
    const wall = (performance.now() - t0).toFixed(2);

    store.set('lastAction', action);
    store.set('lastWall', wall);

    logger.debug(`${label} | rows=${rows.length} | wall=${wall}ms`);
    logger.info(`${label} done in ${wall}ms`, ...context.performance);

    console.log('%cWall time:', 'font-weight:bold', `${wall} ms`);
    console.log('%cEngine performance:', 'font-weight:bold');
    context.performance.forEach((line) => console.log('  ' + line));
    console.log('%cScene stats:', 'font-weight:bold');
    context.stats.forEach((line) => console.log('  ' + line));

    console.groupEnd();
}

/**
 * The heavy component. Holds the action buttons AND the $for grid in a single
 * store so mutations re-render the directive synchronously, which lets us wrap
 * each mutation with performance timers and dump the result to the console.
 *
 * NOTE: $if and $for are intentionally kept on separate elements.
 */
export class PerfGrid extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <section class="grid-panel">
                <div class="toolbar">
                    <button class="btn" @click="$render(100)">Render 100</button>
                    <button class="btn" @click="$render(1000)">Render 1000</button>
                    <button class="btn" @click="$render(5000)">Render 5000</button>
                    <span class="sep"></span>
                    <button class="btn" @click="$append(100)">Append 100</button>
                    <button class="btn" @click="$prepend(100)">Prepend 100</button>
                    <button class="btn" @click="$shuffle()">Shuffle</button>
                    <button class="btn" @click="$updateInPlace()">Update in place</button>
                    <button class="btn btn-danger" @click="$clear()">Clear</button>
                </div>

                <div class="meta">
                    <span class="pill">Rows: {{count}}</span>
                    <span class="pill">Last action: {{lastAction}}</span>
                    <span class="pill">Wall time: {{lastWall}} ms</span>
                </div>

                <div class="empty" $if="count == 0">No rows. Pick a "Render N" button to start.</div>

                <div class="grid">
                    <div class="row" $for="row in rows track row.id" :class="row.active ? 'row-active' : ''">
                        <span class="row-id">#{{row.id}}</span>
                        <span class="row-label">{{row.label}}</span>
                        <span class="badge" :class="'badge-' + row.status">{{row.status}}</span>
                        <span class="star" $if="row.active">★</span>
                        <span class="cells">
                            <span class="cell" $for="cell in row.cells track cell.id">{{cell.v}}</span>
                        </span>
                        <span class="row-value">{{row.value}}</span>
                    </div>
                </div>
            </section>
        `);
    }

    @Are.Data
    data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        const initial = makeRows(25);
        store.set({
            rows: initial,
            count: initial.length,
            lastAction: 'initial',
            lastWall: '0.00',
        });
    }

    @Are.EventHandler
    render(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const n = Number(event.get('args')?.[0]) || 100;
        const rows = makeRows(n);
        commit(`Render ${n}`, rows, context, store, logger);
    }

    @Are.EventHandler
    append(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const n = Number(event.get('args')?.[0]) || 100;
        const rows = (store.get('rows') || []).concat(makeRows(n));
        commit(`Append ${n}`, rows, context, store, logger);
    }

    @Are.EventHandler
    prepend(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const n = Number(event.get('args')?.[0]) || 100;
        const rows = makeRows(n).concat(store.get('rows') || []);
        commit(`Prepend ${n}`, rows, context, store, logger);
    }

    @Are.EventHandler
    shuffle(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const rows = (store.get('rows') || []).slice();
        for (let i = rows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        commit('Shuffle', rows, context, store, logger);
    }

    @Are.EventHandler
    updateInPlace(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const rows = (store.get('rows') || []).map((row: any) => ({
            ...row,
            value: Math.floor(Math.random() * 10000),
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            cells: makeCells(row.id),
        }));
        commit('Update in place', rows, context, store, logger);
    }

    @Are.EventHandler
    clear(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        commit('Clear', [], context, store, logger);
    }
}
