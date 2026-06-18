import { AreContext, AreDeclaration, AreInstruction, AreNode } from "@adaas/are";
import { AreHTMLContextConstructor } from "./AreHTML.types";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Runtime index for the HTML rendering engine. Maps each AreNode and instruction ASEID to its corresponding DOM element so that apply and revert handlers on interpreter instructions can look up their DOM node in O(1). Tracks root-element mounts and maintains the group-level index used by structural directives.'
})
export class AreHTMLEngineContext extends AreContext {

    /**
     * Index structure mapping:
     * 
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */

    protected index = {
        /**
         * 1 AreNode = 1 Dom Node
         * 
         * uses ASEID
         */
        nodeToHostElements: new Map<string, Node>(),
        /**
         * 1 Group Instruction = MANY Dom Nodes (e.g. for loop)
         * 
         * uses ASEID
         */
        groupToElements: new Map<string, Set<Node>>(),
        /**
         * 1 Dom Node = 1 Instruction 
         * 
         * uses ASEID
         */
        elementToInstruction: new WeakMap<Node, string>(),
        /**
         * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
         * 
         * uses ASEID
         */
        instructionToElement: new Map<string, Node>(),
        /**
         * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
         */
        elementListeners: new WeakMap<Node, Map<string, Set<EventListenerOrEventListenerObject>>>()
    }

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
    protected _staticFragmentCache = new Map<string, DocumentFragment>();

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
    protected _pendingAttachments: Array<() => void> = [];

    /**
     * Depth of the currently open batching scopes. Re-entrant so that nested
     * `beginBatch`/`endBatch` pairs flush exactly once, when the outermost scope
     * closes.
     */
    protected _batchDepth = 0;


    constructor(props: Partial<AreHTMLContextConstructor>) {
        super(props.container?.body.innerHTML || props.source || '');
        this._container = props.container!;
    }

    get container(): Document {
        return this._container;
    }

    /**
     * `true` while a synchronous mount pass is batching live-DOM attachments.
     * Interpreter handlers consult this to decide whether to attach an element
     * immediately or hand the attachment to {@link deferAttach}.
     */
    get isBatching(): boolean {
        return this._batchDepth > 0;
    }

    /**
     * Opens a batching scope. Re-entrant: only the outermost matching
     * {@link endBatch} flushes the deferred attachments, so a single mount pass
     * connects its built subtree to the live DOM exactly once.
     */
    beginBatch(): void {
        this._batchDepth++;
    }

    /**
     * Registers a live-DOM attachment to run when the current batch flushes. If
     * no batch is active the attachment runs immediately, preserving the original
     * synchronous behaviour for updates that mount outside a batch.
     *
     * @param attach the DOM mutation that connects a built subtree to the document
     */
    deferAttach(attach: () => void): void {
        if (this._batchDepth > 0) {
            this._pendingAttachments.push(attach);
        } else {
            attach();
        }
    }

    /**
     * Closes a batching scope. When the outermost scope closes, every deferred
     * attachment runs in registration (document) order, connecting the built
     * subtrees to the live DOM in a single pass.
     */
    endBatch(): void {
        if (this._batchDepth === 0) return;
        this._batchDepth--;
        if (this._batchDepth > 0) return;

        const pending = this._pendingAttachments;
        this._pendingAttachments = [];
        for (let i = 0; i < pending.length; i++) {
            pending[i]();
        }
    }

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
    getStaticFragment(hostTag: string, html: string): DocumentFragment {
        const key = `${hostTag}\u0000${html}`;
        let fragment = this._staticFragmentCache.get(key);
        if (!fragment) {
            // Parse in the correct element context: the fragment-parsing
            // algorithm uses the container element's tag to choose the right
            // insertion mode (e.g. `<tbody>` legitimately allows `<tr>`).
            const container = this._container.createElement(hostTag);
            container.innerHTML = html;

            fragment = this._container.createDocumentFragment();
            while (container.firstChild) {
                fragment.appendChild(container.firstChild);
            }

            this._staticFragmentCache.set(key, fragment);
        }
        return fragment;
    }


