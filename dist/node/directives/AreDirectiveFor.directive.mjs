import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller, A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStore, AreScene, AreCompilerError } from '@adaas/are';
import { AreDirective } from '@adaas/are-html/directive/AreDirective.component';
import { AddCommentInstruction } from '@adaas/are-html/instructions/AddComment.instruction';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';

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
    console.log('Initial array for "for" directive:', scene);
    for (let i = 0; i < array.length; i++) {
      this.spawnItemNode(attribute.template, attribute.owner, key, index, array[i], i);
    }
    console.log('Template for "for" directive:', forTemplate);
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
    const { key, index, arrayExpr } = this.parseExpression(attribute.content);
    const newArray = this.resolveArray(store, arrayExpr, attribute.content);
    const owner = attribute.owner;
    const currentChildren = [...owner.children];
    attribute.value = newArray;
    const newLen = newArray.length;
    const newItemSet = new Set(newArray);
    const keptChildren = [];
    const removedChildren = [];
    for (const child of currentChildren) {
      const ctx = child.scope.resolveFlat(AreDirectiveContext);
      if (ctx && newItemSet.has(ctx.scope[key])) {
        keptChildren.push(child);
      } else {
        removedChildren.push(child);
      }
    }
    for (const child of removedChildren) {
      child.unmount();
      owner.removeChild(child);
    }
    for (let i = 0; i < keptChildren.length; i++) {
      let directiveContext = keptChildren[i].scope.resolveFlat(AreDirectiveContext);
      if (!directiveContext) {
        directiveContext = new AreDirectiveContext(keptChildren[i].aseid);
        keptChildren[i].scope.register(directiveContext);
      }
      directiveContext.scope = {
        ...directiveContext.scope,
        [key]: newArray[i],
        [index || "index"]: i
      };
    }
    for (let i = keptChildren.length; i < newLen; i++) {
      const itemNode = this.spawnItemNode(attribute.template, owner, key, index, newArray[i], i);
      itemNode.transform();
      itemNode.compile();
      itemNode.mount();
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Helpers ──────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Parses the $for expression string into its constituent parts.
   *
   * Supported formats:
   *   item in items
   *   item, index in items
   *   (item, index) in items
   *   item in filter(items)
   *   item, index in filter(items, 'active')
   */
  parseExpression(content) {
    const inIndex = content.lastIndexOf(" in ");
    const keyAndIndex = content.slice(0, inIndex).trim().replace(/^\(|\)$/g, "");
    const arrayExpr = content.slice(inIndex + 4).trim();
    const keyParts = keyAndIndex.split(",").map((p) => p.trim());
    return {
      key: keyParts[0],
      index: keyParts[1] || void 0,
      arrayExpr
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
        return store.get(arg);
      });
      result = fn(...resolvedArgs);
    } else {
      result = store.get(arrayExpr);
    }
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
  AreDirective.Priority(1)
], AreDirectiveFor);

export { AreDirectiveFor };
//# sourceMappingURL=AreDirectiveFor.directive.mjs.map
//# sourceMappingURL=AreDirectiveFor.directive.mjs.map