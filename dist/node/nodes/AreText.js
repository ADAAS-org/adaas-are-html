'use strict';

var node = require('@adaas/are-html/node');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreText = class AreText extends node.AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-text"
      }
    });
  }
};
exports.AreText = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion."
  })
], exports.AreText);
//# sourceMappingURL=AreText.js.map
//# sourceMappingURL=AreText.js.map