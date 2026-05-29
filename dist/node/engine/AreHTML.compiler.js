'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var core = require('@adaas/a-frame/core');
var are = require('@adaas/are');
var AreDirective_attribute = require('@adaas/are-html/attributes/AreDirective.attribute');
var AreStatic_attribute = require('@adaas/are-html/attributes/AreStatic.attribute');
var AreDirective_constants = require('@adaas/are-html/directive/AreDirective.constants');
var AreEvent_attribute = require('@adaas/are-html/attributes/AreEvent.attribute');
var AreBinding_attribute = require('@adaas/are-html/attributes/AreBinding.attribute');
var AreInterpolation = require('@adaas/are-html/nodes/AreInterpolation');
var AreText = require('@adaas/are-html/nodes/AreText');
var AddAttribute_instruction = require('@adaas/are-html/instructions/AddAttribute.instruction');
var AddText_instruction = require('@adaas/are-html/instructions/AddText.instruction');
var AddListener_instruction = require('@adaas/are-html/instructions/AddListener.instruction');
var AddStyle_instruction = require('@adaas/are-html/instructions/AddStyle.instruction');
var node = require('@adaas/are-html/node');

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
exports.AreHTMLCompiler = class AreHTMLCompiler extends are.AreCompiler {
  compileHTMLNode(node, scene, logger, ...args) {
    super.compile(node, scene, logger, ...args);
    if (node.styles?.styles) {
      const host = scene.host;
      if (host) {
        scene.plan(new AddStyle_instruction.AddStyleInstruction(host, { styles: node.styles.styles }));
      }
    }
  }
  compileInterpolation(interpolation, scene, store, logger, ...args) {
    scene.plan(new AddText_instruction.AddTextInstruction({ content: interpolation.content, evaluate: true }));
  }
  compileText(text, scene, logger, ...args) {
    logger?.debug("cyan", `AreHTMLCompiler: compile text node <${text.aseid.toString()}> with content: "${text.content}"`);
    if (scene.host)
      scene.unPlan(scene.host);
    scene.plan(new AddText_instruction.AddTextInstruction({ content: text.content }));
  }
  compileStaticAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new are.AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const content = attribute.content;
    if (content.includes("{{")) {
      const transformed = '"' + content.replace(/\{\{([^}]+)\}\}/g, '"+($1)+"') + '"';
      scene.plan(new AddAttribute_instruction.AddAttributeInstruction(scene.host, {
        name: attribute.name,
        content: transformed,
        evaluate: true
      }));
      return;
    }
    scene.plan(new AddAttribute_instruction.AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content
    }));
  }
  compileDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirective_constants.AreDirectiveFeatures.Compile, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${aConcept.A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
  compileEventAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new are.AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    scene.plan(new AddListener_instruction.AddListenerInstruction(scene.host, {
      name: attribute.name,
      handler: attribute.content
    }));
  }
  compileBindingAttribute(attribute, scene, parentStore, store, syntax, ...args) {
    if (!scene.host)
      throw new are.AreCompilerError({
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
        const camel = aConcept.A_FormatterHelper.toCamelCase(attribute.name);
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
      const watcher = {
        update: () => {
          try {
            parentStore.watch(watcher);
            const next = coerce(syntax.evaluate(attribute.content, parentStore));
            parentStore.unwatch(watcher);
            store.set(propName, next);
          } catch (e) {
            parentStore.unwatch(watcher);
          }
        }
      };
      parentStore.watch(watcher);
      const initial = coerce(syntax.evaluate(attribute.content, parentStore));
      parentStore.unwatch(watcher);
      store.set(propName, initial);
      return;
    }
    const instruction = new AddAttribute_instruction.AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content,
      evaluate: true
    });
    scene.plan(instruction);
  }
};
__decorateClass([
  are.AreCompiler.Compile(node.AreHTMLNode),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLCompiler.prototype, "compileHTMLNode", 1);
__decorateClass([
  are.AreCompiler.Compile(AreInterpolation.AreInterpolation),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  are.AreCompiler.Compile(AreText.AreText),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLCompiler.prototype, "compileText", 1);
__decorateClass([
  are.AreCompiler.Compile(AreStatic_attribute.AreStaticAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene))
], exports.AreHTMLCompiler.prototype, "compileStaticAttribute", 1);
__decorateClass([
  are.AreCompiler.Compile(AreDirective_attribute.AreDirectiveAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLCompiler.prototype, "compileDirectiveAttribute", 1);
__decorateClass([
  are.AreCompiler.Compile(AreEvent_attribute.AreEventAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene))
], exports.AreHTMLCompiler.prototype, "compileEventAttribute", 1);
__decorateClass([
  are.AreCompiler.Compile(AreBinding_attribute.AreBindingAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreScene)),
  __decorateParam(2, aConcept.A_Dependency.Parent()),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreStore)),
  __decorateParam(4, aConcept.A_Inject(are.AreSyntax))
], exports.AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
exports.AreHTMLCompiler = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], exports.AreHTMLCompiler);
//# sourceMappingURL=AreHTML.compiler.js.map
//# sourceMappingURL=AreHTML.compiler.js.map