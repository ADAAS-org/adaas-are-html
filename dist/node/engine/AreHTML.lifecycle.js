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
var AreHTMLNode = require('../lib/AreHTMLNode/AreHTMLNode');
var core = require('@adaas/a-frame/core');
var AreScheduler_helper = require('@adaas/are-html/helpers/AreScheduler.helper');

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
exports.AreHTMLLifecycle = class AreHTMLLifecycle extends are.AreLifecycle {
  initComponent(node, scope, context, signalsContext, logger, ...args) {
    if (node.component)
      signalsContext?.subscribe(node);
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
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (scene.isInactive) return;
    node.interpret();
    const stack = [];
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push({ node: node.children[i], entered: false });
    }
    const step = () => {
      const frame = stack[stack.length - 1];
      const current = frame.node;
      if (frame.entered) {
        stack.pop();
        current.call(are.AreNodeFeatures.onAfterMount, current.scope);
        return;
      }
      frame.entered = true;
      current.call(are.AreNodeFeatures.onBeforeMount, current.scope);
      if (!current.scene.isInactive) {
        current.interpret();
        for (let i = current.children.length - 1; i >= 0; i--) {
          stack.push({ node: current.children[i], entered: false });
        }
      }
    };
    const drive = () => {
      const start = AreScheduler_helper.AreSchedulerHelper.now();
      while (stack.length > 0) {
        step();
        if (stack.length > 0 && AreScheduler_helper.AreSchedulerHelper.now() - start >= exports.AreHTMLLifecycle.MOUNT_BUDGET_MS) {
          return new Promise((resolve, reject) => {
            AreScheduler_helper.AreSchedulerHelper.scheduleMacrotask(() => {
              try {
                resolve(drive());
              } catch (error) {
                reject(error);
              }
            });
          });
        }
      }
    };
    return drive();
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirective_constants.AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${aConcept.A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
};
/**
 * Per-chunk time budget (ms) for the time-sliced initial mount walk. While
 * mounting a large subtree we keep applying nodes until this much wall-clock
 * time has elapsed, then yield to the browser so it can paint and process
 * input before the next chunk. ~16ms targets a single animation frame.
 */
exports.AreHTMLLifecycle.MOUNT_BUDGET_MS = 16;
__decorateClass([
  are.AreLifecycle.Init(AreComponent.AreComponentNode),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(are.AreSignalsContext)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "initComponent", 1);
__decorateClass([
  are.AreLifecycle.Init(AreRoot.AreRootNode),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(are.AreSignalsContext)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "initRoot", 1);
__decorateClass([
  are.AreLifecycle.Init(AreText.AreText),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "initText", 1);
__decorateClass([
  are.AreLifecycle.Init(AreInterpolation.AreInterpolation),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "initInterpolation", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: are.AreNodeFeatures.onMount,
    scope: [AreHTMLNode.AreHTMLNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "mount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: are.AreAttributeFeatures.Update,
    scope: [AreDirective_attribute.AreDirectiveAttribute]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLLifecycle.prototype, "updateDirectiveAttribute", 1);
exports.AreHTMLLifecycle = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific lifecycle handler extending AreLifecycle. Wires DOM-aware init hooks for component nodes, root nodes, interpolations, text nodes, and directive attributes to the ARE rendering pipeline, connecting each entity to its HTML engine context and priming the scene for subsequent compilation and interpretation."
  })
], exports.AreHTMLLifecycle);
//# sourceMappingURL=AreHTML.lifecycle.js.map
//# sourceMappingURL=AreHTML.lifecycle.js.map