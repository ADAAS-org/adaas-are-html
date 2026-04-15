import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddInterpolationInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddInterpolation, parent, props);
    }
  }
};
AddInterpolationInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddInterpolationInstruction",
    description: "Appends a reactive text node whose content is resolved dynamically from the store. Apply creates the text node with the getter; revert removes it."
  })
], AddInterpolationInstruction);

export { AddInterpolationInstruction };
//# sourceMappingURL=AddInterpolation.instruction.mjs.map
//# sourceMappingURL=AddInterpolation.instruction.mjs.map