import { AreStore, AreScene, AreSyntax, AreCompiler, AreInterpreter, AreInstructionDefaultNames, AreNodeFeatures, AreContext, AreLifecycle, AreSignalsContext, AreAttributeFeatures, Are, AreNode, AreAttribute, AreCompilerError, AreMutation, AreDeclaration, AreSignal, AreInterpreterError, AreTokenizer, AreTransformer, AreEngine, AreRoute as AreRoute$1, AreSignals, AreEvent } from '@adaas/are';
import { A_Frame } from '@adaas/a-frame/core';
import { A_Inject, A_Caller, A_Feature, A_Meta, A_Scope, A_Dependency, A_Component, A_Context, A_ComponentMeta, A_FormatterHelper, A_Fragment } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Route } from '@adaas/a-utils/a-route';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_SignalVector } from '@adaas/a-utils/a-signal';

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
var AreHTMLAttribute = class extends AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
AreHTMLAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Base class for all typed HTML attributes in the ARE framework. Provides typed access to the owning AreHTMLNode via the scope injector so that attribute subclasses can inspect host-node properties and resolve store bindings during transformation, compilation, and lifecycle phases."
  })
], AreHTMLAttribute);
var AreBindingAttribute = class extends AreHTMLAttribute {
  // get value(): string {
  //     const [firstPart, ...pathPart] = this.content.split('.');
  //     const primaryObject = this.owner.store.get(firstPart);
  //     return AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.')) as string;
  // }
};
AreBindingAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for two-way value bindings (: prefix). Marks that the attribute value should be resolved dynamically from the node store rather than used verbatim, enabling reactive updates whenever the underlying store value changes during a rendering cycle."
  })
], AreBindingAttribute);
var AreDirectiveAttribute = class extends AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${A_FormatterHelper.toPascalCase(this.name)}`);
    return component;
  }
};
AreDirectiveAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for directive invocations ($ prefix). Carries the resolved directive component class and a cloned template node. The associated directive uses these during its Compile phase to emit conditional or repeated instruction groups and to manage per-item or per-condition subscopes."
  })
], AreDirectiveAttribute);
var AreEventAttribute = class extends AreHTMLAttribute {
};
AreEventAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding \u2014 the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element."
  })
], AreEventAttribute);
var AreStaticAttribute = class extends AreHTMLAttribute {
};
AreStaticAttribute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attribute type for plain static HTML attributes with no dynamic prefix. Its value is emitted verbatim via an AddAttribute instruction at compile time and does not participate in reactive update cycles."
  })
], AreStaticAttribute);
var AreDirectiveMeta = class extends A_ComponentMeta {
  constructor() {
    super(...arguments);
    this.priority = 0;
  }
};

// src/lib/AreDirective/AreDirective.constants.ts
var AreDirectiveFeatures = {
  /**
   * Feature that should transform the tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  Transform: "_AreDirective_Transform",
  /**
   * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
   */
  Compile: "_AreDirective_Compile",
  /**
   * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. 
   */
  Update: "_AreDirective_Update"
};
var AreDirective = class extends A_Component {
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
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Abstract base component for all ARE directive types. Provides lifecycle decorators (Transform, Compile, Apply, Revert, Priority) that subclasses hook into at each pipeline stage. Subclasses implement Transform to rewrite the attribute or template node, Compile to emit scene instructions, Apply to activate them in the DOM, and Revert to undo them on removal."
  }),
  A_Meta.Define(AreDirectiveMeta)
], AreDirective);

// src/instructions/AreHTML.instructions.constants.ts
var AreHTMLInstructions = {
  AddElement: "_AreHTML_AddElement",
  AddText: "_AreHTML_AddText",
  AddAttribute: "_AreHTML_AddAttribute",
  AddStyle: "_AreHTML_AddStyle",
  AddListener: "_AreHTML_AddListener",
  AddInterpolation: "_AreHTML_AddInterpolation",
  AddComment: "_AreHTML_AddComment"
};

// src/instructions/AddComment.instruction.ts
var AddCommentInstruction = class extends AreDeclaration {
  get content() {
    return this.payload.content;
  }
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddComment, props);
    }
  }
};
AddCommentInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Appends a comment node to an element. Apply creates the comment node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddCommentInstruction);
var AreDirectiveContext = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.scope = {};
  }
};
var AreDirectiveFor = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $FOR for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const forTemplate = node.cloneWithScope();
    const forAttr = forTemplate.attributes.find((d) => d.name === attribute.name);
    if (forAttr) {
      forTemplate.scope.deregister(forAttr);
      node.scope.register(forAttr);
    }
    node.init();
    attribute.template = forTemplate;
    const { key, index, arrayExpr } = this.parseExpression(attribute.content);
    const array = this.resolveArray(store, arrayExpr, attribute.content);
    attribute.value = array;
    for (let i = 0; i < array.length; i++) {
      this.spawnItemNode(attribute.template, attribute.owner, key, index, array[i], i);
    }
  }
  compile(attribute, store, scene, ...args) {
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- for: ${attribute.template.id} --- `;
    const declaration = new AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
  }
  update(attribute, store, scene, ...args) {
    const { key, index, arrayExpr, trackExpr } = this.parseExpression(attribute.content);
    const newArray = this.resolveArray(store, arrayExpr, attribute.content);
    const owner = attribute.owner;
    const currentChildren = [...owner.children];
    attribute.value = newArray;
    const computeKey = this.makeKeyFn(key, index, trackExpr);
    const childByKey = /* @__PURE__ */ new Map();
    const remaining = /* @__PURE__ */ new Set();
    for (let i = 0; i < currentChildren.length; i++) {
      const child = currentChildren[i];
      const ctx = child.scope.resolveFlat(AreDirectiveContext);
      const k = ctx ? computeKey(ctx.scope[key], ctx.scope[index || "index"]) : /* @__PURE__ */ Symbol("orphan");
      childByKey.set(k, child);
      remaining.add(child);
    }
    const newOnes = [];
    for (let i = 0; i < newArray.length; i++) {
      const item = newArray[i];
      const k = computeKey(item, i);
      const existing = childByKey.get(k);
      if (existing) {
        remaining.delete(existing);
        let directiveContext = existing.scope.resolveFlat(AreDirectiveContext);
        if (!directiveContext) {
          directiveContext = new AreDirectiveContext(existing.aseid);
          existing.scope.register(directiveContext);
        }
        directiveContext.scope = {
          ...directiveContext.scope,
          [key]: item,
          [index || "index"]: i
        };
      } else {
        const itemNode = this.spawnItemNode(attribute.template, owner, key, index, item, i);
        newOnes.push(itemNode);
      }
    }
    for (const child of remaining) {
      child.unmount();
      owner.removeChild(child);
    }
    for (const child of newOnes) {
      child.transform();
      child.compile();
      child.mount();
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Helpers ──────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Build a key-function that derives a stable identity from each item.
   * If the user provided a `track <expr>` clause, evaluate it as a path on
   * the item; otherwise fall back to the item identity (reference equality).
   */
  makeKeyFn(key, index, trackExpr) {
    if (!trackExpr) {
      return (item, i) => item ?? i;
    }
    const path = trackExpr.startsWith(key + ".") ? trackExpr.slice(key.length + 1) : trackExpr;
    return (item, i) => {
      if (item == null) return i;
      if (path === key || path === "$index") return path === "$index" ? i : item;
      const parts = path.split(".");
      let v = item;
      for (const p of parts) {
        if (v == null) return i;
        v = v[p];
      }
      return v ?? i;
    };
  }
  /**
   * Parses the $for expression string into its constituent parts.
   *
   * Supported formats:
   *   item in items
   *   item, index in items
   *   (item, index) in items
   *   item in filter(items)
   *   item, index in filter(items, 'active')
   *   item in items track item.id
   *   (item, i) in items track item.id
   */
  parseExpression(content) {
    let trackExpr;
    const trackIdx = content.search(/\s+track\s+/);
    let body = content;
    if (trackIdx !== -1) {
      const m = content.slice(trackIdx).match(/\s+track\s+(.+)$/);
      if (m) {
        trackExpr = m[1].trim();
        body = content.slice(0, trackIdx).trim();
      }
    }
    const inIndex = body.lastIndexOf(" in ");
    const keyAndIndex = body.slice(0, inIndex).trim().replace(/^\(|\)$/g, "");
    const arrayExpr = body.slice(inIndex + 4).trim();
    const keyParts = keyAndIndex.split(",").map((p) => p.trim());
    return {
      key: keyParts[0],
      index: keyParts[1] || void 0,
      arrayExpr,
      trackExpr
    };
  }
  /**
   * Resolves the array expression against the store.
   * Supports both plain key lookups and function-call expressions:
   *   items          → store.get('items')
   *   filter(items)  → store.get('filter')(store.get('items'))
   */
  resolveArray(store, arrayExpr, fullContent) {
    let result;
    const callMatch = arrayExpr.match(/^([^(]+)\((.+)\)$/);
    if (callMatch) {
      const fnName = callMatch[1].trim();
      const fn = store.get(fnName);
      if (typeof fn !== "function")
        throw new AreCompilerError({
          title: 'Invalid "for" Directive Function',
          description: `The expression "${fnName}" in the "for" directive does not resolve to a function in the store. Received: ${typeof fn}`
        });
      const rawArgs = callMatch[2].split(",").map((a) => a.trim());
      const resolvedArgs = rawArgs.map((arg) => {
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
        if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
        if (!isNaN(Number(arg))) return Number(arg);
        const stripped = arg.replace(/\?$/, "");
        if (stripped.includes(".")) {
          const parts = stripped.split(".").map((p) => p.replace(/\?$/, ""));
          let val = store.get(parts[0]);
          for (let j = 1; j < parts.length; j++) {
            if (val == null) return void 0;
            val = val[parts[j]];
          }
          return val ?? void 0;
        }
        return store.get(stripped);
      });
      result = fn(...resolvedArgs);
    } else if (arrayExpr.includes(".")) {
      const parts = arrayExpr.split(".").map((p) => p.replace(/\?$/, ""));
      result = store.get(parts[0]);
      for (let i = 1; i < parts.length; i++) {
        if (result == null) break;
        result = result[parts[i]];
      }
    } else {
      result = store.get(arrayExpr.replace(/\?$/, ""));
    }
    if (result == null) return [];
    if (!Array.isArray(result))
      throw new AreCompilerError({
        title: 'Invalid "for" Directive Value',
        description: `The "for" directive expects an array but got ${typeof result}. Expression: "${fullContent}". Received: ${JSON.stringify(result)}`
      });
    return result;
  }
  /**
   * Creates a single item node from the template, registers it as a child of
   * the owner, initialises it, injects item-scoped store values, and activates
   * its scene so the mount/compile cycle will include it.
   *
   * NOTE: This method does NOT call compile() or mount() — the caller is
   * responsible for doing so when the main lifecycle cycle won't cover it
   * (i.e. during update, but not during the initial compile phase).
   */
  spawnItemNode(template, owner, key, index, item, i) {
    const itemNode = template.clone();
    owner.addChild(itemNode);
    const queue = [itemNode];
    while (queue.length > 0) {
      const current = queue.shift();
      current.init();
      queue.push(...current.children);
    }
    let directiveContext = itemNode.scope.resolveFlat(AreDirectiveContext);
    if (!directiveContext) {
      directiveContext = new AreDirectiveContext(itemNode.aseid);
      itemNode.scope.register(directiveContext);
    }
    directiveContext.scope = {
      ...directiveContext.scope,
      [key]: item,
      [index || "index"]: i
    };
    itemNode.scene.activate();
    return itemNode;
  }
};
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Logger))
], AreDirectiveFor.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene))
], AreDirectiveFor.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene))
], AreDirectiveFor.prototype, "update", 1);
AreDirectiveFor = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $for directive. Iterates over an array expression resolved from the store and renders a cloned template fragment per item, managing per-item subscopes and comment-node anchors. Supports keyed diffing via an optional track clause to minimise DOM mutations on collection updates."
  }),
  AreDirective.Priority(1)
], AreDirectiveFor);
var AreDirectiveIf = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $IF for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const ifTemplate = node.cloneWithScope();
    const ifAttr = ifTemplate.attributes.find((d) => d.name === attribute.name);
    if (ifAttr) {
      ifTemplate.scope.deregister(ifAttr);
      node.scope.register(ifAttr);
    }
    node.init();
    node.addChild(ifTemplate);
    ifTemplate.scene.deactivate();
    attribute.template = ifTemplate;
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    attribute.value = syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- if: ${attribute.template.id} --- `;
    const declaration = new AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
    if (attribute.value)
      attribute.template.scene.activate();
    else
      attribute.template.scene.deactivate();
  }
  update(attribute, store, scope, syntax, scene, ...args) {
    const previous = !!attribute.value;
    const next = !!syntax.evaluate(attribute.content, store);
    attribute.value = next;
    if (previous === next) return;
    if (next) {
      attribute.template.scene.activate();
      attribute.template.mount();
    } else {
      attribute.template.unmount();
      attribute.template.scene.deactivate();
    }
  }
};
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Logger))
], AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext))
], AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreScene))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $if directive. Conditionally renders a subtree based on a store expression. Replaces the target element with a stable comment anchor when the condition is false and restores the fully rendered subtree when it becomes true, preventing any leaking of the host element between states."
  }),
  AreDirective.Priority(2)
], AreDirectiveIf);
var AddAttributeInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddAttribute, parent, props);
    }
  }
};
AddAttributeInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute."
  })
], AddAttributeInstruction);
var AddElementInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddElement, props);
    }
  }
};
AddElementInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Creates a new HTML element in the DOM. Apply creates the element; revert removes it."
  })
], AddElementInstruction);
var AddInterpolationInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddInterpolation, parent, props);
    }
  }
};
AddInterpolationInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Appends a reactive text node whose content is resolved dynamically from the store. Apply creates the text node with the getter; revert removes it."
  })
], AddInterpolationInstruction);
var AddListenerInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddListener, parent, props);
    }
  }
};
AddListenerInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], AddListenerInstruction);
var AddStyleInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddStyle, parent, props);
    }
  }
};
AddStyleInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Sets an inline CSS style property on an element. Apply sets the property; revert removes it."
  })
], AddStyleInstruction);
var AddTextInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddText, props);
    }
  }
};
AddTextInstruction = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddTextInstruction);
var AreStyle = class extends A_Fragment {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
};
AreStyle = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Context fragment that holds the resolved CSS style rules string for a component scope. Populated during lifecycle initialisation and read by the compiler when emitting AddStyle instructions for inline styles declared on the component host element."
  })
], AreStyle);

// src/lib/AreHTMLNode/AreHTMLNode.ts
var AreHTMLNode = class extends AreNode {
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get tag() {
    return this.aseid.entity;
  }
  /**
    * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
    * 
    * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
    */
  get staticAttributes() {
    return this.scope.resolveFlatAll(AreStaticAttribute);
  }
  /**
   * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
   * 
   * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
   */
  get bindings() {
    return this.scope.resolveFlatAll(AreBindingAttribute);
  }
  /**
   * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
   * 
   * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
   */
  get directives() {
    const directives = this.scope.resolveFlatAll(AreDirectiveAttribute);
    return directives.filter((d) => d.component).sort((a, b) => {
      const aMeta = A_Context.meta(a.component);
      const bMeta = A_Context.meta(b.component);
      const aPriority = aMeta.priority ?? 0;
      const bPriority = bMeta.priority ?? 0;
      return bPriority - aPriority;
    });
  }
  /**
   * The event attributes defined for the node, which are typically used to represent event listeners or handlers that should be attached to the node. These attributes are usually defined in the template with a specific syntax (e.g., `@click="handleClick"` or `v-on:click="handleClick"`) and are processed by the rendering engine to attach the corresponding event listeners to the node.
   * 
   * Example: For a node defined as `<button @click="handleClick">`, the event attribute would be `@click="handleClick"`.
   */
  get events() {
    return this.scope.resolveFlatAll(AreEventAttribute);
  }
  /**
   * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
   */
  get styles() {
    return this.scope.resolveFlat(AreStyle);
  }
};
AreHTMLNode = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "AreHTMLNode represents a node in the HTML structure. It extends the base AreNode and includes properties and methods specific to HTML nodes, such as handling attributes, directives, events, and styles."
  })
], AreHTMLNode);
var AreComment = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-comment"
      }
    });
  }
};
AreComment = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a comment node in the AreHTMLNode tree. Used as a stable DOM anchor by structural directives such as $if and $for that swap rendered content in and out, ensuring the parent container always has a consistent insertion point."
  })
], AreComment);
var AreComponentNode = class extends AreHTMLNode {
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(A_FormatterHelper.toPascalCase(this.aseid.entity));
  }
};
AreComponentNode = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "AreComponentNode represents a node in the scene graph that corresponds to a component. It extends the base AreNode and includes additional properties and methods specific to component nodes, such as handling attributes, bindings, directives, events, styles, and interpolations associated with the component."
  })
], AreComponentNode);
var AreInterpolation = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-interpolation"
      }
    });
  }
};
AreInterpolation = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a reactive inline expression in the AreHTMLNode tree. Its content expression is resolved from the store at render time and kept live via an AddInterpolation instruction that updates the corresponding text node on each reactive cycle."
  })
], AreInterpolation);
var AreRootNode = class extends AreHTMLNode {
  /**
   * For the root node, we can default to a generic container element like <div> since it serves as the root of the component tree and does not correspond to a specific HTML tag defined in the markup. The actual content and structure of the root node will be determined by the child nodes and components that are rendered within it, allowing for flexibility in how the root node is used and what it contains.
   */
  get tag() {
    return "div";
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(A_FormatterHelper.toPascalCase(this.aseid.entity));
  }
};
AreRootNode = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "AreRootNode represents the root node in the scene graph. It extends the base AreHTMLNode and includes additional properties and methods specific to the root node, such as handling the root element and its associated component."
  })
], AreRootNode);
var AreText = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-text"
      }
    });
  }
};
AreText = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion."
  })
], AreText);
var AreRoute = class extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
};
AreRoute = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "ARE signal that carries an A_Route value. Dispatched by AreRouteWatcher on client-side navigation events (pushState, replaceState, popstate). The signal bus delivers it to all subscribed root nodes, triggering route-based conditional rendering across the component tree."
  })
], AreRoute);

// src/engine/AreHTML.constants.ts
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_NS = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function isVoidElement(tagName) {
  return VOID_ELEMENTS.has(tagName.toLowerCase());
}
var BOOLEAN_ATTRIBUTES = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function isBooleanAttribute(name) {
  return BOOLEAN_ATTRIBUTES.has(name.toLowerCase());
}
var IDL_FORM_PROPERTIES = {
  INPUT: /* @__PURE__ */ new Set(["value", "checked", "indeterminate"]),
  TEXTAREA: /* @__PURE__ */ new Set(["value"]),
  SELECT: /* @__PURE__ */ new Set(["value"]),
  OPTION: /* @__PURE__ */ new Set(["selected"])
};
function isIDLFormProperty(tagName, attrName) {
  const set = IDL_FORM_PROPERTIES[tagName.toUpperCase()];
  return !!set && set.has(attrName);
}
function normalizeClassValue(value) {
  if (value === null || value === void 0 || value === false) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map(normalizeClassValue).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    const parts = [];
    for (const key of Object.keys(value)) {
      if (value[key]) parts.push(key);
    }
    return parts.join(" ");
  }
  return "";
}
function normalizeStyleValue(value) {
  if (value === null || value === void 0 || value === false) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map(normalizeStyleValue).filter(Boolean).join("; ");
  }
  if (typeof value === "object") {
    const parts = [];
    for (const key of Object.keys(value)) {
      const v = value[key];
      if (v === null || v === void 0 || v === false) continue;
      const kebab = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      parts.push(`${kebab}: ${v}`);
    }
    return parts.join("; ");
  }
  return "";
}
function parseEventName(raw) {
  const [event, ...modifiers] = raw.split(".");
  return { event, modifiers: new Set(modifiers) };
}
var LISTENER_OPTION_MODIFIERS = /* @__PURE__ */ new Set(["capture", "once", "passive"]);
function toDOMString(value) {
  if (value === null || value === void 0) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}
var AreHTMLEngineContext = class extends AreContext {
  constructor(props) {
    super(props.container?.body.innerHTML || props.source || "");
    /**
     * Index structure mapping:
     * 
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */
    this.index = {
      /**
       * 1 AreNode = 1 Dom Node
       * 
       * uses ASEID
       */
      nodeToHostElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Group Instruction = MANY Dom Nodes (e.g. for loop)
       * 
       * uses ASEID
       */
      groupToElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Dom Node = 1 Instruction 
       * 
       * uses ASEID
       */
      elementToInstruction: /* @__PURE__ */ new WeakMap(),
      /**
       * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
       * 
       * uses ASEID
       */
      instructionToElement: /* @__PURE__ */ new Map(),
      /**
       * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
       */
      elementListeners: /* @__PURE__ */ new WeakMap()
    };
    this._container = props.container;
  }
  get container() {
    return this._container;
  }
  getNodeElement(node) {
    if (typeof node === "string") {
      return this.index.nodeToHostElements.get(node);
    } else {
      return this.index.nodeToHostElements.get(node.aseid.toString());
    }
  }
  /**
   * Associates a DOM element with a given instruction and its owner node. This method updates the context's index to map the instruction's ASEID to the provided DOM element, and also maps the element back to the instruction's ASEID for reverse lookup. If the instruction has an owner node, it also maps the node's ASEID to the element. Additionally, if the instruction belongs to a group, it adds the element to the set of elements associated with that group. This indexing allows the engine to efficiently manage and update DOM elements based on instructions and their corresponding nodes, enabling dynamic rendering and interaction in response to application state changes.
   * 
   * @param instruction 
   * @param element 
   */
  setInstructionElement(instruction, element) {
    const node = instruction.owner;
    this.index.instructionToElement.set(instruction.aseid.toString(), element);
    this.index.elementToInstruction.set(element, instruction.aseid.toString());
    if (node) {
      this.index.nodeToHostElements.set(node.aseid.toString(), element);
    }
    if (instruction.group) {
      const groupId = instruction.group;
      if (!this.index.groupToElements.has(groupId)) {
        this.index.groupToElements.set(groupId, /* @__PURE__ */ new Set());
      }
      this.index.groupToElements.get(groupId).add(element);
    }
  }
  getElementByInstruction(instruction) {
    if (typeof instruction === "string") {
      return this.index.instructionToElement.get(instruction);
    } else {
      return this.index.instructionToElement.get(instruction.aseid.toString());
    }
  }
  /**
   * Removes the association between a given instruction and its corresponding DOM element. This method looks up the instruction's ASEID to find the associated DOM element, and if found, it deletes the mapping from both instructionToElement and elementToInstruction. If the instruction has an owner node, it also removes the mapping from nodeToHostElements. Additionally, if the instruction belongs to a group, it removes the element from the set of elements associated with that group, and if the group has no more elements, it deletes the group from the index. This cleanup is essential for maintaining an accurate and efficient mapping of instructions to DOM elements, especially when instructions are reverted or when nodes are removed from the DOM.
   * 
   * @param instruction 
   */
  removeInstructionElement(instruction) {
    const element = this.index.instructionToElement.get(instruction.aseid.toString());
    if (element) {
      this.index.instructionToElement.delete(instruction.aseid.toString());
      this.index.elementToInstruction.delete(element);
      const node = instruction.owner;
      if (node) {
        this.index.nodeToHostElements.delete(node.aseid.toString());
      }
      if (instruction.group) {
        const groupId = instruction.group;
        const groupElements = this.index.groupToElements.get(groupId);
        if (groupElements) {
          groupElements.delete(element);
          if (groupElements.size === 0) {
            this.index.groupToElements.delete(groupId);
          }
        }
      }
    }
  }
  getElementsByGroup(instruction) {
    if (typeof instruction === "string") {
      return this.index.groupToElements.get(instruction);
    } else {
      return this.index.groupToElements.get(instruction.aseid.toString());
    }
  }
  /**
   * Adds an event listener to a specific DOM element and keeps track of it in the context's index for proper cleanup later. This method takes a DOM element, an event name, and a listener function or object, and stores this information in the elementListeners map. This allows the engine to efficiently manage event listeners attached to dynamically created elements, ensuring that they can be removed when the associated instructions are reverted or when nodes are removed from the DOM, preventing memory leaks and unintended behavior.
   * 
   * @param element 
   * @param eventName 
   * @param listener 
   */
  addListener(element, eventName, listener) {
    if (!this.index.elementListeners.has(element)) {
      this.index.elementListeners.set(element, /* @__PURE__ */ new Map());
    }
    const byEvent = this.index.elementListeners.get(element);
    if (!byEvent.has(eventName)) {
      byEvent.set(eventName, /* @__PURE__ */ new Set());
    }
    byEvent.get(eventName).add(listener);
  }
  /**
   * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
   * 
   * @param element 
   * @param eventName 
   * @returns 
   */
  getListener(element, eventName) {
    const set = this.index.elementListeners.get(element)?.get(eventName);
    if (!set || set.size === 0) return void 0;
    return set.values().next().value;
  }
  /**
   * Returns all listeners registered for a given element + event name.
   */
  getListeners(element, eventName) {
    return this.index.elementListeners.get(element)?.get(eventName);
  }
  /**
   * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
   * 
   * @param element 
   * @param eventName 
   */
  removeListener(element, eventName, listener) {
    const byEvent = this.index.elementListeners.get(element);
    if (!byEvent) return;
    if (listener) {
      const set = byEvent.get(eventName);
      if (set) {
        set.delete(listener);
        if (set.size === 0) byEvent.delete(eventName);
      }
    } else {
      byEvent.delete(eventName);
    }
  }
};
AreHTMLEngineContext = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Runtime index for the HTML rendering engine. Maps each AreNode and instruction ASEID to its corresponding DOM element so that apply and revert handlers on interpreter instructions can look up their DOM node in O(1). Tracks root-element mounts and maintains the group-level index used by structural directives."
  })
], AreHTMLEngineContext);
var AreHTMLCompiler = class extends AreCompiler {
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
  compileBindingAttribute(attribute, scene, parentStore, store, syntax, ...args) {
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
    const instruction = new AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content,
      evaluate: true
    });
    scene.plan(instruction);
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
  __decorateParam(3, A_Inject(AreStore)),
  __decorateParam(4, A_Inject(AreSyntax))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);
var AreHTMLInterpreter = class extends AreInterpreter {
  addElement(declaration, context, logger) {
    try {
      const node = declaration.owner;
      let currentNode = node;
      let parent = node.parent;
      while (parent) {
        if (context.getNodeElement(parent)) {
          break;
        }
        currentNode = parent;
        parent = parent.parent;
      }
      const tag = node.tag;
      const isSVG = tag === "svg" || this.isInSVGContext(node);
      if (parent) {
        const mountPoint = context.getNodeElement(parent);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(SVG_NAMESPACE, tag) : context.container.createElement(tag);
        if (mountPoint.nodeType === Node.ELEMENT_NODE) {
          mountPoint.appendChild(element);
        } else {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        }
        context.setInstructionElement(declaration, element);
      } else {
        const mountPoint = context.container.getElementById(node.id);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(SVG_NAMESPACE, tag) : context.container.createElement(tag);
        mountPoint.parentNode?.replaceChild(element, mountPoint);
        context.setInstructionElement(declaration, element);
      }
      logger?.debug("green", `Element ${node.aseid.toString()} added to Context:`);
    } catch (error) {
      logger?.error(error);
      throw error;
    }
  }
  removeElement(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addAttribute(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
      });
    }
    const { name, content, evaluate } = mutation.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const el = element;
    const lowerName = name.toLowerCase();
    const colonIdx = name.indexOf(":");
    if (colonIdx > 0) {
      const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
      if (ns) {
        el.setAttributeNS(ns, name, toDOMString(rawValue));
        mutation.cache = toDOMString(rawValue);
        return;
      }
    }
    if (isBooleanAttribute(lowerName)) {
      if (rawValue) {
        el.setAttribute(lowerName, "");
        try {
          el[lowerName] = true;
        } catch {
        }
      } else {
        el.removeAttribute(lowerName);
        try {
          el[lowerName] = false;
        } catch {
        }
      }
      mutation.cache = rawValue ? "true" : "";
      return;
    }
    if (isIDLFormProperty(el.tagName, name)) {
      const propName = name === "value" ? "value" : name === "checked" ? "checked" : name === "selected" ? "selected" : name === "indeterminate" ? "indeterminate" : name;
      try {
        if (propName === "checked" || propName === "selected" || propName === "indeterminate") {
          el[propName] = !!rawValue;
        } else {
          el[propName] = toDOMString(rawValue);
        }
      } catch {
      }
      if (propName !== "value") {
        if (rawValue) el.setAttribute(name, "");
        else el.removeAttribute(name);
      } else {
        el.setAttribute(name, toDOMString(rawValue));
      }
      mutation.cache = toDOMString(rawValue);
      return;
    }
    if (lowerName === "class") {
      const newValue = normalizeClassValue(rawValue);
      if (mutation.cache === void 0) {
        const existingValue = el.getAttribute("class");
        const merged = existingValue ? `${existingValue} ${newValue}`.trim() : newValue;
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      } else {
        const existingValue = el.getAttribute("class");
        const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
        const oldParts = new Set(mutation.cache.split(/\s+/).filter(Boolean));
        const newParts = newValue ? newValue.split(/\s+/).filter(Boolean) : [];
        const merged = [...existingParts.filter((p) => !oldParts.has(p)), ...newParts].join(" ");
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      }
      mutation.cache = newValue;
      return;
    }
    if (lowerName === "style") {
      const newValue = normalizeStyleValue(rawValue);
      if (newValue) el.setAttribute("style", newValue);
      else el.removeAttribute("style");
      mutation.cache = newValue;
      return;
    }
    const stringValue = toDOMString(rawValue);
    if (stringValue === "" && evaluate && (rawValue === false || rawValue === null || rawValue === void 0)) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, stringValue);
    }
    mutation.cache = stringValue;
  }
  removeAttribute(mutation, context) {
    try {
      const element = context.getElementByInstruction(mutation.parent);
      if (!element) return;
      const { name } = mutation.payload;
      if (name && element.nodeType === Node.ELEMENT_NODE) {
        const colonIdx = name.indexOf(":");
        if (colonIdx > 0) {
          const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
          if (ns) {
            element.removeAttributeNS(ns, name.slice(colonIdx + 1));
          } else {
            element.removeAttribute(name);
          }
        } else {
          element.removeAttribute(name);
        }
      }
    } catch (error) {
      console.log("Error removing attribute:", error);
    }
  }
  addEventListener(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
      });
    }
    const { event: eventName, modifiers } = parseEventName(mutation.payload.name);
    const listenerOptions = {};
    if (modifiers.has("capture")) listenerOptions.capture = true;
    if (modifiers.has("once")) listenerOptions.once = true;
    if (modifiers.has("passive")) listenerOptions.passive = true;
    const handlers = syntax.extractEmitHandlers(mutation.payload.handler);
    let liveEvent = null;
    const handlerScope = {};
    for (const handler of handlers) {
      const handlerFn = (...args) => {
        const event = new AreEvent(handler);
        const effectiveArgs = args.length === 0 && liveEvent ? [liveEvent] : liveEvent ? [...args, liveEvent] : args;
        event.set("args", effectiveArgs);
        event.set("element", element);
        event.set("instruction", mutation);
        if (liveEvent) event.set("native", liveEvent);
        mutation.owner.emit(event);
      };
      handlerScope[`$${handler}`] = handlerFn;
    }
    const callback = (e) => {
      try {
        liveEvent = e;
        if (modifiers.has("self") && e.target !== element) return;
        if (modifiers.has("stop")) e.stopPropagation();
        if (modifiers.has("prevent")) e.preventDefault();
        if (e instanceof KeyboardEvent && modifiers.size > 0) {
          const key = (e.key || "").toLowerCase();
          const KEY_ALIASES = {
            enter: ["enter"],
            esc: ["escape"],
            escape: ["escape"],
            tab: ["tab"],
            space: [" ", "spacebar"],
            up: ["arrowup"],
            down: ["arrowdown"],
            left: ["arrowleft"],
            right: ["arrowright"],
            delete: ["delete", "backspace"]
          };
          const keyMods = [...modifiers].filter((m) => m in KEY_ALIASES || m === "ctrl" || m === "alt" || m === "shift" || m === "meta");
          if (keyMods.length > 0) {
            const keyMatch = keyMods.some((m) => {
              if (m === "ctrl") return e.ctrlKey;
              if (m === "alt") return e.altKey;
              if (m === "shift") return e.shiftKey;
              if (m === "meta") return e.metaKey;
              const aliases = KEY_ALIASES[m];
              return aliases && aliases.includes(key);
            });
            if (!keyMatch) return;
          }
        }
        context.startPerformance("event:" + eventName);
        const result = syntax.evaluate(mutation.payload.handler, store, {
          ...handlerScope,
          $event: e,
          ...directiveContext?.scope || {}
        });
        if (typeof result === "function") result(e);
        context.endPerformance("event:" + eventName);
      } catch (err) {
        logger?.error(err);
      } finally {
        liveEvent = null;
      }
    };
    const useOptions = listenerOptions.capture || listenerOptions.once || listenerOptions.passive;
    if (useOptions) {
      element.addEventListener(eventName, callback, listenerOptions);
    } else {
      element.addEventListener(eventName, callback);
    }
    mutation.payload._callback = callback;
    context.addListener(element, mutation.payload.name, callback);
  }
  removeEventListener(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) return;
    const { name } = mutation.payload;
    const { event: eventName } = parseEventName(name);
    const listener = mutation.payload._callback;
    if (listener) {
      element.removeEventListener(eventName, listener);
      context.removeListener(element, name, listener);
      mutation.payload._callback = void 0;
    }
  }
  addText(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = toDOMString(rawValue);
    if (!node) {
      const textNode = context.container.createTextNode(value);
      context.container.body.appendChild(textNode);
      context.setInstructionElement(declaration, textNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const textNode = context.container.createTextNode(value);
        element.appendChild(textNode);
        context.setInstructionElement(declaration, textNode);
      }
    }
    logger?.debug("green", `Text ${node?.aseid.toString()} added to Context:`);
  }
  removeText(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
  addComment(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = toDOMString(rawValue);
    if (!node) {
      const commentNode = context.container.createComment(value);
      context.container.body.appendChild(commentNode);
      context.setInstructionElement(declaration, commentNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const commentNode = context.container.createComment(value);
        element.appendChild(commentNode);
        context.setInstructionElement(declaration, commentNode);
      }
    }
    logger?.debug("green", `Comment ${node?.aseid.toString()} added to Context:`);
  }
  removeComment(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── SVG helpers ───────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Returns true when any ancestor of the given node has the tag `svg`,
   * meaning the node lives inside an SVG subtree and its DOM element must be
   * created via createElementNS(SVG_NAMESPACE, tag).
   */
  isInSVGContext(node) {
    let current = node.parent;
    while (current) {
      if (current.tag === "svg") return true;
      if (current.tag === "foreignobject") return false;
      current = current.parent;
    }
    return false;
  }
};
__decorateClass([
  A_Frame.Define({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  AreInterpreter.Apply(AreInstructionDefaultNames.Default),
  AreInterpreter.Apply(AreHTMLInstructions.AddElement),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addElement", 1);
__decorateClass([
  A_Frame.Define({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  AreInterpreter.Revert(AreInstructionDefaultNames.Default),
  AreInterpreter.Revert(AreHTMLInstructions.AddElement),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeElement", 1);
__decorateClass([
  A_Frame.Define({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddAttribute),
  AreInterpreter.Update(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  A_Frame.Define({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  A_Frame.Define({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddListener),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  A_Frame.Define({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddListener),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  A_Frame.Define({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddText),
  AreInterpreter.Update(AreHTMLInstructions.AddText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addText", 1);
__decorateClass([
  A_Frame.Define({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeText", 1);
__decorateClass([
  A_Frame.Define({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddComment),
  AreInterpreter.Update(AreHTMLInstructions.AddComment),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addComment", 1);
__decorateClass([
  A_Frame.Define({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddComment),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeComment", 1);
AreHTMLInterpreter = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "DOM interpreter for the HTML rendering pipeline. Extends AreInterpreter to apply and revert each ARE instruction type directly against the browser DOM \u2014 creating and removing elements, setting and removing attributes and event listeners, managing inline styles, and inserting text and comment nodes. Driven by the scene diff computed per render cycle."
  })
], AreHTMLInterpreter);
var AreHTMLTokenizer = class extends AreTokenizer {
  constructor() {
    super(...arguments);
    this.ATTR_PATTERN = /([$:@]?[\w.-]+(?::[\w.-]+)?)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
  }
  tokenize(node, context, logger) {
    super.tokenize(node, context, logger);
    context.startPerformance("attributeExtraction");
    const attributes = this.extractAttributes(node.markup);
    for (const attr of attributes) {
      node.scope.register(attr);
    }
    context.endPerformance("attributeExtraction");
  }
  extractAttributes(markup) {
    const withoutTag = markup.replace(/^<[a-zA-Z][a-zA-Z0-9-]*\s*/, "");
    let inSingle = false;
    let inDouble = false;
    let endIdx = withoutTag.length;
    for (let i = 0; i < withoutTag.length; i++) {
      const ch = withoutTag[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) {
        endIdx = i;
        break;
      }
    }
    const attrString = withoutTag.slice(0, endIdx).replace(/\s*\/?\s*$/, "").trim();
    const results = [];
    for (const match of attrString.matchAll(this.ATTR_PATTERN)) {
      const raw = match[0];
      const full = match[1];
      if (!full) continue;
      const value = match[2] ?? match[3] ?? match[4] ?? "true";
      const prefix = full[0];
      const isSpecial = prefix === ":" || prefix === "@" || prefix === "$";
      const name = isSpecial ? full.slice(1) : full;
      const meta = { name, content: value, raw, prefix: isSpecial ? prefix : "" };
      if (prefix === ":") results.push(new AreBindingAttribute(meta));
      else if (prefix === "@") results.push(new AreEventAttribute(meta));
      else if (prefix === "$") results.push(new AreDirectiveAttribute(meta));
      else results.push(new AreStaticAttribute(meta));
    }
    return results;
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreComponentNode, AreRootNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLTokenizer.prototype, "tokenize", 1);
AreHTMLTokenizer = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific tokenizer extending AreTokenizer. Parses raw HTML template strings into AreHTMLNode trees by scanning element tags and resolving directive ($), event (@), binding (:), and static attributes to their typed attribute classes, constructing AreComponentNode and AreRootNode instances where required."
  })
], AreHTMLTokenizer);
var AreHTMLLifecycle = class extends AreLifecycle {
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
var AreHTMLTransformer = class extends AreTransformer {
  transformDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Transform, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
};
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
AreHTMLTransformer = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "HTML-specific transformer extending AreTransformer. Handles directive-attribute structural rewrites before compilation \u2014 sorting directives by declared priority and expanding compound directive expressions \u2014 so the compiler receives a clean, ordered AreHTMLNode tree ready for instruction emission."
  })
], AreHTMLTransformer);

// src/engine/AreHTML.engine.ts
var AreHTMLEngine = class extends AreEngine {
  get DefaultSyntax() {
    return new AreSyntax({
      trimWhitespace: true,
      strictMode: true,
      rules: [
        // HTML comments
        {
          opening: "<!--",
          closing: "-->",
          component: AreComment,
          priority: 10,
          nested: false,
          extract: (raw) => ({ content: raw.slice(4, -3).trim() })
        },
        // interpolations
        {
          opening: "{{",
          closing: "}}",
          component: AreInterpolation,
          priority: 9,
          nested: false,
          extract: (_, match) => ({ key: match.content })
        },
        // are-root — matched before generic elements, produces AreRootNode
        {
          matcher: this.rootElementMatcher.bind(this),
          component: AreRootNode,
          priority: 5
        },
        // generic HTML elements
        {
          matcher: this.htmlElementMatcher.bind(this),
          component: AreComponentNode,
          priority: 4
        },
        // plain text fallback
        {
          component: AreText,
          priority: 0
        }
      ]
    });
  }
  async init(scope, signalContext) {
    this.package(scope, {
      context: new AreHTMLEngineContext({}),
      syntax: this.DefaultSyntax,
      compiler: AreHTMLCompiler,
      interpreter: AreHTMLInterpreter,
      tokenizer: AreHTMLTokenizer,
      lifecycle: AreHTMLLifecycle,
      transformer: AreHTMLTransformer
    });
    if (!signalContext) {
      signalContext = new AreSignalsContext();
      scope.register(signalContext);
    }
  }
  rootElementMatcher(source, from, to, build) {
    const rootTag = "are-root";
    const tagStart = source.indexOf("<", from);
    if (tagStart === -1 || tagStart >= to) return null;
    const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
    if (!tagNameMatch || tagNameMatch[1].toLowerCase() !== rootTag) return null;
    return this.htmlElementMatcher(source, from, to, build);
  }
  htmlElementMatcher(source, from, to, build) {
    let index = from;
    while (index < to) {
      const tagStart = source.indexOf("<", index);
      if (tagStart === -1 || tagStart >= to) return null;
      if (source.startsWith("<!--", tagStart)) {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "/") {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "!" || source[tagStart + 1] === "?") {
        index = tagStart + 1;
        continue;
      }
      const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
      if (!tagNameMatch) {
        index = tagStart + 1;
        continue;
      }
      const tagName = tagNameMatch[1];
      const openingTagEnd = AreHTMLEngine.findTagClose(source, tagStart);
      if (openingTagEnd === -1) return null;
      const openingTagStr = source.slice(tagStart, openingTagEnd + 1);
      const idMatch = openingTagStr.match(/\bid=["']([^"']*)["']/);
      const id = idMatch ? idMatch[1] : void 0;
      if (source[openingTagEnd - 1] === "/") {
        const raw = source.slice(tagStart, openingTagEnd + 1);
        const content2 = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd - 1);
        const match2 = build(raw, content2, tagStart, "/>");
        match2.payload = { entity: tagName, selfClose: true, id };
        return match2;
      }
      if (isVoidElement(tagName)) {
        const raw = source.slice(tagStart, openingTagEnd + 1);
        const content2 = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd);
        const match2 = build(raw, content2, tagStart, ">");
        match2.payload = { entity: tagName, selfClose: true, id };
        return match2;
      }
      const closingTag = `</${tagName}>`;
      let level = 0;
      let searchIndex = openingTagEnd + 1;
      let closingStart = -1;
      while (searchIndex < to) {
        const nextOpen = source.indexOf(`<${tagName}`, searchIndex);
        const nextClose = source.indexOf(closingTag, searchIndex);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          const charAfter = source[nextOpen + tagName.length + 1];
          if (charAfter === " " || charAfter === ">" || charAfter === "/") {
            const innerEnd = AreHTMLEngine.findTagClose(source, nextOpen);
            const isSelfClose = innerEnd !== -1 && source[innerEnd - 1] === "/";
            if (!isSelfClose) {
              level++;
            }
            searchIndex = innerEnd === -1 ? nextOpen + tagName.length + 1 : innerEnd + 1;
            continue;
          }
        }
        if (level === 0) {
          closingStart = nextClose;
          break;
        }
        level--;
        searchIndex = nextClose + closingTag.length;
      }
      if (closingStart === -1) return null;
      const fullTag = source.slice(tagStart, closingStart + closingTag.length);
      const content = source.slice(openingTagEnd + 1, closingStart);
      const match = build(fullTag, content, tagStart, closingTag);
      match.payload = { entity: tagName, selfClose: false, id };
      return match;
    }
    return null;
  }
  /**
   * Find the index of the closing `>` of an opening tag, skipping over
   * `>` characters that appear inside quoted attribute values.
   */
  static findTagClose(source, from) {
    let inSingle = false;
    let inDouble = false;
    for (let i = from; i < source.length; i++) {
      const ch = source[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) return i;
    }
    return -1;
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope)),
  __decorateParam(1, A_Inject(AreSignalsContext))
], AreHTMLEngine.prototype, "init", 1);
AreHTMLEngine = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "Concrete HTML rendering engine that assembles the full ARE pipeline for web environments. Bootstraps and wires AreHTMLTokenizer, AreHTMLTransformer, AreHTMLCompiler, AreHTMLInterpreter, and AreHTMLLifecycle; mounts root nodes from inline or fetched templates; and drives reactive re-renders via the AreSignals bus."
  })
], AreHTMLEngine);
var AreRoot = class extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      default: {
        type: "string",
        default: ""
      }
    };
  }
  async template(root, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    const currentRoute = AreRoute$1.default();
    let componentName;
    if (currentRoute) {
      const initialVector = new A_SignalVector([currentRoute]);
      let renderTarget = signalsContext?.findComponentByVector(rootId, initialVector);
      if (!renderTarget) {
        const signalsMeta = A_Context.meta(AreSignals);
        renderTarget = signalsMeta?.findComponentByVector(initialVector);
      }
      if (renderTarget?.name) {
        componentName = A_FormatterHelper.toKebabCase(renderTarget.name);
      }
    }
    if (!componentName) {
      const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
      componentName = defaultMatch?.[1];
    }
    if (!componentName) {
      logger.warning('AreRoot: No component found for initial render. Please ensure a route condition or "default" attribute is set.');
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
  }
  async onSignal(root, vector, store, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    let renderTarget = signalsContext?.findComponentByVector(rootId, vector);
    if (!renderTarget) {
      const signalsMeta = A_Context.meta(AreSignals);
      renderTarget = signalsMeta?.findComponentByVector(vector);
    }
    const componentName = renderTarget?.name ? A_FormatterHelper.toKebabCase(renderTarget.name) : store.get("default");
    if (!componentName) {
      logger.warning("No component found for rendering in AreRoot. Please ensure that the signal vector matches at least one component or that a default component name is provided in the store.");
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      child.unmount();
      child.destroy();
      root.removeChild(child);
    }
    root.tokenize();
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      child.init();
      const res = child.load();
      if (res instanceof Promise) {
        await res;
      }
      child.transform();
      child.compile();
      child.mount();
    }
  }
};
__decorateClass([
  Are.Template,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Logger)),
  __decorateParam(2, A_Inject(AreSignalsContext))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_SignalVector)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Logger)),
  __decorateParam(4, A_Inject(AreSignalsContext))
], AreRoot.prototype, "onSignal", 1);
AreRoot = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);
var AreRouteWatcher = class extends A_Component {
  constructor() {
    super();
    this.handlers = /* @__PURE__ */ new Set();
    this.current = new URL(window.location.href);
    // ── Listeners ─────────────────────────────────────────────────────────────
    this.onPopState = () => {
      this.notify();
    };
    this.onHashChange = () => {
      this.notify();
    };
    this.onURLChange = () => {
      this.notify();
    };
    this.patchHistory();
    this.attachListeners();
  }
  // ── Public ────────────────────────────────────────────────────────────────
  onChange(handler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
  get url() {
    return this.current;
  }
  destroy() {
    window.removeEventListener("popstate", this.onPopState);
    window.removeEventListener("hashchange", this.onHashChange);
    window.removeEventListener("urlchange", this.onURLChange);
    this.handlers.clear();
  }
  attachListeners() {
    window.addEventListener("popstate", this.onPopState);
    window.addEventListener("hashchange", this.onHashChange);
    window.addEventListener("urlchange", this.onURLChange);
  }
  // ── Patch pushState / replaceState ────────────────────────────────────────
  patchHistory() {
    const patch = (original) => function(...args) {
      original.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
    };
    history.pushState = patch(history.pushState);
    history.replaceState = patch(history.replaceState);
  }
  // ── Notify ────────────────────────────────────────────────────────────────
  notify() {
    const next = new URL(window.location.href);
    if (next.href === this.current.href) return;
    this.current = next;
    for (const handler of this.handlers) {
      handler(this.current);
    }
  }
};
AreRouteWatcher = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "AreRouteWatcher is a component that observes browser navigation events (history pushState, replaceState, and popstate) and notifies registered handlers when the URL changes, enabling client-side routing and reactive route-based rendering within the ARE framework."
  })
], AreRouteWatcher);

export { AddAttributeInstruction, AddElementInstruction, AddInterpolationInstruction, AddListenerInstruction, AddStyleInstruction, AddTextInstruction, AreBindingAttribute, AreComment, AreComponentNode, AreDirective, AreDirectiveAttribute, AreDirectiveContext, AreDirectiveFeatures, AreDirectiveFor, AreDirectiveIf, AreDirectiveMeta, AreEventAttribute, AreHTMLAttribute, AreHTMLCompiler, AreHTMLEngine, AreHTMLEngineContext, AreHTMLInstructions, AreHTMLInterpreter, AreHTMLLifecycle, AreHTMLNode, AreHTMLTokenizer, AreHTMLTransformer, AreInterpolation, AreRoot, AreRootNode, AreRoute, AreRouteWatcher, AreStaticAttribute, AreStyle, AreText, BOOLEAN_ATTRIBUTES, IDL_FORM_PROPERTIES, LISTENER_OPTION_MODIFIERS, SVG_ATTRIBUTE_NS, SVG_NAMESPACE, VOID_ELEMENTS, isBooleanAttribute, isIDLFormProperty, isVoidElement, normalizeClassValue, normalizeStyleValue, parseEventName, toDOMString };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map