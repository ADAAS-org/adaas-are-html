'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreDirective_component = require('@adaas/are-html/directive/AreDirective.component');
var AddComment_instruction = require('@adaas/are-html/instructions/AddComment.instruction');
var AreDirective_context = require('@adaas/are-html/directive/AreDirective.context');

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
exports.AreDirectiveIf = class AreDirectiveIf extends AreDirective_component.AreDirective {
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
    console.log('Compiling directive "if" with attribute content:', attribute);
    attribute.value = syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- if: ${attribute.template.id} --- `;
    const declaration = new AddComment_instruction.AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
    if (attribute.value)
      attribute.template.scene.activate();
    else
      attribute.template.scene.deactivate();
  }
  update(attribute, store, scope, syntax, scene, ...args) {
    attribute.value = syntax.evaluate(attribute.content, store);
    if (attribute.value) {
      attribute.template.scene.activate();
      attribute.template.mount();
    } else {
      attribute.template.unmount();
      attribute.template.scene.deactivate();
    }
  }
};
__decorateClass([
  AreDirective_component.AreDirective.Transform,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreScene)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective_component.AreDirective.Compile,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(are.AreScene)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext))
], exports.AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective_component.AreDirective.Update,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(are.AreScene))
], exports.AreDirectiveIf.prototype, "update", 1);
exports.AreDirectiveIf = __decorateClass([
  AreDirective_component.AreDirective.Priority(2)
], exports.AreDirectiveIf);
//# sourceMappingURL=AreDirectiveIf.directive.js.map
//# sourceMappingURL=AreDirectiveIf.directive.js.map