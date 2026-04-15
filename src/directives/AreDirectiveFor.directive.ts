import { A_Caller, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreCompilerError, AreScene, AreStore } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AreHTMLNode } from "@adaas/are-html/node";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";


type AreForExpression = {
    key: string;
    index: string | undefined;
    arrayExpr: string;
};


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

        console.log('Initial array for "for" directive:', scene);

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

        console.log('Template for "for" directive:', forTemplate);
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
        const { key, index, arrayExpr } = this.parseExpression(attribute.content);
        const newArray = this.resolveArray(store, arrayExpr, attribute.content);

        const owner = attribute.owner;
        const currentChildren = [...owner.children] as AreHTMLNode[];

        attribute.value = newArray;

        const newLen = newArray.length;

        /**
         * Build a set of new items for O(1) identity lookup.
         * Uses reference equality — items that exist in newArray are "kept".
         */
        const newItemSet = new Set(newArray);

        /**
         * Partition existing children by identity: nodes whose stored item is
         * still present in the new array are kept; the rest are removed.
         * This correctly handles deletions from any position, not just the tail.
         */
        const keptChildren: AreHTMLNode[] = [];
        const removedChildren: AreHTMLNode[] = [];

        for (const child of currentChildren) {
            const ctx = child.scope.resolveFlat(AreDirectiveContext);

            if (ctx && newItemSet.has(ctx.scope[key])) {
                keptChildren.push(child);
            } else {
                removedChildren.push(child);
            }
        }

        /**
         * Unmount and detach nodes whose items are no longer in the array.
         */
        for (const child of removedChildren) {
            child.unmount();
            owner.removeChild(child);
        }

        /**
         * Update store values on kept nodes so their reactive bindings pick up
         * the latest data and corrected indices without a full re-render.
         */
        for (let i = 0; i < keptChildren.length; i++) {
            let directiveContext = keptChildren[i].scope.resolveFlat(AreDirectiveContext);

            if (!directiveContext) {
                directiveContext = new AreDirectiveContext(keptChildren[i].aseid);
                keptChildren[i].scope.register(directiveContext);
            }

            directiveContext.scope = {
                ...directiveContext.scope,
                [key]: newArray[i],
                [index || 'index']: i,
            };
        }

        /**
         * Append nodes for items added beyond the current kept count.
         * These are created outside the main compile cycle so they need an
         * explicit compile + mount to appear in the DOM.
         */
        for (let i = keptChildren.length; i < newLen; i++) {
            const itemNode = this.spawnItemNode(attribute.template!, owner, key, index, newArray[i], i);

            itemNode.transform();
            itemNode.compile();
            itemNode.mount();
        }
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── Helpers ──────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Parses the $for expression string into its constituent parts.
     *
     * Supported formats:
     *   item in items
     *   item, index in items
     *   (item, index) in items
     *   item in filter(items)
     *   item, index in filter(items, 'active')
     */
    private parseExpression(content: string): AreForExpression {
        const inIndex = content.lastIndexOf(' in ');
        const keyAndIndex = content.slice(0, inIndex).trim().replace(/^\(|\)$/g, '');
        const arrayExpr = content.slice(inIndex + 4).trim();
        const keyParts = keyAndIndex.split(',').map(p => p.trim());

        return {
            key: keyParts[0],
            index: keyParts[1] || undefined,
            arrayExpr,
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
                return store.get(arg as any);
            });

            result = (fn as Function)(...resolvedArgs);
        } else {
            result = store.get(arrayExpr as any);
        }

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