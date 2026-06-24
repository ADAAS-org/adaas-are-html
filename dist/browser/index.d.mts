import { AreStoreWatchingEntity, AreNode, AreAttribute, AreStore, AreScene, AreSyntax, AreMutation, AreDeclaration, AreInstructionSerialized, AreNodeNewProps, Are, AreSignal, AreContext, AreInstruction, AreCompiler, AreEngine, AreSignalsContext, AreSyntaxTokenMatch, AreInterpreter, AreLifecycle, AreTokenizer, AreTransformer } from '@adaas/are';
import { A_Component, A_TYPES__Ctor, A_Fragment, ASEID, A_Scope, A_Feature, A_ComponentMeta } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Route } from '@adaas/a-utils/a-route';
import { A_Signal, A_SignalState, A_SignalVector } from '@adaas/a-utils/a-signal';

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

declare class AreStyle extends A_Fragment {
    styles: string;
    constructor(styles: string, aseid?: ASEID | string);
}

declare class AreHTMLNode extends AreNode {
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
    get tag(): string;
    /**
     * The verbatim inner markup captured when this node was identified as a
     * static island, or `undefined` for ordinary (per-node) nodes.
     */
    get staticInnerHTML(): string | undefined;
    /**
     * Whether this node is a static-island root (see `_staticInnerHTML`).
     */
    get isStaticIsland(): boolean;
    /**
     * Marks this node as a static-island root, capturing the verbatim inner
     * markup to be materialised in one shot by the interpreter. Called by the
     * tokenizer when the node's inner content is detected to be fully static.
     */
    markStatic(innerHTML: string): void;
    /**
     * Deep-clone the node. Overridden to carry over the static-island marker
     * (`_staticInnerHTML`), which lives on AreHTMLNode and is therefore NOT
     * copied by the base AreNode.clone(). Without this, cloning a directive
     * template ($if/$for) that wraps a static island (e.g. `<span $if>★</span>`)
     * would drop the captured inner markup and render an empty element. The
     * base clone() recurses via each child's polymorphic clone(), so nested
     * island children are preserved automatically through this override.
     */
    clone<T extends AreNode = AreNode>(this: T): T;
    /**
     * Clone the node while transferring its existing scope to the clone (used by
     * the $if/$for directives to turn the original node into a lightweight group
     * container). Overridden for the same reason as `clone()`: the static-island
     * marker must survive so a directive applied to an island root keeps its
     * inner markup.
     */
    cloneWithScope<T extends AreNode = AreNode>(this: T): T;
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
    /**
     * Registers or updates the component-scoped CSS string for this node.
     * Called by the @Are.Styles-decorated method on the associated component.
     * A new AreStyle fragment is registered in scope on first call; subsequent
     * calls update the existing fragment in-place.
     */
    setStyles(css: string): void;
}

declare class AreHTMLAttribute extends AreAttribute {
    get owner(): AreHTMLNode;
}

declare class AreBindingAttribute extends AreHTMLAttribute {
}

declare class AreDirectiveFor extends AreDirective {
    /**
     * Lists whose number of NEW item nodes is at or below this threshold render
     * fully synchronously — byte-for-byte the previous behavior. Typical UIs
     * (menus, small tables) are therefore completely unaffected; only genuinely
     * large lists pay the (tiny) scheduling cost to keep the main thread responsive.
     */
    private static readonly SYNC_THRESHOLD;
    /**
     * Per-chunk time budget (ms). During a large-list render we mount item nodes
     * until this much time has elapsed, then yield to the browser so it can paint
     * and process input before the next chunk. ~16ms targets one animation frame.
     */
    private static readonly CHUNK_BUDGET_MS;
    /**
     * Per-attribute serialization state. A new update() that arrives while a
     * chunked render of the SAME `$for` is still in flight does NOT start a second
     * concurrent pass (which could interleave mutations on the shared children
     * list); instead it marks `pending` and the in-flight run re-runs once more
     * with the latest data when it finishes. This guarantees the children list is
     * only ever mutated by one pass at a time and the final state always reflects
     * the most recent store value.
     */
    private static readonly renderState;
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void | Promise<void>;
    /**
     * Core of the `$for` update: re-diff the source array against the current
     * children, reconcile reused/removed items, then mount the new ones (small
     * lists synchronously, large lists time-sliced). Never called while another
     * pass for the same `$for` is in flight (see `update`).
     */
    private performUpdate;
    /**
     * Repositions the item nodes' DOM elements so the rendered order matches the
     * source array order. The keyed diff (steps 1–4) reuses existing nodes in
     * place and mounts new ones at the end; without this pass a `prepend` or
     * `shuffle` would leave reused rows where they were and pile new rows at the
     * bottom. We walk the desired order RIGHT-TO-LEFT, keeping a `ref` pointer to
     * the element each item must precede (starting at the `$for` anchor comment),
     * and only call `insertBefore` when an element is not already in position —
     * so a plain `append` (already-correct order) performs ZERO DOM moves.
     */
    private reconcileOrder;
    /**
     * Completes an update pass. If another update() arrived while a chunked
     * render was streaming, run exactly one more pass now from the latest store
     * value so the final DOM always reflects the most recent data.
     */
    private finishUpdate;
    /**
     * Walks the node's ancestor chain (inclusive) and reports whether the
     * whole path is currently active — i.e. the subtree is actually rendered
     * into the DOM. A single inactive ancestor scene (e.g. a `$if` whose
     * condition is false) means the subtree is detached.
     */
    private isAttached;
    /**
     * Build a key-function that derives a stable identity from each item.
     * If the user provided a `track <expr>` clause, evaluate it as a path on
     * the item; otherwise fall back to the item identity (reference equality).
     */
    private makeKeyFn;
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
    private parseExpression;
    /**
     * Resolves the array expression against the store.
     * Supports both plain key lookups and function-call expressions:
     *   items          → store.get('items')
     *   filter(items)  → store.get('filter')(store.get('items'))
     *
     * `contextScope` carries item-scoped variables introduced by an enclosing
     * directive (e.g. the `row` of an outer `$for`). It is consulted BEFORE the
     * store so a nested `$for="cell in row.cells"` resolves `row` from the
     * parent iteration instead of looking for a (non-existent) top-level store
     * key. Leading identifiers not present in the context fall back to the store.
     */
    private resolveArray;
    /**
     * Creates a single item node from the template, registers it as a child of
     * the owner, initialises it, injects item-scoped store values, and activates
     * its scene so the mount/compile cycle will include it.
     *
     * NOTE: This method does NOT call compile() or mount() — the caller is
     * responsible for doing so when the main lifecycle cycle won't cover it
     * (i.e. during update, but not during the initial compile phase).
     */
    private spawnItemNode;
}

