'use strict';

var core = require('@adaas/a-frame/core');
var are = require('@adaas/are');
var AreHTML_instructions_constants = require('./AreHTML.instructions.constants');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AddStaticHTMLInstruction = class AddStaticHTMLInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddStaticHTML, parent, props);
    }
  }
};
exports.AddStaticHTMLInstruction = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: 'Materialises a fully static subtree (a "static island") onto its parent element in a single pass via browser-parsed innerHTML / a cached <template> clone. Apply injects the markup; revert clears it. Decodes HTML entities (e.g. &nbsp;) for free.'
  })
], exports.AddStaticHTMLInstruction);
//# sourceMappingURL=AddStaticHTML.instruction.js.map
//# sourceMappingURL=AddStaticHTML.instruction.js.map