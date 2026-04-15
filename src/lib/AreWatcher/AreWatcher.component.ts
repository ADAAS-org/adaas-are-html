import { A_Component } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";

@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreWatcher',
    description: 'AreWatcher is a component that observes browser navigation events (history pushState, replaceState, and popstate) and notifies registered handlers when the URL changes, enabling client-side routing and reactive route-based rendering within the ARE framework.'
})
export class AreWatcher extends A_Component {

    private readonly handlers: Set<(url: URL) => void> = new Set();
    private current: URL = new URL(window.location.href);

    constructor() {
        super();
        this.patchHistory();
        this.attachListeners();
    }

    // ── Public ────────────────────────────────────────────────────────────────

    onChange(handler: (url: URL) => void): () => void {
        this.handlers.add(handler);
        return () => this.handlers.delete(handler);   // returns unsubscribe fn
    }

    get url(): URL {
        return this.current;
    }

    destroy(): void {
        window.removeEventListener('popstate', this.onPopState);
        window.removeEventListener('hashchange', this.onHashChange);
        window.removeEventListener('urlchange', this.onURLChange);
        this.handlers.clear();
    }

    // ── Listeners ─────────────────────────────────────────────────────────────

    private onPopState = (): void => {
        this.notify();
    }

    private onHashChange = (): void => {
        this.notify();
    }

    private onURLChange = (): void => {
        this.notify();
    }

    private attachListeners(): void {
        window.addEventListener('popstate', this.onPopState);
        window.addEventListener('hashchange', this.onHashChange);
        window.addEventListener('urlchange', this.onURLChange);   // custom event from patch
    }

    // ── Patch pushState / replaceState ────────────────────────────────────────

    private patchHistory(): void {
        const patch = (original: typeof history.pushState) =>
            function (this: History, ...args: Parameters<typeof history.pushState>) {
                original.apply(this, args);
                window.dispatchEvent(new Event('urlchange'));
            };

        history.pushState = patch(history.pushState);
        history.replaceState = patch(history.replaceState);
    }

    // ── Notify ────────────────────────────────────────────────────────────────

    private notify(): void {
        const next = new URL(window.location.href);

        if (next.href === this.current.href) return;   // no actual change

        this.current = next;

        for (const handler of this.handlers) {
            handler(this.current);
        }
    }
}