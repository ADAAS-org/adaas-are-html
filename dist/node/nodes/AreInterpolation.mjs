import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';
import { A_Frame } from '@adaas/a-frame/core';

let AreInterpolation = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-interpolation"
      }
    });
  }
};
AreInterpolation = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a reactive inline expression in the AreHTMLNode tree. Its content expression is resolved from the store at render time and kept live via an AddInterpolation instruction that updates the corresponding text node on each reactive cycle."
  })
], AreInterpolation);

export { AreInterpolation };
//# sourceMappingURL=AreInterpolation.mjs.map
//# sourceMappingURL=AreInterpolation.mjs.map