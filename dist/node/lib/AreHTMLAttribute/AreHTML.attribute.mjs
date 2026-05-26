import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { AreAttribute } from '@adaas/are';
import { A_Frame } from '@adaas/a-frame/core';

let AreHTMLAttribute = class extends AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
AreHTMLAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Base class for all typed HTML attributes in the ARE framework. Provides typed access to the owning AreHTMLNode via the scope injector so that attribute subclasses can inspect host-node properties and resolve store bindings during transformation, compilation, and lifecycle phases."
  })
], AreHTMLAttribute);

export { AreHTMLAttribute };
//# sourceMappingURL=AreHTML.attribute.mjs.map
//# sourceMappingURL=AreHTML.attribute.mjs.map