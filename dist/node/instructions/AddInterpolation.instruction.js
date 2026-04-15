'use strict';

var aFrame = require('@adaas/a-frame');
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
exports.AddInterpolationInstruction = class AddInterpolationInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddInterpolation, parent, props);
    }
  }
};
exports.AddInterpolationInstruction = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AddInterpolationInstruction",
    description: "Appends a reactive text node whose content is resolved dynamically from the store. Apply creates the text node with the getter; revert removes it."
  })
], exports.AddInterpolationInstruction);
//# sourceMappingURL=AddInterpolation.instruction.js.map
//# sourceMappingURL=AddInterpolation.instruction.js.map