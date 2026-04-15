'use strict';

var node = require('@adaas/are-html/node');

class AreText extends node.AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-text"
      }
    });
  }
}

exports.AreText = AreText;
//# sourceMappingURL=AreText.js.map
//# sourceMappingURL=AreText.js.map