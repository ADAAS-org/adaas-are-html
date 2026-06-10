import { A_Caller, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreCompilerError, AreScene, AreStore } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AreHTMLNode } from "@adaas/are-html/node";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { A_Frame } from "@adaas/a-frame/core";


type AreForExpression = {
    key: string;
    index: string | undefined;
    arrayExpr: string;
    /** Optional `track <expr>` clause, e.g. `track row.id` */
    trackExpr: string | undefined;
};


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Built-in $for directive. Iterates over an array expression resolved from the store and renders a cloned template fragment per item, managing per-item subscopes and comment-node anchors. Supports keyed diffing via an optional track clause to minimise DOM mutations on collection updates.'
})
@AreDirective.Priority(1)
export class AreDirectiveFor extends AreDirective {


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
        const array = this.resolveArray(store, arrayExpr, attribute.content);

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
    ): void {
        /**
         * Re-evaluate the source array.
         */
        const { key, index, arrayExpr, trackExpr } = this.parseExpression(attribute.content);
        const newArray = this.resolveArray(store, arrayExpr, attribute.content);

        const owner = attribute.owner;
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

        // ── 2. Walk desired list; reuse existing or spawn new ───────────────
        const desired: AreHTMLNode[] = [];
        const newOnes: AreHTMLNode[] = [];

        for (let i = 0; i < newArray.length; i++) {
            const item = newArray[i];
            const k = computeKey(item, i);
            const existing = childByKey.get(k);

            if (existing) {
                remaining.delete(existing);

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
                desired.push(existing);
            } else {
                const itemNode = this.spawnItemNode(attribute.template!, owner, key, index, item, i);
                desired.push(itemNode);
                newOnes.push(itemNode);
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

        // ── 4. Mount only the new ones (kept children stay where they are). ─
        for (const child of newOnes) {
            child.transform();
            child.compile();
            // While detached, stop after compile: the item's instructions are
            // planned and the ancestor `$if`'s mount cascade will apply them in
            // the correct container once the condition becomes truthy. Mounting
            // here would hoist the item to the nearest mounted ancestor.
            if (attached) child.mount();
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
     */
    private resolveArray(store: AreStore, arrayExpr: string, fullContent: string): any[] {
        let result: any;
        const callMatch = arrayExpr.match(/^([^(]+)\((.+)\)$/);

        if (callMatch) {
            const fnName = callMatch[1].trim();
            const fn = store.get(fnName as any);

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
                    let val: any = store.get(parts[0] as any);
                    for (let j = 1; j < parts.length; j++) {
                        if (val == null) return undefined;
                        val = val[parts[j]];
                    }
                    return val ?? undefined;
                }
                return store.get(stripped as any);
            });

            result = (fn as Function)(...resolvedArgs);
        } else if (arrayExpr.includes('.')) {
            // dotted-path lookup: e.g. "list.items" or "record?.keywords"
            // Strip optional-chaining `?` suffix from each segment so that
            // `record?.keywords` resolves the same as `record.keywords`.
            const parts = arrayExpr.split('.').map(p => p.replace(/\?$/, ''));
            result = store.get(parts[0] as any);
            for (let i = 1; i < parts.length; i++) {
                if (result == null) break;
                result = result[parts[i]];
            }
        } else {
            result = store.get(arrayExpr.replace(/\?$/, '') as any);
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