/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regression coverage for imperative re-render idempotency.
 *
 * Components that build their subtree imperatively in `@Are.onAfterMount`
 * (the "dynamic component" pattern — the concrete child tag is only known
 * from a prop at mount time) call `node.setContent(markup)` then
 * `node.render()`. `@Are.onAfterMount` re-runs whenever the node is
 * re-mounted — most importantly when an `AreRoot` outlet STASHES a subtree
 * (unmount, keep in `AreRootCache`) and later RESTORES it (`child.mount()`)
 * on tab switch.
 *
 * `render()` tokenizes `node.content` into child nodes; the tokenizer
 * *appends* children. Without clearing first, a second `render()` (the
 * re-mount) produced a DUPLICATE subtree, and the stale, already-live child
 * was re-init/re-loaded — cascading scope-inheritance errors and a UI freeze.
 *
 * This test asserts `render()` is idempotent: re-rendering the same content
 * rebuilds exactly one subtree, never accumulating duplicates.
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


/** Leaf rendered by the imperative host. */
class RiLeaf extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<span class="ri-leaf">leaf</span>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({}); }
}

/**
 * Imperative host — mirrors the AisChatDynamicComponent / AisChatHtmlComponent
 * pattern: sets content + builds its subtree in onAfterMount via node.render().
 * Captures the live node so the test can trigger a second render (a re-mount).
 */
class RiHost extends Are {
    static lastNode: AreNode | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void { node.setContent(''); }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({}); }

    @Are.onAfterMount
    async onMount(@A_Inject(A_Caller) node: AreNode): Promise<void> {
        RiHost.lastNode = node;
        node.setContent(`<ri-leaf></ri-leaf>`);
        await node.render();
    }
}

class RiApp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="ri-app"><ri-host></ri-host></div>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({}); }
}

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(): Promise<A_Concept> {
    document.body.innerHTML = `<are-root id="app"><ri-app></ri-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE Render-Idempotency Test',
        components: [
            RiApp, RiHost, RiLeaf,
            AreDirectiveFor, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger,
        ],
        entities: [AreInit, AreRoute],
        fragments: [
            new A_SignalState([AreRoute]),
            new AreHTMLEngineContext({ container: document }),
            new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
        ],
    });

    const concept = new A_Concept({
        name: 'adaas-are-html-render-idempotency-test',
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
    RiHost.lastNode = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});

describe('AreNode.render() idempotency', () => {
    it('renders exactly one subtree on first mount', async () => {
        await bootstrap();
        expect(document.querySelectorAll('.ri-app .ri-leaf').length).toBe(1);
    });

    it('does NOT duplicate the subtree when render() runs again (re-mount)', async () => {
        await bootstrap();
        expect(document.querySelectorAll('.ri-app .ri-leaf').length).toBe(1);

        // Simulate the AreRoot stash/restore re-mount: onAfterMount fires again,
        // re-running setContent(sameMarkup) + render() on the SAME live node.
        const node = RiHost.lastNode!;
        expect(node).toBeDefined();
        node.setContent(`<ri-leaf></ri-leaf>`);
        await node.render();
        await flush();

        // After the fix render() clears the previous subtree first, so the DOM
        // still has exactly one leaf — not two.
        expect(document.querySelectorAll('.ri-app .ri-leaf').length).toBe(1);
    });
});
