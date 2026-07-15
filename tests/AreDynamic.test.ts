/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Dedicated coverage for {@link AreDynamic} — the core "render a component
 * chosen at runtime by name" primitive.
 *
 * These render a real component tree into a jsdom document through the full
 * ARE pipeline (tokenize → transform → compile → interpret → mount), exactly
 * the way the browser examples bootstrap, then assert on the produced DOM.
 *
 * Scenarios:
 *   1. Default (kebab-case) name → component resolution.
 *   2. The `props` payload flows through to the concrete component.
 *   3. A heterogeneous `$for` list mounts a DIFFERENT component per item.
 *   4. Idempotent re-mount: re-mounting the whole subtree (as an `AreRoot`
 *      stash/restore does on a tab switch) does NOT duplicate the concrete
 *      children — the "already mounted" guard + idempotent `render()` hold.
 *   5. A subclass that overrides `resolveTag` maps an application alias to a
 *      concrete tag, inheriting all lifecycle behaviour unchanged.
 *   6. An empty `component` (a `$for` anchor) renders nothing.
 */

import { A_Concept, A_Context, A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';

import { Are, AreNode, AreStore, AreContainer, AreInit, AreRoute } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreDynamic } from '@adaas/are-html/dynamic/AreDynamic.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';
import { AreDirectiveFor } from '@adaas/are-html/directives/AreDirectiveFor.directive';


// ─────────────────────────────────────────────────────────────────────────────
// ── Leaf components (chosen at runtime by AreDynamic) ────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/** Reads `props.text` into its store and interpolates it — tag `ad-text`. */
class AdText extends Are {
    props: Record<string, any> = { props: { type: 'object', default: {} } };

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<span class="ad-text">{{text}}</span>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ props: {}, text: '' });
    }
    @Are.onAfterMount
    onMount(@A_Inject(AreStore) store: AreStore): void {
        const p = (store.get('props') ?? {}) as Record<string, unknown>;
        store.set({ text: String(p.text ?? '') });
    }
}

/** Reads `props.title` into its store and interpolates it — tag `ad-card`. */
class AdCard extends Are {
    props: Record<string, any> = { props: { type: 'object', default: {} } };

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<div class="ad-card">{{title}}</div>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ props: {}, title: '' });
    }
    @Are.onAfterMount
    onMount(@A_Inject(AreStore) store: AreStore): void {
        const p = (store.get('props') ?? {}) as Record<string, unknown>;
        store.set({ title: String(p.title ?? '') });
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── A subclass that maps a short alias → concrete tag ────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mirrors how an application (e.g. the AIS chat panel) subclasses AreDynamic to
 * address components by a short alias. Only `resolveTag` is overridden — every
 * lifecycle feature (`@Are.Template` / `@Are.Data` / `@Are.onAfterMount`) is
 * INHERITED via the a-concept prototype-chain meta clone.
 */
class AdAliasDynamic extends AreDynamic {
    protected resolveTag(name: string): string {
        const map: Record<string, string> = { txt: 'ad-text', crd: 'ad-card' };
        return map[name] ?? name;
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Host app: renders a heterogeneous $for list + an alias + an empty host ───
// ─────────────────────────────────────────────────────────────────────────────

class AdApp extends Are {
    /** Captured so a test can re-mount the whole subtree (restore simulation). */
    static lastNode: AreNode | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="ad-app">
                <are-dynamic class="row"
                             $for="item in items track item.id"
                             :component="item.component"
                             :props="item.props"></are-dynamic>

                <ad-alias-dynamic class="alias"
                                  :component="aliasName"
                                  :props="aliasProps"></ad-alias-dynamic>

                <are-dynamic class="empty"></are-dynamic>
            </div>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({
            items: [
                { id: 1, component: 'AdText', props: { text: 'hello' } },
                { id: 2, component: 'AdCard', props: { title: 'My Card' } },
                { id: 3, component: 'AdText', props: { text: 'world' } },
            ],
            aliasName: 'txt',
            aliasProps: { text: 'aliased' },
        });
    }

    @Are.onAfterMount
    onMount(@A_Inject(A_Caller) node: AreNode): void {
        AdApp.lastNode = node;
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Harness ──────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

async function bootstrap(): Promise<A_Concept> {
    document.body.innerHTML = `<are-root id="app"><ad-app></ad-app></are-root>`;

    const container = new AreContainer({
        name: 'ARE Dynamic-Component Test',
        components: [
            AdApp, AdText, AdCard, AreDynamic, AdAliasDynamic,
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
        name: 'adaas-are-html-dynamic-component-test',
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
    AdApp.lastNode = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});


// ─────────────────────────────────────────────────────────────────────────────
// ── Tests ────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('AreDynamic — render a component chosen at runtime by name', () => {

    it('resolves the component by name (kebab-case) and mounts it', async () => {
        await bootstrap();
        // The $for list holds two AdText and one AdCard.
        expect(document.querySelectorAll('.row .ad-text').length).toBe(2);
        expect(document.querySelectorAll('.row .ad-card').length).toBe(1);
    });

    it('passes the `props` payload through to the concrete component', async () => {
        await bootstrap();
        const texts = Array.from(document.querySelectorAll('.row .ad-text')).map((el) => el.textContent);
        const titles = Array.from(document.querySelectorAll('.row .ad-card')).map((el) => el.textContent);
        expect(texts).toEqual(['hello', 'world']);
        expect(titles).toEqual(['My Card']);
    });

    it('does NOT duplicate the concrete children when the subtree is re-mounted', async () => {
        await bootstrap();
        // Total across the $for list (2 ad-text + 1 ad-card) and the alias host (1 ad-text).
        expect(document.querySelectorAll('.ad-app .ad-text').length).toBe(3);
        expect(document.querySelectorAll('.ad-app .ad-card').length).toBe(1);

        // Simulate an AreRoot stash/restore re-mount (tab switch): re-mounting
        // the whole subtree re-fires @Are.onAfterMount on every AreDynamic host.
        const app = AdApp.lastNode!;
        expect(app).toBeDefined();
        await app.mount();
        await flush();

        // The "already mounted" guard + idempotent render() keep the counts flat.
        expect(document.querySelectorAll('.ad-app .ad-text').length).toBe(3);
        expect(document.querySelectorAll('.ad-app .ad-card').length).toBe(1);
    });

    it('honours a subclass `resolveTag` override (alias → concrete tag)', async () => {
        await bootstrap();
        const alias = document.querySelector('.alias .ad-text');
        expect(alias).not.toBeNull();
        expect(alias!.textContent).toBe('aliased');
    });

    it('renders nothing for an empty `component` (a $for anchor)', async () => {
        await bootstrap();
        const empty = document.querySelector('.empty');
        expect(empty).not.toBeNull();
        expect(empty!.childElementCount).toBe(0);
    });
});
