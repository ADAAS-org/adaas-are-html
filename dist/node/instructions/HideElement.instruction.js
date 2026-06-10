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
exports.HideElementInstruction = class HideElementInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.HideElement, parent, props);
    }
  }
};
exports.HideElementInstruction = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: 'Toggles the visibility of an existing element by setting its inline display to "none" on apply and restoring the previous inline display on revert. Used by the $show directive to hide/show an element without unmounting it, preserving its subtree, listeners and scene state.'
  })
], exports.HideElementInstruction);
//# sourceMappingURL=HideElement.instruction.js.map
//# sourceMappingURL=HideElement.instruction.js.map