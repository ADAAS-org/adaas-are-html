import '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';

class AreText extends AreHTMLNode {
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

export { AreText };
//# sourceMappingURL=AreText.mjs.map
//# sourceMappingURL=AreText.mjs.map