import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Feature, A_Dependency, A_FormatterHelper } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_Frame } from '@adaas/a-frame/core';
import { AreCompiler, AreScene, AreStore, AreSyntax, AreCompilerError } from '@adaas/are';
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
import { AddStyleInstruction } from '@adaas/are-html/instructions/AddStyle.instruction';
import { AddStaticHTMLInstruction } from '@adaas/are-html/instructions/AddStaticHTML.instruction';
import { AreHTMLNode } from '@adaas/are-html/node';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';

let AreHTMLCompiler = class extends AreCompiler {
  compileHTMLNode(node, scene, logger, ...args) {
    super.compile(node, scene, logger, ...args);
    if (node.isStaticIsland && scene.host) {
      scene.plan(new AddStaticHTMLInstruction(scene.host, { html: node.staticInnerHTML }));
    }
    if (node.styles?.styles) {
      const host = scene.host;
      if (host) {
        scene.plan(new AddStyleInstruction(host, { styles: node.styles.styles }));
      }
    }
  }
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
    const content = attribute.content;
    if (content.includes("{{")) {
      const transformed = '"' + content.replace(/\{\{([^}]+)\}\}/g, '"+($1)+"') + '"';
      scene.plan(new AddAttributeInstruction(scene.host, {
        name: attribute.name,
        content: transformed,
        evaluate: true
      }));
      return;
    }
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
  compileBindingAttribute(attribute, scene, parentStore, store, syntax, directiveContext, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const node = attribute.owner;
    const props = node.component?.props;
    let propName;
    if (props) {
      if (props[attribute.name]) {
        propName = attribute.name;
      } else {
        const camel = A_FormatterHelper.toCamelCase(attribute.name);
        if (props[camel]) propName = camel;
      }
    }
    if (propName && props) {
      const propDefinition = props[propName];
      const coerce = (raw) => {
        let value = raw;
        if (propDefinition.type) {
          switch (propDefinition.type) {
            case "string":
              value = value === void 0 || value === null ? "" : String(value);
              break;
            case "number":
              value = Number(value);
              break;
            case "boolean":
              value = Boolean(value);
              break;
          }
        }
        return value;
      };
      const directiveScope = () => directiveContext?.scope ?? {};
      const watcher = {
        update: () => {
          try {
            parentStore.watch(watcher);
            const next = coerce(syntax.evaluate(attribute.content, parentStore, directiveScope()));
            parentStore.unwatch(watcher);
            store.set(propName, next);
          } catch (e) {
            parentStore.unwatch(watcher);
          }
        }
      };
      parentStore.watch(watcher);
      const initial = coerce(syntax.evaluate(attribute.content, parentStore, directiveScope()));
      parentStore.unwatch(watcher);
      store.set(propName, initial);
      return;
    }
    const instruction = new AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content,
      evaluate: true
    });
    scene.plan(instruction);
  }
};
__decorateClass([
  AreCompiler.Compile(AreHTMLNode),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "compileHTMLNode", 1);
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
  __decorateParam(3, A_Inject(AreStore)),
  __decorateParam(4, A_Inject(AreSyntax)),
  __decorateParam(5, A_Inject(AreDirectiveContext))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);

export { AreHTMLCompiler };
//# sourceMappingURL=AreHTML.compiler.mjs.map
//# sourceMappingURL=AreHTML.compiler.mjs.map