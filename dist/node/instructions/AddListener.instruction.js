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
exports.AddListenerInstruction = class AddListenerInstruction extends are.AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTML_instructions_constants.AreHTMLInstructions.AddListener, parent, props);
    }
  }
};
exports.AddListenerInstruction = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], exports.AddListenerInstruction);
//# sourceMappingURL=AddListener.instruction.js.map
//# sourceMappingURL=AddListener.instruction.js.map