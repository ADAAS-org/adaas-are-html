import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Logger } from "@adaas/a-utils/a-logger";
import {
    AreSyntax, AreStore,
    AreEvent,
    AreInstructionDefaultNames,
    AreInterpreterError,
    AreInterpreter
} from "@adaas/are";
import { AreHTMLInstructions } from "@adaas/are-html/instructions/AreHTML.instructions.constants";
import { AddAttributeInstruction } from "@adaas/are-html/instructions/AddAttribute.instruction";
import { AddCommentInstruction } from "@adaas/are-html/instructions/AddComment.instruction";
import { AddElementInstruction } from "@adaas/are-html/instructions/AddElement.instruction";
import { AddListenerInstruction } from "@adaas/are-html/instructions/AddListener.instruction";
import { AddTextInstruction } from "@adaas/are-html/instructions/AddText.instruction";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { AreHTMLNode } from "../lib/AreHTMLNode/AreHTMLNode";
import { AreHTMLEngineContext } from "./AreHTML.context";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreHTMLInterpreter',
    description: 'AreHTMLInterpreter is a component that serves as a host for rendering AreNodes into HTML. It provides the necessary context and environment for AreNodes to be rendered and interact with the DOM.'
})
export class AreHTMLInterpreter extends AreInterpreter {
    // ─────────────────────────────────────────────────────────────────────────────
    // ── CreateElement — Apply / Revert ───────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    @A_Frame.Method({
        description: 'Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy.'
    })
    @AreInterpreter.Apply(AreInstructionDefaultNames.Default)
    @AreInterpreter.Apply(AreHTMLInstructions.AddElement)
    addElement(
        @A_Inject(A_Caller) declaration: AddElementInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        try {
            const node = declaration.owner as AreHTMLNode;

            let currentNode: AreHTMLNode | undefined = node;
            let parent: AreHTMLNode | undefined = node.parent as AreHTMLNode | undefined;

            while (parent) {
                if (context.getNodeElement(parent)) {
                    break;
                }
                currentNode = parent;
                parent = parent.parent as AreHTMLNode | undefined;
            }


            // Determine the element tag — components render as a wrapper div
            const tag = node.tag;

            if (parent) {

                const mountPoint = context.getNodeElement(parent)

                if (!mountPoint) {
                    throw new AreInterpreterError({
                        title: 'Mount Point Not Found',
                        description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
                    });
                }

                const element = context.container.createElement(tag);

                if (mountPoint.nodeType === Node.ELEMENT_NODE) {
                    // parent is a real element — just append
                    mountPoint.appendChild(element);
                } else {
                    // parent is an anchor (comment/text node) — insert before it
                    // so content always appears before the anchor marker
                    mountPoint.parentNode?.insertBefore(element, mountPoint);
                }

                context.setInstructionElement(declaration, element);

            } else {
                const mountPoint = context.container.getElementById(node.id);
                if (!mountPoint) {
                    throw new AreInterpreterError({
                        title: 'Mount Point Not Found',
                        description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
                    });
                }

                const element = context.container.createElement(tag);

                element.setAttribute('data-aseid', node.aseid.toString());

                mountPoint.parentNode?.replaceChild(element, mountPoint);

                context.setInstructionElement(declaration, element);
            }

            // Register the element in the context index

            logger?.debug('green', `Element ${node.aseid.toString()} added to Context:`);

        } catch (error) {
            logger?.error(error);
            throw error;
        }
    }


    @A_Frame.Method({
        description: 'Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index.'
    })
    @AreInterpreter.Revert(AreInstructionDefaultNames.Default)
    @AreInterpreter.Revert(AreHTMLInstructions.AddElement)
    removeElement(
        @A_Inject(A_Caller) declaration: AddElementInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ) {
        const element = context.getElementByInstruction(declaration);

        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }

        context.removeInstructionElement(declaration);
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── AddAttribute — Apply / Revert ────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    @A_Frame.Method({
        description: 'Add an attribute to an HTML element based on the provided mutation instruction.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.AddAttribute)
    @AreInterpreter.Update(AreHTMLInstructions.AddAttribute)
    addAttribute(
        @A_Inject(A_Caller) mutation: AddAttributeInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,

        @A_Inject(A_Logger) logger?: A_Logger,
    ): void {
        const element = context.getElementByInstruction(mutation.parent!);


        if (!element) {
            throw new AreInterpreterError({
                title: 'Element Not Found',
                description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
            });
        }
        const { name, content, evaluate } = mutation.payload;

        const value = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;


        /**
         * First time
         */
        if (mutation.cache === undefined) {

            const existingValue = (element as HTMLElement).getAttribute(name);

            const result = (existingValue ? `${existingValue} ${value}` : value);

            (element as HTMLElement).setAttribute(name, result);

            mutation.cache = value;

        } else {

            const existingValue = (element as HTMLElement).getAttribute(name);

            const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
            const oldParts = new Set((mutation.cache as string).split(/\s+/).filter(Boolean));
            const newParts = value ? value.split(/\s+/).filter(Boolean) : [];

            const result = [...existingParts.filter(part => !oldParts.has(part)), ...newParts].join(' ');

            (element as HTMLElement).setAttribute(name, result);

            mutation.cache = value;
        }


    }

    @A_Frame.Method({
        description: 'Remove an attribute from an HTML element based on the provided mutation instruction.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.AddAttribute)
    removeAttribute(
        @A_Inject(A_Caller) mutation: AddAttributeInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ): void {
        try {
            const element = context.getElementByInstruction(mutation.parent!);

            if (!element) return;

            const { name } = mutation.payload;

            if (name && element.nodeType === Node.ELEMENT_NODE) {
                (element as HTMLElement)?.removeAttribute(name);
            }
        } catch (error) {
            console.log('Error removing attribute:', error);
        }

    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── addEventListener — Apply / Revert ────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    @A_Frame.Method({
        description: 'Add an event listener to an HTML element based on the provided mutation instruction.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.AddListener)
    addEventListener(
        @A_Inject(A_Caller) mutation: AddListenerInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const element = context.getElementByInstruction(mutation.parent);

        if (!element) {
            throw new AreInterpreterError({
                title: 'Element Not Found',
                description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
            });
        }

        /**
         * e.g. @click="handleClick" 
         * 
         * e.g. @click="handleClick($event, element)"
         * 
         * e.g. @click="(e)=> user.name ?  handleClick(e) : null" (with conditional logic)
         * 
         * e.g. @click="(e)=> isValid(user.name) ?  handleClick(e) : null" (with conditional logic)
         * 
         * e.g. @click="(e)=> isValid(user.name) ?  handleClick(e, format(user.name)) : null" (with conditional logic)
         */


        const handlers = syntax.extractEmitHandlers(mutation.payload.handler);
        const handlerScope = {}

        for (const handler of handlers) {
            const handlerFn = (...args: any[]) => {
                const event = new AreEvent(handler)

                event.set('args', args);
                event.set('element', element);
                event.set('instruction', mutation);

                mutation.owner.emit(event);
            }

            handlerScope[`$${handler}`] = handlerFn;
        }

        const callback = (e: Event) => {
            context.startPerformance('Click')

            const result = syntax.evaluate(mutation.payload.handler, store, {
                ...handlerScope,
                ...(directiveContext?.scope || {})
            });
            if (typeof result === 'function') result(e);
        };


        if (callback) {
            element.addEventListener(mutation.payload.name, callback);
            context.addListener(element, mutation.payload.name, callback);
        }
    }


    @A_Frame.Method({
        description: 'Remove an event listener from an HTML element based on the provided mutation instruction.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.AddListener)
    removeEventListener(
        @A_Inject(A_Caller) mutation: AddListenerInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ) {
        const element = context.getElementByInstruction(mutation.parent);

        if (!element) return;

        const { name } = mutation.payload;

        const listener = context.getListener(element, name);

        if (listener) {
            element.removeEventListener(name, listener);
            context.removeListener(element, name);
        }
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── AddText — Apply / Revert ─────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    @A_Frame.Method({
        description: 'Add text content to an HTML element based on the provided declaration instruction.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.AddText)
    @AreInterpreter.Update(AreHTMLInstructions.AddText)
    addText(
        @A_Inject(A_Caller) declaration: AddTextInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        const node = declaration.owner.parent;
        const { content, evaluate } = declaration.payload;

        const value = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;


        if (!node) {
            const textNode = context.container.createTextNode(value);
            context.container.body.appendChild(textNode);
            context.setInstructionElement(declaration, textNode);

        } else {
            const element = context.getNodeElement(node);

            if (!element) {
                throw new AreInterpreterError({
                    title: 'Element Not Found',
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



        logger?.debug('green', `Text ${node?.aseid.toString()} added to Context:`);

    }


    @A_Frame.Method({
        description: 'Remove text content from an HTML element based on the provided declaration instruction.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.AddText)
    removeText(
        @A_Inject(A_Caller) declaration: AddTextInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ) {
        const element = context.getElementByInstruction(declaration);

        if (!element) return;

        element.parentNode?.removeChild(element);
        context.removeInstructionElement(declaration);
    }



    @A_Frame.Method({
        description: 'Add a comment node to the DOM based on the provided declaration instruction.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.AddComment)
    @AreInterpreter.Update(AreHTMLInstructions.AddComment)
    addComment(
        @A_Inject(A_Caller) declaration: AddCommentInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        const node = declaration.owner.parent;
        const { content, evaluate } = declaration.payload;

        const value = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;


        if (!node) {
            const commentNode = context.container.createComment(value);
            context.container.body.appendChild(commentNode);
            context.setInstructionElement(declaration, commentNode);

        } else {
            const element = context.getNodeElement(node);

            if (!element) {
                throw new AreInterpreterError({
                    title: 'Element Not Found',
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



        logger?.debug('green', `Comment ${node?.aseid.toString()} added to Context:`);
    }


    @A_Frame.Method({
        description: 'Remove a comment node from the DOM based on the provided declaration instruction.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.AddComment)
    removeComment(
        @A_Inject(A_Caller) declaration: AddCommentInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ) {
        const element = context.getElementByInstruction(declaration);

        if (!element) return;

        element.parentNode?.removeChild(element);
        context.removeInstructionElement(declaration);
    }
}