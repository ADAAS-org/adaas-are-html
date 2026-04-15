import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Context, A_FormatterHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are, AreSignalsContext, AreStore, AreRoute, AreSignals } from '@adaas/are';

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
      const defaultAttr = root.attributes.find((attr) => attr.name === "default");
      componentName = defaultAttr?.content;
    }
    if (!componentName) {
      logger.warning('AreRoot: No component found for initial render. Please ensure a route condition or "default" attribute is set.');
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
  }
  async onSignal(root, vector, store, logger, signalsContext) {
    console.log("Received signal vector in AreRoot:", root, vector);
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
      logger.warning("No component found for rendering in AreRoot. Please ensure that the signal vector matches at least one component or that a default component name is provided in the store.");
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
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
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreRoot",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);

export { AreRoot };
//# sourceMappingURL=AreRoot.component.mjs.map
//# sourceMappingURL=AreRoot.component.mjs.map