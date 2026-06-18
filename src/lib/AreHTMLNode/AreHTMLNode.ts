import { A_Context, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { AreNode} from "@adaas/are";
import { AreBindingAttribute } from "@adaas/are-html/attributes/AreBinding.attribute";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreEventAttribute } from "@adaas/are-html/attributes/AreEvent.attribute";
import { AreStaticAttribute } from "@adaas/are-html/attributes/AreStatic.attribute";
import { AreStyle } from "@adaas/are-html/style/AreStyle.context";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AreDirectiveMeta } from "@adaas/are-html/directive/AreDirective.meta";



@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'AreHTMLNode represents a node in the HTML structure. It extends the base AreNode and includes properties and methods specific to HTML nodes, such as handling attributes, directives, events, and styles.'
})
export class AreHTMLNode extends AreNode {
    /**
     * When set, this node is a *static island* root: its entire inner subtree
     * was detected (at tokenize time) to contain no ARE-reactive constructs —
     * no interpolations, no dynamic attributes and only standard HTML tags.
     *
     * Instead of being exploded into one child AreNode per element/text node,
     * the inner markup is preserved verbatim here and materialised in a single
     * pass by the interpreter (browser-parsed `innerHTML` / cached `<template>`
     * clone). The node's OWN attributes (including any dynamic `:`/`@`/`$` on
     * the island root) still compile and stay reactive as usual.
     */
    protected _staticInnerHTML?: string;

    /**
     * Actual node type. 
     * By default it's a tag name
     */
    get tag(): string {
        return this.aseid.entity;
    }

    /**
     * The verbatim inner markup captured when this node was identified as a
     * static island, or `undefined` for ordinary (per-node) nodes.
     */
    get staticInnerHTML(): string | undefined {
        return this._staticInnerHTML;
    }

    /**
     * Whether this node is a static-island root (see `_staticInnerHTML`).
     */
    get isStaticIsland(): boolean {
        return this._staticInnerHTML !== undefined;
    }

    /**
     * Marks this node as a static-island root, capturing the verbatim inner
     * markup to be materialised in one shot by the interpreter. Called by the
     * tokenizer when the node's inner content is detected to be fully static.
     */
    markStatic(innerHTML: string): void {
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
    clone<T extends AreNode = AreNode>(this: T): T {
        const cloned = super.clone() as unknown as AreHTMLNode;
        const self = this as unknown as AreHTMLNode;

        if (self._staticInnerHTML !== undefined)
            cloned.markStatic(self._staticInnerHTML);

        return cloned as unknown as T;
    }

    /**
     * Clone the node while transferring its existing scope to the clone (used by
     * the $if/$for directives to turn the original node into a lightweight group
     * container). Overridden for the same reason as `clone()`: the static-island
     * marker must survive so a directive applied to an island root keeps its
     * inner markup.
     */
    cloneWithScope<T extends AreNode = AreNode>(this: T): T {
        const cloned = super.cloneWithScope() as unknown as AreHTMLNode;
        const self = this as unknown as AreHTMLNode;

        if (self._staticInnerHTML !== undefined)
            cloned.markStatic(self._staticInnerHTML);

        return cloned as unknown as T;
    }

    /**
      * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
      * 
      * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
      */
    get staticAttributes(): AreStaticAttribute[] {
        return this.scope.resolveFlatAll<AreStaticAttribute>(AreStaticAttribute);
    }
    /**
     * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
     * 
     * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
     */
    get bindings(): AreBindingAttribute[] {
        return this.scope.resolveFlatAll<AreBindingAttribute>(AreBindingAttribute);
    }
    /**
     * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
     * 
     * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
     */
    get directives(): AreDirectiveAttribute[] {
        /**
         * 1. get all registered directives for the node
         */
        const directives = this.scope.resolveFlatAll<AreDirectiveAttribute>(AreDirectiveAttribute)!;
        /**
         * 2. Order them in the way that defined in the meta
         * 
         *   Each meta has a prioprity of order that may impact the way how directives are compiled and rendered. For example, a directive with higher priority may need to be compiled before other directives to ensure that its logic is applied correctly before other directives are processed. By ordering the directives based on their defined priority in the meta, we can ensure that the compilation and rendering process follows the intended logic and behavior as defined by the directive implementations.
         */

        return directives.filter(d => d.component).sort((a, b) => {
            const aMeta = A_Context.meta<AreDirectiveMeta, AreDirective>(a.component!);
            const bMeta = A_Context.meta<AreDirectiveMeta, AreDirective>(b.component!);

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
    get events(): AreEventAttribute[] {
        return this.scope.resolveFlatAll<AreEventAttribute>(AreEventAttribute)!;
    }
    /**
     * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
     */
    get styles(): AreStyle {
        return this.scope.resolveFlat<AreStyle>(AreStyle)!;
    }

    /**
     * Registers or updates the component-scoped CSS string for this node.
     * Called by the @Are.Styles-decorated method on the associated component.
     * A new AreStyle fragment is registered in scope on first call; subsequent
     * calls update the existing fragment in-place.
     */
    setStyles(css: string): void {
        const existing = this.scope.resolveFlat<AreStyle>(AreStyle);
        if (existing) {
            existing.styles = css;
        } else {
            this.scope.register(new AreStyle(css, this.aseid.toString()));
        }
    }

}