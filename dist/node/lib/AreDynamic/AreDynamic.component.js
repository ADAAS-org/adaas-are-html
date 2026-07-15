'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');
var are = require('@adaas/are');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreDynamic = class AreDynamic extends are.Are {
  constructor() {
    super(...arguments);
    this.props = {
      component: { type: "string", default: "" },
      props: { type: "object", default: {} }
    };
  }
  template(node) {
    node.setContent("");
  }
  data(store) {
    store.set({ component: "", props: {} });
  }
  /**
   * Resolve the `component` prop value to the concrete engine tag.
   *
   * Default: `A_FormatterHelper.toKebabCase(name)` — the convention the engine
   * uses to register component tags (same as `AreRoot`). Override to plug in
   * an application-specific alias→tag map.
   */
  resolveTag(name) {
    return aConcept.A_FormatterHelper.toKebabCase(name);
  }
  async onMount(node, store) {
    const name = String(store.get("component") ?? "");
    if (!name) {
      return;
    }
    const tag = this.resolveTag(name);
    if (node.children[0]?.type === tag) {
      return;
    }
    node.setContent(`<${tag} :props="props"></${tag}>`);
    await node.render();
  }
};
__decorateClass([
  are.Are.Template,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller))
], exports.AreDynamic.prototype, "template", 1);
__decorateClass([
  are.Are.Data,
  __decorateParam(0, aConcept.A_Inject(are.AreStore))
], exports.AreDynamic.prototype, "data", 1);
__decorateClass([
  are.Are.onAfterMount,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore))
], exports.AreDynamic.prototype, "onMount", 1);
exports.AreDynamic = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Renders a component chosen at runtime by name. Receives a `component` (name) and a `props` payload; resolves the concrete tag (kebab-case by default) and mounts it via the engine pipeline (mirrors AreRoot, driven by a prop). Designed to be used inside a $for to render a heterogeneous list of components."
  })
], exports.AreDynamic);
//# sourceMappingURL=AreDynamic.component.js.map
//# sourceMappingURL=AreDynamic.component.js.map