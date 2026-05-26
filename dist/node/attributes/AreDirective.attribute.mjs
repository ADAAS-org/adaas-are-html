import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_FormatterHelper } from '@adaas/a-concept';
import { AreHTMLAttribute } from '@adaas/are-html/attribute';
import { A_Frame } from '@adaas/a-frame/core';

let AreDirectiveAttribute = class extends AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${A_FormatterHelper.toPascalCase(this.name)}`);
    return component;
  }
};
AreDirectiveAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for directive invocations ($ prefix). Carries the resolved directive component class and a cloned template node. The associated directive uses these during its Compile phase to emit conditional or repeated instruction groups and to manage per-item or per-condition subscopes."
  })
], AreDirectiveAttribute);

export { AreDirectiveAttribute };
//# sourceMappingURL=AreDirective.attribute.mjs.map
//# sourceMappingURL=AreDirective.attribute.mjs.map