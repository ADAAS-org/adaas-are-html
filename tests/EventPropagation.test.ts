/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Integration coverage for ARE-HTML EVENT handling:
 *
 *   1. Event modifiers on the `@event` binding:
 *        • `.prevent`            → calls `preventDefault()`
 *        • `.stop`               → calls `stopPropagation()` (parent does not fire)
 *        • `.enter`              → keyboard handler fires only for the Enter key
 *        • `.ctrl.enter`         → system + key modifiers combine with AND
 *                                  (fires ONLY on Enter WHILE Ctrl is held)
 *
 *   2. Child → parent event propagation:
 *        A child component emits a bubbling/composed `CustomEvent`; the PARENT
 *        binds a handler on the child tag (`<child @childsubmit="$onChild">`) and
 *        the PARENT's handler runs (not the child's), receiving the event detail.
 *
 * These render a real component tree into a jsdom document through the full ARE
 * pipeline (tokenize → transform → compile → interpret → mount) exactly the way
 * the browser examples bootstrap, then drive real DOM events and assert.
 */

import { A_Concept, A_Context } from '@adaas/a-concept';
import { A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';

import { Are, AreNode, AreStore, AreEvent, AreContainer, AreInit, AreRoute } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';


// ─────────────────────────────────────────────────────────────────────────────
// ── Shared call recorder ─────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

interface Calls {
    enter: number;
    ctrlEnter: number;
    prevent: number;
    stop: number;
    outer: number;
    childPayload: string | null;
    childHandledOnParent: boolean;
}

let calls: Calls;

const resetCalls = (): Calls => ({
    enter: 0,
    ctrlEnter: 0,
    prevent: 0,
    stop: 0,
    outer: 0,
    childPayload: null,
    childHandledOnParent: false,
});


// ─────────────────────────────────────────────────────────────────────────────
// ── Modifier test component ──────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

class KeyComp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="key-root">
                <input class="k-enter" @keydown.enter="$onEnter">
                <input class="k-ctrl-enter" @keydown.ctrl.enter="$onCtrlEnter">
                <button class="b-prevent" @click.prevent="$onPrevent">prevent</button>
                <div class="outer" @click="$onOuter">
                    <button class="b-stop" @click.stop="$onStop">stop</button>
                </div>
            </div>
        `);
    }

    @Are.EventHandler
    onEnter(): void { calls.enter++; }

    @Are.EventHandler
    onCtrlEnter(): void { calls.ctrlEnter++; }

    @Are.EventHandler
    onPrevent(): void { calls.prevent++; }

    @Are.EventHandler
    onStop(): void { calls.stop++; }

    @Are.EventHandler
    onOuter(): void { calls.outer++; }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Child → parent test components ───────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Leaf component. A click on its internal button relays a domain event to any
 * ancestor by dispatching a bubbling + composed `CustomEvent`. This is the
 * "emit" half of the child→parent contract.
 */
class TestEmitter extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<button class="emit-btn" @click="$relay">emit</button>`);
    }

    @Are.EventHandler
    relay(@A_Inject(AreEvent) event: AreEvent): void {
        const el = event.get('element') as HTMLElement | undefined;
        if (!el) return;
        el.dispatchEvent(new CustomEvent('childsubmit', {
            bubbles: true,
            composed: true,
            detail: { payload: 'from-child' },
        }));
    }
}

/**
 * Parent. Binds a handler on the CHILD tag. With correct child→parent
 * propagation this handler runs in the PARENT (here), not in `TestEmitter`.
 */
