import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreDeclaration } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddElementInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddElement, props);
    }
  }
};
AddElementInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddElementInstruction",
    description: "Creates a new HTML element in the DOM. Apply creates the element; revert removes it."
  })
], AddElementInstruction);

export { AddElementInstruction };
//# sourceMappingURL=AddElement.instruction.mjs.map
//# sourceMappingURL=AddElement.instruction.mjs.map