declare class AreDirectiveContext extends A_ExecutionContext {
    scope: Record<string, any>;
    constructor(aseid: ASEID | string);
}

/**
 * `$if` directive — conditionally renders a node based on an expression.
 *
 * ⚠️ Known limitation: do NOT use `$if` and `$for` on the SAME element.
 *    Doing so produces duplicated DOM on toggle because the two directives
 *    share an owner node and clone its scope independently. Wrap one in a
 *    parent element instead, e.g.:
 *
 *        <div $if="visible">
 *            <li $for="item in items">{{item.name}}</li>
 *        </div>
 *
 *    or
 *
 *        <ul $for="item in items">
 *            <li $if="item.visible">{{item.name}}</li>
 *        </ul>
 */
declare class AreDirectiveIf extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scope: A_Scope, syntax: AreSyntax, scene: AreScene, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    /**
     * Evaluates the `$if` condition defensively.
     *
     * A condition can reference data that is momentarily unavailable — most
     * commonly a nested `$if` (e.g. `$if="selected.fields.length"`) living
     * inside a parent `$if="selected"` whose object has just become `null`.
     * Because the nested directive is still subscribed to the store, its
     * update fires on that same change and the raw expression would throw
     * `Cannot read properties of null`, crashing the whole update pipeline.
     *
     * Treating an evaluation error as `false` is the correct contract for a
     * conditional: if the condition cannot be resolved, the subtree simply
     * stays hidden until the referenced data is present again (at which point
     * the parent `$if` re-activates and re-evaluates this one).
     */
    private evaluateCondition;
}

/**
 * `$show` directive — conditionally toggles an element's visibility.
 *
 * Unlike `$if`, `$show` keeps the element fully mounted at all times and only
 * flips its inline `display` (Vue `v-show` semantics). The element's subtree,
 * event listeners and scene state are preserved across toggles, which makes it
 * far cheaper than `$if` for things that flip on/off frequently. Use `$if` when
 * the hidden branch is expensive and rarely shown; use `$show` when it toggles
 * often.
 *
 * ⚠️ Known limitations:
 *  - Do NOT combine `$show` with `$if`/`$for` on the SAME element — they share
 *    an owner node and would fight over its host instruction. Wrap one in a
 *    parent element instead.
 *  - `$show` forces inline `display:none`, which beats stylesheet rules but will
 *    NOT override the element's own inline `:style="display:..."` binding.
 */
