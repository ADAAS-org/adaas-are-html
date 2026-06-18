'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');
var are = require('@adaas/are');
var AreBinding_attribute = require('@adaas/are-html/attributes/AreBinding.attribute');
var AreDirective_attribute = require('@adaas/are-html/attributes/AreDirective.attribute');
var AreEvent_attribute = require('@adaas/are-html/attributes/AreEvent.attribute');
var AreStatic_attribute = require('@adaas/are-html/attributes/AreStatic.attribute');
var AreStyle_context = require('@adaas/are-html/style/AreStyle.context');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreHTMLNode = class AreHTMLNode extends are.AreNode {
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get tag() {
    return this.aseid.entity;
  }
  /**
   * The verbatim inner markup captured when this node was identified as a
   * static island, or `undefined` for ordinary (per-node) nodes.
   */
  get staticInnerHTML() {
    return this._staticInnerHTML;
  }
  /**
   * Whether this node is a static-island root (see `_staticInnerHTML`).
   */
  get isStaticIsland() {
    return this._staticInnerHTML !== void 0;
  }
  /**
   * Marks this node as a static-island root, capturing the verbatim inner
   * markup to be materialised in one shot by the interpreter. Called by the
   * tokenizer when the node's inner content is detected to be fully static.
   */
  markStatic(innerHTML) {
    this._staticInnerHTML = innerHTML;
  }
  /**
   * Deep-clone the node. Overridden to carry over the static-island marker
   * (`_staticInnerHTML`), which lives on AreHTMLNode and is therefore NOT
   * copied by the base AreNode.clone(). Without this, cloning a directive
   * template ($if/$for) that wraps a static island (e.g. `<span $if>★</span>`)
   * would drop the captured inner markup and render an empty element. The
   * base clone() recurses via each child's polymorphic clone(), so nested
   * island children are preserved automatically through this override.
   */
  clone() {
    const cloned = super.clone();
    const self = this;
    if (self._staticInnerHTML !== void 0)
      cloned.markStatic(self._staticInnerHTML);
    return cloned;
  }
  /**
   * Clone the node while transferring its existing scope to the clone (used by
   * the $if/$for directives to turn the original node into a lightweight group
   * container). Overridden for the same reason as `clone()`: the static-island
   * marker must survive so a directive applied to an island root keeps its
   * inner markup.
   */
  cloneWithScope() {
    const cloned = super.cloneWithScope();
    const self = this;
    if (self._staticInnerHTML !== void 0)
      cloned.markStatic(self._staticInnerHTML);
    return cloned;
  }
  /**
    * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
    * 
    * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
    */
  get staticAttributes() {
    return this.scope.resolveFlatAll(AreStatic_attribute.AreStaticAttribute);
  }
  /**
   * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
   * 
   * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
   */
  get bindings() {
    return this.scope.resolveFlatAll(AreBinding_attribute.AreBindingAttribute);
  }
  /**
   * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
   * 
   * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
   */
  get directives() {
    const directives = this.scope.resolveFlatAll(AreDirective_attribute.AreDirectiveAttribute);
    return directives.filter((d) => d.component).sort((a, b) => {
      const aMeta = aConcept.A_Context.meta(a.component);
      const bMeta = aConcept.A_Context.meta(b.component);
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
    return this.scope.resolveFlatAll(AreEvent_attribute.AreEventAttribute);
  }
  /**
   * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
   */
  get styles() {
    return this.scope.resolveFlat(AreStyle_context.AreStyle);
  }
  /**
   * Registers or updates the component-scoped CSS string for this node.
   * Called by the @Are.Styles-decorated method on the associated component.
   * A new AreStyle fragment is registered in scope on first call; subsequent
   * calls update the existing fragment in-place.
   */
  setStyles(css) {
    const existing = this.scope.resolveFlat(AreStyle_context.AreStyle);
    if (existing) {
      existing.styles = css;
    } else {
      this.scope.register(new AreStyle_context.AreStyle(css, this.aseid.toString()));
    }
  }
};
exports.AreHTMLNode = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "AreHTMLNode represents a node in the HTML structure. It extends the base AreNode and includes properties and methods specific to HTML nodes, such as handling attributes, directives, events, and styles."
  })
], exports.AreHTMLNode);
//# sourceMappingURL=AreHTMLNode.js.map
//# sourceMappingURL=AreHTMLNode.js.map