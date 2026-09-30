/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Render-performance measurements for large `$for` lists (server-side / jsdom).
 *
 * Run with:  npm run perf
 *
 * Every scenario prints:
 *   - wall     : total time until the DOM reached its final state
 *   - maxBlock : the LONGEST uninterrupted main-thread block observed while the
 *                scenario was running (measured with a 1ms heartbeat). This is
 *                the number that correlates with "the page freezes / animations
 *                stop" — a value above ~50ms is a visible jank.
 *
 * The numbers are informative (printed), the assertions only guard
 * correctness, so the suite never flakes on a slow machine.
 */

import { A_Concept, A_Context, A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';

import { Are, AreNode, AreStore, AreContainer, AreInit, AreRoute } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';
import { AreDirectiveFor } from '@adaas/are-html/directives/AreDirectiveFor.directive';
import { AreDirectiveIf } from '@adaas/are-html/directives/AreDirectiveIf.directive';


jest.setTimeout(600_000);

const N = Number(process.env.PERF_ROWS || 1000);
const INITIAL = Number(process.env.PERF_INITIAL_ROWS || 0);

let SEQ = 0;
function makeRows(count: number) {
    const rows: any[] = [];
    for (let i = 0; i < count; i++) {
        const id = ++SEQ;
        rows.push({
            id,
            label: `Row ${id}`,
            status: ['ok', 'warn', 'error', 'idle'][id % 4],
            value: id * 7,
            active: id % 7 === 0,
            cells: [0, 1, 2, 3].map(c => ({ id: `${id}:${c}`, v: c })),
        });
    }
    return rows;
}

class PerfList extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="grid" $if="visible">
                <div class="row" $for="row in rows track row.id" :class="row.active ? 'row-active' : ''">
                    <span class="row-id">#{{row.id}}</span>
                    <span class="row-label">{{row.label}}</span>
                    <span class="badge" :class="'badge-' + row.status">{{row.status}}</span>
                    <span class="star" $if="row.active">*</span>
                    <span class="cells"><span class="cell" $for="cell in row.cells track cell.id">{{cell.v}}</span></span>
                    <span class="row-value">{{row.value}}</span>
                </div>
            </div>
            <div class="after-grid">after</div>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        PerfList.store = store;
        store.set({ rows: makeRows(INITIAL), visible: true });
    }
}

class PerfApp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<main class="app"><perf-list></perf-list></main>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({}); }
}


/** Records the longest gap between 1ms heartbeats — i.e. the worst main-thread block. */
function startBlockMonitor() {
    let last = performance.now();
    let max = 0;
    const timer = setInterval(() => {
        const now = performance.now();
        max = Math.max(max, now - last);
        last = now;
    }, 1);
    return {
        stop(): number {
            clearInterval(timer);
            max = Math.max(max, performance.now() - last);
            return max;
        },
    };
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

async function waitFor(predicate: () => boolean, timeoutMs = 120_000) {
    const start = performance.now();
    while (!predicate()) {
        if (performance.now() - start > timeoutMs) throw new Error('waitFor timeout');
        // Poll at frame cadence: jsdom selector queries are O(DOM) and would
        // otherwise dominate the measurement.
        await tick(16);
    }
}

async function bootstrap(): Promise<A_Concept> {
    document.body.innerHTML = `<are-root id="app"><perf-app></perf-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE Perf',
        components: [
            PerfApp, PerfList,
            AreDirectiveFor, AreDirectiveIf, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger,
        ],
        entities: [AreInit, AreRoute],
        fragments: [
            new A_SignalState([AreRoute]),
            new AreHTMLEngineContext({ container: document }),
            new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
        ],
    });

    const concept = new A_Concept({
        name: 'adaas-are-html-perf',
        fragments: [
            new A_Config({
                variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const,
                defaults: { CONFIG_VERBOSE: false, DEV_MODE: false },
            }),
        ],
        components: [A_Logger, ConfigReader, A_Polyfill],
        containers: [container],
    });

    await concept.load();
    await concept.start();
    await tick();
    return concept;
}

const rowsInDom = () => document.querySelectorAll('.row').length;
const report: string[] = [];

afterEach(() => {
    PerfList.store = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});

afterAll(() => {
    // eslint-disable-next-line no-console
    console.log(`\n$for render performance (rows=${N})\n` + report.join('\n'));
});


describe(`$for performance (${N} rows)`, () => {

    it('initial mount', async () => {
        SEQ = 0;
        const monitor = startBlockMonitor();
        const t0 = performance.now();
        // Initial rows are provided through the update path below; this measures
        // bootstrap cost of the page shell.
        await bootstrap();
        const wall = performance.now() - t0;
        report.push(`  bootstrap (shell, ${INITIAL} rows) wall=${wall.toFixed(0)}ms maxBlock=${monitor.stop().toFixed(0)}ms`);
    });

    it('render N rows (store update)', async () => {
        await bootstrap();
        const rows = makeRows(N);

        const monitor = startBlockMonitor();
        const t0 = performance.now();
        PerfList.store!.set('rows', rows);
        await waitFor(() => rowsInDom() === N);
        const wall = performance.now() - t0;
        report.push(`  render ${N}       wall=${wall.toFixed(0)}ms maxBlock=${monitor.stop().toFixed(0)}ms`);

        expect(rowsInDom()).toBe(N);
        expect(document.querySelectorAll('.cell').length).toBe(N * 4);
    });

    it('update in place (same keys, new values)', async () => {
        await bootstrap();
        const rows = makeRows(N);
        PerfList.store!.set('rows', rows);
        await waitFor(() => rowsInDom() === N);

        const next = rows.map(r => ({ ...r, value: r.value + 1, label: r.label + '!' }));
        const monitor = startBlockMonitor();
        const t0 = performance.now();
        PerfList.store!.set('rows', next);
        await waitFor(() => document.querySelector('.row .row-label')?.textContent === next[0].label);
        await tick(5);
        const wall = performance.now() - t0;
        report.push(`  update in place  wall=${wall.toFixed(0)}ms maxBlock=${monitor.stop().toFixed(0)}ms`);
    });

    it('clear N rows', async () => {
        await bootstrap();
        PerfList.store!.set('rows', makeRows(N));
        await waitFor(() => rowsInDom() === N);

        const monitor = startBlockMonitor();
        const t0 = performance.now();
        PerfList.store!.set('rows', []);
        await waitFor(() => rowsInDom() === 0);
        const wall = performance.now() - t0;
        report.push(`  clear ${N}        wall=${wall.toFixed(0)}ms maxBlock=${monitor.stop().toFixed(0)}ms`);
    });
});
