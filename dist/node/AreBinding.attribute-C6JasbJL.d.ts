import { AreStoreWatchingEntity, AreNode, AreAttribute } from '@adaas/are';
import { A_Component, A_TYPES__Ctor } from '@adaas/a-concept';
import { AreStyle } from './lib/AreStyle/AreStyle.context.js';

declare class AreDirective extends A_Component {
    /**
     * Allows to define a compilation order for directives, which is necessary when we have multiple directives on the same node and we want to control the order of their compilation and application. The directive with the highest priority will be compiled and applied first, and the directive with the lowest priority will be compiled and applied last. This is important because some directives may depend on the output of other directives, so we need to ensure that they are compiled and applied in the correct order to avoid errors and ensure the expected behavior.
     *
     * @param priority
     * @returns
     */
    static Priority(priority: number): <TTarget extends A_TYPES__Ctor<AreDirective>>(target: TTarget) => TTarget;
    /**
     * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     */
    static get Transform(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for compiling a directive attribute into a set of SceneInstructions.
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Compile(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for updating a directive attribute based on changes in the store or other dependencies.
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Update(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Default transform method for directives, which can be overridden by specific directive implementations. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     *
     * @param attribute - The directive attribute to transform, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the transformation process.
     */
    transform(attribute: AreDirectiveAttribute, ...args: any[]): void;
    /**
     * Default compile method for directives, which can be overridden by specific directive implementations.
     *
     * @param attribute - The directive attribute to compile, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the compilation process.
     */
    compile(attribute: AreDirectiveAttribute, ...args: any[]): void;
    /**
     * Default update method for directives, which can be overridden by specific directive implementations. This method is called when there are changes in the store or other dependencies that may affect the directive's behavior or appearance. The method should contain logic to update the directive accordingly, such as re-evaluating its value, modifying the DOM, or triggering re-rendering of the affected nodes.
     *
     * @param attribute - The directive attribute to update, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args - Additional arguments that may be required for the update process.
     */
    update(attribute: AreDirectiveAttribute, ...args: any[]): void;
}

declare class AreDirectiveAttribute extends AreHTMLAttribute implements AreStoreWatchingEntity {
    cache?: any;
    template?: AreHTMLNode;
    /**
     * Returns a custom directive component associated with this attribute, if available.
     *
     * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
     */
    get component(): AreDirective | undefined;
}

declare class AreEventAttribute extends AreHTMLAttribute {
}

declare class AreStaticAttribute extends AreHTMLAttribute {
}

declare class AreHTMLNode extends AreNode {
    /**
     * Actual node type.
     * By default it's a tag name
     */
    get tag(): string;
    /**
      * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
      *
      * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
      */
    get staticAttributes(): AreStaticAttribute[];
    /**
     * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
     *
     * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
     */
    get bindings(): AreBindingAttribute[];
    /**
     * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
     *
     * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
     */
    get directives(): AreDirectiveAttribute[];
    /**
     * The event attributes defined for the node, which are typically used to represent event listeners or handlers that should be attached to the node. These attributes are usually defined in the template with a specific syntax (e.g., `@click="handleClick"` or `v-on:click="handleClick"`) and are processed by the rendering engine to attach the corresponding event listeners to the node.
     *
     * Example: For a node defined as `<button @click="handleClick">`, the event attribute would be `@click="handleClick"`.
     */
    get events(): AreEventAttribute[];
    /**
     * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
     */
    get styles(): AreStyle;
}

declare class AreHTMLAttribute extends AreAttribute {
    get owner(): AreHTMLNode;
}

declare class AreBindingAttribute extends AreHTMLAttribute {
}

export { AreBindingAttribute as A, AreDirective as a, AreDirectiveAttribute as b, AreEventAttribute as c, AreHTMLAttribute as d, AreHTMLNode as e, AreStaticAttribute as f };
