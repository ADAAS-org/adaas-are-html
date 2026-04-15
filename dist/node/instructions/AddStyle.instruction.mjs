import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddStyleInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddStyle, parent, props);
    }
  }
};
AddStyleInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddStyleInstruction",
    description: "Sets an inline CSS style property on an element. Apply sets the property; revert removes it."
  })
], AddStyleInstruction);

export { AddStyleInstruction };
//# sourceMappingURL=AddStyle.instruction.mjs.map
//# sourceMappingURL=AddStyle.instruction.mjs.map