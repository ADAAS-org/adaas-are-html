import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreDeclaration } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddTextInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddText, props);
    }
  }
};
AddTextInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddTextInstruction",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddTextInstruction);

export { AddTextInstruction };
//# sourceMappingURL=AddText.instruction.mjs.map
//# sourceMappingURL=AddText.instruction.mjs.map