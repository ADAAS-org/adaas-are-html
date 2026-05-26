import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { AreHTMLAttribute } from '@adaas/are-html/attribute';
import { A_Frame } from '@adaas/a-frame/core';

let AreBindingAttribute = class extends AreHTMLAttribute {
  // get value(): string {
  //     const [firstPart, ...pathPart] = this.content.split('.');
  //     const primaryObject = this.owner.store.get(firstPart);
  //     return AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.')) as string;
  // }
};
AreBindingAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for two-way value bindings (: prefix). Marks that the attribute value should be resolved dynamically from the node store rather than used verbatim, enabling reactive updates whenever the underlying store value changes during a rendering cycle."
  })
], AreBindingAttribute);

export { AreBindingAttribute };
//# sourceMappingURL=AreBinding.attribute.mjs.map
//# sourceMappingURL=AreBinding.attribute.mjs.map