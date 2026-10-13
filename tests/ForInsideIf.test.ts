/**
 * @jest-environment jsdom
 * @jest-environment-options {"customExportConditions": ["node", "require", "default"]}
 *
 * Regressions: a `$for` inside a `$if` that turns false must not keep updating
 * its removed items, and later siblings' `$if` must still mount. A `$if` on an
 * element with an `id` must re-mount (AH-F8), a void element must have no text
 * child (AH-F9), and a nested `$if` must survive one `set()` that hides it and
 * changes a binding inside it (AH-F10).
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

class TagBox extends Are {
    static store: AreStore | undefined;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent(`
            <div class="box">
                <div class="tags" $if="hasTags">
                    <span class="tag" $for="t in tags track t.key">{{t.label}}<button :class="t.x" type="button">x</button></span>
                </div>
                <input id="tag-field" class="field" $if="editable" type="text" maxlength="40" @keydown="$noop" />
                <b class="title">{{title}}</b>
                <div class="prev" $if="isFile">
                    <img class="img" $if="isImage" :src="url" alt="" />
                    <pre class="text" $if="isText">{{text}}</pre>
                    <div class="note" $if="isNote">{{note}}</div>
                </div>
            </div>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        TagBox.store = store;
        store.set({ hasTags: false, tags: [], editable: false, title: '', isFile: false, isImage: false, isText: false, isNote: false, url: '', text: '', note: '' });
    }
}

const tick = (ms = 0) => new Promise<void>(r => setTimeout(r, ms));

async function bootstrap(errors: unknown[]): Promise<void> {
    document.body.innerHTML = `<are-root id="app"><tag-box></tag-box></are-root>`;

    const container = new AreContainer({
        name: 'ARE For inside If',
        components: [
            TagBox,
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
        name: 'adaas-are-html-for-inside-if',
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
    await tick();
    const logger = A_Context.root.resolve<A_Logger>(A_Logger);
    if (logger) jest.spyOn(logger, 'error').mockImplementation((e: unknown) => { errors.push(e); });
}

const view = () => ({
    tags: Array.from(document.querySelectorAll('.box .tag')).map(t => t.textContent),
    field: !!document.querySelector('.box .field'),
    title: document.querySelector('.box .title')?.textContent,
});

/** A void element must not get its attribute source as a text child (AH-10). */
const fieldText = () => document.querySelector('.box .field')?.childNodes.length ?? 0;

afterEach(() => {
    TagBox.store = undefined;
    A_Context.reset();
    document.body.innerHTML = '';
});


describe('$for inside a $if that turns false', () => {

    it('drops the items quietly and keeps later $if siblings working', async () => {
        const errors: unknown[] = [];
        const logged = jest.spyOn(console, 'log');
        await bootstrap(errors);
        const set = (v: Record<string, unknown>) => { TagBox.store!.set(v); return tick(); };

        await set({ hasTags: true, tags: [{ key: 'a', label: '#a', x: 'x' }], editable: true, title: 'one' });
        expect(view()).toEqual({ tags: ['#ax'], field: true, title: 'one' });

        await set({ hasTags: false, tags: [], editable: false, title: 'two' });
        expect(view()).toEqual({ tags: [], field: false, title: 'two' });

        await set({ hasTags: false, tags: [], editable: true, title: 'three' });
        expect(view()).toEqual({ tags: [], field: true, title: 'three' });

        await set({ hasTags: true, tags: [{ key: 'b', label: '#b', x: 'y' }], editable: true, title: 'four' });
        expect(view()).toEqual({ tags: ['#bx'], field: true, title: 'four' });
        expect(fieldText()).toBe(0);

        const noisy = logged.mock.calls.filter(c => c.map(String).join(' ').includes('A_ERROR')).length;
        logged.mockRestore();
        expect({ errors: errors.length, noisy }).toEqual({ errors: 0, noisy: 0 });
    });

    it('mounts a nested $if that turns on together with its parent $if, and updates it after', async () => {
        const errors: unknown[] = [];
        const logged = jest.spyOn(console, 'log');
        await bootstrap(errors);
        const set = (v: Record<string, unknown>) => { TagBox.store!.set(v); return tick(); };
        const count = () => logged.mock.calls.filter(c => c.map(String).join(' ').includes('A_ERROR')).length;
        const prev = () => ({
            img: document.querySelector('.prev .img')?.getAttribute('src') ?? null,
            text: document.querySelector('.prev .text')?.textContent ?? null,
            note: document.querySelector('.prev .note')?.textContent ?? null,
        });

        // A file whose preview is still loading, then its text arrives.
        await set({ isFile: true, isNote: true, note: 'Loading' });
        expect(prev()).toEqual({ img: null, text: null, note: 'Loading' });
        expect(count()).toBe(0);
        await set({ isFile: true, isNote: false, isText: true, text: 'hello', note: '' });
        expect(prev()).toEqual({ img: null, text: 'hello', note: null });
        expect(count()).toBe(0);

        // A folder (no preview), then an image file.
        await set({ isFile: false, isText: false, text: '' });
        expect(document.querySelector('.prev')).toBeNull();
        expect(count()).toBe(0);
        await set({ isFile: true, isNote: true, note: 'Loading' });
        expect(count()).toBe(0);
        await set({ isFile: true, isNote: false, isImage: true, url: 'blob:x', note: '' });
        expect(prev()).toEqual({ img: 'blob:x', text: null, note: null });

        const noisy = logged.mock.calls.filter(c => c.map(String).join(' ').includes('A_ERROR')).length;
        logged.mockRestore();
        expect({ errors: errors.length, noisy }).toEqual({ errors: 0, noisy: 0 });
    });
});
