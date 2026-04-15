import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';

let AreWatcher = class extends A_Component {
  constructor() {
    super();
    this.handlers = /* @__PURE__ */ new Set();
    this.current = new URL(window.location.href);
    // ── Listeners ─────────────────────────────────────────────────────────────
    this.onPopState = () => {
      this.notify();
    };
    this.onHashChange = () => {
      this.notify();
    };
    this.onURLChange = () => {
      this.notify();
    };
    this.patchHistory();
    this.attachListeners();
  }
  // ── Public ────────────────────────────────────────────────────────────────
  onChange(handler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
  get url() {
    return this.current;
  }
  destroy() {
    window.removeEventListener("popstate", this.onPopState);
    window.removeEventListener("hashchange", this.onHashChange);
    window.removeEventListener("urlchange", this.onURLChange);
    this.handlers.clear();
  }
  attachListeners() {
    window.addEventListener("popstate", this.onPopState);
    window.addEventListener("hashchange", this.onHashChange);
    window.addEventListener("urlchange", this.onURLChange);
  }
  // ── Patch pushState / replaceState ────────────────────────────────────────
  patchHistory() {
    const patch = (original) => function(...args) {
      original.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
    };
    history.pushState = patch(history.pushState);
    history.replaceState = patch(history.replaceState);
  }
  // ── Notify ────────────────────────────────────────────────────────────────
  notify() {
    const next = new URL(window.location.href);
    if (next.href === this.current.href) return;
    this.current = next;
    for (const handler of this.handlers) {
      handler(this.current);
    }
  }
};
AreWatcher = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreWatcher",
    description: "AreWatcher is a component that observes browser navigation events (history pushState, replaceState, and popstate) and notifies registered handlers when the URL changes, enabling client-side routing and reactive route-based rendering within the ARE framework."
  })
], AreWatcher);

export { AreWatcher };
//# sourceMappingURL=AreWatcher.component.mjs.map
//# sourceMappingURL=AreWatcher.component.mjs.map