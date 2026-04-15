import { __decorateClass, __decorateParam } from '../chunk-EQQGB2QZ.mjs';
import { A_Inject, A_Caller } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreInterpreter, AreInstructionDefaultNames, AreStore, AreSyntax, AreInterpreterError, AreEvent } from '@adaas/are';
import { AreHTMLInstructions } from '@adaas/are-html/instructions/AreHTML.instructions.constants';
import { AreDirectiveContext } from '@adaas/are-html/directive/AreDirective.context';
import { AreHTMLEngineContext } from './AreHTML.context';

let AreHTMLInterpreter = class extends AreInterpreter {
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
      if (parent) {
        const mountPoint = context.getNodeElement(parent);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = context.container.createElement(tag);
        if (mountPoint.nodeType === Node.ELEMENT_NODE) {
          mountPoint.appendChild(element);
        } else {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        }
        context.setInstructionElement(declaration, element);
      } else {
        const mountPoint = context.container.getElementById(node.id);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = context.container.createElement(tag);
        element.setAttribute("data-aseid", node.aseid.toString());
        mountPoint.parentNode?.replaceChild(element, mountPoint);
        context.setInstructionElement(declaration, element);
      }
      logger?.debug("green", `Element ${node.aseid.toString()} added to Context:`);
    } catch (error) {
      logger?.error(error);
      throw error;
    }
  }
  removeElement(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addAttribute(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
      });
    }
    const { name, content, evaluate } = mutation.payload;
    const value = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (mutation.cache === void 0) {
      const existingValue = element.getAttribute(name);
      const result = existingValue ? `${existingValue} ${value}` : value;
      element.setAttribute(name, result);
      mutation.cache = value;
    } else {
      const existingValue = element.getAttribute(name);
      const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
      const oldParts = new Set(mutation.cache.split(/\s+/).filter(Boolean));
      const newParts = value ? value.split(/\s+/).filter(Boolean) : [];
      const result = [...existingParts.filter((part) => !oldParts.has(part)), ...newParts].join(" ");
      element.setAttribute(name, result);
      mutation.cache = value;
    }
  }
  removeAttribute(mutation, context) {
    try {
      const element = context.getElementByInstruction(mutation.parent);
      if (!element) return;
      const { name } = mutation.payload;
      if (name && element.nodeType === Node.ELEMENT_NODE) {
        element?.removeAttribute(name);
      }
    } catch (error) {
      console.log("Error removing attribute:", error);
    }
  }
  addEventListener(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
      });
    }
    const handlers = syntax.extractEmitHandlers(mutation.payload.handler);
    const handlerScope = {};
    for (const handler of handlers) {
      const handlerFn = (...args) => {
        const event = new AreEvent(handler);
        event.set("args", args);
        event.set("element", element);
        event.set("instruction", mutation);
        mutation.owner.emit(event);
      };
      handlerScope[`$${handler}`] = handlerFn;
    }
    const callback = (e) => {
      context.startPerformance("Click");
      const result = syntax.evaluate(mutation.payload.handler, store, {
        ...handlerScope,
        ...directiveContext?.scope || {}
      });
      if (typeof result === "function") result(e);
    };
    if (callback) {
      element.addEventListener(mutation.payload.name, callback);
      context.addListener(element, mutation.payload.name, callback);
    }
  }
  removeEventListener(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) return;
    const { name } = mutation.payload;
    const listener = context.getListener(element, name);
    if (listener) {
      element.removeEventListener(name, listener);
      context.removeListener(element, name);
    }
  }
  addText(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const value = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (!node) {
      const textNode = context.container.createTextNode(value);
      context.container.body.appendChild(textNode);
      context.setInstructionElement(declaration, textNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
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
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
  addComment(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const value = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (!node) {
      const commentNode = context.container.createComment(value);
      context.container.body.appendChild(commentNode);
      context.setInstructionElement(declaration, commentNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
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
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  AreInterpreter.Apply(AreInstructionDefaultNames.Default),
  AreInterpreter.Apply(AreHTMLInstructions.AddElement),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addElement", 1);
__decorateClass([
  A_Frame.Method({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  AreInterpreter.Revert(AreInstructionDefaultNames.Default),
  AreInterpreter.Revert(AreHTMLInstructions.AddElement),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeElement", 1);
__decorateClass([
  A_Frame.Method({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddAttribute),
  AreInterpreter.Update(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  A_Frame.Method({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  A_Frame.Method({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddListener),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  A_Frame.Method({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddListener),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  A_Frame.Method({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddText),
  AreInterpreter.Update(AreHTMLInstructions.AddText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addText", 1);
__decorateClass([
  A_Frame.Method({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddText),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeText", 1);
__decorateClass([
  A_Frame.Method({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddComment),
  AreInterpreter.Update(AreHTMLInstructions.AddComment),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreDirectiveContext)),
  __decorateParam(5, A_Inject(A_Logger))
], AreHTMLInterpreter.prototype, "addComment", 1);
__decorateClass([
  A_Frame.Method({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddComment),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeComment", 1);
AreHTMLInterpreter = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLInterpreter",
    description: "AreHTMLInterpreter is a component that serves as a host for rendering AreNodes into HTML. It provides the necessary context and environment for AreNodes to be rendered and interact with the DOM."
  })
], AreHTMLInterpreter);

export { AreHTMLInterpreter };
//# sourceMappingURL=AreHTML.interpreter.mjs.map
//# sourceMappingURL=AreHTML.interpreter.mjs.map