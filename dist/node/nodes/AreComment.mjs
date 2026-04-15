import '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';

class AreComment extends AreHTMLNode {
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

export { AreComment };
//# sourceMappingURL=AreComment.mjs.map
//# sourceMappingURL=AreComment.mjs.map