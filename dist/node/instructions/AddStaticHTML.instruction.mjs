import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame/core';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddStaticHTMLInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddStaticHTML, parent, props);
    }
  }
};
AddStaticHTMLInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: 'Materialises a fully static subtree (a "static island") onto its parent element in a single pass via browser-parsed innerHTML / a cached <template> clone. Apply injects the markup; revert clears it. Decodes HTML entities (e.g. &nbsp;) for free.'
  })
], AddStaticHTMLInstruction);

export { AddStaticHTMLInstruction };
//# sourceMappingURL=AddStaticHTML.instruction.mjs.map
//# sourceMappingURL=AddStaticHTML.instruction.mjs.map