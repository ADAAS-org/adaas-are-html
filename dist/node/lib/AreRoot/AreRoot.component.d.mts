import { A_TYPES__Ctor } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalState, A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are, AreNode, AreSignalsContext } from '@adaas/are';
import { AreRootCache, AreRootCacheEntry } from './AreRootCache.context.mjs';

declare class AreRoot extends Are {
    template(root: AreNode, logger: A_Logger, signalsContext?: AreSignalsContext, signalState?: A_SignalState): Promise<void>;
    onSignal(root: AreNode, vector: A_SignalVector, logger: A_Logger, signalsContext?: AreSignalsContext, cache?: AreRootCache): Promise<void>;
    /**
     * Resolves the component a vector should render for the given root, mirroring
     * the priority used everywhere in the routing system:
     *   1. Root-specific conditions registered on AreSignalsContext.
     *   2. The global AreSignalsMeta map, restricted to this outlet's pool.
     *
     * Passing the pool *into* the meta lookup is critical: without it, the first
     * globally matching component wins and may belong to a different outlet
     * (e.g. AisRequirementsPanel for the meta-outlet matching
     * AisEditorCursorScope) — the pool check would then reject it and the outlet
     * would fall back to its default, hiding a valid in-pool match (e.g.
     * AisDiagramTab matching AisSetPrimaryDisplay).
     *
     * Returns `undefined` when nothing matches — callers decide whether to use a
     * configured default, body content, or clear the outlet.
     */
    protected matchComponent(rootId: string, vector: A_SignalVector | undefined, signalsContext?: AreSignalsContext): A_TYPES__Ctor<Are> | undefined;
    /**
     * Builds the vector used for the INITIAL render. It is seeded from the
     * accumulated signal state (every signal dispatched on the bus so far) so a
     * freshly-mounted outlet reflects the live application state immediately,
     * not just on the next signal tick. The current URL route is appended when
     * no AreRoute is already present in the state, so route-driven outlets still
     * resolve on the very first paint (before AreRouteWatcher has dispatched).
     */
    protected buildInitialVector(signalState?: A_SignalState): A_SignalVector;
    /**
     * Detach a displayed child subtree from the outlet and stash it in the cache
     * for fast re-injection later. The subtree is unmounted (its scene plan is
     * preserved) and deregistered from the root scope, but NOT destroyed. The
     * nodes that were subscribed to the signal bus are unsubscribed while cached
     * so the detached DOM never reacts to signals, and recorded so they can be
     * re-subscribed verbatim on restore.
     *
     * When no cache is available, or the LRU evicts an entry, the affected
     * subtree is fully destroyed.
     */
    protected stashChild(root: AreNode, child: AreNode, signalsContext: AreSignalsContext | undefined, cache: AreRootCache | undefined): void;
    /**
     * Re-attach a cached subtree to the outlet and re-mount it from its preserved
     * scene plan, re-subscribing exactly the nodes that were subscribed before it
     * was cached.
     */
    protected restoreChild(root: AreNode, entry: AreRootCacheEntry, signalsContext: AreSignalsContext | undefined): void;
    /**
     * Walk a subtree and collect the nodes currently registered as signal
     * subscribers. Mirrors the subscription performed at init time in
     * AreHTMLLifecycle (component nodes and root nodes) without depending on the
     * concrete node classes — it simply intersects the subtree with the live
     * subscriber registry.
     */
    protected collectSubscribers(node: AreNode, signalsContext: AreSignalsContext): AreNode[];
}

export { AreRoot };
