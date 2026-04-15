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
exports.AddTextInstruction = class AddTextInstruction extends are.AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddText, props);
    }
  }
};
exports.AddTextInstruction = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AddTextInstruction",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], exports.AddTextInstruction);
//# sourceMappingURL=AddText.instruction.js.map
//# sourceMappingURL=AddText.instruction.js.map