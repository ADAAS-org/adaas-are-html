import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Feature, A_Meta, A_Component, A_Context } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreDirectiveMeta } from './AreDirective.meta';
import { AreDirectiveFeatures } from './AreDirective.constants';

let AreDirective = class extends A_Component {
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
      const meta = A_Context.meta(target);
      meta.priority = priority;
      return target;
    };
  }
  /**
   * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  static get Transform() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreDirectiveFeatures.Transform,
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
      return A_Feature.Extend({
        name: AreDirectiveFeatures.Compile,
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
      return A_Feature.Extend({
        name: AreDirectiveFeatures.Update,
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
    const logger = A_Context.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No transforming logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  compile(attribute, ...args) {
    const logger = A_Context.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  update(attribute, ...args) {
    const logger = A_Context.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
};
__decorateClass([
  __decorateParam(0, A_Inject(A_Caller))
], AreDirective.prototype, "transform", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreDirectiveFeatures.Compile,
    scope: [AreDirective]
  }),
  __decorateParam(0, A_Inject(A_Caller))
], AreDirective.prototype, "compile", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreDirectiveFeatures.Update,
    scope: [AreDirective]
  }),
  __decorateParam(0, A_Inject(A_Caller))
], AreDirective.prototype, "update", 1);
AreDirective = __decorateClass([
  A_Meta.Define(AreDirectiveMeta)
], AreDirective);

export { AreDirective };
//# sourceMappingURL=AreDirective.component.mjs.map
//# sourceMappingURL=AreDirective.component.mjs.map