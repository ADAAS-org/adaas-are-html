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
exports.AreStaticAttribute = class AreStaticAttribute extends attribute.AreHTMLAttribute {
};
exports.AreStaticAttribute = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for plain static HTML attributes with no dynamic prefix. Its value is emitted verbatim via an AddAttribute instruction at compile time and does not participate in reactive update cycles."
  })
], exports.AreStaticAttribute);
//# sourceMappingURL=AreStatic.attribute.js.map
//# sourceMappingURL=AreStatic.attribute.js.map