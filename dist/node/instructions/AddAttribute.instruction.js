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
exports.AddAttributeInstruction = class AddAttributeInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddAttribute, parent, props);
    }
  }
};
exports.AddAttributeInstruction = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AddAttributeInstruction",
    description: "Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute."
  })
], exports.AddAttributeInstruction);
//# sourceMappingURL=AddAttribute.instruction.js.map
//# sourceMappingURL=AddAttribute.instruction.js.map