'use strict';

var are = require('@adaas/are');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreHTMLEngineContext = class AreHTMLEngineContext extends are.AreContext {
  constructor(props) {
    super(props.container?.body.innerHTML || props.source || "");
    /**
     * Index structure mapping:
     * 
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */
    this.index = {
      /**
       * 1 AreNode = 1 Dom Node
       * 
       * uses ASEID
       */
      nodeToHostElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Group Instruction = MANY Dom Nodes (e.g. for loop)
       * 
       * uses ASEID
       */
      groupToElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Dom Node = 1 Instruction 
       * 
       * uses ASEID
       */
      elementToInstruction: /* @__PURE__ */ new WeakMap(),
      /**
       * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
       * 
       * uses ASEID
       */
      instructionToElement: /* @__PURE__ */ new Map(),
      /**
       * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
       */
      elementListeners: /* @__PURE__ */ new WeakMap()
    };
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
    this._staticFragmentCache = /* @__PURE__ */ new Map();
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
    this._pendingAttachments = [];
    /**
     * Depth of the currently open batching scopes. Re-entrant so that nested
     * `beginBatch`/`endBatch` pairs flush exactly once, when the outermost scope
     * closes.
     */
    this._batchDepth = 0;
    this._container = props.container;
  }
  get container() {
    return this._container;
  }
  /**
   * `true` while a synchronous mount pass is batching live-DOM attachments.
   * Interpreter handlers consult this to decide whether to attach an element
   * immediately or hand the attachment to {@link deferAttach}.
   */
  get isBatching() {
    return this._batchDepth > 0;
  }
  /**
   * Opens a batching scope. Re-entrant: only the outermost matching
   * {@link endBatch} flushes the deferred attachments, so a single mount pass
   * connects its built subtree to the live DOM exactly once.
   */
  beginBatch() {
    this._batchDepth++;
  }
  /**
   * Registers a live-DOM attachment to run when the current batch flushes. If
   * no batch is active the attachment runs immediately, preserving the original
   * synchronous behaviour for updates that mount outside a batch.
   *
   * @param attach the DOM mutation that connects a built subtree to the document
   */
  deferAttach(attach) {
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
  endBatch() {
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
  getStaticFragment(hostTag, html) {
    const key = `${hostTag}\0${html}`;
    let fragment = this._staticFragmentCache.get(key);
    if (!fragment) {
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
  getNodeElement(node) {
    if (typeof node === "string") {
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
  setInstructionElement(instruction, element) {
    const node = instruction.owner;
    this.index.instructionToElement.set(instruction.aseid.toString(), element);
    this.index.elementToInstruction.set(element, instruction.aseid.toString());
    if (node && instruction instanceof are.AreDeclaration) {
      this.index.nodeToHostElements.set(node.aseid.toString(), element);
    }
    if (instruction.group) {
      const groupId = instruction.group;
      if (!this.index.groupToElements.has(groupId)) {
        this.index.groupToElements.set(groupId, /* @__PURE__ */ new Set());
      }
      this.index.groupToElements.get(groupId).add(element);
    }
  }
  getElementByInstruction(instruction) {
    if (typeof instruction === "string") {
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
  removeInstructionElement(instruction) {
    const element = this.index.instructionToElement.get(instruction.aseid.toString());
    if (element) {
      this.index.instructionToElement.delete(instruction.aseid.toString());
      this.index.elementToInstruction.delete(element);
      const node = instruction.owner;
      if (node && instruction instanceof are.AreDeclaration) {
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
  getElementsByGroup(instruction) {
    if (typeof instruction === "string") {
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
  addListener(element, eventName, listener) {
    if (!this.index.elementListeners.has(element)) {
      this.index.elementListeners.set(element, /* @__PURE__ */ new Map());
    }
    const byEvent = this.index.elementListeners.get(element);
    if (!byEvent.has(eventName)) {
      byEvent.set(eventName, /* @__PURE__ */ new Set());
    }
    byEvent.get(eventName).add(listener);
  }
  /**
   * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
   * 
   * @param element 
   * @param eventName 
   * @returns 
   */
  getListener(element, eventName) {
    const set = this.index.elementListeners.get(element)?.get(eventName);
    if (!set || set.size === 0) return void 0;
    return set.values().next().value;
  }
  /**
   * Returns all listeners registered for a given element + event name.
   */
  getListeners(element, eventName) {
    return this.index.elementListeners.get(element)?.get(eventName);
  }
  /**
   * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
   * 
   * @param element 
   * @param eventName 
   */
  removeListener(element, eventName, listener) {
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
};
exports.AreHTMLEngineContext = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "Runtime index for the HTML rendering engine. Maps each AreNode and instruction ASEID to its corresponding DOM element so that apply and revert handlers on interpreter instructions can look up their DOM node in O(1). Tracks root-element mounts and maintains the group-level index used by structural directives."
  })
], exports.AreHTMLEngineContext);
//# sourceMappingURL=AreHTML.context.js.map
//# sourceMappingURL=AreHTML.context.js.map