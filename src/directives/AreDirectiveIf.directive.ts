import { A_Caller, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import {  AreScene, AreStore, AreSyntax } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";



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

        console.log('Compiling directive "if" with attribute content:', attribute);

        /**
         * 1. Extract the value from the store based on the attribute content 
         *    (which is the path to the value in the store)
         */
        attribute.value = syntax.evaluate(attribute.content, store, {
            ...(directiveContext?.scope || {}),
        });

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
        ...args: any[]
    ): void {
        /**
         * 1. Extract the value from the store based on the attribute content 
         *    (which is the path to the value in the store)
         */
        attribute.value = syntax.evaluate(attribute.content, store);

        if (attribute.value) {
            attribute.template!.scene.activate();

            attribute.template!.mount()
        }
        else {
            attribute.template!.unmount();

            attribute.template!.scene.deactivate();
        }
    }

}