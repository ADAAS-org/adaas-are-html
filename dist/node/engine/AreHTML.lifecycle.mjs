import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope, A_Feature, A_FormatterHelper } from '@adaas/a-concept';
import { AreLifecycle, AreSignalsContext, AreAttributeFeatures, AreScene } from '@adaas/are';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreComponentNode } from '@adaas/are-html/nodes/AreComponent';
import { AreRootNode } from '@adaas/are-html/nodes/AreRoot';
import { AreInterpolation } from '@adaas/are-html/nodes/AreInterpolation';
import { AreText } from '@adaas/are-html/nodes/AreText';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreDirectiveFeatures } from '@adaas/are-html/directive/AreDirective.constants';
import { AreHTMLEngineContext } from './AreHTML.context';

class AreHTMLLifecycle extends AreLifecycle {
  initComponent(node, scope, context, logger, ...args) {
    super.init(node, scope, context, logger, ...args);
  }
  initRoot(node, scope, context, signalsContext, logger, ...args) {
    signalsContext?.subscribe(node);
    super.init(node, scope, context, logger, ...args);
  }
  initText(node, scope, context, logger, ...args) {
    const scene = new AreScene(node.aseid);
    scope.register(scene);
  }
  initInterpolation(node, scope, context, logger, ...args) {
    const scene = new AreScene(node.aseid);
    scope.register(scene);
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
}
__decorateClass([
  AreLifecycle.Init(AreComponentNode),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreHTMLEngineContext)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "initComponent", 1);
__decorateClass([
  AreLifecycle.Init(AreRootNode),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreHTMLEngineContext)),
  __decorateParam(3, A_Inject(AreSignalsContext)),
  __decorateParam(4, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "initRoot", 1);
__decorateClass([
  AreLifecycle.Init(AreText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreHTMLEngineContext)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "initText", 1);
__decorateClass([
  AreLifecycle.Init(AreInterpolation),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreHTMLEngineContext)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "initInterpolation", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreAttributeFeatures.Update,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "updateDirectiveAttribute", 1);

export { AreHTMLLifecycle };
//# sourceMappingURL=AreHTML.lifecycle.mjs.map
//# sourceMappingURL=AreHTML.lifecycle.mjs.map