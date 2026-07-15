import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_FormatterHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';
import { Are, AreStore } from '@adaas/are';

let AreDynamic = class extends Are {
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
    return A_FormatterHelper.toKebabCase(name);
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
  Are.Template,
  __decorateParam(0, A_Inject(A_Caller))
], AreDynamic.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, A_Inject(AreStore))
], AreDynamic.prototype, "data", 1);
__decorateClass([
  Are.onAfterMount,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore))
], AreDynamic.prototype, "onMount", 1);
AreDynamic = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Renders a component chosen at runtime by name. Receives a `component` (name) and a `props` payload; resolves the concrete tag (kebab-case by default) and mounts it via the engine pipeline (mirrors AreRoot, driven by a prop). Designed to be used inside a $for to render a heterogeneous list of components."
  })
], AreDynamic);

export { AreDynamic };
//# sourceMappingURL=AreDynamic.component.mjs.map
//# sourceMappingURL=AreDynamic.component.mjs.map