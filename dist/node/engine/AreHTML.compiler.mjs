import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Feature, A_Dependency, A_FormatterHelper } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_Frame } from '@adaas/a-frame';
import { AreCompiler, AreScene, AreStore, AreCompilerError } from '@adaas/are';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreStaticAttribute } from '@adaas/are-html/attributes/AreStatic.attribute';
import { AreDirectiveFeatures } from '@adaas/are-html/directive/AreDirective.constants';
import { AreEventAttribute } from '@adaas/are-html/attributes/AreEvent.attribute';
import { AreBindingAttribute } from '@adaas/are-html/attributes/AreBinding.attribute';
import { AreInterpolation } from '@adaas/are-html/nodes/AreInterpolation';
import { AreText } from '@adaas/are-html/nodes/AreText';
import { AddAttributeInstruction } from '@adaas/are-html/instructions/AddAttribute.instruction';
import { AddTextInstruction } from '@adaas/are-html/instructions/AddText.instruction';
import { AddListenerInstruction } from '@adaas/are-html/instructions/AddListener.instruction';

let AreHTMLCompiler = class extends AreCompiler {
  compileInterpolation(interpolation, scene, store, logger, ...args) {
    scene.plan(new AddTextInstruction({ content: interpolation.content, evaluate: true }));
  }
  compileText(text, scene, logger, ...args) {
    logger?.debug("cyan", `AreHTMLCompiler: compile text node <${text.aseid.toString()}> with content: "${text.content}"`);
    if (scene.host)
      scene.unPlan(scene.host);
    scene.plan(new AddTextInstruction({ content: text.content }));
  }
  compileStaticAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    scene.plan(new AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content
    }));
  }
  compileDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Compile, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
  compileEventAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    scene.plan(new AddListenerInstruction(scene.host, {
      name: attribute.name,
      handler: attribute.content
    }));
  }
  compileBindingAttribute(attribute, scene, parentStore, store, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const node = attribute.owner;
    if (node.component && node.component.props[attribute.name]) {
      const propDefinition = node.component.props[attribute.name];
      let value = parentStore.get(attribute.content);
      if (propDefinition.type) {
        switch (propDefinition.type) {
          case "string":
            value = String(value);
            break;
          case "number":
            value = Number(value);
            break;
          case "boolean":
            value = Boolean(value);
            break;
        }
      }
      store.set(attribute.name, value);
    } else {
      const instruction = new AddAttributeInstruction(scene.host, {
        name: attribute.name,
        content: attribute.content,
        evaluate: true
      });
      scene.plan(instruction);
    }
  }
};
__decorateClass([
  AreCompiler.Compile(AreInterpolation),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  AreCompiler.Compile(AreText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "compileText", 1);
__decorateClass([
  AreCompiler.Compile(AreStaticAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreHTMLCompiler.prototype, "compileStaticAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreDirectiveAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(A_Feature)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "compileDirectiveAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreEventAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreHTMLCompiler.prototype, "compileEventAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreBindingAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Dependency.Parent()),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreStore))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLCompiler",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);

export { AreHTMLCompiler };
//# sourceMappingURL=AreHTML.compiler.mjs.map
//# sourceMappingURL=AreHTML.compiler.mjs.map