import {
  AreSignal,
  R2 as R,
  __decorateClass,
  __name
} from "./chunk-6K72IBO4.js";

// examples/os-desktop/src/signals/MouseState.signal.ts
var MouseState = class extends AreSignal {
  constructor(x, y) {
    super({ data: { x, y } });
  }
  get x() {
    return this.data.x;
  }
  get y() {
    return this.data.y;
  }
};
__name(MouseState, "MouseState");
MouseState = __decorateClass([
  R.Define({
    namespace: "a-are-os-desktop",
    description: "Live pointer-position state signal {x, y}. Emitted throttled from a global mousemove listener and consumed by the HUD via a typed @Are.Signal(MouseState) handler."
  })
], MouseState);

export {
  MouseState
};
