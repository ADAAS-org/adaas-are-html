import { A_Caller, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreCompilerError, AreScene, AreStore } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AreHTMLNode } from "@adaas/are-html/node";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { A_Frame } from "@adaas/a-frame/core";
import { AreSchedulerHelper } from "@adaas/are-html/helpers/AreScheduler.helper";
import { AreHTMLEngineContext } from "@adaas/are-html/context";


type AreForExpression = {
    key: string;
    index: string | undefined;
    arrayExpr: string;
    /** Optional `track <expr>` clause, e.g. `track row.id` */
    trackExpr: string | undefined;
};

/**
 * Per-`$for` reentrancy state used to serialize chunked (async) renders.
 * Keyed by the directive attribute instance (one per `$for` in the template).
 */
type AreForRenderState = { running: boolean; pending: boolean };


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Built-in $for directive. Iterates over an array expression resolved from the store and renders a cloned template fragment per item, managing per-item subscopes and comment-node anchors. Supports keyed diffing via an optional track clause to minimise DOM mutations on collection updates.'
})
@AreDirective.Priority(1)
export class AreDirectiveFor extends AreDirective {

    /**
     * Lists whose number of NEW item nodes is at or below this threshold render
     * fully synchronously — byte-for-byte the previous behavior. Typical UIs
     * (menus, small tables) are therefore completely unaffected; only genuinely
     * large lists pay the (tiny) scheduling cost to keep the main thread responsive.
     */
    private static readonly SYNC_THRESHOLD = 100;

    /**
     * Per-chunk time budget (ms). During a large-list render we mount item nodes
     * until this much time has elapsed, then yield to the browser so it can paint
     * and process input before the next chunk. ~16ms targets one animation frame.
     */
    private static readonly CHUNK_BUDGET_MS = 16;

    /**
     * Per-attribute serialization state. A new update() that arrives while a
     * chunked render of the SAME `$for` is still in flight does NOT start a second
     * concurrent pass (which could interleave mutations on the shared children
     * list); instead it marks `pending` and the in-flight run re-runs once more
     * with the latest data when it finishes. This guarantees the children list is
     * only ever mutated by one pass at a time and the final state always reflects
     * the most recent store value.
     */
    private static readonly renderState = new WeakMap<object, AreForRenderState>();


