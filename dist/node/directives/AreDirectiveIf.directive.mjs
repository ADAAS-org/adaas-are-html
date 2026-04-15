import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirective } from '@adaas/are-html/directive/AreDirective.component';
import { AddCommentInstruction } from '@adaas/are-html/instructions/AddComment.instruction';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';

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
    console.log('Compiling directive "if" with attribute content:', attribute);
    attribute.value = syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
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
  __decorateParam(4, A_Inject(AreScene))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  AreDirective.Priority(2)
], AreDirectiveIf);

export { AreDirectiveIf };
//# sourceMappingURL=AreDirectiveIf.directive.mjs.map
//# sourceMappingURL=AreDirectiveIf.directive.mjs.map