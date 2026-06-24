import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirective } from '@adaas/are-html/directive/AreDirective.component';
import { AddCommentInstruction } from '@adaas/are-html/instructions/AddComment.instruction';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';
import { A_Frame } from '@adaas/a-frame/core';

let AreDirectiveIf = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $IF for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const ifTemplate = node.cloneWithScope();
    const ifAttr = ifTemplate.attributes.find((d) => d.name === attribute.name);
    if (ifAttr) {
      ifTemplate.scope.deregister(ifAttr);
      node.scope.register(ifAttr);
    }
    node.init();
    node.addChild(ifTemplate);
    ifTemplate.scene.deactivate();
    attribute.template = ifTemplate;
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    attribute.value = this.evaluateCondition(syntax, attribute, store, directiveContext);
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- if: ${attribute.template.id} --- `;
    const declaration = new AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
    if (attribute.value)
      attribute.template.scene.activate();
    else
      attribute.template.scene.deactivate();
  }
  update(attribute, store, scope, syntax, scene, directiveContext, ...args) {
    const previous = !!attribute.value;
    const next = this.evaluateCondition(syntax, attribute, store, directiveContext);
    attribute.value = next;
    if (previous === next) return;
    if (next) {
      attribute.template.scene.activate();
      attribute.template.mount();
    } else {
      attribute.template.unmount();
      attribute.template.scene.deactivate();
    }
  }
  /**
   * Evaluates the `$if` condition defensively.
   *
   * A condition can reference data that is momentarily unavailable — most
   * commonly a nested `$if` (e.g. `$if="selected.fields.length"`) living
   * inside a parent `$if="selected"` whose object has just become `null`.
   * Because the nested directive is still subscribed to the store, its
   * update fires on that same change and the raw expression would throw
   * `Cannot read properties of null`, crashing the whole update pipeline.
   *
   * Treating an evaluation error as `false` is the correct contract for a
   * conditional: if the condition cannot be resolved, the subtree simply
   * stays hidden until the referenced data is present again (at which point
   * the parent `$if` re-activates and re-evaluates this one).
   */
  evaluateCondition(syntax, attribute, store, directiveContext) {
    try {
      return !!syntax.evaluate(attribute.content, store, {
        ...directiveContext?.scope || {}
      });
    } catch {
      return false;
    }
  }
};
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Logger))
], AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext))
], AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreScene)),
  __decorateParam(5, A_Inject(AreDirectiveContext))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $if directive. Conditionally renders a subtree based on a store expression. Replaces the target element with a stable comment anchor when the condition is false and restores the fully rendered subtree when it becomes true, preventing any leaking of the host element between states."
  }),
  AreDirective.Priority(2)
], AreDirectiveIf);

export { AreDirectiveIf };
//# sourceMappingURL=AreDirectiveIf.directive.mjs.map
//# sourceMappingURL=AreDirectiveIf.directive.mjs.map