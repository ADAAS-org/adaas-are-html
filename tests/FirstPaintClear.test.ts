/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * ARE-4: the first `node.clear()` / `node.render()` must remove the subtree
 * painted from `@Are.Template` (the "first paint"), not leave it beside the
 * newly rendered content.
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


class FpHost extends Are {
    static lastNode: AreNode | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="fp-boot"><span class="fp-boot-inner">loading</span></div><p class="fp-boot" $if="true">x</p><b class="fp-boot" $for="i in items">{{i}}</b>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({ items: [1, 2] }); }

    @Are.onAfterMount
    onMount(@A_Inject(A_Caller) node: AreNode): void {
        FpHost.lastNode = node;
    }
}

class FpApp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="fp-app"><fp-host></fp-host><fp-self></fp-self></div>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({}); }
}

/** Re-renders itself from onAfterMount, replacing its first paint. */
class FpSelf extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="fp-self-boot">boot</div><p class="fp-self-boot" $if="true">x</p><b class="fp-self-boot" $for="i in items">{{i}}</b>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({ items: [1, 2, 3] }); }

    @Are.onAfterMount
    async onMount(@A_Inject(A_Caller) node: AreNode): Promise<void> {
        if (node.content.includes('fp-self-ready')) return;
        node.setContent(`<span class="fp-self-ready">ready</span>`);
        await node.render();
    }
}

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(): Promise<A_Concept> {
    document.body.innerHTML = `<are-root id="app"><fp-app></fp-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE First-Paint Clear Test',
        components: [
            FpApp, FpHost, FpSelf,
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
        name: 'adaas-are-html-first-paint-clear-test',
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
    await flush();
    return concept;
}

afterEach(() => {
    FpHost.lastNode = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});

describe('AreNode.clear() removes the first-paint subtree (ARE-4)', () => {
    it('replaces the template content on the first render()', async () => {
        await bootstrap();
        expect(document.querySelectorAll('.fp-app .fp-boot').length).toBe(4);

        const node = FpHost.lastNode!;
        expect(node).toBeDefined();

        node.setContent(`<span class="fp-ready">ready</span>`);
        await node.render();
        await flush();

        expect(document.querySelectorAll('.fp-app .fp-boot').length).toBe(0);
        expect(document.querySelectorAll('.fp-app .fp-ready').length).toBe(1);
    });

    it('replaces the first paint when re-rendering from onAfterMount', async () => {
        await bootstrap();
        await flush();

        expect(document.querySelectorAll('.fp-app .fp-self-boot').length).toBe(0);
        expect(document.querySelectorAll('.fp-app .fp-self-ready').length).toBe(1);
    });

    it('clear() alone empties the first-paint subtree', async () => {
        await bootstrap();
        const node = FpHost.lastNode!;

        await node.clear();
        await flush();

        expect(document.querySelectorAll('.fp-app .fp-boot').length).toBe(0);
        expect(node.children.length).toBe(0);
    });
});
