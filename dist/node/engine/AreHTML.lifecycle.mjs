import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope, A_Feature, A_FormatterHelper } from '@adaas/a-concept';
import { AreLifecycle, AreSignalsContext, AreNodeFeatures, AreScene, AreAttributeFeatures } from '@adaas/are';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreComponentNode } from '@adaas/are-html/nodes/AreComponent';
import { AreRootNode } from '@adaas/are-html/nodes/AreRoot';
import { AreInterpolation } from '@adaas/are-html/nodes/AreInterpolation';
import { AreText } from '@adaas/are-html/nodes/AreText';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreDirectiveFeatures } from '@adaas/are-html/directive/AreDirective.constants';
import { AreHTMLEngineContext } from './AreHTML.context';
import { AreHTMLNode } from '../lib/AreHTMLNode/AreHTMLNode';
import { A_Frame } from '@adaas/a-frame/core';

let AreHTMLLifecycle = class extends AreLifecycle {
  initComponent(node, scope, context, signalsContext, logger, ...args) {
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
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (scene.isInactive) return;
    node.interpret();
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      child.mount();
    }
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
};
__decorateClass([
  AreLifecycle.Init(AreComponentNode),
  AreLifecycle.Init(AreRootNode),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreHTMLEngineContext)),
  __decorateParam(3, A_Inject(AreSignalsContext)),
  __decorateParam(4, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "initComponent", 1);
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
    name: AreNodeFeatures.onMount,
    scope: [AreHTMLNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLLifecycle.prototype, "mount", 1);
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
AreHTMLLifecycle = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific lifecycle handler extending AreLifecycle. Wires DOM-aware init hooks for component nodes, root nodes, interpolations, text nodes, and directive attributes to the ARE rendering pipeline, connecting each entity to its HTML engine context and priming the scene for subsequent compilation and interpretation."
  })
], AreHTMLLifecycle);

export { AreHTMLLifecycle };
//# sourceMappingURL=AreHTML.lifecycle.mjs.map
//# sourceMappingURL=AreHTML.lifecycle.mjs.map