'use strict';

var aRoute = require('@adaas/a-utils/a-route');
var are = require('@adaas/are');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreRoute = class AreRoute extends are.AreSignal {
  constructor(path) {
    super({
      data: new aRoute.A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new exports.AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
};
exports.AreRoute = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "ARE signal that carries an A_Route value. Dispatched by AreRouteWatcher on client-side navigation events (pushState, replaceState, popstate). The signal bus delivers it to all subscribed root nodes, triggering route-based conditional rendering across the component tree."
  })
], exports.AreRoute);
//# sourceMappingURL=AreRoute.signal.js.map
//# sourceMappingURL=AreRoute.signal.js.map