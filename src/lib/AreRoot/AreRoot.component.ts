import { A_Caller, A_Context, A_FormatterHelper, A_Inject, A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Signal, A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, AreNode, AreSignals, AreSignalsMeta, AreSignalsContext } from "@adaas/are";
import { AreRoute } from "@adaas/are-html/signals/AreRoute.signal";
import { AreRootCache, AreRootCacheEntry } from "./AreRootCache.context";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions.'
})
export class AreRoot extends Are {

    @Are.Template
    async template(
        @A_Inject(A_Caller) root: AreNode,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        @A_Inject(A_SignalState) signalState?: A_SignalState,
    ) {

        const rootId = root.id;

        // No routing config for this root — but still honour body content or
        // a 'default' attribute if one is present on the markup.
        if (signalsContext && !signalsContext.hasRoot(rootId)) {
            if (!root.content?.trim()) {
                // Fallback: legacy default= attribute
                const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
                const defaultComponent = defaultMatch?.[1];
                if (defaultComponent) {
                    root.setContent(`<${defaultComponent}></${defaultComponent}>`);
                }
            }
            // Body content (or none) — tokenizer picks it up without intervention
            return;
        }

        // Select from the ACCUMULATED signal state (every signal dispatched so
        // far), not just the current URL route. Outlets keyed on domain signals
        // (e.g. a primary-display selector) must reflect the live vector the
        // moment they mount — even when they mount AFTER the routing signal was
        // dispatched (a nested outlet inside a just-rendered parent). Using the
        // same vector + lookup as onSignal keeps initial render and subsequent
        // updates consistent.
        const initialVector = this.buildInitialVector(signalState);
        const renderTarget = this.matchComponent(rootId, initialVector, signalsContext);

        let componentName: string | undefined = renderTarget?.name
            ? A_FormatterHelper.toKebabCase(renderTarget.name)
            : undefined;

        // 3. Fall back to body content (the nodes already placed inside the
        //    <are-root> tag act as the default).  No setContent() call needed —
        //    the tokenizer will process root.content as-is.
        if (!componentName) {
            if (root.content?.trim()) {
                return;
            }
        }
        // 3.5. Fall back to AreSignalsContext default component for this root.
        if (!componentName) {
            const defaultComp = signalsContext?.getDefault(rootId);
            if (defaultComp?.name) {
                componentName = A_FormatterHelper.toKebabCase(defaultComp.name);
            }
        }
        // 4. Last resort: legacy default= attribute on the markup.
        if (!componentName) {
            const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
            componentName = defaultMatch?.[1];
        }

        if (!componentName) {
            logger.warning('AreRoot: No component found for initial render. Provide body content, a route condition, or a "default" attribute.');
            return;
        }

        root.setContent(`<${componentName}></${componentName}>`);
    }


    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) root: AreNode,
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        @A_Inject(AreRootCache) cache?: AreRootCache,
    ) {
        const rootId = root.id;

        // No routing config for this root — signals do not affect its content
        if (signalsContext && !signalsContext.hasRoot(rootId)) {
            return;
        }

        // Resolve the target component for the incoming vector using the SAME
        // lookup the initial template render uses (root-id conditions first,
        // then the global pool-filtered meta map).
        const renderTarget = this.matchComponent(rootId, vector, signalsContext);

        const def = signalsContext?.getDefault(rootId);
        const componentName = renderTarget?.name
            ? A_FormatterHelper.toKebabCase(renderTarget.name)
            : def?.name
                ? A_FormatterHelper.toKebabCase(def.name)
                : undefined;

        // No matching condition for this signal vector and no default — clear the outlet.
        if (!componentName) {
            for (const child of [...root.children]) {
                this.stashChild(root, child, signalsContext, cache);
            }
            root.setContent('');
            return;
        }

        // Guard: if the outlet already shows the same component, do nothing.
        // Prevents infinite remount loops when a non-routing signal carries a
        // stale routing signal in the accumulated A_SignalState vector.
        // node.type is the kebab-case tag name — the most direct and reliable
        // identifier (no constructor-name resolution, no proxy wrapping issues).
        const currentChild = root.children[0] as AreNode | undefined;
        if (currentChild?.type === componentName) {
            return;
        }

        // Stash the currently displayed children so routing back to them can be
        // re-injected instantly from the cache (they are unmounted + detached but
        // NOT destroyed). Falls back to full teardown when no cache is available.
        for (const child of [...root.children]) {
            this.stashChild(root, child, signalsContext, cache);
        }

        root.setContent(`<${componentName}></${componentName}>`);

        // Fast path: a previously rendered subtree for this component is cached —
        // re-attach it and re-mount from the preserved scene plan, skipping the
        // expensive tokenize/init/load/transform/compile pipeline.
        const cached = cache?.take(root.id, componentName);
        if (cached) {
            this.restoreChild(root, cached, signalsContext);
            return;
        }

        // Slow path: build the component subtree from scratch.
        root.tokenize();

        for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
            child.init();

            const res = child.load();
            if (res instanceof Promise) {
                await res;
            }
            child.transform();

            child.compile();
            // The HTML engine time-slices large initial mounts; await so a heavy
            // routed component renders in yielding chunks instead of freezing the
            // main thread on first entry. Small subtrees resolve synchronously.
            await child.mount();
        }
    }

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
    protected matchComponent(
        rootId: string,
        vector: A_SignalVector | undefined,
        signalsContext?: AreSignalsContext,
    ): A_TYPES__Ctor<Are> | undefined {
        if (!vector) return undefined;

        // 1. Root-specific conditions.
        let renderTarget = signalsContext?.findComponentByVector(rootId, vector);

        // 2. Global pool-filtered meta map.
        if (!renderTarget) {
            const signalsMeta = A_Context.meta<AreSignalsMeta>(AreSignals);
            const pool = signalsContext?.getComponentById(rootId);
            const metaTarget = signalsMeta?.findComponentByVector(
                vector,
                pool?.length ? pool : undefined,
                rootId,
            );
            if (metaTarget && (!pool?.length || pool.includes(metaTarget))) {
                renderTarget = metaTarget;
            }
        }

        return renderTarget as A_TYPES__Ctor<Are> | undefined;
    }

    /**
     * Builds the vector used for the INITIAL render. It is seeded from the
     * accumulated signal state (every signal dispatched on the bus so far) so a
     * freshly-mounted outlet reflects the live application state immediately,
     * not just on the next signal tick. The current URL route is appended when
     * no AreRoute is already present in the state, so route-driven outlets still
     * resolve on the very first paint (before AreRouteWatcher has dispatched).
     */
    protected buildInitialVector(signalState?: A_SignalState): A_SignalVector {
        const signals: A_Signal[] = [];

        if (signalState) {
            for (const signal of signalState.toVector()) {
                if (signal) signals.push(signal);
            }
        }

        if (!signals.some(signal => signal instanceof AreRoute)) {
            try {
                const currentRoute = AreRoute.default();
                if (currentRoute) signals.push(currentRoute);
            } catch {
                // Non-browser environment (no document) — route is simply absent.
            }
        }

        return new A_SignalVector(signals);
    }

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
    protected stashChild(
        root: AreNode,
        child: AreNode,
        signalsContext: AreSignalsContext | undefined,
        cache: AreRootCache | undefined,
    ): void {
        const tag = child.type;

        child.unmount();

        // Collect exactly the nodes that are currently subscribed within this
        // subtree, then unsubscribe them. Without this, AreSignals keeps
        // delivering vectors to a detached subtree that would update reverted
        // DOM (unmount does not deactivate the scene).
        const subscribers = signalsContext
            ? this.collectSubscribers(child, signalsContext)
            : [];
        for (const node of subscribers) {
            signalsContext?.unsubscribe(node);
        }

        // Deregister from the root scope (the "deregister node from parent").
        root.removeChild(child);

        if (!cache) {
            void child.destroy();
            return;
        }

        const evicted = cache.put(root.id, tag, { node: child, subscribers });
        for (const entry of evicted) {
            // Evicted entries are already unmounted + unsubscribed + detached.
            void entry.node.destroy();
        }
    }

    /**
     * Re-attach a cached subtree to the outlet and re-mount it from its preserved
     * scene plan, re-subscribing exactly the nodes that were subscribed before it
     * was cached.
     */
    protected restoreChild(
        root: AreNode,
        entry: AreRootCacheEntry,
        signalsContext: AreSignalsContext | undefined,
    ): void {
        const child = entry.node;

        root.addChild(child);

        for (const node of entry.subscribers) {
            signalsContext?.subscribe(node);
        }

        child.mount();
    }

    /**
     * Walk a subtree and collect the nodes currently registered as signal
     * subscribers. Mirrors the subscription performed at init time in
     * AreHTMLLifecycle (component nodes and root nodes) without depending on the
     * concrete node classes — it simply intersects the subtree with the live
     * subscriber registry.
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
