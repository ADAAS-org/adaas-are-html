'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreComponent = require('@adaas/are-html/nodes/AreComponent');
var AreRoot = require('@adaas/are-html/nodes/AreRoot');
var AreDirective_attribute = require('@adaas/are-html/attributes/AreDirective.attribute');
var AreEvent_attribute = require('@adaas/are-html/attributes/AreEvent.attribute');
var AreBinding_attribute = require('@adaas/are-html/attributes/AreBinding.attribute');
var AreStatic_attribute = require('@adaas/are-html/attributes/AreStatic.attribute');
var core = require('@adaas/a-frame/core');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreHTMLTokenizer = class AreHTMLTokenizer extends are.AreTokenizer {
  constructor() {
    super(...arguments);
    this.ATTR_PATTERN = /([$:@]?[\w.-]+(?::[\w.-]+)?)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
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
      if (prefix === ":") results.push(new AreBinding_attribute.AreBindingAttribute(meta));
      else if (prefix === "@") results.push(new AreEvent_attribute.AreEventAttribute(meta));
      else if (prefix === "$") results.push(new AreDirective_attribute.AreDirectiveAttribute(meta));
      else results.push(new AreStatic_attribute.AreStaticAttribute(meta));
    }
    return results;
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: are.AreNodeFeatures.onTokenize,
    scope: [AreComponent.AreComponentNode, AreRoot.AreRootNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLTokenizer.prototype, "tokenize", 1);
exports.AreHTMLTokenizer = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific tokenizer extending AreTokenizer. Parses raw HTML template strings into AreHTMLNode trees by scanning element tags and resolving directive ($), event (@), binding (:), and static attributes to their typed attribute classes, constructing AreComponentNode and AreRootNode instances where required."
  })
], exports.AreHTMLTokenizer);
//# sourceMappingURL=AreHTML.tokenizer.js.map
//# sourceMappingURL=AreHTML.tokenizer.js.map