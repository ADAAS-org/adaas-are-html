import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame/core';
import { AreMutation } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let HideElementInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.HideElement, parent, props);
    }
  }
};
HideElementInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: 'Toggles the visibility of an existing element by setting its inline display to "none" on apply and restoring the previous inline display on revert. Used by the $show directive to hide/show an element without unmounting it, preserving its subtree, listeners and scene state.'
  })
], HideElementInstruction);

export { HideElementInstruction };
//# sourceMappingURL=HideElement.instruction.mjs.map
//# sourceMappingURL=HideElement.instruction.mjs.map