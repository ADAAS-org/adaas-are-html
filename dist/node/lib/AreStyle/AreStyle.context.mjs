import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Fragment } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';

let AreStyle = class extends A_Fragment {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
};
AreStyle = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Context fragment that holds the resolved CSS style rules string for a component scope. Populated during lifecycle initialisation and read by the compiler when emitting AddStyle instructions for inline styles declared on the component host element."
  })
], AreStyle);

export { AreStyle };
//# sourceMappingURL=AreStyle.context.mjs.map
//# sourceMappingURL=AreStyle.context.mjs.map