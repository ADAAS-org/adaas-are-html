'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var aLogger = require('@adaas/a-utils/a-logger');
var aSignal = require('@adaas/a-utils/a-signal');
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
exports.AreRoot = class AreRoot extends are.Are {
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
    const currentRoute = are.AreRoute.default();
    let componentName;
    if (currentRoute) {
      const initialVector = new aSignal.A_SignalVector([currentRoute]);
      let renderTarget = signalsContext?.findComponentByVector(rootId, initialVector);
      if (!renderTarget) {
        const signalsMeta = aConcept.A_Context.meta(are.AreSignals);
        renderTarget = signalsMeta?.findComponentByVector(initialVector);
      }
      if (renderTarget?.name) {
        componentName = aConcept.A_FormatterHelper.toKebabCase(renderTarget.name);
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
      const signalsMeta = aConcept.A_Context.meta(are.AreSignals);
      renderTarget = signalsMeta?.findComponentByVector(vector);
    }
    const componentName = renderTarget?.name ? aConcept.A_FormatterHelper.toKebabCase(renderTarget.name) : store.get("default");
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
  are.Are.Template,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(2, aConcept.A_Inject(are.AreSignalsContext))
], exports.AreRoot.prototype, "template", 1);
__decorateClass([
  are.Are.Signal,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aSignal.A_SignalVector)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(4, aConcept.A_Inject(are.AreSignalsContext))
], exports.AreRoot.prototype, "onSignal", 1);
exports.AreRoot = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreRoot",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], exports.AreRoot);
//# sourceMappingURL=AreRoot.component.js.map
//# sourceMappingURL=AreRoot.component.js.map