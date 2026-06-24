import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreNode, AreSignalsContext } from "@adaas/are";
import { ComponentManifest } from "../runtime/ComponentManifest.fragment";


/**
 * LazyOutlet — the route-driven slot.
 *
 * Thanks to the engine primitives this is now tiny: it only decides WHICH tag
 * to show for the current route and asks the node to (re)render. It does NOT
 * fetch, import or register anything — when the engine hits an unregistered
 * lazy tag during render it consults the app's `LazyComponentResolver`
 * (an `AreComponentResolver`), which imports the bundle; the engine then
 * registers the class globally. Teardown + build are the engine's `clear()` /
 * `render()` primitives, so there is no copy-pasted lifecycle loop and no
 * destroy-ordering hazard here anymore.
 *
 * [!] Production apps should prefer `<are-root>` for routing: it adds
 * signal-aware teardown (unsubscribe + LRU cache of detached subtrees) on top
 * of the same primitives. This outlet reproduces just the unsubscribe step so
 * the swapped-out subtree stops receiving route signals (otherwise a detached
 * subtree keeps reacting to the bus and throws on its torn-down scope).
 */
export class LazyOutlet extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(ComponentManifest) manifest: ComponentManifest,
    ) {
        // INITIAL render (supports deep links, e.g. a hard refresh on /about).
        // Only set the content tag — the engine's load pipeline builds this
        // outlet's children right after template() returns and will resolve the
        // (possibly lazy) component via the registered AreComponentResolver.
        const route = document.location.pathname || '/';
        const entry = manifest.match(route) ?? manifest.match('/');

        if (entry) {
            node.setContent(`<${entry.tag}></${entry.tag}>`);
        }
    }

    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(ComponentManifest) manifest: ComponentManifest,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
    ) {
        // RUNTIME route change. NavBar pushState()s before dispatching the route
        // signal, so the live location already reflects the destination.
        const route = document.location.pathname || '/';
        const entry = manifest.match(route) ?? manifest.match('/');

        if (!entry) {
            logger.warning(`LazyOutlet: no component mapped to route "${route}".`);
            return;
        }

        // Already showing the target component — nothing to do.
        if (node.children[0]?.type === entry.tag) {
            return;
        }

        // Unsubscribe the outgoing subtree from the signal bus BEFORE tearing it
        // down. Without this the detached subtree keeps receiving route signals
        // and reacts on a scope that no longer exists. (AreRoot does this too.)
        if (signalsContext) {
            for (const child of [...node.children]) {
                for (const subscriber of this.collectSubscribers(child, signalsContext)) {
                    signalsContext.unsubscribe(subscriber);
                }
            }
        }

        // Full swap via the engine primitives: tear down the old subtree, set
        // the new tag, build + mount. The engine resolves a lazy class through
        // the AreComponentResolver during render() if it isn't registered yet.
        await node.clear();
        node.setContent(`<${entry.tag}></${entry.tag}>`);
        await node.render();
    }

    /**
     * Walk a subtree and collect the nodes currently subscribed to the signal
     * bus, so they can be unsubscribed before the subtree is detached.
     */
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
}
