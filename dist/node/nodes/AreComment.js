'use strict';

var node = require('@adaas/are-html/node');

class AreComment extends node.AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-comment"
      }
    });
  }
}

exports.AreComment = AreComment;
//# sourceMappingURL=AreComment.js.map
//# sourceMappingURL=AreComment.js.map