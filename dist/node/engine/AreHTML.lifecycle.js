'use strict';

var aConcept = require('@adaas/a-concept');
var are = require('@adaas/are');
var aLogger = require('@adaas/a-utils/a-logger');
var AreComponent = require('@adaas/are-html/nodes/AreComponent');
var AreRoot = require('@adaas/are-html/nodes/AreRoot');
var AreInterpolation = require('@adaas/are-html/nodes/AreInterpolation');
var AreText = require('@adaas/are-html/nodes/AreText');
var AreDirective_attribute = require('@adaas/are-html/attributes/AreDirective.attribute');
var AreDirective_constants = require('@adaas/are-html/directive/AreDirective.constants');
var AreHTML_context = require('./AreHTML.context');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
class AreHTMLLifecycle extends are.AreLifecycle {
  initComponent(node, scope, context, logger, ...args) {
    super.init(node, scope, context, logger, ...args);
  }
  initRoot(node, scope, context, signalsContext, logger, ...args) {
    signalsContext?.subscribe(node);
    super.init(node, scope, context, logger, ...args);
  }
  initText(node, scope, context, logger, ...args) {
    const scene = new are.AreScene(node.aseid);
    scope.register(scene);
  }
  initInterpolation(node, scope, context, logger, ...args) {
    const scene = new are.AreScene(node.aseid);
    scope.register(scene);
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirective_constants.AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${aConcept.A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
}
__decorateClass([
  are.AreLifecycle.Init(AreComponent.AreComponentNode),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLLifecycle.prototype, "initComponent");
__decorateClass([
  are.AreLifecycle.Init(AreRoot.AreRootNode),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(are.AreSignalsContext)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLLifecycle.prototype, "initRoot");
__decorateClass([
  are.AreLifecycle.Init(AreText.AreText),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLLifecycle.prototype, "initText");
__decorateClass([
  are.AreLifecycle.Init(AreInterpolation.AreInterpolation),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLLifecycle.prototype, "initInterpolation");
__decorateClass([
  aConcept.A_Feature.Extend({
    name: are.AreAttributeFeatures.Update,
    scope: [AreDirective_attribute.AreDirectiveAttribute]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLLifecycle.prototype, "updateDirectiveAttribute");

exports.AreHTMLLifecycle = AreHTMLLifecycle;
//# sourceMappingURL=AreHTML.lifecycle.js.map
//# sourceMappingURL=AreHTML.lifecycle.js.map