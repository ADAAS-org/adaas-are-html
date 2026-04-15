import '../chunk-EQQGB2QZ.mjs';
import { A_FormatterHelper } from '@adaas/a-concept';
import { AreHTMLAttribute } from '@adaas/are-html/attribute';

class AreDirectiveAttribute extends AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${A_FormatterHelper.toPascalCase(this.name)}`);
    return component;
  }
}

export { AreDirectiveAttribute };
//# sourceMappingURL=AreDirective.attribute.mjs.map
//# sourceMappingURL=AreDirective.attribute.mjs.map