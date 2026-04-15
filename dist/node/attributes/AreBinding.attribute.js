'use strict';

var attribute = require('@adaas/are-html/attribute');

class AreBindingAttribute extends attribute.AreHTMLAttribute {
  // get value(): string {
  //     const [firstPart, ...pathPart] = this.content.split('.');
  //     const primaryObject = this.owner.store.get(firstPart);
  //     return AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.')) as string;
  // }
}

exports.AreBindingAttribute = AreBindingAttribute;
//# sourceMappingURL=AreBinding.attribute.js.map
//# sourceMappingURL=AreBinding.attribute.js.map