declare class AreDirectiveShow extends AreDirective {
    transform(attribute: AreDirectiveAttribute, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
}

type AreHtmlAddAttributeInstructionPayload = {
    name: string;
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddElementInstructionPayload = {
    tag: string;
};
type AreHtmlAddTextInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddCommentInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddStyleInstructionPayload = {
    /** Full CSS string to inject as a <style> block scoped to the component. Applied to the document head and reverted on unmount. */
    styles: string;
};
type AreHtmlAddStaticHTMLInstructionPayload = {
    /**
     * Verbatim inner markup of a static island, materialised on the parent
     * element in a single pass (browser-parsed `innerHTML` / cached `<template>`
     * clone). Decodes HTML entities (e.g. `&nbsp;`) for free via the parser.
     */
    html: string;
};
type AreHtmlHideInstructionPayload = {
    /**
     * Optional explicit display value to restore when the element becomes
     * visible again. When omitted, the interpreter caches and restores the
     * element's own prior inline `display` value (Vue `v-show` semantics).
     */
    display?: string;
};
type AreHtmlAddListenerInstructionPayload = {
    /** DOM event name (e.g. "click", "input", "submit") */
    name: string;
    /** Event handler callback */
    handler: string;
};
type AreHtmlAddInterpolationInstructionPayload = {
    /** The interpolation key used to look up the value in the store */
    key: string;
    /** Dynamic getter function that resolves the current interpolation value */
    content: (...args: any[]) => string;
};

declare class AddAttributeInstruction extends AreMutation<AreHtmlAddAttributeInstructionPayload> {
    cache?: string;
    constructor(parent: AreDeclaration, props: AreHtmlAddAttributeInstructionPayload | AreInstructionSerialized<AreHtmlAddAttributeInstructionPayload>);
}

declare class AddElementInstruction extends AreDeclaration<AreHtmlAddElementInstructionPayload> {
    constructor(props: AreHtmlAddElementInstructionPayload | AreInstructionSerialized<AreHtmlAddElementInstructionPayload>);
}

declare class AddInterpolationInstruction extends AreMutation<AreHtmlAddInterpolationInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddInterpolationInstructionPayload | AreInstructionSerialized<AreHtmlAddInterpolationInstructionPayload>);
}

declare class AddListenerInstruction extends AreMutation<AreHtmlAddListenerInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddListenerInstructionPayload | AreInstructionSerialized<AreHtmlAddListenerInstructionPayload>);
}

declare class AddStaticHTMLInstruction extends AreMutation<AreHtmlAddStaticHTMLInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddStaticHTMLInstructionPayload | AreInstructionSerialized<AreHtmlAddStaticHTMLInstructionPayload>);
}

declare class AddStyleInstruction extends AreMutation<AreHtmlAddStyleInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddStyleInstructionPayload | AreInstructionSerialized<AreHtmlAddStyleInstructionPayload>);
}

declare class AddTextInstruction extends AreDeclaration<AreHtmlAddTextInstructionPayload> {
    constructor(props: AreHtmlAddTextInstructionPayload | AreInstructionSerialized<AreHtmlAddTextInstructionPayload>);
}

declare class HideElementInstruction extends AreMutation<AreHtmlHideInstructionPayload> {
    /**
     * Caches the element's inline `display` value captured at apply time so it
     * can be restored verbatim on revert (mirrors Vue `v-show`).
     */
    cache?: string;
    constructor(parent: AreDeclaration, props: AreHtmlHideInstructionPayload | AreInstructionSerialized<AreHtmlHideInstructionPayload>);
}

declare const AreHTMLInstructions: {
    readonly AddElement: "_AreHTML_AddElement";
    readonly AddText: "_AreHTML_AddText";
    readonly AddAttribute: "_AreHTML_AddAttribute";
    readonly AddStyle: "_AreHTML_AddStyle";
    readonly AddListener: "_AreHTML_AddListener";
    readonly AddInterpolation: "_AreHTML_AddInterpolation";
    readonly AddComment: "_AreHTML_AddComment";
    readonly AddStaticHTML: "_AreHTML_AddStaticHTML";
    readonly HideElement: "_AreHTML_HideElement";
};

declare class AreComment extends AreHTMLNode {
    fromNew(newEntity: AreNodeNewProps): void;
}

declare class AreComponentNode extends AreHTMLNode {
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined;
}

declare class AreInterpolation extends AreHTMLNode {
    fromNew(newEntity: AreNodeNewProps): void;
}

declare class AreRootNode extends AreHTMLNode {
    /**
     * For the root node, we can default to a generic container element like <div> since it serves as the root of the component tree and does not correspond to a specific HTML tag defined in the markup. The actual content and structure of the root node will be determined by the child nodes and components that are rendered within it, allowing for flexibility in how the root node is used and what it contains.
     */
    get tag(): string;
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined;
}

declare class AreText extends AreHTMLNode {
    fromNew(newEntity: AreNodeNewProps): void;
}

declare class AreRoute extends AreSignal<A_Route> {
    constructor(path: string | RegExp);
    get route(): A_Route;
    static default(): AreRoute | undefined;
    compare(other: A_Signal<A_Route>): boolean;
}

/** XML namespace URI for SVG elements. */
declare const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
/**
 * Maps namespace prefixes used in SVG/XML attributes to their canonical URIs.
 * Used by the interpreter when calling setAttributeNS / removeAttributeNS.
 */
declare const SVG_ATTRIBUTE_NS: Record<string, string>;
/**
 * Void HTML elements that cannot have children and must not have a closing tag.
 * Per the HTML5 spec these are treated as self-closing even when written as
 * `<input>` (without the trailing slash `/>`).
 *
 * Reference: https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
declare const VOID_ELEMENTS: Set<string>;
declare function isVoidElement(tagName: string): boolean;
/**
 * Boolean HTML attributes whose presence (regardless of value) implies "true",
 * and whose absence implies "false". Setting these via `setAttribute(name, value)`
 * always renders the attribute, which is wrong for reactive bindings.
 *
 * Reference: https://html.spec.whatwg.org/multipage/indices.html#attributes-3
 */
