import { A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";


export type ComponentManifestEntry = {
    /** Route that activates this component. */
    route: string;
    /** Custom-element tag (kebab-case of the class name). */
    tag: string;
    /** Class name (PascalCase). */
    name: string;
    /** Public URL to dynamically import (null when bundled eagerly). */
    url: string | null;
    /** Whether the component must be fetched on demand. */
    lazy: boolean;
};


/**
 * App-level fragment that holds the component manifest fetched from the backend
 * (`GET /api/components`) plus a record of which lazy components have already
 * been loaded + registered into the scope.
 *
 * The browser app receives this from the server at bootstrap, so the *set of
 * available components is backend-driven* — the frontend discovers them at
 * runtime rather than hard-coding a component list.
 */
@A_Frame.Define({
    namespace: 'a-are-html-example',
    description: 'Holds the backend-served component manifest and tracks which lazy components have been dynamically imported and registered.'
})
export class ComponentManifest extends A_Fragment {

    protected _entries: ComponentManifestEntry[] = [];
    protected _loaded: Set<string> = new Set();

    constructor(data: { entries: ComponentManifestEntry[] }) {
        super({ name: 'ComponentManifest' });
        this._entries = data.entries ?? [];
    }

    /** All known components (eager + lazy). */
    list(): ComponentManifestEntry[] {
        return this._entries;
    }

    /** Resolve a route to its component descriptor (exact match). */
    match(route: string): ComponentManifestEntry | undefined {
        return this._entries.find(entry => entry.route === route);
    }

    /** Has the lazy bundle for this tag already been imported + registered? */
    isLoaded(tag: string): boolean {
        return this._loaded.has(tag);
    }

    /** Mark a lazy component as loaded so we never re-import it. */
    markLoaded(tag: string): void {
        this._loaded.add(tag);
    }
}
