import { A_Caller, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreAttributeFeatures, AreTransformer, AreStore } from "@adaas/are";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreDirectiveFeatures } from "@adaas/are-html/directive/AreDirective.constants";


export class AreHTMLTransformer extends AreTransformer {

    @A_Feature.Extend({
        name: AreAttributeFeatures.Transform,
        scope: [AreDirectiveAttribute],
    })
    transformDirectiveAttribute(
        @A_Inject(A_Caller) directive: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        store.watch(directive);

        /**
         * 3. If the attribute is a directive, then we should find a component that is responsible for
         *    the directive compiling logic, and call it. 
         *    In case component is not found we just want to log a warning, 
         *    since the directive may be handled by some parent component or simply is a mistake in the template.
         */
        if (directive.component) {
            feature.chain(directive.component, AreDirectiveFeatures.Transform, directive.owner.scope);
        } else {
            logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
        }

        store.unwatch(directive);
    }
}