declare const BOOLEAN_ATTRIBUTES: Set<string>;
declare function isBooleanAttribute(name: string): boolean;
/**
 * Form-control IDL properties that must be set as a JS property
 * (not just an attribute) so live user input is reflected.
 *
 * `<input value="foo">` only sets the *default* value;
 * `input.value = "foo"` updates the live state.
 */
declare const IDL_FORM_PROPERTIES: Record<string, Set<string>>;
declare function isIDLFormProperty(tagName: string, attrName: string): boolean;
/**
 * Normalize a `:class` binding value into a single space-separated string.
 * Supports the common shapes:
 *   - string                                       → "a b"
 *   - array<string | object | falsy>               → ["a", { b: true, c: cond }, null]
 *   - object<string, boolean>                      → { a: true, b: false }
 */
declare function normalizeClassValue(value: any): string;
/**
 * Normalize a `:style` binding value into an inline-style string.
 * Supports:
 *   - string                                       → "color: red; font-size: 12px"
 *   - object<string, string|number>                → { color: 'red', fontSize: '12px' }
 *   - array<string | object>                       → ['color: red', { fontSize: '12px' }]
 */
declare function normalizeStyleValue(value: any): string;
/**
 * Parse a DOM event name with modifiers, e.g. "click.stop.prevent" or "keydown.enter".
 * Returns the bare event name plus the modifier set.
 */
interface ParsedEventName {
    event: string;
    modifiers: Set<string>;
}
declare function parseEventName(raw: string): ParsedEventName;
/**
 * Known event-listener modifiers that map directly to addEventListener options.
 */
declare const LISTENER_OPTION_MODIFIERS: Set<string>;
/**
 * Coerce a value into a string for DOM consumption.
 * Avoids "undefined"/"null"/"[object Object]" leaks into the DOM.
 */
declare function toDOMString(value: any): string;
/**
 * Standard HTML element names that are safe to materialise wholesale via
 * `innerHTML` / a cached `<template>` clone.
 *
 * The set is intentionally an allow-list of plain HTML flow/phrasing/table/list
 * /form-display tags. Anything NOT in this set — custom elements, registered
 * ARE components (resolved by PascalCase tag), and SVG/MathML elements — is
 * excluded so those subtrees keep flowing through the normal per-node pipeline
 * (SVG needs createElementNS; components need their own lifecycle).
 */
declare const STANDARD_HTML_TAGS: Set<string>;
/**
 * Detects whether an inner-markup string is a fully *static island* — i.e. it
 * contains no ARE-reactive constructs and therefore can be rendered in one shot
 * (browser-parsed `innerHTML` / cached `<template>` clone) instead of being
 * exploded into one AreNode per element/text/interpolation.
 *
 * A subtree is static iff it contains:
 *   1. no `{{ }}` interpolations, and
 *   2. no dynamic attributes (`$`-directive / `:`-binding / `@`-event), and
 *   3. only standard HTML tags (no custom elements, ARE components or SVG).
 *
 * The scanner is quote-aware so a `:` / `@` / `$` inside an attribute *value*
 * (e.g. `href="http://…"`, `style="color:red"`) is never mistaken for a
 * dynamic-attribute prefix. The detector is deliberately conservative: any
 * ambiguity resolves to `false` (skip the optimisation, keep the safe path).
 *
 * NOTE: pure-text content (no tags at all) is also considered static — this is
 * what lets `&nbsp;`, `&amp;`, `&#160;` and friends decode correctly, since the
 * browser HTML parser handles entities that hand-built text nodes do not.
 */
declare function isStaticMarkup(inner: string): boolean;

type AreHTMLContextConstructor = {
    container: Document;
    source: string;
};

