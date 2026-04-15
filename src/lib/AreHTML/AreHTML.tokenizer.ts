import { A_Caller, A_Feature, A_Inject } from "@adaas/a-concept";
import { AreNodeFeatures, AreNode, AreTokenizer, AreAttribute_Init, AreContext } from "@adaas/are";
import { AreComponentNode } from "../../nodes/AreComponent";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreRootNode } from "../../nodes/AreRoot";
import { AreHTMLAttribute } from "../AreHTMLAttribute/AreHTML.attribute";
import { AreDirectiveAttribute } from "../../attributes/AreDirective.attribute";
import { AreEventAttribute } from "../../attributes/AreEvent.attribute";
import { AreBindingAttribute } from "../../attributes/AreBinding.attribute";
import { AreStaticAttribute } from "../../attributes/AreStatic.attribute";


export class AreHTMLTokenizer extends AreTokenizer {

    ATTR_PATTERN = /([$:@]?[\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g


    @A_Feature.Extend({
        name: AreNodeFeatures.onTokenize,
        scope: [AreComponentNode, AreRootNode]
    })
    tokenize(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_Logger) logger?: A_Logger
    ): void {

        super.tokenize(node, context, logger);

        context.startPerformance('attributeExtraction');

        const attributes = this.extractAttributes(node.markup);

        for (const attr of attributes) {
            node.scope.register(attr);
        }

        context.endPerformance('attributeExtraction');
    }



    extractAttributes(markup: string): AreHTMLAttribute[] {
        // Strip the tag name, then remove the closing > that is NOT inside quotes
        const withoutTag = markup.replace(/^<[a-zA-Z][a-zA-Z0-9-]*\s*/, '')

        // Walk the string to find the closing > that isn't inside a quoted value
        let inSingle = false
        let inDouble = false
        let endIdx = withoutTag.length

        for (let i = 0; i < withoutTag.length; i++) {
            const ch = withoutTag[i]
            if (ch === '"' && !inSingle) inDouble = !inDouble
            else if (ch === "'" && !inDouble) inSingle = !inSingle
            else if (ch === '>' && !inSingle && !inDouble) {
                endIdx = i
                break
            }
        }

        const attrString = withoutTag.slice(0, endIdx).replace(/\s*\/?\s*$/, '').trim()

        const results: AreHTMLAttribute[] = []

        for (const match of attrString.matchAll(this.ATTR_PATTERN)) {
            const raw = match[0]
            const full = match[1]                           // e.g. ':class', '@click', '$for', 'id'
            const value = match[2] ?? match[3] ?? match[4] ?? 'true'

            const prefix = full[0]
            const isSpecial = prefix === ':' || prefix === '@' || prefix === '$'
            const name = isSpecial ? full.slice(1) : full

            const meta: AreAttribute_Init = { name, content: value, raw, prefix: isSpecial ? prefix : '' }

            if (prefix === ':') results.push(new AreBindingAttribute(meta))
            else if (prefix === '@') results.push(new AreEventAttribute(meta))
            else if (prefix === '$') results.push(new AreDirectiveAttribute(meta))
            else results.push(new AreStaticAttribute(meta))
        }

        return results
    }

}