import {
  AreSignal,
  R2 as R,
  __decorateClass,
  __name
} from "./chunk-6K72IBO4.js";

// examples/os-desktop/src/signals/SelectionState.signal.ts
var SelectionState = class extends AreSignal {
  constructor(text) {
    super({ data: { text, length: text.length } });
  }
  get text() {
    return this.data.text;
  }
  get length() {
    return this.data.length;
  }
};
__name(SelectionState, "SelectionState");
SelectionState = __decorateClass([
  R.Define({
    namespace: "a-are-os-desktop",
    description: "Current text-selection state signal {text, length}. Emitted from a global selectionchange listener and consumed independently by the OS HUD and the Marketing app."
  })
], SelectionState);

export {
  SelectionState
};
