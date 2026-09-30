/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * AH-2: whitespace around adjacent interpolations must be preserved —
 * `A {{x}} B {{y}}` renders as `A 1 B 2`, not `A 1B 2`.
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


class WsApp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(
            `<p class="ws-a">A {{x}} B {{y}}</p>` +
            `<p class="ws-b">{{x}} and {{y}}</p>` +
            `<p class="ws-c">{{x}} {{y}}</p>` +
            `<p class="ws-d">
                Total: {{x}} items
            </p>`
        );
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void { store.set({ x: 1, y: 2 }); }
}

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(): Promise<A_Concept> {
    document.body.innerHTML = `<are-root id="app"><ws-app></ws-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE Interpolation Whitespace Test',
        components: [WsApp, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger],
        entities: [AreInit, AreRoute],
        fragments: [
            new A_SignalState([AreRoute]),
            new AreHTMLEngineContext({ container: document }),
            new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
        ],
    });

    const concept = new A_Concept({
        name: 'adaas-are-html-interpolation-whitespace-test',
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
    A_Context.reset();
    document.body.innerHTML = '';
});

describe('Interpolation whitespace (AH-2)', () => {
    it('keeps spaces between adjacent interpolations and text', async () => {
        await bootstrap();

        expect(document.querySelector('.ws-a')!.textContent).toBe('A 1 B 2');
        expect(document.querySelector('.ws-b')!.textContent).toBe('1 and 2');
        expect(document.querySelector('.ws-c')!.textContent).toBe('1 2');
        expect(document.querySelector('.ws-d')!.textContent!.replace(/\s+/g, ' ').trim()).toBe('Total: 1 items');
    });
});
