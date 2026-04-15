import { A_Caller, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { AreLifecycle, AreScene, AreAttributeFeatures, AreSignalsContext } from "@adaas/are";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreComponentNode } from "@adaas/are-html/nodes/AreComponent";
import { AreRootNode } from "@adaas/are-html/nodes/AreRoot";
import { AreInterpolation } from "@adaas/are-html/nodes/AreInterpolation";
import { AreText } from "@adaas/are-html/nodes/AreText";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreDirectiveFeatures } from "@adaas/are-html/directive/AreDirective.constants";
import { AreHTMLEngineContext } from "./AreHTML.context";
import { AreHTMLNode } from "../lib/AreHTMLNode/AreHTMLNode";


export class AreHTMLLifecycle extends AreLifecycle {

    @AreLifecycle.Init(AreComponentNode)
    initComponent(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        super.init(node, scope, context, logger, ...args);
    }


    @AreLifecycle.Init(AreRootNode)
    initRoot(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        signalsContext?.subscribe(node);
        super.init(node, scope, context, logger, ...args);
    }


    @AreLifecycle.Init(AreText)
    initText(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        const scene = new AreScene(node.aseid);

        scope.register(scene);
    }


    @AreLifecycle.Init(AreInterpolation)
    initInterpolation(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        const scene = new AreScene(node.aseid);

        scope.register(scene);
    }




    @A_Feature.Extend({
        name: AreAttributeFeatures.Update,
        scope: [AreDirectiveAttribute],
    })
    updateDirectiveAttribute(
        @A_Inject(A_Caller) directive: AreDirectiveAttribute,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        /**
         * 3. If the attribute is a directive, then we should find a component that is responsible for
         *    the directive compiling logic, and call it. 
         *    In case component is not found we just want to log a warning, 
         *    since the directive may be handled by some parent component or simply is a mistake in the template.
         */
        if (directive.component) {
            feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
        } else {
            logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
        }
    }

}