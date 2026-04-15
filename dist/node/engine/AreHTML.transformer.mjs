import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_FormatterHelper } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreAttributeFeatures, AreStore, AreTransformer } from '@adaas/are';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreDirectiveFeatures } from '@adaas/are-html/directive/AreDirective.constants';

class AreHTMLTransformer extends AreTransformer {
  transformDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Transform, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
}
__decorateClass([
  A_Feature.Extend({
    name: AreAttributeFeatures.Transform,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(A_Feature)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLTransformer.prototype, "transformDirectiveAttribute", 1);

export { AreHTMLTransformer };
//# sourceMappingURL=AreHTML.transformer.mjs.map
//# sourceMappingURL=AreHTML.transformer.mjs.map