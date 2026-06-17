'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');
var aLogger = require('@adaas/a-utils/a-logger');
var aSignal = require('@adaas/a-utils/a-signal');
var are = require('@adaas/are');
var AreRoute_signal = require('@adaas/are-html/signals/AreRoute.signal');
var AreRootCache_context = require('./AreRootCache.context');

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
  async template(root, logger, signalsContext, signalState) {
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
    const initialVector = this.buildInitialVector(signalState);
    const renderTarget = this.matchComponent(rootId, initialVector, signalsContext);
    let componentName = renderTarget?.name ? aConcept.A_FormatterHelper.toKebabCase(renderTarget.name) : void 0;
    if (!componentName) {
      if (root.content?.trim()) {
        return;
      }
    }
    if (!componentName) {
      const defaultComp = signalsContext?.getDefault(rootId);
      if (defaultComp?.name) {
        componentName = aConcept.A_FormatterHelper.toKebabCase(defaultComp.name);
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
  async onSignal(root, vector, logger, signalsContext, cache) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    const renderTarget = this.matchComponent(rootId, vector, signalsContext);
    const def = signalsContext?.getDefault(rootId);
    const componentName = renderTarget?.name ? aConcept.A_FormatterHelper.toKebabCase(renderTarget.name) : def?.name ? aConcept.A_FormatterHelper.toKebabCase(def.name) : void 0;
    if (!componentName) {
      for (const child of [...root.children]) {
        this.stashChild(root, child, signalsContext, cache);
      }
      root.setContent("");
      return;
    }
    const currentChild = root.children[0];
    if (currentChild?.type === componentName) {
      return;
    }
    for (const child of [...root.children]) {
      this.stashChild(root, child, signalsContext, cache);
    }
    root.setContent(`<${componentName}></${componentName}>`);
    const cached = cache?.take(root.id, componentName);
    if (cached) {
      this.restoreChild(root, cached, signalsContext);
      return;
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
      await child.mount();
    }
  }
  /**
   * Resolves the component a vector should render for the given root, mirroring
   * the priority used everywhere in the routing system:
   *   1. Root-specific conditions registered on AreSignalsContext.
   *   2. The global AreSignalsMeta map, restricted to this outlet's pool.
   *
   * Passing the pool *into* the meta lookup is critical: without it, the first
   * globally matching component wins and may belong to a different outlet
   * (e.g. AisRequirementsPanel for the meta-outlet matching
   * AisEditorCursorScope) — the pool check would then reject it and the outlet
   * would fall back to its default, hiding a valid in-pool match (e.g.
   * AisDiagramTab matching AisSetPrimaryDisplay).
   *
   * Returns `undefined` when nothing matches — callers decide whether to use a
   * configured default, body content, or clear the outlet.
   */
  matchComponent(rootId, vector, signalsContext) {
    if (!vector) return void 0;
    let renderTarget = signalsContext?.findComponentByVector(rootId, vector);
    if (!renderTarget) {
      const signalsMeta = aConcept.A_Context.meta(are.AreSignals);
      const pool = signalsContext?.getComponentById(rootId);
      const metaTarget = signalsMeta?.findComponentByVector(
        vector,
        pool?.length ? pool : void 0,
        rootId
      );
      if (metaTarget && (!pool?.length || pool.includes(metaTarget))) {
        renderTarget = metaTarget;
      }
    }
    return renderTarget;
  }
  /**
   * Builds the vector used for the INITIAL render. It is seeded from the
   * accumulated signal state (every signal dispatched on the bus so far) so a
   * freshly-mounted outlet reflects the live application state immediately,
   * not just on the next signal tick. The current URL route is appended when
   * no AreRoute is already present in the state, so route-driven outlets still
   * resolve on the very first paint (before AreRouteWatcher has dispatched).
   */
  buildInitialVector(signalState) {
    const signals = [];
    if (signalState) {
      for (const signal of signalState.toVector()) {
        if (signal) signals.push(signal);
      }
    }
    if (!signals.some((signal) => signal instanceof AreRoute_signal.AreRoute)) {
      try {
        const currentRoute = AreRoute_signal.AreRoute.default();
        if (currentRoute) signals.push(currentRoute);
      } catch {
      }
    }
    return new aSignal.A_SignalVector(signals);
  }
  /**
   * Detach a displayed child subtree from the outlet and stash it in the cache
   * for fast re-injection later. The subtree is unmounted (its scene plan is
   * preserved) and deregistered from the root scope, but NOT destroyed. The
   * nodes that were subscribed to the signal bus are unsubscribed while cached
   * so the detached DOM never reacts to signals, and recorded so they can be
   * re-subscribed verbatim on restore.
   *
   * When no cache is available, or the LRU evicts an entry, the affected
   * subtree is fully destroyed.
   */
  stashChild(root, child, signalsContext, cache) {
    const tag = child.type;
    child.unmount();
    const subscribers = signalsContext ? this.collectSubscribers(child, signalsContext) : [];
    for (const node of subscribers) {
      signalsContext?.unsubscribe(node);
    }
    root.removeChild(child);
    if (!cache) {
      void child.destroy();
      return;
    }
    const evicted = cache.put(root.id, tag, { node: child, subscribers });
    for (const entry of evicted) {
      void entry.node.destroy();
    }
  }
  /**
   * Re-attach a cached subtree to the outlet and re-mount it from its preserved
   * scene plan, re-subscribing exactly the nodes that were subscribed before it
   * was cached.
   */
  restoreChild(root, entry, signalsContext) {
    const child = entry.node;
    root.addChild(child);
    for (const node of entry.subscribers) {
      signalsContext?.subscribe(node);
    }
    child.mount();
  }
  /**
   * Walk a subtree and collect the nodes currently registered as signal
   * subscribers. Mirrors the subscription performed at init time in
   * AreHTMLLifecycle (component nodes and root nodes) without depending on the
   * concrete node classes — it simply intersects the subtree with the live
   * subscriber registry.
   */
  collectSubscribers(node, signalsContext) {
    const result = [];
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      if (signalsContext.subscribers.has(current)) {
        result.push(current);
      }
      queue.push(...current.children);
    }
    return result;
  }
};
__decorateClass([
  are.Are.Template,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(2, aConcept.A_Inject(are.AreSignalsContext)),
  __decorateParam(3, aConcept.A_Inject(aSignal.A_SignalState))
], exports.AreRoot.prototype, "template", 1);
__decorateClass([
  are.Are.Signal,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aSignal.A_SignalVector)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(3, aConcept.A_Inject(are.AreSignalsContext)),
  __decorateParam(4, aConcept.A_Inject(AreRootCache_context.AreRootCache))
], exports.AreRoot.prototype, "onSignal", 1);
exports.AreRoot = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], exports.AreRoot);
//# sourceMappingURL=AreRoot.component.js.map
//# sourceMappingURL=AreRoot.component.js.map