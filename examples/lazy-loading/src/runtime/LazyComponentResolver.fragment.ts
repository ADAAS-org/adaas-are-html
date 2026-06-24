import { A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { Are, AreComponentResolver } from "@adaas/are";
import { ComponentManifest } from "./ComponentManifest.fragment";


/**
 * App-side {@link AreComponentResolver} — the lazy-loading hook the engine
 * consults whenever a node's tag does NOT resolve to a registered component.
 *
 * This is where the "fetch a component from the backend on demand" logic now
 * lives. The engine (AreLoader) calls {@link resolve} with the unresolved tag;
 * if the manifest says that tag is a lazy component, we dynamically `import()`
 * its bundle and hand the class back. The engine then registers that class
 * GLOBALLY (root scope) so every node can resolve it from here on — we no
 * longer touch any scope ourselves.
 *
 * Compared to the previous hand-rolled `LazyOutlet`, the fetch/import/dedupe
 * logic is fully decoupled from rendering: the outlet just sets a `<tag>` and
 * renders; the engine + this resolver handle "where does that class come from".
 */
@A_Frame.Define({
    namespace: 'a-are-html-example',
    description: 'Resolves unregistered component tags by dynamically importing their backend-served bundle, per the component manifest. Plugged into the engine via AreComponentResolver; returned classes are registered globally by the engine.'
})
export class LazyComponentResolver extends AreComponentResolver {

    protected _manifest: ComponentManifest;

    constructor(data: { manifest: ComponentManifest }) {
        super({ name: 'LazyComponentResolver' });
        this._manifest = data.manifest;
    }

    /**
     * Resolve a tag to its component class, fetching the bundle on demand.
     *
     * Returns `undefined` when the tag is not a lazy component in the manifest
     * (eager components are already registered; plain elements stay plain), or
     * when it has already been imported (the engine has it registered, so a
     * second resolve is unnecessary).
     */
    async resolve(entity: string): Promise<A_TYPES__Ctor<Are> | undefined> {
        const target = this._manifest.list().find(item => item.tag === entity);

        if (!target || !target.lazy || !target.url || this._manifest.isLoaded(entity)) {
            return undefined;
        }

        const Component = await this.importComponent(target.url);

        if (!Component) {
            return undefined;
        }

        this._manifest.markLoaded(entity);

        return Component as A_TYPES__Ctor<Are>;
    }

    /**
     * Dynamic import of a component bundle served by the backend.
     *
     * Because the app + lazy bundles are code-split against shared framework
     * chunks, the class returned here `extends` the SAME `Are`/DI runtime the
     * host app is running.
     */
    protected async importComponent(url: string): Promise<Function | undefined> {
        const mod: Record<string, unknown> = await import(/* @vite-ignore */ url);

        if (typeof mod.default === 'function') {
            return mod.default as Function;
        }

        return Object.values(mod).find(value => typeof value === 'function') as Function | undefined;
    }
}
