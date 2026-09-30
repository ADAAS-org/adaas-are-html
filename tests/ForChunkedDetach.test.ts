/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regression: a large `$for` renders in time-sliced chunks. If the `$for`
 * owner gets detached/unmounted while chunks are still streaming, the
 * remaining items must NOT be mounted anywhere — previously they were hoisted
 * into the nearest still-mounted ancestor, leaving stray elements in random
 * places of the page. When the owner is mounted again, every item must render
 * inside its own container, in source order.
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
import { AreSchedulerHelper } from '@adaas/are-html/helpers/AreScheduler.helper';


jest.setTimeout(120_000);

// Above the `$for` SYNC_THRESHOLD (100) so the render is chunked.
const N = 220;

const makeRows = (count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: i + 1, label: `Row ${i + 1}` }));

class ChunkList extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <section class="list-root">
                <div class="grid" $if="visible">
                    <div class="row" $for="row in rows track row.id"><span class="label">{{row.label}}</span></div>
                </div>
                <div class="after-grid">after</div>
            </section>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        ChunkList.store = store;
        store.set({ rows: [], visible: true });
    }
}

class ChunkApp extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <main class="app">
                <header class="head">head</header>
                <div class="holder" $if="showList"><chunk-list></chunk-list></div>
                <footer class="foot">foot</footer>
            </main>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        ChunkApp.store = store;
        store.set({ showList: true });
    }
}


const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

/** Counts macrotasks scheduled by the chunked renderer that have not run yet. */
let outstanding = 0;
const originalSchedule = AreSchedulerHelper.scheduleMacrotask.bind(AreSchedulerHelper);
beforeAll(() => {
    jest.spyOn(AreSchedulerHelper, 'scheduleMacrotask').mockImplementation((fn: () => void) => {
        outstanding++;
        originalSchedule(() => {
            outstanding--;
            fn();
        });
    });
});
afterAll(() => jest.restoreAllMocks());

/** Resolves once no chunk is pending anymore (the stream finished). */
async function waitForStreamEnd(timeoutMs = 60_000) {
    const start = Date.now();
    await tick();
    while (outstanding > 0) {
        if (Date.now() - start > timeoutMs) throw new Error('stream did not finish');
        await tick(5);
    }
    await tick(5);
}

async function bootstrap(): Promise<void> {
    document.body.innerHTML = `<are-root id="app"><chunk-app></chunk-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE Chunk Detach',
        components: [
            ChunkApp, ChunkList,
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
        name: 'adaas-are-html-chunk-detach',
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
}

/** Every rendered row must live inside `.grid`, and the page shell must be intact. */
function expectNoStrayRows() {
    const rows = Array.from(document.querySelectorAll('.row'));
    for (const row of rows) {
        expect(row.parentElement?.classList.contains('grid')).toBe(true);
    }
    expect(document.querySelectorAll('.after-grid .row, .head .row, .foot .row, .app > .row, body > .row').length).toBe(0);
}

function expectRowsInOrder(count: number) {
    const labels = Array.from(document.querySelectorAll('.grid > .row .label')).map(e => e.textContent);
    expect(labels).toEqual(makeRows(count).map(r => r.label));
}

afterEach(() => {
    ChunkList.store = undefined;
    ChunkApp.store = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});


describe('$for chunked render — owner detached mid-stream', () => {

    it('renders all rows in order when not interrupted', async () => {
        await bootstrap();
        ChunkList.store!.set('rows', makeRows(N));
        await waitForStreamEnd();

        expectNoStrayRows();
        expectRowsInOrder(N);
    });

    it('does not leak rows when the enclosing $if closes mid-stream', async () => {
        await bootstrap();
        ChunkList.store!.set('rows', makeRows(N));

        // First chunk is rendered synchronously; the rest is still pending.
        expect(outstanding).toBeGreaterThan(0);
        expect(document.querySelectorAll('.row').length).toBeLessThan(N);

        ChunkList.store!.set('visible', false);
        await waitForStreamEnd();

        expect(document.querySelectorAll('.grid').length).toBe(0);
        expect(document.querySelectorAll('.row').length).toBe(0);
        expect(document.querySelectorAll('.after-grid').length).toBe(1);

        ChunkList.store!.set('visible', true);
        await waitForStreamEnd();

        expectNoStrayRows();
        expectRowsInOrder(N);
    });

    it('does not leak rows when an ancestor component is unmounted mid-stream', async () => {
        await bootstrap();
        ChunkList.store!.set('rows', makeRows(N));

        expect(outstanding).toBeGreaterThan(0);

        ChunkApp.store!.set('showList', false);
        await waitForStreamEnd();

        expect(document.querySelectorAll('.row').length).toBe(0);
        expect(document.querySelectorAll('.list-root').length).toBe(0);
        const shell = Array.from(document.querySelector('.app')!.children).map(e => e.className);
        expect(shell).toEqual(['head', 'foot']);

        ChunkApp.store!.set('showList', true);
        await waitForStreamEnd();

        expectNoStrayRows();
        expectRowsInOrder(N);
    });
});
