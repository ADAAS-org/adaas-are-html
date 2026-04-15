'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreDirective_attribute = require('@adaas/are-html/attributes/AreDirective.attribute');
var AreDirective_constants = require('@adaas/are-html/directive/AreDirective.constants');

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
class AreHTMLTransformer extends are.AreTransformer {
  transformDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirective_constants.AreDirectiveFeatures.Transform, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${aConcept.A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
}
__decorateClass([
  aConcept.A_Feature.Extend({
    name: are.AreAttributeFeatures.Transform,
    scope: [AreDirective_attribute.AreDirectiveAttribute]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreHTMLTransformer.prototype, "transformDirectiveAttribute");

exports.AreHTMLTransformer = AreHTMLTransformer;
//# sourceMappingURL=AreHTML.transformer.js.map
//# sourceMappingURL=AreHTML.transformer.js.map