'use strict';

var attribute = require('@adaas/are-html/attribute');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreEventAttribute = class AreEventAttribute extends attribute.AreHTMLAttribute {
};
exports.AreEventAttribute = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding \u2014 the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element."
  })
], exports.AreEventAttribute);
//# sourceMappingURL=AreEvent.attribute.js.map
//# sourceMappingURL=AreEvent.attribute.js.map