declare class AreHTMLEngineContext extends AreContext {
    /**
     * Index structure mapping:
     *
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */
    protected index: {
        /**
         * 1 AreNode = 1 Dom Node
         *
         * uses ASEID
         */
        nodeToHostElements: Map<string, Node>;
        /**
         * 1 Group Instruction = MANY Dom Nodes (e.g. for loop)
         *
         * uses ASEID
         */
        groupToElements: Map<string, Set<Node>>;
        /**
         * 1 Dom Node = 1 Instruction
         *
         * uses ASEID
         */
        elementToInstruction: WeakMap<Node, string>;
        /**
         * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
         *
         * uses ASEID
         */
        instructionToElement: Map<string, Node>;
        /**
         * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
         */
        elementListeners: WeakMap<Node, Map<string, Set<EventListenerOrEventListenerObject>>>;
    };
    /**
     * The root container for the HTML engine, which can be either a Document or a ShadowRoot. This is where the engine will mount the generated DOM elements. The context uses this container to manage the relationship between AreNodes, instructions, and their corresponding DOM elements, allowing for efficient updates and cleanups as the application state changes.
     */
    protected _container: Document;
    /**
     * Parsed-fragment cache for static islands (see AddStaticHTMLInstruction).
     *
     * Keyed by `hostTag\u0000markup`, each entry holds a `DocumentFragment` whose
     * children were parsed by the browser exactly once — in the *correct element
     * context* (the host tag), so table fragments (`<tr>`, `<td>`, …) and other
     * context-sensitive content parse correctly. Repeated static islands with
     * identical markup (e.g. list rows, reused components) clone the pre-parsed
     * fragment instead of re-parsing the HTML string on every mount — turning an
     * O(parse) operation into an O(clone) one.
     */
    protected _staticFragmentCache: Map<string, DocumentFragment>;
    /**
     * Live-DOM attachments deferred while a mount pass is batching.
     *
     * A freshly-mounted subtree is built inside a *detached* root element, so
     * every descendant `appendChild`/`insertBefore` happens off-document and
     * triggers zero layout/paint invalidation. The single mutation that actually
     * connects the built subtree to the live document is deferred and collected
     * here, then flushed once when the batch closes — collapsing O(nodes) reflows
     * into O(1) per mount root.
     */
    protected _pendingAttachments: Array<() => void>;
    /**
     * Depth of the currently open batching scopes. Re-entrant so that nested
     * `beginBatch`/`endBatch` pairs flush exactly once, when the outermost scope
     * closes.
     */
    protected _batchDepth: number;
    constructor(props: Partial<AreHTMLContextConstructor>);
    get container(): Document;
    /**
     * `true` while a synchronous mount pass is batching live-DOM attachments.
     * Interpreter handlers consult this to decide whether to attach an element
     * immediately or hand the attachment to {@link deferAttach}.
     */
    get isBatching(): boolean;
    /**
     * Opens a batching scope. Re-entrant: only the outermost matching
     * {@link endBatch} flushes the deferred attachments, so a single mount pass
     * connects its built subtree to the live DOM exactly once.
     */
    beginBatch(): void;
    /**
     * Registers a live-DOM attachment to run when the current batch flushes. If
     * no batch is active the attachment runs immediately, preserving the original
     * synchronous behaviour for updates that mount outside a batch.
     *
     * @param attach the DOM mutation that connects a built subtree to the document
     */
    deferAttach(attach: () => void): void;
    /**
     * Closes a batching scope. When the outermost scope closes, every deferred
     * attachment runs in registration (document) order, connecting the built
     * subtrees to the live DOM in a single pass.
     */
    endBatch(): void;
    /**
     * Returns a `DocumentFragment` containing the parsed form of `html`, parsed
     * once in the context of `hostTag` (so context-sensitive content such as
     * table rows/cells parses correctly) and cached thereafter. Callers should
     * `cloneNode(true)` the returned fragment rather than mutating it, so the
     * cache stays reusable.
     *
     * @param hostTag the tag name of the element the markup will be injected into
     * @param html    verbatim static-island inner markup
     */
    getStaticFragment(hostTag: string, html: string): DocumentFragment;
    /**
     * Retrieves the DOM element associated with a given AreNode. This method looks up the node's ASEID in the nodeToHostElements map to find the corresponding DOM element. If the node is not found, it returns undefined. This allows the engine to efficiently access and manipulate the DOM elements that correspond to specific nodes in the AreNode tree, enabling dynamic updates and interactions based on the application state.
     *
     * @param nodeASEID
     */
    getNodeElement(nodeASEID: string): Node | undefined;
    getNodeElement(node: AreNode): Node | undefined;
    /**
     * Associates a DOM element with a given instruction and its owner node. This method updates the context's index to map the instruction's ASEID to the provided DOM element, and also maps the element back to the instruction's ASEID for reverse lookup. If the instruction has an owner node, it also maps the node's ASEID to the element. Additionally, if the instruction belongs to a group, it adds the element to the set of elements associated with that group. This indexing allows the engine to efficiently manage and update DOM elements based on instructions and their corresponding nodes, enabling dynamic rendering and interaction in response to application state changes.
     *
     * @param instruction
     * @param element
     */
    setInstructionElement(instruction: AreInstruction, element: Node): void;
    /**
     * Retrieves the DOM element associated with a given instruction. This method looks up the instruction's ASEID in the instructionToElement map to find the corresponding DOM element. If the instruction is not found, it returns undefined. This allows the engine to efficiently access and manipulate the DOM elements that correspond to specific instructions, enabling dynamic updates and interactions based on the application state.
     *
     * @param instructionASEID
     */
    getElementByInstruction(instructionASEID: string): Node | undefined;
    getElementByInstruction(instruction: AreInstruction): Node | undefined;
    /**
     * Removes the association between a given instruction and its corresponding DOM element. This method looks up the instruction's ASEID to find the associated DOM element, and if found, it deletes the mapping from both instructionToElement and elementToInstruction. If the instruction has an owner node, it also removes the mapping from nodeToHostElements. Additionally, if the instruction belongs to a group, it removes the element from the set of elements associated with that group, and if the group has no more elements, it deletes the group from the index. This cleanup is essential for maintaining an accurate and efficient mapping of instructions to DOM elements, especially when instructions are reverted or when nodes are removed from the DOM.
     *
     * @param instruction
     */
    removeInstructionElement(instruction: AreInstruction): void;
    /**
     * Retrieves the set of DOM elements associated with a given group. This method looks up the group name or instruction's ASEID in the groupToElements map to find the corresponding set of DOM elements. If the group is not found, it returns undefined. This allows the engine to efficiently access and manipulate all DOM elements that belong to a specific group (e.g., all elements generated by a particular loop instruction), enabling dynamic updates and interactions based on the application state.
     *
     * @param groupName
     */
    getElementsByGroup(groupName: string): Set<Node> | undefined;
    getElementsByGroup(instruction: AreInstruction): Set<Node> | undefined;
    /**
     * Adds an event listener to a specific DOM element and keeps track of it in the context's index for proper cleanup later. This method takes a DOM element, an event name, and a listener function or object, and stores this information in the elementListeners map. This allows the engine to efficiently manage event listeners attached to dynamically created elements, ensuring that they can be removed when the associated instructions are reverted or when nodes are removed from the DOM, preventing memory leaks and unintended behavior.
     *
     * @param element
     * @param eventName
     * @param listener
     */
    addListener(element: Node, eventName: string, listener: EventListenerOrEventListenerObject): void;
    /**
     * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
     *
     * @param element
     * @param eventName
     * @returns
     */
    getListener(element: Node, eventName: string): EventListenerOrEventListenerObject | undefined;
    /**
     * Returns all listeners registered for a given element + event name.
     */
    getListeners(element: Node, eventName: string): Set<EventListenerOrEventListenerObject> | undefined;
    /**
     * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
     *
     * @param element
     * @param eventName
     */
    removeListener(element: Node, eventName: string, listener?: EventListenerOrEventListenerObject): void;
}

