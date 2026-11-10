/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * ARE-6 (open, @adaas/are): a nested component's unmount hooks run when an ancestor is unmounted — so it can
 * detach its listeners. Today `AreLifecycle.unmount` reverts the descendants' DOM but runs the hooks only for the
 * node it is called on. Remove `.failing` when fixed.
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

const events: string[] = [];

class InnerPart extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void { node.setContent(`<span class="inner">inner</span>`); }
    @Are.onAfterMount
    onMount(): void { events.push('mount'); }
    @Are.onBeforeUnmount
    onUnmount(): void { events.push('unmount'); }
}

class OuterPanel extends Are {
    static store: AreStore | undefined;
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="outer"><section class="box" $if="open"><div class="deep"><inner-part></inner-part></div></section></div>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { OuterPanel.store = store; store.set({ open: true }); }
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

afterEach(() => { OuterPanel.store = undefined; events.length = 0; A_Context.reset(); document.body.innerHTML = ''; });

describe('unmount hooks of nested components (ARE-6)', () => {
    it.failing('a component nested in a hidden $if gets onBeforeUnmount', async () => {
        document.body.innerHTML = `<are-root id="app"><outer-panel></outer-panel></are-root>`;
        const container = new AreContainer({
            name: 'ARE nested unmount',
            components: [OuterPanel, InnerPart, AreDirectiveFor, AreDirectiveIf, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger],
            entities: [AreInit, AreRoute],
            fragments: [new A_SignalState([AreRoute]), new AreHTMLEngineContext({ container: document }), new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } })],
        });
        const concept = new A_Concept({
            name: 'adaas-are-html-nested-unmount',
            fragments: [new A_Config({ variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const, defaults: { CONFIG_VERBOSE: false, DEV_MODE: false } })],
            components: [A_Logger, ConfigReader, A_Polyfill],
            containers: [container],
        });
        await concept.load();
        await concept.start();
        await tick(50);
        expect(document.querySelector('.inner')).not.toBeNull();
        OuterPanel.store!.set({ open: false });
        await tick(50);
        expect(document.querySelector('.inner')).toBeNull();
        expect(events).toEqual(['mount', 'unmount']);
    });
});
