import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';
import { A_Frame } from '@adaas/a-frame/core';

let AreText = class extends AreHTMLNode {
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
AreText = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion."
  })
], AreText);

export { AreText };
//# sourceMappingURL=AreText.mjs.map
//# sourceMappingURL=AreText.mjs.map