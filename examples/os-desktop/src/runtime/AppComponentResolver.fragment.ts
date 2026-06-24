import { A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { Are, AreComponentResolver } from "@adaas/are";
import { AppDescriptor, AppRegistry } from "./AppRegistry.fragment";


/**
 * AppComponentResolver — the engine's lazy-loading hook for application code.
 *
 * The engine ({@link AreComponentResolver}) consults this whenever it renders a
 * tag that is NOT a registered component. We answer the question "which app
 * owns this tag, and where do I fetch its class from?".
 *
 * The crucial idea: **an app is ONE bundle that exports a SET of components.**
 * The first time any of an app's tags is requested we dynamically `import()`
 * the app's single bundle (cached per URL), then pick the right named export
 * for the requested tag. The engine registers that class globally, so the next
 * tag from the same app resolves from the already-evaluated module — one
 * network request per app, however many components it ships.
 *
 * Two entry points:
 *   - {@link resolve} — the lazy path the engine calls on a render miss.
 *   - {@link preload} — the eager path the Launchpad calls on *install*, so
 *     "adding an app loads all its components" up front.
 */
@A_Frame.Define({
    namespace: 'a-are-os-desktop',
    description: 'Resolves unregistered component tags to classes from their owning app bundle (one code-split bundle per app, many components). Plugged into the engine via AreComponentResolver; also exposes preload() to eagerly load every component of an app on install.'
})
export class AppComponentResolver extends AreComponentResolver {

    protected _registry: AppRegistry;

    /** Cache of in-flight / settled bundle imports, keyed by bundle URL. */
    protected _bundles: Map<string, Promise<Record<string, unknown>>> = new Map();

    /** Tags already handed to the engine (registered) — skip re-resolving. */
    protected _resolved: Set<string> = new Set();

    constructor(data: { registry: AppRegistry }) {
        super({ name: 'AppComponentResolver' });
        this._registry = data.registry;
    }

    /**
     * Lazy path: resolve a single tag on a render miss. Returns `undefined` for
     * tags that do not belong to any installed app (they stay plain elements)
     * or that the engine already has registered.
     */
    async resolve(entity: string): Promise<A_TYPES__Ctor<Are> | undefined> {
        if (this._resolved.has(entity)) {
            return undefined;
        }

        const app = this._registry.appByComponentTag(entity);

        if (!app) {
            return undefined;
        }

        const exportName = this.exportNameForTag(app, entity);

        if (!exportName) {
            return undefined;
        }

        const mod = await this.importBundle(app.bundle);
        const Component = mod[exportName];

        if (typeof Component !== 'function') {
            return undefined;
        }

        this._resolved.add(entity);

        return Component as A_TYPES__Ctor<Are>;
    }

    /**
     * Eager path: fetch an app's WHOLE bundle (all its components) on install,
     * so "adding an app loads all its necessary components" up front. Called by
     * the Launchpad. It only *warms* the import cache and returns the classes —
     * it deliberately does NOT mark the tags resolved, so the engine still does
     * the actual global registration lazily on first render (now instant,
     * because the bundle is already in memory). This keeps a single owner of
     * registration (the engine) while making install the moment the code lands.
     */
    async preload(app: AppDescriptor): Promise<A_TYPES__Ctor<Are>[]> {
        const mod = await this.importBundle(app.bundle);
        const classes: A_TYPES__Ctor<Are>[] = [];

        for (const ref of app.components) {
            const Component = mod[ref.export];
            if (typeof Component === 'function') {
                classes.push(Component as A_TYPES__Ctor<Are>);
            }
        }

        return classes;
    }

    protected exportNameForTag(app: AppDescriptor, tag: string): string | undefined {
        return app.components.find(c => c.tag === tag)?.export;
    }

    /**
     * Dynamic import of an app bundle, de-duplicated per URL. Because the shell
     * and every app bundle are code-split against shared framework chunks, the
     * classes returned here `extend` the SAME `Are`/DI runtime the OS shell runs.
     */
    protected importBundle(url: string): Promise<Record<string, unknown>> {
        let pending = this._bundles.get(url);

        if (!pending) {
            pending = import(/* @vite-ignore */ url) as Promise<Record<string, unknown>>;
            this._bundles.set(url, pending);
        }

        return pending;
    }
}
