/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regression: a `$for` list populated AFTER mount, each item hosting an
 * `<are-dynamic>` whose concrete tag is supplied lazily by an
 * AreComponentResolver (the OS chat "parts" stage). Every item must render,
 * and the props bound on the lazily-resolved tag must reach its own store.
 */
import { A_Concept, A_Context, A_Inject, A_Caller, A_TYPES__Ctor } from '@adaas/a-concept';
import { A_Config, ConfigReader } from '@adaas/a-utils/a-config';
import { A_Logger, A_LOGGER_ENV_KEYS } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Polyfill } from '@adaas/a-utils/a-polyfill';
import { Are, AreNode, AreStore, AreContainer, AreInit, AreRoute, AreComponentResolver } from '@adaas/are';
import { AreRoot } from '@adaas/are-html/root/AreRoot.component';
import { AreDynamic } from '@adaas/are-html/dynamic/AreDynamic.component';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreHTMLEngineContext } from '@adaas/are-html/context';
import { AreDirectiveFor } from '@adaas/are-html/directives/AreDirectiveFor.directive';

class LzTile extends Are {
    props: Record<string, any> = { props: { type: 'object', default: {} } };
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`<span class="lz-tile">{{name}}</span>`);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ props: {}, name: '' });
    }
    @Are.onAfterMount
    onMount(@A_Inject(AreStore) store: AreStore): void {
        const p = (store.get('props') ?? {}) as Record<string, unknown>;
        store.set({ name: String(p.name ?? 'EMPTY') });
    }
}

class LzResolver extends AreComponentResolver {
    async resolve(entity: string): Promise<A_TYPES__Ctor<Are> | undefined> {
        if (entity !== 'lz-tile') return undefined;
        await new Promise((r) => setTimeout(r, 5));
        return LzTile as any;
    }
}

let hostStore: AreStore | undefined;

class LzApp extends Are {
    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="stage">
                <div class="part" $for="p in parts track p.dom" :data-part="p.dom"><are-dynamic :component="p.tag" :props="p.props"></are-dynamic></div>
            </div>
        `);
    }
    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ parts: [] });
    }
    @Are.onAfterMount
    onMount(@A_Inject(AreStore) store: AreStore): void {
        hostStore = store;
    }
}

const wait = (ms = 0) => new Promise<void>((r) => setTimeout(r, ms));

async function bootstrap(lazy: boolean): Promise<void> {
    document.body.innerHTML = `<are-root id="app"><lz-app></lz-app></are-root>`;
    const components: any[] = [LzApp, AreDynamic, AreDirectiveFor, A_SignalBus, AreRoot, ConfigReader, AreHTMLEngine, A_Logger];
    if (!lazy) components.push(LzTile);
    const fragments: any[] = [
        new A_SignalState([AreRoute]),
        new AreHTMLEngineContext({ container: document }),
        new A_Config({ defaults: { [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'error' } }),
    ];
    if (lazy) fragments.push(new LzResolver({ name: 'LzResolver' } as any));
    const container = new AreContainer({ name: 'Lz', components, entities: [AreInit, AreRoute], fragments });
    const concept = new A_Concept({
        name: 'lz-test',
        fragments: [new A_Config({ variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const, defaults: { CONFIG_VERBOSE: false, DEV_MODE: false } })],
        components: [A_Logger, ConfigReader, A_Polyfill],
        containers: [container],
    });
    await concept.load();
    await concept.start();
    await wait();
}

afterEach(() => { hostStore = undefined; A_Context.reset(); document.body.innerHTML = ''; });

describe.each([false, true])('late $for parts (lazy=%s)', (lazy) => {
    it('renders every part with its props', async () => {
        await bootstrap(lazy);
        hostStore!.set('parts', [
            { dom: 'a', tag: 'lz-tile', props: { name: 'One' } },
            { dom: 'b', tag: 'lz-tile', props: { name: 'Two' } },
            { dom: 'c', tag: 'lz-tile', props: { name: 'Three' } },
        ]);
        await wait(50);
        const parts = [...document.querySelectorAll('.part')].map((e) => e.getAttribute("data-part") + '=' + e.textContent!.trim());
        expect(parts).toEqual(['a=One', 'b=Two', 'c=Three']);
    });
});
