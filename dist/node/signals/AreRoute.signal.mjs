import '../chunk-EQQGB2QZ.mjs';
import { A_Route } from '@adaas/a-utils/a-route';
import { AreSignal } from '@adaas/are';

class AreRoute extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
}

export { AreRoute };
//# sourceMappingURL=AreRoute.signal.mjs.map
//# sourceMappingURL=AreRoute.signal.mjs.map