import { AreStoreWatchingEntity, AreNode, AreAttribute, AreStore, AreScene, AreSyntax, AreMutation, AreDeclaration, AreInstructionSerialized, AreNodeNewProps, Are, AreSignal, AreContext, AreInstruction, AreCompiler, AreEngine, AreSyntaxTokenMatch, AreInterpreter, AreLifecycle, AreSignalsContext, AreTokenizer, AreTransformer, ArePropDefinition } from '@adaas/are';
import { A_Component, A_TYPES__Ctor, A_Fragment, ASEID, A_Scope, A_Feature, A_ComponentMeta } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Route } from '@adaas/a-utils/a-route';
import { A_Signal, A_SignalVector } from '@adaas/a-utils/a-signal';

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

declare class AreDirectiveFor extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
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
    private parseExpression;
    /**
     * Resolves the array expression against the store.
     * Supports both plain key lookups and function-call expressions:
     *   items          → store.get('items')
     *   filter(items)  → store.get('filter')(store.get('items'))
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

declare class AreDirectiveIf extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scope: A_Scope, syntax: AreSyntax, scene: AreScene, ...args: any[]): void;
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
    /** CSS property name in camelCase (e.g. "backgroundColor") or kebab-case (e.g. "background-color") */
    property: string;
    /** CSS property value */
    value: string;
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

declare class AddStyleInstruction extends AreMutation<AreHtmlAddStyleInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddStyleInstructionPayload | AreInstructionSerialized<AreHtmlAddStyleInstructionPayload>);
}

declare class AddTextInstruction extends AreDeclaration<AreHtmlAddTextInstructionPayload> {
    constructor(props: AreHtmlAddTextInstructionPayload | AreInstructionSerialized<AreHtmlAddTextInstructionPayload>);
}

declare const AreHTMLInstructions: {
    readonly AddElement: "_AreHTML_AddElement";
    readonly AddText: "_AreHTML_AddText";
    readonly AddAttribute: "_AreHTML_AddAttribute";
    readonly AddStyle: "_AreHTML_AddStyle";
    readonly AddListener: "_AreHTML_AddListener";
    readonly AddInterpolation: "_AreHTML_AddInterpolation";
    readonly AddComment: "_AreHTML_AddComment";
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
        elementListeners: WeakMap<Node, Map<string, EventListenerOrEventListenerObject>>;
    };
    /**
     * The root container for the HTML engine, which can be either a Document or a ShadowRoot. This is where the engine will mount the generated DOM elements. The context uses this container to manage the relationship between AreNodes, instructions, and their corresponding DOM elements, allowing for efficient updates and cleanups as the application state changes.
     */
    protected _container: Document;
    constructor(props: Partial<AreHTMLContextConstructor>);
    get container(): Document;
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
     * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
     *
     * @param element
     * @param eventName
     */
    removeListener(element: Node, eventName: string): void;
}

declare class AreHTMLCompiler extends AreCompiler {
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
    compileBindingAttribute(attribute: AreBindingAttribute, scene: AreScene, parentStore: AreStore, store: AreStore, ...args: any[]): void;
}

declare class AreHTMLEngine extends AreEngine {
    get DefaultSyntax(): AreSyntax;
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    init(scope: A_Scope): Promise<void>;
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
    addEventListener(mutation: AddListenerInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeEventListener(mutation: AddListenerInstruction, context: AreHTMLEngineContext): void;
    addText(declaration: AddTextInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeText(declaration: AddTextInstruction, context: AreHTMLEngineContext): void;
    addComment(declaration: AddCommentInstruction, context: AreHTMLEngineContext, store: AreStore, syntax: AreSyntax, directiveContext?: AreDirectiveContext, logger?: A_Logger): void;
    removeComment(declaration: AddCommentInstruction, context: AreHTMLEngineContext): void;
}

declare class AreHTMLLifecycle extends AreLifecycle {
    initComponent(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initRoot(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initText(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initInterpolation(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
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
    props: Record<string, ArePropDefinition>;
    template(root: AreNode, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
    onSignal(root: AreNode, vector: A_SignalVector, store: AreStore<{
        default: string;
    }>, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
}

declare class AreWatcher extends A_Component {
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

export { AddAttributeInstruction, AddElementInstruction, AddInterpolationInstruction, AddListenerInstruction, AddStyleInstruction, AddTextInstruction, AreBindingAttribute, AreComment, AreComponentNode, AreDirective, AreDirectiveAttribute, AreDirectiveContext, AreDirectiveFeatures, AreDirectiveFor, AreDirectiveIf, AreDirectiveMeta, type AreDirectiveOrderDecoratorParameters, AreEventAttribute, AreHTMLAttribute, AreHTMLCompiler, type AreHTMLContextConstructor, AreHTMLEngine, AreHTMLEngineContext, AreHTMLInstructions, AreHTMLInterpreter, AreHTMLLifecycle, AreHTMLNode, AreHTMLTokenizer, AreHTMLTransformer, type AreHtmlAddAttributeInstructionPayload, type AreHtmlAddCommentInstructionPayload, type AreHtmlAddElementInstructionPayload, type AreHtmlAddInterpolationInstructionPayload, type AreHtmlAddListenerInstructionPayload, type AreHtmlAddStyleInstructionPayload, type AreHtmlAddTextInstructionPayload, AreInterpolation, AreRoot, AreRootNode, AreRoute, AreStaticAttribute, AreStyle, AreText, AreWatcher };
