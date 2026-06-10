'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreDirective_component = require('@adaas/are-html/directive/AreDirective.component');
var AreDirective_context = require('@adaas/are-html/directive/AreDirective.context');
var HideElement_instruction = require('@adaas/are-html/instructions/HideElement.instruction');
var core = require('@adaas/a-frame/core');

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
exports.AreDirectiveShow = class AreDirectiveShow extends AreDirective_component.AreDirective {
  transform(attribute, logger, ...args) {
    logger.debug(`[Transform] directive $SHOW for <${attribute.owner.aseid.toString()}> (no structural change)`);
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    const visible = !!syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    attribute.value = visible;
    const hide = new HideElement_instruction.HideElementInstruction(scene.host, {});
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
  AreDirective_component.AreDirective.Transform,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreDirectiveShow.prototype, "transform", 1);
__decorateClass([
  AreDirective_component.AreDirective.Compile,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(are.AreScene)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext))
], exports.AreDirectiveShow.prototype, "compile", 1);
__decorateClass([
  AreDirective_component.AreDirective.Update,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(are.AreScene)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext))
], exports.AreDirectiveShow.prototype, "update", 1);
exports.AreDirectiveShow = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $show directive. Toggles an element's visibility by flipping its inline display value based on a store expression, keeping the element mounted (subtree, listeners and scene state preserved) instead of unmounting it like $if."
  }),
  AreDirective_component.AreDirective.Priority(3)
], exports.AreDirectiveShow);
//# sourceMappingURL=AreDirectiveShow.directive.js.map
//# sourceMappingURL=AreDirectiveShow.directive.js.map