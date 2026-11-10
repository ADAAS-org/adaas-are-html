/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * AH-9: a registered component used as (or inside) a `$for` item mounts — its template renders and its
 * `onAfterMount` runs — for every item, and for items added later.
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

const mounted: string[] = [];

class ItemCard extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<span class="card">card</span>`);
    }

    @Are.onAfterMount
    onMount(): void {
        mounted.push('card');
    }
}

let LIST_MARKUP = '';

class CardList extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="list">${LIST_MARKUP}</div>`);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        CardList.store = store;
        store.set({ items: [{ key: 'a' }, { key: 'b' }] });
    }
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

afterEach(() => {
    CardList.store = undefined;
    mounted.length = 0;
    A_Context.reset();
    document.body.innerHTML = '';
});

const boot = async (markup: string): Promise<void> => {
    LIST_MARKUP = markup;
        document.body.innerHTML = `<are-root id="app"><card-list></card-list></are-root>`;
        const container = new AreContainer({
            name: 'ARE component in for',
            components: [CardList, ItemCard, AreDirectiveFor, AreDirectiveIf, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger],
            entities: [AreInit, AreRoute],
            fragments: [
                new A_SignalState([AreRoute]),
                new AreHTMLEngineContext({ container: document }),
                new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
            ],
        });
        const concept = new A_Concept({
            name: 'adaas-are-html-for-component',
            fragments: [new A_Config({ variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const, defaults: { CONFIG_VERBOSE: false, DEV_MODE: false } })],
            components: [A_Logger, ConfigReader, A_Polyfill],
            containers: [container],
        });
        await concept.load();
        await concept.start();
    await tick(50);
};
const seen = () => ({ cards: document.querySelectorAll('.list .card').length, mounts: mounted.length });

describe('a component inside $for (AH-9)', () => {
    it('inside each item: renders and mounts once per item, and for items added later', async () => {
        await boot(`<div class="wrap" $for="i in items track i.key"><item-card></item-card></div>`);
        expect(seen()).toEqual({ cards: 2, mounts: 2 });
        CardList.store!.set({ items: [{ key: 'a' }, { key: 'b' }, { key: 'c' }] });
        await tick(50);
        expect(seen()).toEqual({ cards: 3, mounts: 3 });
    });

    // AH-9 (open): a component that IS the $for element renders right, but its onAfterMount runs once more than
    // the items (the template copy). Remove `.failing` when fixed.
    it.failing('as the $for element itself: mounts once per item', async () => {
        await boot(`<item-card $for="i in items track i.key"></item-card>`);
        expect(seen()).toEqual({ cards: 2, mounts: 2 });
    });
});
