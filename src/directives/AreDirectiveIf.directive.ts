import { A_Caller, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import {  AreScene, AreStore, AreSyntax } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { A_Frame } from "@adaas/a-frame/core";
import { AreHTMLNode } from "@adaas/are-html/node";
import { AreHTMLEngineContext } from "@adaas/are-html/context";



/**
 * `$if` directive — conditionally renders a node based on an expression.
 *
 * ⚠️ Known limitation: do NOT use `$if` and `$for` on the SAME element.
 *    Doing so produces duplicated DOM on toggle because the two directives
 *    share an owner node and clone its scope independently. Wrap one in a
 *    parent element instead, e.g.:
 *
 *        <div $if="visible">
 *            <li $for="item in items">{{item.name}}</li>
 *        </div>
 *
 *    or
 *
 *        <ul $for="item in items">
 *            <li $if="item.visible">{{item.name}}</li>
 *        </ul>
 */
@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Built-in $if directive. Conditionally renders a subtree based on a store expression. Replaces the target element with a stable comment anchor when the condition is false and restores the fully rendered subtree when it becomes true, preventing any leaking of the host element between states.'
})
@AreDirective.Priority(2)
export class AreDirectiveIf extends AreDirective {


    @AreDirective.Transform
    transform(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger: A_Logger,
        ...args: any[]
    ) {
        logger.debug(`[Transform] directive $IF for <${attribute.owner.aseid.toString()}>`)

        const node = attribute.owner;

        /**
         * We have to keep this node as a group node, and copy all data into the child node that would be actual node. 
         */
        const ifTemplate = node.cloneWithScope();

        const ifAttr = ifTemplate.attributes.find(d => d.name === attribute.name);

        if (ifAttr) {
            ifTemplate.scope.deregister(ifAttr);
            node.scope.register(ifAttr);
        }

        node.init();

        node.addChild(ifTemplate);

        /**
         * Resolve or create a directive context for the item node. This is needed to hold the item-specific store values (e.g. the "item" and "index" in a "for" loop) that the template's bindings will reference during compile and update. The context is shared among all clones of the same template, but that's fine because each clone gets its own scope values assigned here.
         */
        // let directiveContext = ifTemplate.scope.resolveFlat(AreDirectiveContext);

        // if (!directiveContext) {
        //     directiveContext = new AreDirectiveContext(ifTemplate.aseid);
        //     ifTemplate.scope.register(directiveContext);
        // }

        ifTemplate.scene.deactivate();

        attribute.template = ifTemplate;

    }


    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,
        ...args: any[]
    ): void {
        /**
         * 1. Extract the value from the store based on the attribute content
         *    (which is the path to the value in the store)
         */
        attribute.value = this.evaluateCondition(syntax, attribute, store, directiveContext);

        /**
         * 2. If the value is falsy, remove the node from the scene by planning a RemoveElement instruction.
         *    If the value is truthy, ensure the node is in the scene by planning an AddElement instruction if it's not already planned.
         */
        const hostInstruction = scene.host!;
        const commentIdentifier = ` --- if: ${attribute.template!.id} --- `;
        const declaration = new AddCommentInstruction({ content: commentIdentifier })

        scene.setHost(declaration);
        scene.planBefore(declaration, hostInstruction);
        scene.unPlan(hostInstruction);

        if (attribute.value)
            attribute.template!.scene.activate();
        else
            attribute.template!.scene.deactivate();
    }



    @AreDirective.Update
    update(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,
        ...args: any[]
    ): void {
        /**
         * 1. Extract the value from the store based on the attribute content
         *    (which is the path to the value in the store)
         */
        const previous = !!attribute.value;
        const next = this.evaluateCondition(syntax, attribute, store, directiveContext);
        attribute.value = next;

        // Skip when truthiness has not changed — avoids redundant mount/unmount.
        if (previous === next) return;

        // Mount / unmount only while this `$if` is rendered. A nested `$if` can change while it sits in a subtree that is
        // not on the page (an outer `$if` is false, or its component is being torn down): then only the scene's state
        // changes, and the outer mount renders the template as the scene says. Mounting there would have no mount point.
        const owner = attribute.owner as AreHTMLNode;
        const live = this.isLive(owner);
        if (next) {
            attribute.template!.scene.activate();
            if (live) attribute.template!.mount();
        } else {
            if (live) attribute.template!.unmount();
            attribute.template!.scene.deactivate();
        }
    }

    /** Whether this `$if` is on the page: its anchor is rendered and no ancestor's scene is inactive. */
    private isLive(owner: AreHTMLNode): boolean {
        const context = owner.scope.resolve<AreHTMLEngineContext>(AreHTMLEngineContext);
        if (!context || !context.getNodeElement(owner)) return false;
        let current: AreHTMLNode | undefined = owner;
        while (current) {
            if (current.scene?.isInactive) return false;
            current = current.parent as AreHTMLNode | undefined;
        }
        return true;
    }

    /**
     * Evaluates the `$if` condition defensively.
     *
     * A condition can reference data that is momentarily unavailable — most
     * commonly a nested `$if` (e.g. `$if="selected.fields.length"`) living
     * inside a parent `$if="selected"` whose object has just become `null`.
     * Because the nested directive is still subscribed to the store, its
     * update fires on that same change and the raw expression would throw
     * `Cannot read properties of null`, crashing the whole update pipeline.
     *
     * Treating an evaluation error as `false` is the correct contract for a
     * conditional: if the condition cannot be resolved, the subtree simply
     * stays hidden until the referenced data is present again (at which point
     * the parent `$if` re-activates and re-evaluates this one).
     */
    private evaluateCondition(
        syntax: AreSyntax,
        attribute: AreDirectiveAttribute,
        store: AreStore,
        directiveContext?: AreDirectiveContext,
    ): boolean {
        try {
            return !!syntax.evaluate(attribute.content, store, {
                ...(directiveContext?.scope || {}),
            });
        } catch {
            return false;
        }
    }

}