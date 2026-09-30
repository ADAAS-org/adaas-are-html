/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regression (KNOWN_ISSUES AH-3): a `$for` item reused by its `track` key must
 * re-render its bindings — interpolations, bound attributes, nested `$if` and
 * nested `$for` — against the new item value.
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


jest.setTimeout(60_000);

type Row = { id: number; label: string; on: boolean; tags: string[] };

class KeyedList extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <ul class="list">
                <li class="row" $for="row in rows track row.id" :class="row.on ? 'is-on' : 'is-off'">
                    <span class="label">{{row.label}}</span>
                    <b class="mark" $if="row.on">on</b>
                    <i class="tag" $for="tag in row.tags">{{tag}}</i>
                </li>
            </ul>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        KeyedList.store = store;
        store.set({ rows: [] });
    }
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

async function bootstrap(): Promise<void> {
    document.body.innerHTML = `<are-root id="app"><keyed-list></keyed-list></are-root>`;

    const container = new AreContainer({
        name: 'ARE Keyed Update',
        components: [
            KeyedList,
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
        name: 'adaas-are-html-keyed-update',
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

function snapshot() {
    return Array.from(document.querySelectorAll('.list > .row')).map(li => ({
        cls: li.className,
        label: li.querySelector('.label')?.textContent,
        mark: !!li.querySelector('.mark'),
        tags: Array.from(li.querySelectorAll('.tag')).map(t => t.textContent),
    }));
}

afterEach(() => {
    KeyedList.store = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});


describe('$for keyed reuse re-renders item bindings (AH-3)', () => {

    it('updates interpolations, bound attributes, nested $if and nested $for', async () => {
        await bootstrap();

        const first: Row[] = [
            { id: 1, label: 'A', on: true, tags: ['x'] },
            { id: 2, label: 'B', on: false, tags: [] },
        ];
        KeyedList.store!.set('rows', first);
        await tick();

        const rowsBefore = Array.from(document.querySelectorAll('.list > .row'));
        expect(snapshot()).toEqual([
            { cls: 'row is-on', label: 'A', mark: true, tags: ['x'] },
            { cls: 'row is-off', label: 'B', mark: false, tags: [] },
        ]);

        // Same keys, new values — the items are reused, not re-created.
        KeyedList.store!.set('rows', [
            { id: 1, label: 'A2', on: false, tags: [] },
            { id: 2, label: 'B2', on: true, tags: ['y', 'z'] },
        ]);
        await tick();

        const rowsAfter = Array.from(document.querySelectorAll('.list > .row'));
        expect(rowsAfter[0]).toBe(rowsBefore[0]);
        expect(rowsAfter[1]).toBe(rowsBefore[1]);

        expect(snapshot()).toEqual([
            { cls: 'row is-off', label: 'A2', mark: false, tags: [] },
            { cls: 'row is-on', label: 'B2', mark: true, tags: ['y', 'z'] },
        ]);
    });
});
