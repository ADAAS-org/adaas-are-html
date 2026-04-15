import '../chunk-EQQGB2QZ.mjs';
import { AreHTMLNode } from '@adaas/are-html/node';

class AreInterpolation extends AreHTMLNode {
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

export { AreInterpolation };
//# sourceMappingURL=AreInterpolation.mjs.map
//# sourceMappingURL=AreInterpolation.mjs.map