import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Context, A_FormatterHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are, AreSignalsContext, AreStore, AreSignals } from '@adaas/are';
import { AreRoute } from '@adaas/are-html/signals/AreRoute.signal';

let AreRoot = class extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      default: {
        type: "string",
        default: ""
      }
    };
  }
  async template(root, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      if (!root.content?.trim()) {
        const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
        const defaultComponent = defaultMatch?.[1];
        if (defaultComponent) {
          root.setContent(`<${defaultComponent}></${defaultComponent}>`);
        }
      }
      return;
    }
    const currentRoute = AreRoute.default();
    let componentName;
    if (currentRoute) {
      const initialVector = new A_SignalVector([currentRoute]);
      let renderTarget = signalsContext?.findComponentByVector(rootId, initialVector);
      if (!renderTarget) {
        const signalsMeta = A_Context.meta(AreSignals);
        renderTarget = signalsMeta?.findComponentByVector(initialVector);
      }
      if (renderTarget?.name) {
        componentName = A_FormatterHelper.toKebabCase(renderTarget.name);
      }
    }
    if (!componentName) {
      if (root.content?.trim()) {
        return;
      }
    }
    if (!componentName) {
      const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
      componentName = defaultMatch?.[1];
    }
    if (!componentName) {
      logger.warning('AreRoot: No component found for initial render. Provide body content, a route condition, or a "default" attribute.');
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
  }
  async onSignal(root, vector, store, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    let renderTarget = signalsContext?.findComponentByVector(rootId, vector);
    if (!renderTarget) {
      const signalsMeta = A_Context.meta(AreSignals);
      renderTarget = signalsMeta?.findComponentByVector(vector);
    }
    const componentName = renderTarget?.name ? A_FormatterHelper.toKebabCase(renderTarget.name) : store.get("default");
    if (!componentName) {
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      signalsContext?.unsubscribe(child);
      child.unmount();
      child.destroy();
      root.removeChild(child);
    }
    root.tokenize();
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      child.init();
      const res = child.load();
      if (res instanceof Promise) {
        await res;
      }
      child.transform();
      child.compile();
      child.mount();
    }
  }
};
__decorateClass([
  Are.Template,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Logger)),
  __decorateParam(2, A_Inject(AreSignalsContext))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_SignalVector)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Logger)),
  __decorateParam(4, A_Inject(AreSignalsContext))
], AreRoot.prototype, "onSignal", 1);
AreRoot = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);

export { AreRoot };
//# sourceMappingURL=AreRoot.component.mjs.map
//# sourceMappingURL=AreRoot.component.mjs.map