    @AreDirective.Transform
    transform(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger: A_Logger,
        ...args: any[]
    ) {

        logger.debug(`[Transform] directive $FOR for <${attribute.owner.aseid.toString()}>`)

        const node = attribute.owner;

        /**
         * Transfer the original node's scope (with all registered attributes and children)
         * to the template clone, and give the owner node a fresh empty scope.
         * This mirrors the $if directive's approach, making the owner a lightweight
         * group container whose sole visible presence is a comment placeholder.
         */
        const forTemplate = node.cloneWithScope();

        /**
         * Remove the $for attribute from the template so iterative clones do not
         * re-trigger this directive during their own transform phase.
         * Re-register it on the owner so the reactive compile/update pipeline keeps working.
         */
        const forAttr = forTemplate.attributes.find(d => d.name === attribute.name);

        if (forAttr) {
            forTemplate.scope.deregister(forAttr);
            node.scope.register(forAttr);
        }

        /**
         * Re-initialize the owner node with its fresh scope so it becomes a valid
         * group container that will own the generated item nodes as children.
         */
        node.init();

        /**
         * Store the template for use in compile and update.
         */
        attribute.template = forTemplate;


        /**
         * Parse the $for expression and evaluate the source array.
         */
        const { key, index, arrayExpr } = this.parseExpression(attribute.content);
        // Item-scoped variables from an enclosing directive (e.g. the `row` of an
        // outer `$for`) so a nested `$for="cell in row.cells"` resolves correctly.
        // Use resolve() (not resolveFlat) so the ENCLOSING item's context — which
        // lives on an ancestor scope, not on this directive's own node — is found.
        const contextScope = attribute.owner.scope.resolve(AreDirectiveContext)?.scope || {};
        const array = this.resolveArray(store, arrayExpr, attribute.content, contextScope);

        attribute.value = array;

        /**
         * For each item in the array, spawn a clone of the template with the
         * item's store values pre-set and its scene activated.
         *
         * The children are added to the owner node before the main compiler's
         * children iteration loop runs, so the main cycle will compile them —
         * no explicit child.compile() call is needed here.
         */
        for (let i = 0; i < array.length; i++) {
            this.spawnItemNode(attribute.template!, attribute.owner, key, index, array[i], i);
        }
    }


    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ): void {
        /**
         * Replace the group node's default host declaration with a comment placeholder
         * so the owner element itself does not render as a DOM element — the item nodes
         * render as its children instead.
         */
        const hostInstruction = scene.host!;
        const commentIdentifier = ` --- for: ${attribute.template!.id} --- `;
        const declaration = new AddCommentInstruction({ content: commentIdentifier });

        scene.setHost(declaration);
        scene.planBefore(declaration, hostInstruction);
        scene.unPlan(hostInstruction);
    }


    @AreDirective.Update
    update(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ): void | Promise<void> {
        /**
         * Serialize chunked renders per `$for`. If a previous large-list render
         * is still streaming item nodes across macrotasks, do NOT start a second
         * concurrent pass — that would interleave two diffs over the same shared
         * children list (and leave half-compiled item nodes that the next diff
         * would wrongly "reuse"). Mark a pass as pending instead; the in-flight
         * run re-diffs once more from the latest store value when it completes.
         */
        let state = AreDirectiveFor.renderState.get(attribute);
        if (!state) {
            state = { running: false, pending: false };
            AreDirectiveFor.renderState.set(attribute, state);
        }
        if (state.running) {
            state.pending = true;
            return;
        }

        return this.performUpdate(attribute, store, scene, state);
    }

    /**
     * Core of the `$for` update: re-diff the source array against the current
     * children, reconcile reused/removed items, then mount the new ones (small
     * lists synchronously, large lists time-sliced). Never called while another
     * pass for the same `$for` is in flight (see `update`).
     */
    private performUpdate(
        attribute: AreDirectiveAttribute,
        store: AreStore,
        scene: AreScene,
        state: AreForRenderState,
    ): void | Promise<void> {
        /**
         * Re-evaluate the source array.
         */
        const { key, index, arrayExpr, trackExpr } = this.parseExpression(attribute.content);
        const owner = attribute.owner;
        // Item-scoped variables from an enclosing directive (see transform()).
        // resolve() walks ancestor scopes to find the enclosing item's context.
        const contextScope = owner.scope.resolve(AreDirectiveContext)?.scope || {};
        const newArray = this.resolveArray(store, arrayExpr, attribute.content, contextScope);

        const currentChildren = [...owner.children] as AreHTMLNode[];

        attribute.value = newArray;

        /**
         * Is this `$for`'s subtree currently rendered into the DOM?
         *
         * A `$for` can update while its subtree is detached — e.g. it lives
         * inside a `$if` whose condition is currently false (the documented
         * `<div $if><x $for></div>` nesting). The directive still receives the
         * store change and re-diffs, but it must NOT mount/unmount item nodes
         * directly while detached: the `$for` anchor (and its ancestors) are
         * not in the DOM, so the interpreter's mount-point walk would fall
         * through to the nearest *mounted* ancestor (the `$if` comment in the
         * grandparent) and HOIST the items out of their intended container.
         * When the ancestor `$if` later activates, its mount cascade applies
         * the already-compiled item instructions in the correct place.
         *
         * Detached === any ancestor scene is inactive (regular nodes default
         * to an active scene; only structural directives deactivate one).
         */
        const attached = this.isAttached(owner);

        const computeKey = this.makeKeyFn(key, index, trackExpr);

        // ── 1. Index existing children by stable key ────────────────────────
        const childByKey = new Map<any, AreHTMLNode>();
        const remaining = new Set<AreHTMLNode>();

        for (let i = 0; i < currentChildren.length; i++) {
            const child = currentChildren[i];
            const ctx = child.scope.resolveFlat(AreDirectiveContext);
            const k = ctx ? computeKey(ctx.scope[key], ctx.scope[index || 'index']) : Symbol('orphan');
            childByKey.set(k, child);
            remaining.add(child);
        }

        // ── 2. Walk desired list; reuse existing or record items to create ──
        // NOTE: new item nodes are NOT spawned here. Spawning (cloneWithScope +
        // subtree init + scene activation) is the dominant cost of a large
        // render, so it is deferred into the time-sliced loop below alongside
        // transform/compile/mount. Existing (keyed) children are reconciled in
        // place synchronously — that is cheap and keeps reused rows stable.
        const toCreate: Array<{ item: any; idx: number; key: any }> = [];

        // Final identity → node map covering BOTH reused and newly created item
        // nodes, plus the desired key order. After all items are mounted these
        // drive the DOM reorder pass (step 5) so the rendered order always
        // matches the source array — making prepend / shuffle / arbitrary
        // reorders move existing rows instead of only appending at the end.
        const finalByKey = new Map<any, AreHTMLNode>();
        const orderedKeys: any[] = new Array(newArray.length);

        for (let i = 0; i < newArray.length; i++) {
            const item = newArray[i];
            const k = computeKey(item, i);
            orderedKeys[i] = k;
            const existing = childByKey.get(k);

            if (existing) {
                remaining.delete(existing);
                finalByKey.set(k, existing);

                let directiveContext = existing.scope.resolveFlat(AreDirectiveContext);
                if (!directiveContext) {
                    directiveContext = new AreDirectiveContext(existing.aseid);
                    existing.scope.register(directiveContext);
                }
                directiveContext.scope = {
                    ...directiveContext.scope,
                    [key]: item,
                    [index || 'index']: i,
                };
            } else {
                toCreate.push({ item, idx: i, key: k });
            }
        }

        // ── 3. Unmount + detach removed children ─────────────────────────────
        for (const child of remaining) {
            // Only revert DOM if the subtree is live; a detached subtree's item
            // nodes were never mounted (see `attached` rationale above), so
            // unmounting them is a no-op at best and risks reverting stale state.
            if (attached) child.unmount();
            owner.removeChild(child);
        }

        // ── 4. Create + mount the new item nodes. ───────────────────────────
        // `spawnItemNode` appends to `owner.children` immediately; new rows are
        // therefore mounted at the end (just before the anchor comment). The
        // reorder pass (step 5) then moves any out-of-position node so the final
        // DOM order matches the source array.
        const createItem = (desc: { item: any; idx: number; key: any }) => {
            const child = this.spawnItemNode(attribute.template!, owner, key, index, desc.item, desc.idx);
            finalByKey.set(desc.key, child);
            child.transform();
            child.compile();
            // While detached, stop after compile: the item's instructions are
            // planned and the ancestor `$if`'s mount cascade will apply them in
            // the correct container once the condition becomes truthy. Mounting
            // here would hoist the item to the nearest mounted ancestor.
            if (attached) child.mount();
        };

        // Small lists → fully synchronous, identical to the previous behavior.
        if (toCreate.length <= AreDirectiveFor.SYNC_THRESHOLD) {
            for (const desc of toCreate) createItem(desc);
            // ── 5. Reorder live DOM to match the source array order ──────────
            if (attached) this.reconcileOrder(owner, orderedKeys, finalByKey);
            return this.finishUpdate(attribute, store, scene, state);
        }

        // Large lists → time-sliced render. Create item nodes until the frame
        // budget elapses, then yield to the browser (zero-delay macrotask) so
        // it can paint and stay responsive instead of blocking for the whole
        // batch. The `state.running` flag (see `update`) prevents any other
        // update() for this `$for` from interleaving while we stream.
        state.running = true;
        let cursor = 0;

        const processChunk = (): void | Promise<void> => {
            try {
                const start = AreSchedulerHelper.now();
                while (cursor < toCreate.length) {
                    createItem(toCreate[cursor]);
                    cursor++;
                    if (AreSchedulerHelper.now() - start >= AreDirectiveFor.CHUNK_BUDGET_MS) break;
                }
            } catch (error) {
                // Never leave the `$for` wedged in the running state on failure,
                // or every future update would be silently deferred forever.
                state.running = false;
                state.pending = false;
                throw error;
            }

            if (cursor < toCreate.length) {
                return new Promise<void>(resolve => {
                    AreSchedulerHelper.scheduleMacrotask(() => resolve(processChunk()));
                });
            }

            // ── 5. Reorder live DOM to match the source array order ──────────
            if (attached) this.reconcileOrder(owner, orderedKeys, finalByKey);
            return this.finishUpdate(attribute, store, scene, state);
        };

        return processChunk();
    }

    /**
     * Repositions the item nodes' DOM elements so the rendered order matches the
     * source array order. The keyed diff (steps 1–4) reuses existing nodes in
     * place and mounts new ones at the end; without this pass a `prepend` or
     * `shuffle` would leave reused rows where they were and pile new rows at the
     * bottom. We walk the desired order RIGHT-TO-LEFT, keeping a `ref` pointer to
     * the element each item must precede (starting at the `$for` anchor comment),
     * and only call `insertBefore` when an element is not already in position —
     * so a plain `append` (already-correct order) performs ZERO DOM moves.
     */
    private reconcileOrder(
        owner: AreHTMLNode,
        orderedKeys: any[],
        finalByKey: Map<any, AreHTMLNode>,
    ): void {
        const context = owner.scope.resolve<AreHTMLEngineContext>(AreHTMLEngineContext);
        if (!context) return;

        const anchor = context.getNodeElement(owner);
        if (!anchor || !anchor.parentNode) return;

        const parent = anchor.parentNode;
        let ref: Node = anchor;

        for (let i = orderedKeys.length - 1; i >= 0; i--) {
            const node = finalByKey.get(orderedKeys[i]);
            if (!node) continue;

            const element = context.getNodeElement(node);
            // Element may be missing if the item is still detached/unmounted.
            if (!element || element.parentNode !== parent) continue;

            // Already immediately before `ref` — no move needed.
            if (element.nextSibling !== ref) {
                parent.insertBefore(element, ref);
            }
            ref = element;
        }
    }


    /**
     * Completes an update pass. If another update() arrived while a chunked
     * render was streaming, run exactly one more pass now from the latest store
     * value so the final DOM always reflects the most recent data.
     */
    private finishUpdate(
        attribute: AreDirectiveAttribute,
        store: AreStore,
        scene: AreScene,
        state: AreForRenderState,
    ): void | Promise<void> {
        state.running = false;
        if (state.pending) {
            state.pending = false;
            return this.performUpdate(attribute, store, scene, state);
        }
    }


    /**
     * Walks the node's ancestor chain (inclusive) and reports whether the
     * whole path is currently active — i.e. the subtree is actually rendered
     * into the DOM. A single inactive ancestor scene (e.g. a `$if` whose
     * condition is false) means the subtree is detached.
     */
    private isAttached(node: AreHTMLNode): boolean {
        let current: AreHTMLNode | undefined = node;
        while (current) {
            if (current.scene?.isInactive) return false;
            current = current.parent as AreHTMLNode | undefined;
        }
        return true;
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── Helpers ──────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Build a key-function that derives a stable identity from each item.
     * If the user provided a `track <expr>` clause, evaluate it as a path on
     * the item; otherwise fall back to the item identity (reference equality).
     */
    private makeKeyFn(key: string, index: string | undefined, trackExpr: string | undefined): (item: any, i: number) => any {
        if (!trackExpr) {
            return (item, i) => item ?? i;
        }

        // Strip any leading `key.` so users can write `track row.id`.
        const path = trackExpr.startsWith(key + '.') ? trackExpr.slice(key.length + 1) : trackExpr;

        return (item, i) => {
            if (item == null) return i;
            if (path === key || path === '$index') return path === '$index' ? i : item;

            // dotted path lookup
            const parts = path.split('.');
            let v: any = item;
            for (const p of parts) {
                if (v == null) return i;
                v = v[p];
            }
            return v ?? i;
        };
    }

    /**
     * Parses the $for expression string into its constituent parts.
     *
     * Supported formats:
     *   item in items
     *   item, index in items
     *   (item, index) in items
     *   item in filter(items)
     *   item, index in filter(items, 'active')
     *   item in items track item.id
     *   (item, i) in items track item.id
     */
    private parseExpression(content: string): AreForExpression {
        // Strip optional `track <expr>` suffix first.
        let trackExpr: string | undefined;
        const trackIdx = content.search(/\s+track\s+/);
        let body = content;
        if (trackIdx !== -1) {
            const m = content.slice(trackIdx).match(/\s+track\s+(.+)$/);
            if (m) {
                trackExpr = m[1].trim();
                body = content.slice(0, trackIdx).trim();
            }
        }

        const inIndex = body.lastIndexOf(' in ');
        const keyAndIndex = body.slice(0, inIndex).trim().replace(/^\(|\)$/g, '');
        const arrayExpr = body.slice(inIndex + 4).trim();
        const keyParts = keyAndIndex.split(',').map(p => p.trim());

        return {
            key: keyParts[0],
            index: keyParts[1] || undefined,
            arrayExpr,
            trackExpr,
        };
    }

    /**
     * Resolves the array expression against the store.
     * Supports both plain key lookups and function-call expressions:
     *   items          → store.get('items')
     *   filter(items)  → store.get('filter')(store.get('items'))
     *
     * `contextScope` carries item-scoped variables introduced by an enclosing
     * directive (e.g. the `row` of an outer `$for`). It is consulted BEFORE the
     * store so a nested `$for="cell in row.cells"` resolves `row` from the
     * parent iteration instead of looking for a (non-existent) top-level store
     * key. Leading identifiers not present in the context fall back to the store.
     */
    private resolveArray(
        store: AreStore,
        arrayExpr: string,
        fullContent: string,
        contextScope: Record<string, any> = {},
    ): any[] {
        // Resolve a leading identifier from the directive context first, then
        // the store — mirrors how bindings/interpolations evaluate scoped vars.
        const getRoot = (rawKey: string): any => {
            const k = rawKey.replace(/\?$/, '');
            return (k in contextScope) ? contextScope[k] : store.get(k as any);
        };

        let result: any;
        const callMatch = arrayExpr.match(/^([^(]+)\((.+)\)$/);

        if (callMatch) {
            const fnName = callMatch[1].trim();
            const fn = getRoot(fnName);

            if (typeof fn !== 'function')
                throw new AreCompilerError({
                    title: 'Invalid "for" Directive Function',
                    description: `The expression "${fnName}" in the "for" directive does not resolve to a function in the store. Received: ${typeof fn}`,
                });

            const rawArgs = callMatch[2].split(',').map(a => a.trim());
            const resolvedArgs = rawArgs.map(arg => {
                if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
                if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
                if (!isNaN(Number(arg))) return Number(arg);
                // Dotted-path / optional-chain: e.g. `record?.embedding` or `record.data`
                const stripped = arg.replace(/\?$/, '');
                if (stripped.includes('.')) {
                    const parts = stripped.split('.').map(p => p.replace(/\?$/, ''));
                    let val: any = getRoot(parts[0]);
                    for (let j = 1; j < parts.length; j++) {
                        if (val == null) return undefined;
                        val = val[parts[j]];
                    }
                    return val ?? undefined;
                }
                return getRoot(stripped);
            });

            result = (fn as Function)(...resolvedArgs);
        } else if (arrayExpr.includes('.')) {
            // dotted-path lookup: e.g. "list.items" or "record?.keywords"
            // Strip optional-chaining `?` suffix from each segment so that
            // `record?.keywords` resolves the same as `record.keywords`.
            const parts = arrayExpr.split('.').map(p => p.replace(/\?$/, ''));
            result = getRoot(parts[0]);
            for (let i = 1; i < parts.length; i++) {
                if (result == null) break;
                result = result[parts[i]];
            }
        } else {
            result = getRoot(arrayExpr);
        }

        // null / undefined from optional-chaining expressions (e.g. `record?.keywords`)
        // means the source object is not yet loaded — treat as empty array so the
        // directive initialises gracefully and fills in when the store updates.
        if (result == null) return [];

        if (!Array.isArray(result))
            throw new AreCompilerError({
                title: 'Invalid "for" Directive Value',
                description: `The "for" directive expects an array but got ${typeof result}. Expression: "${fullContent}". Received: ${JSON.stringify(result)}`,
            });

        return result;
    }

    /**
     * Creates a single item node from the template, registers it as a child of
     * the owner, initialises it, injects item-scoped store values, and activates
     * its scene so the mount/compile cycle will include it.
     *
     * NOTE: This method does NOT call compile() or mount() — the caller is
     * responsible for doing so when the main lifecycle cycle won't cover it
     * (i.e. during update, but not during the initial compile phase).
     */
    private spawnItemNode(
        template: AreHTMLNode,
        owner: AreHTMLNode,
        key: string,
        index: string | undefined,
        item: any,
        i: number,
    ): AreHTMLNode {
        const itemNode = template.clone() as AreHTMLNode;

        owner.addChild(itemNode);

        const queue = [itemNode];

        while (queue.length > 0) {
            const current = queue.shift()!

            current.init();

            queue.push(...current.children as AreHTMLNode[]);
        }

        /**
         * Resolve or create a directive context for the item node. This is needed to hold the item-specific store values (e.g. the "item" and "index" in a "for" loop) that the template's bindings will reference during compile and update. The context is shared among all clones of the same template, but that's fine because each clone gets its own scope values assigned here.
         */
        let directiveContext = itemNode.scope.resolveFlat(AreDirectiveContext);

        if (!directiveContext) {
            directiveContext = new AreDirectiveContext(itemNode.aseid);
            itemNode.scope.register(directiveContext);
        }

        directiveContext.scope = {
            ...directiveContext.scope,
            [key]: item,
            [index || 'index']: i,
        }

        itemNode.scene.activate();

        return itemNode;
    }
}