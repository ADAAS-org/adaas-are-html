'use strict';

var aConcept = require('@adaas/a-concept');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreDirective_component = require('@adaas/are-html/directive/AreDirective.component');
var AddComment_instruction = require('@adaas/are-html/instructions/AddComment.instruction');
var AreDirective_context = require('@adaas/are-html/directive/AreDirective.context');
var core = require('@adaas/a-frame/core');

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
exports.AreDirectiveFor = class AreDirectiveFor extends AreDirective_component.AreDirective {
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
    const declaration = new AddComment_instruction.AddCommentInstruction({ content: commentIdentifier });
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
      const ctx = child.scope.resolveFlat(AreDirective_context.AreDirectiveContext);
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
        let directiveContext = existing.scope.resolveFlat(AreDirective_context.AreDirectiveContext);
        if (!directiveContext) {
          directiveContext = new AreDirective_context.AreDirectiveContext(existing.aseid);
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
        throw new are.AreCompilerError({
          title: 'Invalid "for" Directive Function',
          description: `The expression "${fnName}" in the "for" directive does not resolve to a function in the store. Received: ${typeof fn}`
        });
      const rawArgs = callMatch[2].split(",").map((a) => a.trim());
      const resolvedArgs = rawArgs.map((arg) => {
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
        if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
        if (!isNaN(Number(arg))) return Number(arg);
        return store.get(arg);
      });
      result = fn(...resolvedArgs);
    } else if (arrayExpr.includes(".")) {
      const parts = arrayExpr.split(".");
      result = store.get(parts[0]);
      for (let i = 1; i < parts.length; i++) {
        if (result == null) break;
        result = result[parts[i]];
      }
    } else {
      result = store.get(arrayExpr);
    }
    if (!Array.isArray(result))
      throw new are.AreCompilerError({
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
    let directiveContext = itemNode.scope.resolveFlat(AreDirective_context.AreDirectiveContext);
    if (!directiveContext) {
      directiveContext = new AreDirective_context.AreDirectiveContext(itemNode.aseid);
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
  AreDirective_component.AreDirective.Transform,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreScene)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreDirectiveFor.prototype, "transform", 1);
__decorateClass([
  AreDirective_component.AreDirective.Compile,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(are.AreScene))
], exports.AreDirectiveFor.prototype, "compile", 1);
__decorateClass([
  AreDirective_component.AreDirective.Update,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(are.AreStore)),
  __decorateParam(2, aConcept.A_Inject(are.AreScene))
], exports.AreDirectiveFor.prototype, "update", 1);
exports.AreDirectiveFor = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Built-in $for directive. Iterates over an array expression resolved from the store and renders a cloned template fragment per item, managing per-item subscopes and comment-node anchors. Supports keyed diffing via an optional track clause to minimise DOM mutations on collection updates."
  }),
  AreDirective_component.AreDirective.Priority(1)
], exports.AreDirectiveFor);
//# sourceMappingURL=AreDirectiveFor.directive.js.map
//# sourceMappingURL=AreDirectiveFor.directive.js.map