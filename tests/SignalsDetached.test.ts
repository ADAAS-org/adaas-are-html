/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regression: a component that swaps its content on a signal (`node.clear()` +
 * `setContent` + `render`, as an OS window does) must take the old subtree off
 * the signal bus — the next signal reaches only the live content, with no
 * "A_UI_Node Scope Inheritance Error" for the cleared nodes.
 */

import { A_Concept, A_Context, A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';

import { Are, AreNode, AreContainer, AreInit, AreRoute, AreSignalsContext } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';

jest.setTimeout(60_000);

class SwapPane extends Are {
    static signals = 0;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<i class="pane">pane</i>`);
    }

    @Are.Signal(AreRoute)
    onRoute(): void {
        SwapPane.signals++;
    }
}

class SwapWindow extends Are {
    static renders = 0;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<section class="win"><swap-pane></swap-pane></section>`);
    }

    /** Like an OS window: every route swaps its content for a fresh one. */
    @Are.Signal(AreRoute)
    async onRoute(@A_Inject(A_Caller) node: AreNode): Promise<void> {
        await node.clear();
        node.setContent(`<section class="win"><swap-pane></swap-pane></section>`);
        await node.render();
        SwapWindow.renders++;
    }
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));
let container: AreContainer;

async function bootstrap(): Promise<void> {
    document.body.innerHTML = `<are-root id="app"><swap-window></swap-window></are-root>`;
    container = new AreContainer({
        name: 'ARE signals after a content swap',
        components: [SwapWindow, SwapPane, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger],
        entities: [AreInit, AreRoute],
        fragments: [
            new A_SignalState([AreRoute]),
            new AreSignalsContext<Are>({}),
            new AreHTMLEngineContext({ container: document }),
            new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
        ],
    });
    const concept = new A_Concept({
        name: 'adaas-are-html-signals-swap',
        fragments: [new A_Config({ variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const, defaults: { CONFIG_VERBOSE: false, DEV_MODE: false } })],
        components: [A_Logger, ConfigReader, A_Polyfill],
        containers: [container],
    });
    await concept.load();
    await concept.start();
    await tick();
}

afterEach(() => {
    SwapWindow.renders = 0;
    SwapPane.signals = 0;
    A_Context.reset();
    document.body.innerHTML = '';
});

describe('signals after a component swapped its content', () => {

    it('reach only the live content, with no errors for the cleared nodes', async () => {
        const logged = jest.spyOn(console, 'log');
        await bootstrap();
        const bus = container.scope.resolve(A_SignalBus)!;
        const subscribers = container.scope.resolve(AreSignalsContext)!.subscribers;

        for (const path of ['/one', '/two', '/three']) {
            await bus.next(new AreRoute(path));
            await tick(10);
        }
        expect(SwapWindow.renders).toBe(3);
        expect(document.querySelectorAll('.pane').length).toBe(1);
        // Only live nodes stay subscribed: the cleared panes left the bus with their window's old content.
        const panes = [...subscribers].filter((n) => n.aseid.entity === 'swap-pane');
        expect(panes.length).toBe(1);
        expect([...subscribers].filter((n) => !A_Context.has(n)).length).toBe(0);
        // A cleared pane takes no signal; the pane rendered during a signal joins from the next one.
        expect(SwapPane.signals).toBe(0);

        const noisy = logged.mock.calls.filter(c => c.map(String).join(' ').includes('A_ERROR')).map(c => c.map(String).join(' ').replace(/\x1b\[[0-9;]*m/g, '').slice(0, 300));
        logged.mockRestore();
        expect(noisy).toEqual([]);
    });
});
