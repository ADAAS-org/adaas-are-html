import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';
import { A_Frame } from '@adaas/a-frame/core';

let AreComment = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-comment"
      }
    });
  }
};
AreComment = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a comment node in the AreHTMLNode tree. Used as a stable DOM anchor by structural directives such as $if and $for that swap rendered content in and out, ensuring the parent container always has a consistent insertion point."
  })
], AreComment);

export { AreComment };
//# sourceMappingURL=AreComment.mjs.map
//# sourceMappingURL=AreComment.mjs.map