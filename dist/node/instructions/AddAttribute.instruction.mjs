import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame/core';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddAttributeInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddAttribute, parent, props);
    }
  }
};
AddAttributeInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute."
  })
], AddAttributeInstruction);

export { AddAttributeInstruction };
//# sourceMappingURL=AddAttribute.instruction.mjs.map
//# sourceMappingURL=AddAttribute.instruction.mjs.map