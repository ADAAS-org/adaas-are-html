'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var AreDirective_meta = require('./AreDirective.meta');
var AreDirective_constants = require('./AreDirective.constants');

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
exports.AreDirective = class AreDirective extends aConcept.A_Component {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  /**
   * Allows to define a compilation order for directives, which is necessary when we have multiple directives on the same node and we want to control the order of their compilation and application. The directive with the highest priority will be compiled and applied first, and the directive with the lowest priority will be compiled and applied last. This is important because some directives may depend on the output of other directives, so we need to ensure that they are compiled and applied in the correct order to avoid errors and ensure the expected behavior.
   * 
   * @param priority 
   * @returns 
   */
  static Priority(priority) {
    return function(target) {
      const meta = aConcept.A_Context.meta(target);
      meta.priority = priority;
      return target;
    };
  }
  /**
   * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  static get Transform() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreDirective_constants.AreDirectiveFeatures.Transform,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for compiling a directive attribute into a set of SceneInstructions. 
   * Can be used at any component to extend this logic not only for a AreDirective inherited.
   */
  static get Compile() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreDirective_constants.AreDirectiveFeatures.Compile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for updating a directive attribute based on changes in the store or other dependencies.
   * Can be used at any component to extend this logic not only for a AreDirective inherited.
   */
  static get Update() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreDirective_constants.AreDirectiveFeatures.Update,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Default transform method for directives, which can be overridden by specific directive implementations. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   * 
   * @param attribute - The directive attribute to transform, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
   * @param args - Additional arguments that may be required for the transformation process.
   */
  transform(attribute, ...args) {
    const logger = aConcept.A_Context.scope(this).resolve(aLogger.A_Logger);
    if (logger) {
      logger.warning(`No transforming logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  compile(attribute, ...args) {
    const logger = aConcept.A_Context.scope(this).resolve(aLogger.A_Logger);
    if (logger) {
      logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  update(attribute, ...args) {
    const logger = aConcept.A_Context.scope(this).resolve(aLogger.A_Logger);
    if (logger) {
      logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
};
__decorateClass([
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller))
], exports.AreDirective.prototype, "transform", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreDirective_constants.AreDirectiveFeatures.Compile,
    scope: [exports.AreDirective]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller))
], exports.AreDirective.prototype, "compile", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreDirective_constants.AreDirectiveFeatures.Update,
    scope: [exports.AreDirective]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller))
], exports.AreDirective.prototype, "update", 1);
exports.AreDirective = __decorateClass([
  aConcept.A_Meta.Define(AreDirective_meta.AreDirectiveMeta)
], exports.AreDirective);
//# sourceMappingURL=AreDirective.component.js.map
//# sourceMappingURL=AreDirective.component.js.map