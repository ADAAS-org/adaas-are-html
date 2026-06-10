import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirective } from '@adaas/are-html/directive/AreDirective.component';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';
import { HideElementInstruction } from '@adaas/are-html/instructions/HideElement.instruction';
import { A_Frame } from '@adaas/a-frame/core';

let AreDirectiveShow = class extends AreDirective {
  transform(attribute, logger, ...args) {
    logger.debug(`[Transform] directive $SHOW for <${attribute.owner.aseid.toString()}> (no structural change)`);
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    const visible = !!syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    attribute.value = visible;
    const hide = new HideElementInstruction(scene.host, {});
    attribute.cache = hide;
    if (!visible)
      scene.plan(hide);
  }
  update(attribute, store, scene, syntax, directiveContext, ...args) {
    const previous = !!attribute.value;
    const next = !!syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    attribute.value = next;
    if (previous === next) return;
    const hide = attribute.cache;
    if (!hide) return;
    if (next)
      scene.unPlan(hide);
    else
      scene.plan(hide);
    attribute.owner.interpret();
  }
};
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Logger))
], AreDirectiveShow.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext))
], AreDirectiveShow.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext))
], AreDirectiveShow.prototype, "update", 1);
AreDirectiveShow = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $show directive. Toggles an element's visibility by flipping its inline display value based on a store expression, keeping the element mounted (subtree, listeners and scene state preserved) instead of unmounting it like $if."
  }),
  AreDirective.Priority(3)
], AreDirectiveShow);

export { AreDirectiveShow };
//# sourceMappingURL=AreDirectiveShow.directive.mjs.map
//# sourceMappingURL=AreDirectiveShow.directive.mjs.map