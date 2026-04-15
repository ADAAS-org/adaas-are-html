import { A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { AreEngine, AreSyntaxTokenMatch, AreSyntax } from "@adaas/are";
import { AreHTMLInterpreter } from "@adaas/are-html/interpreter";
import { AreHTMLEngineContext } from "./AreHTML.context";
import { AreInterpolation } from "@adaas/are-html/nodes/AreInterpolation";
import { AreText } from "@adaas/are-html/nodes/AreText";
import { AreComment } from "@adaas/are-html/nodes/AreComment";
import { AreComponentNode } from "@adaas/are-html/nodes/AreComponent";
import { AreHTMLTokenizer } from "@adaas/are-html/tokenizer";
import { AreRootNode } from "@adaas/are-html/nodes/AreRoot";
import { AreHTMLLifecycle } from "@adaas/are-html/lifecycle";
import { AreHTMLTransformer } from "@adaas/are-html/transformer";
import { AreHTMLCompiler } from "./AreHTML.compiler";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreHTMLEngine',
    description: 'HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework.'
})
export class AreHTMLEngine extends AreEngine {



    get DefaultSyntax() {
        return new AreSyntax({
            trimWhitespace: true,
            strictMode: true,
            rules: [
                // HTML comments
                {
                    opening: '<!--',
                    closing: '-->',
                    component: AreComment,
                    priority: 10,
                    nested: false,
                    extract: (raw) => ({ content: raw.slice(4, -3).trim() }),
                },
                // interpolations
                {
                    opening: '{{',
                    closing: '}}',
                    component: AreInterpolation,
                    priority: 9,
                    nested: false,
                    extract: (_, match) => ({ key: match.content }),
                },
                // are-root — matched before generic elements, produces AreRootNode
                {
                    matcher: this.rootElementMatcher.bind(this),
                    component: AreRootNode,
                    priority: 5,
                },
                // generic HTML elements
                {
                    matcher: this.htmlElementMatcher.bind(this),
                    component: AreComponentNode,
                    priority: 4,
                },
                // plain text fallback
                {
                    component: AreText,
                    priority: 0,
                },
            ],
        })
    }


    /**
     * Inject AreHTMLSyntax into the container scope before loading
     * 
     * @param container 
     */
    @A_Feature.Extend({
        name: A_ServiceFeatures.onBeforeLoad,
        before: /.*/
    })
    async init(
        @A_Inject(A_Scope) scope: A_Scope,
    ) {
        this.package(scope, {
            context: new AreHTMLEngineContext({}),
            syntax: this.DefaultSyntax,
            compiler: AreHTMLCompiler,
            interpreter: AreHTMLInterpreter,
            tokenizer: AreHTMLTokenizer,
            lifecycle: AreHTMLLifecycle,
            transformer: AreHTMLTransformer,
        });
    }


    protected rootElementMatcher(
        source: string,
        from: number,
        to: number,
        build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch
    ): AreSyntaxTokenMatch | null {

        // const rootTag = this.config.rootTag
        const rootTag = 'are-root';

        const tagStart = source.indexOf('<', from)
        if (tagStart === -1 || tagStart >= to) return null

        // only match if the tag name is exactly the configured root tag
        const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/)
        if (!tagNameMatch || tagNameMatch[1].toLowerCase() !== rootTag) return null

        // delegate the actual matching to the shared HTML element logic
        return this.htmlElementMatcher(source, from, to, build)
    }

    protected htmlElementMatcher(
        source: string,
        from: number,
        to: number,
        build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch
    ): AreSyntaxTokenMatch | null {
        let index = from

        while (index < to) {
            const tagStart = source.indexOf('<', index)
            if (tagStart === -1 || tagStart >= to) return null

            // skip comments, closing tags, doctype, processing instructions
            if (source.startsWith('<!--', tagStart)) { index = tagStart + 1; continue }
            if (source[tagStart + 1] === '/') { index = tagStart + 1; continue }
            if (source[tagStart + 1] === '!' || source[tagStart + 1] === '?') { index = tagStart + 1; continue }

            const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/)
            if (!tagNameMatch) { index = tagStart + 1; continue }

            const tagName = tagNameMatch[1]
            const openingTagEnd = AreHTMLEngine.findTagClose(source, tagStart)
            if (openingTagEnd === -1) return null

            // extract id attribute if present in the opening tag
            const openingTagStr = source.slice(tagStart, openingTagEnd + 1)
            const idMatch = openingTagStr.match(/\bid=["']([^"']*)["']/)
            const id = idMatch ? idMatch[1] : undefined

            // self-closing: <br/> or <input/>
            if (source[openingTagEnd - 1] === '/') {
                const raw = source.slice(tagStart, openingTagEnd + 1)
                const content = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd - 1)
                const match = build(raw, content, tagStart, '/>')
                match.payload = { entity: tagName, selfClose: true, id }
                return match
            }

            // find matching closing tag respecting nesting
            const closingTag = `</${tagName}>`
            let level = 0
            let searchIndex = openingTagEnd + 1
            let closingStart = -1

            while (searchIndex < to) {
                const nextOpen = source.indexOf(`<${tagName}`, searchIndex)
                const nextClose = source.indexOf(closingTag, searchIndex)
                if (nextClose === -1) break

                if (nextOpen !== -1 && nextOpen < nextClose) {
                    const charAfter = source[nextOpen + tagName.length + 1]
                    if (charAfter === ' ' || charAfter === '>' || charAfter === '/') {
                        level++
                        searchIndex = nextOpen + tagName.length + 1
                        continue
                    }
                }

                if (level === 0) { closingStart = nextClose; break }
                level--
                searchIndex = nextClose + closingTag.length
            }

            if (closingStart === -1) return null

            const fullTag = source.slice(tagStart, closingStart + closingTag.length)
            const content = source.slice(openingTagEnd + 1, closingStart)
            const match = build(fullTag, content, tagStart, closingTag)
            match.payload = { entity: tagName, selfClose: false, id }
            return match
        }
        return null
    }

    /**
     * Find the index of the closing `>` of an opening tag, skipping over
     * `>` characters that appear inside quoted attribute values.
     */
    private static findTagClose(source: string, from: number): number {
        let inSingle = false
        let inDouble = false

        for (let i = from; i < source.length; i++) {
            const ch = source[i]
            if (ch === '"' && !inSingle) inDouble = !inDouble
            else if (ch === "'" && !inDouble) inSingle = !inSingle
            else if (ch === '>' && !inSingle && !inDouble) return i
        }

        return -1
    }

}