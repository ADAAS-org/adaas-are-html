import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStore, AreScene, AreCompilerError } from '@adaas/are';
import { AreDirective } from '@adaas/are-html/directive/AreDirective.component';
import { AddCommentInstruction } from '@adaas/are-html/instructions/AddComment.instruction';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';
import { A_Frame } from '@adaas/a-frame/core';

let AreDirectiveFor = class extends AreDirective {
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

export { AreDirectiveFor };
//# sourceMappingURL=AreDirectiveFor.directive.mjs.map
//# sourceMappingURL=AreDirectiveFor.directive.mjs.map