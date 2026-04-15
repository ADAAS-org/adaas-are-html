import { AreContext, AreInstruction, AreNode } from "@adaas/are";
import { AreHTMLContextConstructor } from "./AreHTML.types";


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
        elementListeners: new WeakMap<Node, Map<string, EventListenerOrEventListenerObject>>()
    }

    /**
     * The root container for the HTML engine, which can be either a Document or a ShadowRoot. This is where the engine will mount the generated DOM elements. The context uses this container to manage the relationship between AreNodes, instructions, and their corresponding DOM elements, allowing for efficient updates and cleanups as the application state changes.
     */
    protected _container: Document;


    constructor(props: Partial<AreHTMLContextConstructor>) {
        super(props.container?.body.innerHTML || props.source || '');
        this._container = props.container!;
    }

    get container(): Document {
        return this._container;
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

        if (node) {
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
            if (node) {
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
        this.index.elementListeners.get(element)!.set(eventName, listener);
    }
    /**
     * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
     * 
     * @param element 
     * @param eventName 
     * @returns 
     */
    getListener(element: Node, eventName: string): EventListenerOrEventListenerObject | undefined {
        return this.index.elementListeners.get(element)?.get(eventName);
    }
    /**
     * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
     * 
     * @param element 
     * @param eventName 
     */
    removeListener(element: Node, eventName: string): void {
        this.index.elementListeners.get(element)?.delete(eventName);
    }
}
