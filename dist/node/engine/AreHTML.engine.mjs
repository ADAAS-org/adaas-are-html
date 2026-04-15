import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Scope } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { AreEngine, AreSyntax } from '@adaas/are';
import { AreHTMLInterpreter } from '@adaas/are-html/interpreter';
import { AreHTMLEngineContext } from './AreHTML.context';
import { AreInterpolation } from '@adaas/are-html/nodes/AreInterpolation';
import { AreText } from '@adaas/are-html/nodes/AreText';
import { AreComment } from '@adaas/are-html/nodes/AreComment';
import { AreComponentNode } from '@adaas/are-html/nodes/AreComponent';
import { AreHTMLTokenizer } from '@adaas/are-html/tokenizer';
import { AreRootNode } from '@adaas/are-html/nodes/AreRoot';
import { AreHTMLLifecycle } from '@adaas/are-html/lifecycle';
import { AreHTMLTransformer } from '@adaas/are-html/transformer';
import { AreHTMLCompiler } from './AreHTML.compiler';

let AreHTMLEngine = class extends AreEngine {
  get DefaultSyntax() {
    return new AreSyntax({
      trimWhitespace: true,
      strictMode: true,
      rules: [
        // HTML comments
        {
          opening: "<!--",
          closing: "-->",
          component: AreComment,
          priority: 10,
          nested: false,
          extract: (raw) => ({ content: raw.slice(4, -3).trim() })
        },
        // interpolations
        {
          opening: "{{",
          closing: "}}",
          component: AreInterpolation,
          priority: 9,
          nested: false,
          extract: (_, match) => ({ key: match.content })
        },
        // are-root — matched before generic elements, produces AreRootNode
        {
          matcher: this.rootElementMatcher.bind(this),
          component: AreRootNode,
          priority: 5
        },
        // generic HTML elements
        {
          matcher: this.htmlElementMatcher.bind(this),
          component: AreComponentNode,
          priority: 4
        },
        // plain text fallback
        {
          component: AreText,
          priority: 0
        }
      ]
    });
  }
  async init(scope) {
    this.package(scope, {
      context: new AreHTMLEngineContext({}),
      syntax: this.DefaultSyntax,
      compiler: AreHTMLCompiler,
      interpreter: AreHTMLInterpreter,
      tokenizer: AreHTMLTokenizer,
      lifecycle: AreHTMLLifecycle,
      transformer: AreHTMLTransformer
    });
  }
  rootElementMatcher(source, from, to, build) {
    const rootTag = "are-root";
    const tagStart = source.indexOf("<", from);
    if (tagStart === -1 || tagStart >= to) return null;
    const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
    if (!tagNameMatch || tagNameMatch[1].toLowerCase() !== rootTag) return null;
    return this.htmlElementMatcher(source, from, to, build);
  }
  htmlElementMatcher(source, from, to, build) {
    let index = from;
    while (index < to) {
      const tagStart = source.indexOf("<", index);
      if (tagStart === -1 || tagStart >= to) return null;
      if (source.startsWith("<!--", tagStart)) {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "/") {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "!" || source[tagStart + 1] === "?") {
        index = tagStart + 1;
        continue;
      }
      const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
      if (!tagNameMatch) {
        index = tagStart + 1;
        continue;
      }
      const tagName = tagNameMatch[1];
      const openingTagEnd = AreHTMLEngine.findTagClose(source, tagStart);
      if (openingTagEnd === -1) return null;
      const openingTagStr = source.slice(tagStart, openingTagEnd + 1);
      const idMatch = openingTagStr.match(/\bid=["']([^"']*)["']/);
      const id = idMatch ? idMatch[1] : void 0;
      if (source[openingTagEnd - 1] === "/") {
        const raw = source.slice(tagStart, openingTagEnd + 1);
        const content2 = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd - 1);
        const match2 = build(raw, content2, tagStart, "/>");
        match2.payload = { entity: tagName, selfClose: true, id };
        return match2;
      }
      const closingTag = `</${tagName}>`;
      let level = 0;
      let searchIndex = openingTagEnd + 1;
      let closingStart = -1;
      while (searchIndex < to) {
        const nextOpen = source.indexOf(`<${tagName}`, searchIndex);
        const nextClose = source.indexOf(closingTag, searchIndex);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          const charAfter = source[nextOpen + tagName.length + 1];
          if (charAfter === " " || charAfter === ">" || charAfter === "/") {
            level++;
            searchIndex = nextOpen + tagName.length + 1;
            continue;
          }
        }
        if (level === 0) {
          closingStart = nextClose;
          break;
        }
        level--;
        searchIndex = nextClose + closingTag.length;
      }
      if (closingStart === -1) return null;
      const fullTag = source.slice(tagStart, closingStart + closingTag.length);
      const content = source.slice(openingTagEnd + 1, closingStart);
      const match = build(fullTag, content, tagStart, closingTag);
      match.payload = { entity: tagName, selfClose: false, id };
      return match;
    }
    return null;
  }
  /**
   * Find the index of the closing `>` of an opening tag, skipping over
   * `>` characters that appear inside quoted attribute values.
   */
  static findTagClose(source, from) {
    let inSingle = false;
    let inDouble = false;
    for (let i = from; i < source.length; i++) {
      const ch = source[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) return i;
    }
    return -1;
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope))
], AreHTMLEngine.prototype, "init", 1);
AreHTMLEngine = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], AreHTMLEngine);

export { AreHTMLEngine };
//# sourceMappingURL=AreHTML.engine.mjs.map
//# sourceMappingURL=AreHTML.engine.mjs.map