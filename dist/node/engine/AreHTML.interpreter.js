'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');
var aLogger = require('@adaas/a-utils/a-logger');
var are = require('@adaas/are');
var AreHTML_instructions_constants = require('@adaas/are-html/instructions/AreHTML.instructions.constants');
var AreDirective_context = require('@adaas/are-html/directive/AreDirective.context');
var AreHTML_context = require('./AreHTML.context');
var AreHTML_constants = require('./AreHTML.constants');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreHTMLInterpreter = class AreHTMLInterpreter extends are.AreInterpreter {
  addElement(declaration, context, logger) {
    try {
      const node = declaration.owner;
      let currentNode = node;
      let parent = node.parent;
      while (parent) {
        if (context.getNodeElement(parent)) {
          break;
        }
        currentNode = parent;
        parent = parent.parent;
      }
      const tag = node.tag;
      const isSVG = tag === "svg" || this.isInSVGContext(node);
      if (parent) {
        const mountPoint = context.getNodeElement(parent);
        if (!mountPoint) {
          throw new are.AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(AreHTML_constants.SVG_NAMESPACE, tag) : context.container.createElement(tag);
        context.setInstructionElement(declaration, element);
        const attach = mountPoint.nodeType === Node.ELEMENT_NODE ? () => mountPoint.appendChild(element) : () => {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        };
        if (context.isBatching && mountPoint.isConnected) {
          context.deferAttach(attach);
        } else {
          attach();
        }
      } else {
        const mountPoint = context.container.getElementById(node.id);
        if (!mountPoint) {
          throw new are.AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(AreHTML_constants.SVG_NAMESPACE, tag) : context.container.createElement(tag);
        context.setInstructionElement(declaration, element);
        const attach = () => {
          mountPoint.parentNode?.replaceChild(element, mountPoint);
        };
        if (context.isBatching && mountPoint.isConnected) {
          context.deferAttach(attach);
        } else {
          attach();
        }
      }
      logger?.debug("green", `Element ${node.aseid.toString()} added to Context:`);
    } catch (error) {
      logger?.error(error);
      throw error;
    }
  }
  removeElement(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (element && element.parentNode && element.isConnected) {
      element.parentNode.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addAttribute(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new are.AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
      });
    }
    const { name, content, evaluate } = mutation.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const el = element;
    const lowerName = name.toLowerCase();
    const colonIdx = name.indexOf(":");
    if (colonIdx > 0) {
      const ns = AreHTML_constants.SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
      if (ns) {
        el.setAttributeNS(ns, name, AreHTML_constants.toDOMString(rawValue));
        mutation.cache = AreHTML_constants.toDOMString(rawValue);
        return;
      }
    }
    if (AreHTML_constants.isBooleanAttribute(lowerName)) {
      if (rawValue) {
        el.setAttribute(lowerName, "");
        try {
          el[lowerName] = true;
        } catch {
        }
      } else {
        el.removeAttribute(lowerName);
        try {
          el[lowerName] = false;
        } catch {
        }
      }
      mutation.cache = rawValue ? "true" : "";
      return;
    }
    if (AreHTML_constants.isIDLFormProperty(el.tagName, name)) {
      const propName = name === "value" ? "value" : name === "checked" ? "checked" : name === "selected" ? "selected" : name === "indeterminate" ? "indeterminate" : name;
      try {
        if (propName === "checked" || propName === "selected" || propName === "indeterminate") {
          el[propName] = !!rawValue;
        } else {
          el[propName] = AreHTML_constants.toDOMString(rawValue);
        }
      } catch {
      }
      if (propName !== "value") {
        if (rawValue) el.setAttribute(name, "");
        else el.removeAttribute(name);
      } else {
        el.setAttribute(name, AreHTML_constants.toDOMString(rawValue));
      }
      mutation.cache = AreHTML_constants.toDOMString(rawValue);
      return;
    }
    if (lowerName === "class") {
      const newValue = AreHTML_constants.normalizeClassValue(rawValue);
      if (mutation.cache === void 0) {
        const existingValue = el.getAttribute("class");
        const merged = existingValue ? `${existingValue} ${newValue}`.trim() : newValue;
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      } else {
        const existingValue = el.getAttribute("class");
        const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
        const oldParts = new Set(mutation.cache.split(/\s+/).filter(Boolean));
        const newParts = newValue ? newValue.split(/\s+/).filter(Boolean) : [];
        const merged = [...existingParts.filter((p) => !oldParts.has(p)), ...newParts].join(" ");
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      }
      mutation.cache = newValue;
      return;
    }
    if (lowerName === "style") {
      const newValue = AreHTML_constants.normalizeStyleValue(rawValue);
      if (newValue) el.setAttribute("style", newValue);
      else el.removeAttribute("style");
      mutation.cache = newValue;
      return;
    }
    const stringValue = AreHTML_constants.toDOMString(rawValue);
    if (stringValue === "" && evaluate && (rawValue === false || rawValue === null || rawValue === void 0)) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, stringValue);
    }
    mutation.cache = stringValue;
  }
  removeAttribute(mutation, context) {
    try {
      const element = context.getElementByInstruction(mutation.parent);
      if (!element) return;
      const { name } = mutation.payload;
      if (name && element.nodeType === Node.ELEMENT_NODE && element.isConnected) {
        const colonIdx = name.indexOf(":");
        if (colonIdx > 0) {
          const ns = AreHTML_constants.SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
          if (ns) {
            element.removeAttributeNS(ns, name.slice(colonIdx + 1));
          } else {
            element.removeAttribute(name);
          }
        } else {
          element.removeAttribute(name);
        }
      }
    } catch (error) {
      console.log("Error removing attribute:", error);
    }
  }
  hideElement(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    const el = element;
    mutation.cache = el.style.display;
    el.style.display = "none";
  }
  showElement(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    if (!element.isConnected) return;
    const el = element;
    el.style.display = mutation.payload?.display ?? mutation.cache ?? "";
  }
  addEventListener(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new are.AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
      });
    }
    const { event: eventName, modifiers } = AreHTML_constants.parseEventName(mutation.payload.name);
    const listenerOptions = {};
    if (modifiers.has("capture")) listenerOptions.capture = true;
    if (modifiers.has("once")) listenerOptions.once = true;
    if (modifiers.has("passive")) listenerOptions.passive = true;
    const handlers = syntax.extractEmitHandlers(mutation.payload.handler);
    let liveEvent = null;
    const handlerScope = {};
    const emitter = mutation.owner.component && mutation.owner.parent ? mutation.owner.parent : mutation.owner;
    for (const handler of handlers) {
      const handlerFn = (...args) => {
        const event = new are.AreEvent(handler);
        const effectiveArgs = args.length === 0 && liveEvent ? [liveEvent] : liveEvent ? [...args, liveEvent] : args;
        event.set("args", effectiveArgs);
        event.set("element", element);
        event.set("instruction", mutation);
        if (liveEvent) event.set("native", liveEvent);
        emitter.emit(event);
      };
      handlerScope[`$${handler}`] = handlerFn;
    }
    const callback = (e) => {
      try {
        liveEvent = e;
        if (modifiers.has("self") && e.target !== element) return;
        if (modifiers.has("stop")) e.stopPropagation();
        if (modifiers.has("prevent")) e.preventDefault();
        if (e instanceof KeyboardEvent && modifiers.size > 0) {
          const key = (e.key || "").toLowerCase();
          const KEY_ALIASES = {
            enter: ["enter"],
            esc: ["escape"],
            escape: ["escape"],
            tab: ["tab"],
            space: [" ", "spacebar"],
            up: ["arrowup"],
            down: ["arrowdown"],
            left: ["arrowleft"],
            right: ["arrowright"],
            delete: ["delete", "backspace"]
          };
          const SYSTEM_KEYS = ["ctrl", "alt", "shift", "meta"];
          const systemMods = [...modifiers].filter((m) => SYSTEM_KEYS.includes(m));
          const nameMods = [...modifiers].filter((m) => m in KEY_ALIASES);
          if (systemMods.length > 0 || nameMods.length > 0) {
            const systemOk = systemMods.every((m) => {
              if (m === "ctrl") return e.ctrlKey;
              if (m === "alt") return e.altKey;
              if (m === "shift") return e.shiftKey;
              return e.metaKey;
            });
            const nameOk = nameMods.length === 0 || nameMods.some((m) => KEY_ALIASES[m].includes(key));
            if (!(systemOk && nameOk)) return;
          }
        }
        context.startPerformance("event:" + eventName);
        const result = syntax.evaluate(mutation.payload.handler, store, {
          ...handlerScope,
          $event: e,
          ...directiveContext?.scope || {}
        });
        if (typeof result === "function") result(e);
        context.endPerformance("event:" + eventName);
      } catch (err) {
        logger?.error(err);
      } finally {
        liveEvent = null;
      }
    };
    const useOptions = listenerOptions.capture || listenerOptions.once || listenerOptions.passive;
    if (useOptions) {
      element.addEventListener(eventName, callback, listenerOptions);
    } else {
      element.addEventListener(eventName, callback);
    }
    mutation.payload._callback = callback;
    context.addListener(element, mutation.payload.name, callback);
  }
  removeEventListener(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) return;
    const { name } = mutation.payload;
    const { event: eventName } = AreHTML_constants.parseEventName(name);
    const listener = mutation.payload._callback;
    if (listener) {
      if (element.isConnected) {
        element.removeEventListener(eventName, listener);
      }
      context.removeListener(element, name, listener);
      mutation.payload._callback = void 0;
    }
  }
  addText(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = AreHTML_constants.toDOMString(rawValue);
    if (!node) {
      const textNode = context.container.createTextNode(value);
      context.container.body.appendChild(textNode);
      context.setInstructionElement(declaration, textNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new are.AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const textNode = context.container.createTextNode(value);
        element.appendChild(textNode);
        context.setInstructionElement(declaration, textNode);
      }
    }
    logger?.debug("green", `Text ${node?.aseid.toString()} added to Context:`);
  }
  removeText(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    if (element.isConnected) {
      element.parentNode?.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addStaticHTML(mutation, context, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new are.AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure the host element is rendered before materialising its static island.`
      });
    }
    const el = element;
    const { html } = mutation.payload;
    el.textContent = "";
    const fragment = context.getStaticFragment(el.tagName.toLowerCase(), html);
    el.appendChild(fragment.cloneNode(true));
    logger?.debug("green", `Static island materialised onto <${(mutation.owner.parent ?? mutation.owner)?.aseid?.toString?.()}>`);
  }
  removeStaticHTML(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (element && element.nodeType === Node.ELEMENT_NODE && element.isConnected) {
      element.textContent = "";
    }
  }
  addComment(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = AreHTML_constants.toDOMString(rawValue);
    if (!node) {
      const commentNode = context.container.createComment(value);
      context.container.body.appendChild(commentNode);
      context.setInstructionElement(declaration, commentNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new are.AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const commentNode = context.container.createComment(value);
        element.appendChild(commentNode);
        context.setInstructionElement(declaration, commentNode);
      }
    }
    logger?.debug("green", `Comment ${node?.aseid.toString()} added to Context:`);
  }
  removeComment(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    if (element.isConnected) {
      element.parentNode?.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addStyle(mutation, context, logger) {
    try {
      const { styles } = mutation.payload;
      const styleId = `are-style-${String(mutation.aseid)}`;
      const existing = context.getElementByInstruction(mutation);
      if (existing) {
        existing.textContent = styles;
      } else {
        const styleEl = context.container.createElement("style");
        styleEl.setAttribute("data-are-id", styleId);
        styleEl.textContent = styles;
        (context.container.head ?? context.container.body).appendChild(styleEl);
        context.setInstructionElement(mutation, styleEl);
        logger?.debug("green", `Style injected for ${String(mutation.aseid)}`);
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  removeStyle(mutation, context) {
    const styleEl = context.getElementByInstruction(mutation);
    if (styleEl?.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    context.removeInstructionElement(mutation);
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── SVG helpers ───────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Returns true when any ancestor of the given node has the tag `svg`,
   * meaning the node lives inside an SVG subtree and its DOM element must be
   * created via createElementNS(SVG_NAMESPACE, tag).
   */
  isInSVGContext(node) {
    let current = node.parent;
    while (current) {
      if (current.tag === "svg") return true;
      if (current.tag === "foreignobject") return false;
      current = current.parent;
    }
    return false;
  }
};
__decorateClass([
  core.A_Frame.Define({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  are.AreInterpreter.Apply(are.AreInstructionDefaultNames.Default),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddElement),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addElement", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  are.AreInterpreter.Revert(are.AreInstructionDefaultNames.Default),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddElement),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeElement", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddAttribute),
  are.AreInterpreter.Update(AreHTML_instructions_constants.AreHTMLInstructions.AddAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext)),
  __decorateParam(5, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddAttribute),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Hide an element by setting inline display:none, caching its previous inline display value for restoration on revert."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.HideElement),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "hideElement", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Restore an element hidden by a HideElement instruction back to its previous inline display value."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.HideElement),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "showElement", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddListener),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext)),
  __decorateParam(5, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddListener),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddText),
  are.AreInterpreter.Update(AreHTML_instructions_constants.AreHTMLInstructions.AddText),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext)),
  __decorateParam(5, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addText", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddText),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeText", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Inject a static island's inner markup onto its host element in one pass via a cached, browser-parsed <template> clone. Decodes HTML entities natively."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddStaticHTML),
  are.AreInterpreter.Update(AreHTML_instructions_constants.AreHTMLInstructions.AddStaticHTML),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addStaticHTML", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Clear a static island's injected markup from its host element on revert."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddStaticHTML),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeStaticHTML", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddComment),
  are.AreInterpreter.Update(AreHTML_instructions_constants.AreHTMLInstructions.AddComment),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(are.AreStore)),
  __decorateParam(3, aConcept.A_Inject(are.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(AreDirective_context.AreDirectiveContext)),
  __decorateParam(5, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addComment", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddComment),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeComment", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Inject a <style> element into the document <head> carrying the component CSS. Keyed by instruction ASEID so multiple components with styles do not collide. Subsequent Update calls refresh the textContent in-place."
  }),
  are.AreInterpreter.Apply(AreHTML_instructions_constants.AreHTMLInstructions.AddStyle),
  are.AreInterpreter.Update(AreHTML_instructions_constants.AreHTMLInstructions.AddStyle),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLInterpreter.prototype, "addStyle", 1);
__decorateClass([
  core.A_Frame.Define({
    description: "Remove the <style> element that was injected by addStyle, cleaning up the document head."
  }),
  are.AreInterpreter.Revert(AreHTML_instructions_constants.AreHTMLInstructions.AddStyle),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreHTML_context.AreHTMLEngineContext))
], exports.AreHTMLInterpreter.prototype, "removeStyle", 1);
exports.AreHTMLInterpreter = __decorateClass([
  core.A_Frame.Define({
    namespace: "a-are-html",
    description: "DOM interpreter for the HTML rendering pipeline. Extends AreInterpreter to apply and revert each ARE instruction type directly against the browser DOM \u2014 creating and removing elements, setting and removing attributes and event listeners, managing inline styles, and inserting text and comment nodes. Driven by the scene diff computed per render cycle."
  })
], exports.AreHTMLInterpreter);
//# sourceMappingURL=AreHTML.interpreter.js.map
//# sourceMappingURL=AreHTML.interpreter.js.map