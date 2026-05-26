import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { AreHTMLAttribute } from '@adaas/are-html/attribute';
import { A_Frame } from '@adaas/a-frame/core';

let AreEventAttribute = class extends AreHTMLAttribute {
};
AreEventAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding \u2014 the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element."
  })
], AreEventAttribute);

export { AreEventAttribute };
//# sourceMappingURL=AreEvent.attribute.mjs.map
//# sourceMappingURL=AreEvent.attribute.mjs.map