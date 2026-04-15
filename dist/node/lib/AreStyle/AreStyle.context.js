'use strict';

var aConcept = require('@adaas/a-concept');

class AreStyle extends aConcept.A_Fragment {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
}

exports.AreStyle = AreStyle;
//# sourceMappingURL=AreStyle.context.js.map
//# sourceMappingURL=AreStyle.context.js.map