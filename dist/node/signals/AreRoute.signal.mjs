import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Route } from '@adaas/a-utils/a-route';
import { AreSignal } from '@adaas/are';
import { A_Frame } from '@adaas/a-frame/core';

let AreRoute = class extends AreSignal {
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
};
AreRoute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "ARE signal that carries an A_Route value. Dispatched by AreWatcher on client-side navigation events (pushState, replaceState, popstate). The signal bus delivers it to all subscribed root nodes, triggering route-based conditional rendering across the component tree."
  })
], AreRoute);

export { AreRoute };
//# sourceMappingURL=AreRoute.signal.mjs.map
//# sourceMappingURL=AreRoute.signal.mjs.map