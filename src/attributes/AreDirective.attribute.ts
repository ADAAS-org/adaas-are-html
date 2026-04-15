import {  A_FormatterHelper } from "@adaas/a-concept";
import type { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AreHTMLAttribute } from "@adaas/are-html/attribute";
import { AreStoreWatchingEntity } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";



export class AreDirectiveAttribute extends AreHTMLAttribute implements AreStoreWatchingEntity {

    cache?: any

    template?: AreHTMLNode

    /**
     * Returns a custom directive component associated with this attribute, if available.
     * 
     * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
     */
    get component(): AreDirective | undefined {
        const component = this.scope.resolve<AreDirective>(`AreDirective${A_FormatterHelper.toPascalCase(this.name)}`) as AreDirective | undefined;

        return component as AreDirective;
    }

}