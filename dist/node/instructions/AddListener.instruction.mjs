import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddListenerInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddListener, parent, props);
    }
  }
};
AddListenerInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddListenerInstruction",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], AddListenerInstruction);

export { AddListenerInstruction };
//# sourceMappingURL=AddListener.instruction.mjs.map
//# sourceMappingURL=AddListener.instruction.mjs.map