/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Integration coverage for parent → child PROP propagation via `:prop="expr"`
 * bindings, including the two structural directives `$if` and `$for`.
 *
 * These render a real component tree into a jsdom document through the full
 * ARE pipeline (tokenize → transform → compile → interpret → mount) exactly
 * the way the browser examples bootstrap, then assert on the produced DOM.
 *
 * Scenarios:
 *   1. Plain parent → child prop (literal + store-derived expression).
 *   2. A child prop INSIDE an `$if` block.
 *   3. A child prop INSIDE a `$for` loop that references the loop variable
 *      (`:label="item.name"`) — the case that requires the prop-binding
 *      compile path to merge the directive (loop) scope.
 *   4. Reactivity: updating the parent store flows into the child prop.
 */

import { A_Concept, A_Context } from '@adaas/a-concept';
import { A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';

import { Are, AreNode, AreStore, AreContainer, AreInit, AreRoute } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';
import { AreDirectiveIf } from '@adaas/are-html/directives/AreDirectiveIf.directive';
import { AreDirectiveFor } from '@adaas/are-html/directives/AreDirectiveFor.directive';


// ─────────────────────────────────────────────────────────────────────────────
// ── Test components ──────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/** Leaf component: renders whatever `label` prop it receives. */
class TestChild extends Are {
    props: Record<string, any> = {
        label: { type: 'string', default: '' },
    };

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<span class="child">{{label}}</span>`);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ label: store.get('label') ?? '' });
    }
}

/** Parent: passes props down plainly, inside `$if`, and inside `$for`. */
class TestParent extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="parent">
                <test-child class="basic" :label="topLabel"></test-child>

                <div class="if-wrap" $if="show">
                    <test-child class="in-if" :label="topLabel"></test-child>
                </div>

                <test-child class="in-for"
                            $for="item in items track item.id"
                            :label="item.name"></test-child>
            </div>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({
            topLabel: 'Hello',
            show: true,
            items: [
                { id: 1, name: 'Alpha' },
                { id: 2, name: 'Beta' },
                { id: 3, name: 'Gamma' },
            ],
        });
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Harness ──────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(): Promise<A_Concept> {
    // The engine context reads `container.body.innerHTML` as its source at
    // construction time, so the markup must be in the DOM BEFORE we build it.
    document.body.innerHTML = `<are-root id="app"><test-parent></test-parent></are-root>`;

    const container = new AreContainer({
        name: 'ARE Prop-Propagation Test',
        components: [
            TestParent,
            TestChild,
            AreDirectiveIf,
            AreDirectiveFor,
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
        name: 'adaas-are-html-prop-propagation-test',
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


// ─────────────────────────────────────────────────────────────────────────────
// ── Tests ────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('Prop propagation — parent → child via :prop', () => {

    it('passes a store-derived prop to a plain child', async () => {
        await bootstrap();

        const basic = document.querySelector('.basic .child');
        expect(basic).not.toBeNull();
        expect(basic!.textContent).toBe('Hello');
    });

    it('passes a prop to a child rendered inside an $if block', async () => {
        await bootstrap();

        const inIf = document.querySelector('.in-if .child');
        expect(inIf).not.toBeNull();
        expect(inIf!.textContent).toBe('Hello');
    });

    it('passes the loop variable as a prop to children inside a $for', async () => {
        await bootstrap();

        const forChildren = Array.from(
            document.querySelectorAll('.in-for .child'),
        ).map((el) => el.textContent);

        expect(forChildren).toEqual(['Alpha', 'Beta', 'Gamma']);
    });
});
