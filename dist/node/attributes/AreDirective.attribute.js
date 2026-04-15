'use strict';

var aConcept = require('@adaas/a-concept');
var attribute = require('@adaas/are-html/attribute');

class AreDirectiveAttribute extends attribute.AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${aConcept.A_FormatterHelper.toPascalCase(this.name)}`);
    return component;
  }
}

exports.AreDirectiveAttribute = AreDirectiveAttribute;
//# sourceMappingURL=AreDirective.attribute.js.map
//# sourceMappingURL=AreDirective.attribute.js.map