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
exports.AddStyleInstruction = class AddStyleInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddStyle, parent, props);
    }
  }
};
exports.AddStyleInstruction = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AddStyleInstruction",
    description: "Sets an inline CSS style property on an element. Apply sets the property; revert removes it."
  })
], exports.AddStyleInstruction);
//# sourceMappingURL=AddStyle.instruction.js.map
//# sourceMappingURL=AddStyle.instruction.js.map