    /**
     * Retrieves the DOM element associated with a given AreNode. This method looks up the node's ASEID in the nodeToHostElements map to find the corresponding DOM element. If the node is not found, it returns undefined. This allows the engine to efficiently access and manipulate the DOM elements that correspond to specific nodes in the AreNode tree, enabling dynamic updates and interactions based on the application state.
     * 
     * @param nodeASEID 
     */
    getNodeElement(nodeASEID: string): Node | undefined
    getNodeElement(node: AreNode): Node | undefined
    getNodeElement(node: AreNode | string): Node | undefined {
        if (typeof node === 'string') {
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
    setInstructionElement(instruction: AreInstruction, element: Node): void {
        const node = instruction.owner;

        this.index.instructionToElement.set(instruction.aseid.toString(), element);
        this.index.elementToInstruction.set(element, instruction.aseid.toString());

        // Only update the host-element pointer for declaration instructions.
        // Mutations (attributes, styles, event listeners, …) produce auxiliary DOM
        // that must never overwrite the owning node's primary element in the index.
        if (node && instruction instanceof AreDeclaration) {
            this.index.nodeToHostElements.set(node.aseid.toString(), element);
        }

        if (instruction.group) {
            const groupId = instruction.group;
            if (!this.index.groupToElements.has(groupId)) {
                this.index.groupToElements.set(groupId, new Set());
            }
            this.index.groupToElements.get(groupId)!.add(element);
        }
    }

    /**
     * Retrieves the DOM element associated with a given instruction. This method looks up the instruction's ASEID in the instructionToElement map to find the corresponding DOM element. If the instruction is not found, it returns undefined. This allows the engine to efficiently access and manipulate the DOM elements that correspond to specific instructions, enabling dynamic updates and interactions based on the application state.
     * 
     * @param instructionASEID 
     */
    getElementByInstruction(instructionASEID: string): Node | undefined
    getElementByInstruction(instruction: AreInstruction): Node | undefined
    getElementByInstruction(instruction: AreInstruction | string): Node | undefined {
        if (typeof instruction === 'string') {
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
    removeInstructionElement(instruction: AreInstruction): void {
        const element = this.index.instructionToElement.get(instruction.aseid.toString());
        if (element) {
            this.index.instructionToElement.delete(instruction.aseid.toString());
            this.index.elementToInstruction.delete(element);

            const node = instruction.owner;
            if (node && instruction instanceof AreDeclaration) {
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

    /**
     * Retrieves the set of DOM elements associated with a given group. This method looks up the group name or instruction's ASEID in the groupToElements map to find the corresponding set of DOM elements. If the group is not found, it returns undefined. This allows the engine to efficiently access and manipulate all DOM elements that belong to a specific group (e.g., all elements generated by a particular loop instruction), enabling dynamic updates and interactions based on the application state.
     * 
     * @param groupName 
     */
    getElementsByGroup(groupName: string): Set<Node> | undefined
    getElementsByGroup(instruction: AreInstruction): Set<Node> | undefined
    getElementsByGroup(instruction: AreInstruction | string): Set<Node> | undefined {
        if (typeof instruction === 'string') {
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
    addListener(element: Node, eventName: string, listener: EventListenerOrEventListenerObject): void {
        if (!this.index.elementListeners.has(element)) {
            this.index.elementListeners.set(element, new Map());
        }
        const byEvent = this.index.elementListeners.get(element)!;
        if (!byEvent.has(eventName)) {
            byEvent.set(eventName, new Set());
        }
        byEvent.get(eventName)!.add(listener);
    }
    /**
     * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
     * 
     * @param element 
     * @param eventName 
     * @returns 
     */
    getListener(element: Node, eventName: string): EventListenerOrEventListenerObject | undefined {
        const set = this.index.elementListeners.get(element)?.get(eventName);
        if (!set || set.size === 0) return undefined;
        // Return the first listener for backwards compatibility.
        return set.values().next().value;
    }

    /**
     * Returns all listeners registered for a given element + event name.
     */
    getListeners(element: Node, eventName: string): Set<EventListenerOrEventListenerObject> | undefined {
        return this.index.elementListeners.get(element)?.get(eventName);
    }
    /**
     * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
     * 
     * @param element 
     * @param eventName 
     */
    removeListener(element: Node, eventName: string, listener?: EventListenerOrEventListenerObject): void {
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
}
