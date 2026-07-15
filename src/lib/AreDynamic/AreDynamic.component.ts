import { A_Caller, A_FormatterHelper, A_Inject } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';
import { Are, ArePropDefinition, AreNode, AreStore } from '@adaas/are';

/**
 * AreDynamic — renders a component chosen at **runtime by name**, the same way
 * {@link AreRoot} renders a routed component, but driven by a prop instead of a
 * signal vector.
 *
 * ## Why a post-mount hook (not a template)
 *
 * The `component` name and its `props` arrive as **props**, which the ARE
 * compiler injects during the *compile* phase — AFTER `@Are.Template`/`@Are.Data`
 * run. So the concrete tag is unknown at template time. Once the props are
 * available in `@Are.onAfterMount`, this mirrors `AreRoot.onSignal`:
 *
 *   1. resolve `component` → the concrete kebab tag (see {@link resolveTag});
 *   2. `node.setContent(`<tag :props="props"></tag>`)`; the `:props` binding is
 *      evaluated against THIS component's store (where `props` was injected),
 *      so it reactively re-injects into the concrete component's own store;
 *   3. `await node.render()` — the engine's `tokenize → init → load → transform
 *      → compile → mount` pipeline for the new child subtree. `render()` is
 *      idempotent (it clears any previous subtree first), so a props change that
 *      swaps the concrete tag rebuilds cleanly with no duplicate/stale children.
 *
 * ## Use inside a `$for`
 *
 * The canonical use is one `<are-dynamic>` per item inside a store-backed
 * `$for`, so every item mounts an independent, real Are component chosen by
 * `item.component`. `@Are.onAfterMount` re-runs on EVERY (re)mount — including
 * when an `AreRoot` outlet STASHES the subtree (unmount, keep in `AreRootCache`)
 * and later RESTORES it (`child.mount()`) on a tab switch. The concrete child
 * survives the stash, so the "already mounted" guard below skips the rebuild on
 * restore (a per-item perf win; mirrors `AreRoot` / `LazyOutlet`).
 *
 * ## Custom name→tag resolution
 *
 * By default `component` is resolved with `A_FormatterHelper.toKebabCase` — the
 * exact convention the engine uses to register and look up component tags (same
 * as `AreRoot`). Applications that address components by a short alias (e.g. a
 * chat message `component: 'card'`) subclass `AreDynamic` and override
 * {@link resolveTag} to map the alias to the concrete tag; all lifecycle
 * behaviour is inherited unchanged.
 */
@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Renders a component chosen at runtime by name. Receives a `component` (name) and a `props` payload; resolves the concrete tag (kebab-case by default) and mounts it via the engine pipeline (mirrors AreRoot, driven by a prop). Designed to be used inside a $for to render a heterogeneous list of components.',
})
export class AreDynamic extends Are {

    props: Record<string, ArePropDefinition> = {
        component: { type: 'string', default: '' },
        props: { type: 'object', default: {} },
    };

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode): void {
        node.setContent('');
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore): void {
        store.set({ component: '', props: {} });
    }

    /**
     * Resolve the `component` prop value to the concrete engine tag.
     *
     * Default: `A_FormatterHelper.toKebabCase(name)` — the convention the engine
     * uses to register component tags (same as `AreRoot`). Override to plug in
     * an application-specific alias→tag map.
     */
    protected resolveTag(name: string): string {
        return A_FormatterHelper.toKebabCase(name);
    }

    @Are.onAfterMount
    async onMount(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): Promise<void> {
        const name = String(store.get('component') ?? '');

        // A `$for` clones this component per item via `cloneWithScope()`, which
        // leaves the ORIGINAL element as a detached anchor with a fresh scope
        // and the default (empty) `component`. A blank name means "nothing to
        // render", so bail out before touching the tree.
        if (!name) {
            return;
        }

        const tag = this.resolveTag(name);

        // `@Are.onAfterMount` re-runs on EVERY (re)mount — including when an
        // `AreRoot` outlet stashes this subtree into `AreRootCache` and later
        // restores it (`child.mount()`). The concrete child built on the first
        // mount survives the stash, so on restore it is already present and its
        // DOM is re-applied from the preserved scene plan. Skip the rebuild when
        // the right child is already mounted (mirrors `AreRoot` / `LazyOutlet`).
        if (node.children[0]?.type === tag) {
            return;
        }

        node.setContent(`<${tag} :props="props"></${tag}>`);
        await node.render();
    }
}
