import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreSignalsContext } from "@adaas/are";
import { AreHTMLNode } from "src";
import { OSRoute } from "../signals/OSRoute.signal";


/**
 * AppStage — the routed surface of the desktop.
 *
 * This is the OS's custom signal outlet. It maps the current {@link OSRoute} to
 * exactly one of three surfaces and swaps it in via the engine primitives
 * (`clear()` + `render()`):
 *   - `/app/<id>`  → `<app-window>` (the window chrome reads the route to pick
 *                    the app and mounts its lazily-resolved root component).
 *   - `/launchpad` → `<os-launchpad>` (the App Store overlay).
 *   - anything else → nothing (the bare desktop).
 *
 * Switching between two apps keeps the tag (`app-window`) but is a different
 * route, so the stage tears the old window down and builds a fresh one — which
 * is why it keys on the full route, not just the tag. Before tearing a surface
 * down it unsubscribes that subtree from the bus (same discipline AreRoot uses)
 * so a detached app stops reacting to signals.
 */
export class AppStage extends Are {

    protected _renderedKey: string = '';

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        const route = document.location.pathname || '/';
        this._renderedKey = this.surfaceKey(route);
        const tag = this.surfaceTag(route);
        if (tag) {
            node.setContent(`<${tag}></${tag}>`);
        }
    }

    @Are.Signal(OSRoute)
    async onRoute(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(OSRoute) signal: OSRoute,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
    ) {
        const route = signal.path;
        const key = this.surfaceKey(route);

        // Same surface already on screen — nothing to swap.
        if (key === this._renderedKey) {
            return;
        }

        // Unsubscribe the outgoing surface (it may contain app components that
        // subscribed to the bus) before detaching it, so a torn-down app never
        // reacts to a later signal on a scope that no longer exists.
        if (signalsContext) {
            for (const child of [...node.children]) {
                for (const subscriber of this.collectSubscribers(child, signalsContext)) {
                    signalsContext.unsubscribe(subscriber);
                }
            }
        }

        await node.clear();

        const tag = this.surfaceTag(route);
        if (tag) {
            node.setContent(`<${tag}></${tag}>`);
        }

        this._renderedKey = key;
        await node.render();
    }

    /** A stable key per visible surface (distinct apps must differ). */
    protected surfaceKey(route: string): string {
        if (route.startsWith('/app/')) return route;
        if (route === '/launchpad') return '/launchpad';
        return '/desktop';
    }

    /** The component tag to mount for a route ('' = empty desktop). */
    protected surfaceTag(route: string): string {
        if (route.startsWith('/app/')) return 'app-window';
        if (route === '/launchpad') return 'os-launchpad';
        return '';
    }

    protected collectSubscribers(
        node: AreNode,
        signalsContext: AreSignalsContext,
    ): AreNode[] {
        const result: AreNode[] = [];
        const queue: AreNode[] = [node];

        while (queue.length > 0) {
            const current = queue.shift()!;
            if (signalsContext.subscribers.has(current)) {
                result.push(current);
            }
            queue.push(...current.children);
        }

        return result;
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            app-stage { display: contents; }
        `);
    }
}
