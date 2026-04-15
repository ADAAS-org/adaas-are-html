import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreNodeFeatures, AreContext, AreTokenizer } from '@adaas/are';
import { AreComponentNode } from '@adaas/are-html/nodes/AreComponent';
import { AreRootNode } from '@adaas/are-html/nodes/AreRoot';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreEventAttribute } from '@adaas/are-html/attributes/AreEvent.attribute';
import { AreBindingAttribute } from '@adaas/are-html/attributes/AreBinding.attribute';
import { AreStaticAttribute } from '@adaas/are-html/attributes/AreStatic.attribute';

class AreHTMLTokenizer extends AreTokenizer {
  constructor() {
    super(...arguments);
    this.ATTR_PATTERN = /([$:@]?[\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
  }
  tokenize(node, context, logger) {
    super.tokenize(node, context, logger);
    context.startPerformance("attributeExtraction");
    const attributes = this.extractAttributes(node.markup);
    for (const attr of attributes) {
      node.scope.register(attr);
    }
    context.endPerformance("attributeExtraction");
  }
  extractAttributes(markup) {
    const withoutTag = markup.replace(/^<[a-zA-Z][a-zA-Z0-9-]*\s*/, "");
    let inSingle = false;
    let inDouble = false;
    let endIdx = withoutTag.length;
    for (let i = 0; i < withoutTag.length; i++) {
      const ch = withoutTag[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) {
        endIdx = i;
        break;
      }
    }
    const attrString = withoutTag.slice(0, endIdx).replace(/\s*\/?\s*$/, "").trim();
    const results = [];
    for (const match of attrString.matchAll(this.ATTR_PATTERN)) {
      const raw = match[0];
      const full = match[1];
      if (!full) continue;
      const value = match[2] ?? match[3] ?? match[4] ?? "true";
      const prefix = full[0];
      const isSpecial = prefix === ":" || prefix === "@" || prefix === "$";
      const name = isSpecial ? full.slice(1) : full;
      const meta = { name, content: value, raw, prefix: isSpecial ? prefix : "" };
      if (prefix === ":") results.push(new AreBindingAttribute(meta));
      else if (prefix === "@") results.push(new AreEventAttribute(meta));
      else if (prefix === "$") results.push(new AreDirectiveAttribute(meta));
      else results.push(new AreStaticAttribute(meta));
    }
    return results;
  }
}
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreComponentNode, AreRootNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLTokenizer.prototype, "tokenize", 1);

export { AreHTMLTokenizer };
//# sourceMappingURL=AreHTML.tokenizer.mjs.map
//# sourceMappingURL=AreHTML.tokenizer.mjs.map