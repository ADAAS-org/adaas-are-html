'use strict';

var are = require('@adaas/are');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreHTMLAttribute = class AreHTMLAttribute extends are.AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
exports.AreHTMLAttribute = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Base class for all typed HTML attributes in the ARE framework. Provides typed access to the owning AreHTMLNode via the scope injector so that attribute subclasses can inspect host-node properties and resolve store bindings during transformation, compilation, and lifecycle phases."
  })
], exports.AreHTMLAttribute);
//# sourceMappingURL=AreHTML.attribute.js.map
//# sourceMappingURL=AreHTML.attribute.js.map