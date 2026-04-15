'use strict';

var node = require('@adaas/are-html/node');

class AreInterpolation extends node.AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-interpolation"
      }
    });
  }
}

exports.AreInterpolation = AreInterpolation;
//# sourceMappingURL=AreInterpolation.js.map
//# sourceMappingURL=AreInterpolation.js.map