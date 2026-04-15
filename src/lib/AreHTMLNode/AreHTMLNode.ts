import { A_Context, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreNode} from "@adaas/are";
import { AreBindingAttribute } from "@adaas/are-html/attributes/AreBinding.attribute";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreEventAttribute } from "@adaas/are-html/attributes/AreEvent.attribute";
import { AreStaticAttribute } from "@adaas/are-html/attributes/AreStatic.attribute";
import { AreStyle } from "@adaas/are-html/style/AreStyle.context";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AreDirectiveMeta } from "@adaas/are-html/directive/AreDirective.meta";



@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreHTMLNode',
    description: 'AreHTMLNode represents a node in the HTML structure. It extends the base AreNode and includes properties and methods specific to HTML nodes, such as handling attributes, directives, events, and styles.'
})
export class AreHTMLNode extends AreNode {
    /**
     * Actual node type. 
     * By default it's a tag name
     */
    get tag(): string {
        return this.aseid.entity;
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

}