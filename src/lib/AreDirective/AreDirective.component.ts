import { A_Caller, A_Component, A_Context, A_Feature, A_Inject, A_Meta, A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import type { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreDirectiveMeta } from "./AreDirective.meta";
import { AreDirectiveFeatures } from "./AreDirective.constants";


@A_Meta.Define(AreDirectiveMeta)
export class AreDirective extends A_Component  {

    //==================================================================================
    //======================== LIFECYCLE DECORATORS ====================================
    //==================================================================================
    /**
     * Allows to define a compilation order for directives, which is necessary when we have multiple directives on the same node and we want to control the order of their compilation and application. The directive with the highest priority will be compiled and applied first, and the directive with the lowest priority will be compiled and applied last. This is important because some directives may depend on the output of other directives, so we need to ensure that they are compiled and applied in the correct order to avoid errors and ensure the expected behavior.
     * 
     * @param priority 
     * @returns 
     */
    static Priority(priority: number) {
        return function <TTarget extends A_TYPES__Ctor<AreDirective>>(
            target: TTarget
        ): TTarget {
            // Store meta info on the target class itself for the Meta decorator to pick up
            const meta = A_Context.meta<AreDirectiveMeta>(target);

            meta.priority = priority;

            return target;
        };
    }

    /**
     * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     */
    static get Transform() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreDirectiveFeatures.Transform,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    /**
     * Allows to define a custom method for compiling a directive attribute into a set of SceneInstructions. 
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Compile() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreDirectiveFeatures.Compile,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    /**
     * Allows to define a custom method for updating a directive attribute based on changes in the store or other dependencies.
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Update() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreDirectiveFeatures.Update,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    /**
     * Default transform method for directives, which can be overridden by specific directive implementations. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     * 
     * @param attribute - The directive attribute to transform, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the transformation process.
     */
    transform(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        ...args: any[]
    ) {
        const logger = A_Context.scope(this).resolve(A_Logger) as A_Logger | undefined
        if (logger) {
            logger.warning(`No transforming logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
        }
    }
    /**
     * Default compile method for directives, which can be overridden by specific directive implementations.
     * 
     * @param attribute - The directive attribute to compile, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the compilation process.
     */
    @A_Feature.Extend({
        name: AreDirectiveFeatures.Compile,
        scope: [AreDirective],
    })
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        ...args: any[]
    ) {
        const logger = A_Context.scope(this).resolve(A_Logger) as A_Logger | undefined
        if (logger) {
            logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
        }
    }
    /**
     * Default update method for directives, which can be overridden by specific directive implementations. This method is called when there are changes in the store or other dependencies that may affect the directive's behavior or appearance. The method should contain logic to update the directive accordingly, such as re-evaluating its value, modifying the DOM, or triggering re-rendering of the affected nodes.
     * 
     * @param attribute - The directive attribute to update, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the update process.
     */
    @A_Feature.Extend({
        name: AreDirectiveFeatures.Update,
        scope: [AreDirective],
    })
    update(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        ...args: any[]
    ) {
        const logger = A_Context.scope(this).resolve(A_Logger) as A_Logger | undefined
        if (logger) {
            logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
        }
    }
}