class TestHost extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="host-root">
                <test-emitter class="emitter" @childsubmit="$onChild"></test-emitter>
            </div>
        `);
    }

    @Are.EventHandler
    onChild(@A_Inject(AreEvent) event: AreEvent): void {
        calls.childHandledOnParent = true;
        const native = event.get('native') as CustomEvent | undefined;
        calls.childPayload = (native?.detail?.payload as string) ?? null;
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Harness ──────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(
    rootMarkup: string,
    components: any[],
): Promise<A_Concept> {
    // The engine context reads `container.body.innerHTML` as its source at
    // construction time, so the markup must be in the DOM BEFORE we build it.
    document.body.innerHTML = `<are-root id="app">${rootMarkup}</are-root>`;

    const container = new AreContainer({
        name: 'ARE Event-Propagation Test',
        components: [
            ...components,
            A_SignalBus,
            AreRoot,
            ConfigReader,
            AreHTMLEngine,
            A_Logger,
        ],
        entities: [AreInit, AreRoute],
        fragments: [
            new A_SignalState([AreRoute]),
            new AreHTMLEngineContext({ container: document }),
            new A_Config({
                defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' },
            }),
        ],
    });

    const concept = new A_Concept({
        name: 'adaas-are-html-event-propagation-test',
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

beforeEach(() => {
    calls = resetCalls();
});

afterEach(() => {
    A_Context.reset();
    document.body.innerHTML = '';
});


// ─────────────────────────────────────────────────────────────────────────────
// ── Tests — modifiers ────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('Event modifiers', () => {

    it('.enter fires the handler only for the Enter key', async () => {
        await bootstrap(`<key-comp></key-comp>`, [KeyComp]);

        const input = document.querySelector('.k-enter') as HTMLInputElement;
        expect(input).not.toBeNull();

        // A non-Enter key must NOT trigger the handler.
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        await flush();
        expect(calls.enter).toBe(0);

        // Enter triggers it.
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await flush();
        expect(calls.enter).toBe(1);
    });

    it('.ctrl.enter combines system + key modifiers with AND semantics', async () => {
        await bootstrap(`<key-comp></key-comp>`, [KeyComp]);

        const input = document.querySelector('.k-ctrl-enter') as HTMLInputElement;
        expect(input).not.toBeNull();

        // Enter WITHOUT Ctrl → must NOT fire (Ctrl is required).
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await flush();
        expect(calls.ctrlEnter).toBe(0);

        // Ctrl WITHOUT Enter → must NOT fire (Enter is required).
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
        await flush();
        expect(calls.ctrlEnter).toBe(0);

        // Ctrl + Enter together → fires exactly once.
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true }));
        await flush();
        expect(calls.ctrlEnter).toBe(1);
    });

    it('.prevent calls preventDefault() and still runs the handler', async () => {
        await bootstrap(`<key-comp></key-comp>`, [KeyComp]);

        const btn = document.querySelector('.b-prevent') as HTMLButtonElement;
        expect(btn).not.toBeNull();

        const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
        btn.dispatchEvent(evt);
        await flush();

        expect(calls.prevent).toBe(1);
        expect(evt.defaultPrevented).toBe(true);
    });

    it('.stop prevents the event from bubbling to a parent handler', async () => {
        await bootstrap(`<key-comp></key-comp>`, [KeyComp]);

        const btn = document.querySelector('.b-stop') as HTMLButtonElement;
        expect(btn).not.toBeNull();

        btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await flush();

        // The inner button's handler ran...
        expect(calls.stop).toBe(1);
        // ...but `.stop` halted propagation so the outer `@click` never fired.
        expect(calls.outer).toBe(0);
    });
});


// ─────────────────────────────────────────────────────────────────────────────
// ── Tests — child → parent propagation ───────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('Child → parent event propagation', () => {

    it('runs the PARENT handler bound on a child-component tag with the event detail', async () => {
        await bootstrap(`<test-host></test-host>`, [TestHost, TestEmitter]);

        const btn = document.querySelector('.emitter .emit-btn') as HTMLButtonElement;
        expect(btn).not.toBeNull();

        btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await flush();

        // The handler authored in the PARENT template ran in the PARENT component,
        // and received the child's CustomEvent detail.
        expect(calls.childHandledOnParent).toBe(true);
        expect(calls.childPayload).toBe('from-child');
    });
});
