'use strict';

var are = require('@adaas/are');

class AreHTMLAttribute extends are.AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
}

exports.AreHTMLAttribute = AreHTMLAttribute;
//# sourceMappingURL=AreHTML.attribute.js.map
//# sourceMappingURL=AreHTML.attribute.js.map