declare class AreHTMLCompiler extends AreCompiler {
    /**
     * Extends the base compile for all AreHTMLNode instances (elements, components, root nodes).
     * After the standard element/attribute/children instructions are emitted, checks whether
     * the node has a registered AreStyle and plans an AddStyleInstruction so the interpreter
     * can inject the CSS into the document head during mount.
     */
    compileHTMLNode(node: AreHTMLNode, scene: AreScene, logger?: A_Logger, ...args: any[]): void;
    /**
     * Default compile method for interpolations, which can be overridden by specific implementations if needed.
     *
     * @param interpolation
     * @param scope
     * @param scene
     * @param store
     * @param feature
     */
    compileInterpolation(interpolation: AreInterpolation, scene: AreScene, store: AreStore, logger?: A_Logger, ...args: any[]): void;
    compileText(text: AreText, scene: AreScene, logger?: A_Logger, ...args: any[]): void;
    compileStaticAttribute(attribute: AreStaticAttribute, scene: AreScene, ...args: any[]): void;
    compileDirectiveAttribute(directive: AreDirectiveAttribute, store: AreStore, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
    compileEventAttribute(attribute: AreEventAttribute, scene: AreScene, ...args: any[]): void;
    compileBindingAttribute(attribute: AreBindingAttribute, scene: AreScene, parentStore: AreStore, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
}

/**
 * A single cached, detached component subtree for an are-root outlet.
 *
 * `node` is fully compiled and its scene plan is intact (it was `unmount()`ed,
 * not destroyed), so it can be re-mounted instantly without re-tokenizing,
 * re-loading, transforming or compiling. `subscribers` records the exact set of
 * nodes inside the subtree that were subscribed to the signal bus at the moment
 * of stashing — they are unsubscribed while cached (so the detached DOM never
 * reacts to signals) and re-subscribed verbatim on restore.
 */
type AreRootCacheEntry = {
    node: AreNode;
    subscribers: AreNode[];
};
declare class AreRootCache extends A_Fragment {
    /**
     * rootId -> (component tag -> cache entry). The inner Map preserves
     * insertion order which is used as the LRU recency order: the first key is
     * the least-recently-used entry, the last key the most-recently-used.
     */
    protected _cache: Map<string, Map<string, AreRootCacheEntry>>;
    /**
     * Maximum number of cached subtrees kept per root. Older entries beyond this
     * limit are evicted (and returned to the caller so it can destroy them).
     */
    protected _limit: number;
    constructor(limit?: number);
    /**
     * Maximum number of cached subtrees kept per root.
     */
    get limit(): number;
    protected bucket(rootId: string): Map<string, AreRootCacheEntry>;
    /**
     * Whether a subtree for the given component tag is currently cached.
     */
    has(rootId: string, tag: string): boolean;
    /**
     * Retrieve AND remove a cached subtree so it can become live again. Returns
     * `undefined` on a cache miss.
     */
    take(rootId: string, tag: string): AreRootCacheEntry | undefined;
    /**
     * Stash a detached subtree under the given component tag. Returns any entries
     * that were evicted to honour the LRU limit (or replaced for the same tag) so
     * the caller can `destroy()` them.
     */
    put(rootId: string, tag: string, entry: AreRootCacheEntry): AreRootCacheEntry[];
    /**
     * Remove and return every cached entry for a root (e.g. on teardown) so the
     * caller can destroy them.
     */
    clear(rootId: string): AreRootCacheEntry[];
}

declare class AreHTMLEngine extends AreEngine {
    get DefaultSyntax(): AreSyntax;
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    init(scope: A_Scope, signalContext?: AreSignalsContext, rootCache?: AreRootCache): Promise<void>;
    protected rootElementMatcher(source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch): AreSyntaxTokenMatch | null;
    protected htmlElementMatcher(source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch): AreSyntaxTokenMatch | null;
    /**
     * Find the index of the closing `>` of an opening tag, skipping over
     * `>` characters that appear inside quoted attribute values.
     */
    private static findTagClose;
}

declare class AddCommentInstruction extends AreDeclaration<AreHtmlAddCommentInstructionPayload> {
    get content(): string;
    constructor(props: AreHtmlAddCommentInstructionPayload | AreInstructionSerialized<AreHtmlAddCommentInstructionPayload>);
}

declare class AreHTMLInterpreter extends AreInterpreter {
    addElement(declaration: AddElementInstruction, context: AreHTMLEngineContext, logger?: A_Logger): void;
    removeElement(declaration: AddElementInstruction, context: AreHTMLEngineContext): void;
    addAttribute(mutation: AddAttributeInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeAttribute(mutation: AddAttributeInstruction, context: AreHTMLEngineContext): void;
    hideElement(mutation: HideElementInstruction, context: AreHTMLEngineContext): void;
    showElement(mutation: HideElementInstruction, context: AreHTMLEngineContext): void;
    addEventListener(mutation: AddListenerInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeEventListener(mutation: AddListenerInstruction, context: AreHTMLEngineContext): void;
    addText(declaration: AddTextInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeText(declaration: AddTextInstruction, context: AreHTMLEngineContext): void;
    addStaticHTML(mutation: AddStaticHTMLInstruction, context: AreHTMLEngineContext, logger?: A_Logger): void;
    removeStaticHTML(mutation: AddStaticHTMLInstruction, context: AreHTMLEngineContext): void;
    addComment(declaration: AddCommentInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeComment(declaration: AddCommentInstruction, context: AreHTMLEngineContext): void;
    addStyle(mutation: AddStyleInstruction, context: AreHTMLEngineContext, logger?: A_Logger): void;
    removeStyle(mutation: AddStyleInstruction, context: AreHTMLEngineContext): void;
    /**
     * Returns true when any ancestor of the given node has the tag `svg`,
     * meaning the node lives inside an SVG subtree and its DOM element must be
     * created via createElementNS(SVG_NAMESPACE, tag).
     */
    private isInSVGContext;
}

declare class AreHTMLLifecycle extends AreLifecycle {
    initComponent(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initRoot(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initText(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initInterpolation(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    mount(
    /**
     * Node to be mounted
     */
    node: AreHTMLNode, 
    /**
     * Node Content
     */
    scene: AreScene, logger?: A_Logger, ...args: any[]): void | Promise<void>;
    updateDirectiveAttribute(directive: AreDirectiveAttribute, scope: A_Scope, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
}

declare class AreHTMLTokenizer extends AreTokenizer {
    ATTR_PATTERN: RegExp;
    tokenize(node: AreNode, context: AreContext, logger?: A_Logger): void;
    extractAttributes(markup: string): AreHTMLAttribute[];
}

declare class AreHTMLTransformer extends AreTransformer {
    transformDirectiveAttribute(directive: AreDirectiveAttribute, store: AreStore, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
}

declare const AreDirectiveFeatures: {
    /**
     * Feature that should transform the tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     */
    readonly Transform: "_AreDirective_Transform";
    /**
     * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
     */
    readonly Compile: "_AreDirective_Compile";
    /**
     * Feature that should update the directiveAttribute based on the changes in the store or other dependencies.
     */
    readonly Update: "_AreDirective_Update";
};

declare class AreDirectiveMeta extends A_ComponentMeta {
    priority: number;
}

type AreDirectiveOrderDecoratorParameters = {
    /**
     * The directive that should be applied before the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    before: string | RegExp | A_TYPES__Ctor<AreDirective>;
    /**
     * The directive that should be applied after the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    after: string | RegExp | A_TYPES__Ctor<AreDirective>;
};

declare class AreRoot extends Are {
    template(root: AreNode, logger: A_Logger, signalsContext?: AreSignalsContext, signalState?: A_SignalState): Promise<void>;
    onSignal(root: AreNode, vector: A_SignalVector, logger: A_Logger, signalsContext?: AreSignalsContext, cache?: AreRootCache): Promise<void>;
    /**
     * Resolves the component a vector should render for the given root, mirroring
     * the priority used everywhere in the routing system:
     *   1. Root-specific conditions registered on AreSignalsContext.
     *   2. The global AreSignalsMeta map, restricted to this outlet's pool.
     *
     * Passing the pool *into* the meta lookup is critical: without it, the first
     * globally matching component wins and may belong to a different outlet
     * (e.g. AisRequirementsPanel for the meta-outlet matching
     * AisEditorCursorScope) — the pool check would then reject it and the outlet
     * would fall back to its default, hiding a valid in-pool match (e.g.
     * AisDiagramTab matching AisSetPrimaryDisplay).
     *
     * Returns `undefined` when nothing matches — callers decide whether to use a
     * configured default, body content, or clear the outlet.
     */
    protected matchComponent(rootId: string, vector: A_SignalVector | undefined, signalsContext?: AreSignalsContext): A_TYPES__Ctor<Are> | undefined;
    /**
     * Builds the vector used for the INITIAL render. It is seeded from the
     * accumulated signal state (every signal dispatched on the bus so far) so a
     * freshly-mounted outlet reflects the live application state immediately,
     * not just on the next signal tick. The current URL route is appended when
     * no AreRoute is already present in the state, so route-driven outlets still
     * resolve on the very first paint (before AreRouteWatcher has dispatched).
     */
    protected buildInitialVector(signalState?: A_SignalState): A_SignalVector;
    /**
     * Detach a displayed child subtree from the outlet and stash it in the cache
     * for fast re-injection later. The subtree is unmounted (its scene plan is
     * preserved) and deregistered from the root scope, but NOT destroyed. The
     * nodes that were subscribed to the signal bus are unsubscribed while cached
     * so the detached DOM never reacts to signals, and recorded so they can be
     * re-subscribed verbatim on restore.
     *
     * When no cache is available, or the LRU evicts an entry, the affected
     * subtree is fully destroyed.
     */
    protected stashChild(root: AreNode, child: AreNode, signalsContext: AreSignalsContext | undefined, cache: AreRootCache | undefined): void;
    /**
     * Re-attach a cached subtree to the outlet and re-mount it from its preserved
     * scene plan, re-subscribing exactly the nodes that were subscribed before it
     * was cached.
     */
    protected restoreChild(root: AreNode, entry: AreRootCacheEntry, signalsContext: AreSignalsContext | undefined): void;
    /**
     * Walk a subtree and collect the nodes currently registered as signal
     * subscribers. Mirrors the subscription performed at init time in
     * AreHTMLLifecycle (component nodes and root nodes) without depending on the
     * concrete node classes — it simply intersects the subtree with the live
     * subscriber registry.
     */
    protected collectSubscribers(node: AreNode, signalsContext: AreSignalsContext): AreNode[];
}

declare class AreRouteWatcher extends A_Component {
    private readonly handlers;
    private current;
    constructor();
    onChange(handler: (url: URL) => void): () => void;
    get url(): URL;
    destroy(): void;
    private onPopState;
    private onHashChange;
    private onURLChange;
    private attachListeners;
    private patchHistory;
    private notify;
}

export { AddAttributeInstruction, AddElementInstruction, AddInterpolationInstruction, AddListenerInstruction, AddStaticHTMLInstruction, AddStyleInstruction, AddTextInstruction, AreBindingAttribute, AreComment, AreComponentNode, AreDirective, AreDirectiveAttribute, AreDirectiveContext, AreDirectiveFeatures, AreDirectiveFor, AreDirectiveIf, AreDirectiveMeta, type AreDirectiveOrderDecoratorParameters, AreDirectiveShow, AreEventAttribute, AreHTMLAttribute, AreHTMLCompiler, type AreHTMLContextConstructor, AreHTMLEngine, AreHTMLEngineContext, AreHTMLInstructions, AreHTMLInterpreter, AreHTMLLifecycle, AreHTMLNode, AreHTMLTokenizer, AreHTMLTransformer, type AreHtmlAddAttributeInstructionPayload, type AreHtmlAddCommentInstructionPayload, type AreHtmlAddElementInstructionPayload, type AreHtmlAddInterpolationInstructionPayload, type AreHtmlAddListenerInstructionPayload, type AreHtmlAddStaticHTMLInstructionPayload, type AreHtmlAddStyleInstructionPayload, type AreHtmlAddTextInstructionPayload, type AreHtmlHideInstructionPayload, AreInterpolation, AreRoot, AreRootCache, type AreRootCacheEntry, AreRootNode, AreRoute, AreRouteWatcher, AreStaticAttribute, AreStyle, AreText, BOOLEAN_ATTRIBUTES, HideElementInstruction, IDL_FORM_PROPERTIES, LISTENER_OPTION_MODIFIERS, type ParsedEventName, STANDARD_HTML_TAGS, SVG_ATTRIBUTE_NS, SVG_NAMESPACE, VOID_ELEMENTS, isBooleanAttribute, isIDLFormProperty, isStaticMarkup, isVoidElement, normalizeClassValue, normalizeStyleValue, parseEventName, toDOMString };
