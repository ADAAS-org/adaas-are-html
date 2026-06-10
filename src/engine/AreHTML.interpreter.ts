import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core"
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
import { AddStyleInstruction } from "@adaas/are-html/instructions/AddStyle.instruction";
import { HideElementInstruction } from "@adaas/are-html/instructions/HideElement.instruction";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { AreHTMLNode } from "../lib/AreHTMLNode/AreHTMLNode";
import { AreHTMLEngineContext } from "./AreHTML.context";
import {
    isBooleanAttribute,
    isIDLFormProperty,
    normalizeClassValue,
    normalizeStyleValue,
    parseEventName,
    toDOMString,
    SVG_NAMESPACE,
    SVG_ATTRIBUTE_NS,
} from "./AreHTML.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'DOM interpreter for the HTML rendering pipeline. Extends AreInterpreter to apply and revert each ARE instruction type directly against the browser DOM — creating and removing elements, setting and removing attributes and event listeners, managing inline styles, and inserting text and comment nodes. Driven by the scene diff computed per render cycle.'
})
export class AreHTMLInterpreter extends AreInterpreter {
    // ─────────────────────────────────────────────────────────────────────────────
    // ── CreateElement — Apply / Revert ───────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    @A_Frame.Define({
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

            const isSVG = tag === 'svg' || this.isInSVGContext(node);

            if (parent) {

                const mountPoint = context.getNodeElement(parent)

                if (!mountPoint) {
                    throw new AreInterpreterError({
                        title: 'Mount Point Not Found',
                        description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
                    });
                }

                const element = isSVG
                    ? context.container.createElementNS(SVG_NAMESPACE, tag)
                    : context.container.createElement(tag);

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

                const element = isSVG
                    ? context.container.createElementNS(SVG_NAMESPACE, tag)
                    : context.container.createElement(tag);

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


    @A_Frame.Define({
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
    @A_Frame.Define({
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

        const rawValue = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;

        const el = element as HTMLElement;
        const lowerName = name.toLowerCase();

        // ── 0. Namespace-prefixed attributes (xlink:href, xml:space, xmlns:*) ──
        const colonIdx = name.indexOf(':');
        if (colonIdx > 0) {
            const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
            if (ns) {
                (el as Element).setAttributeNS(ns, name, toDOMString(rawValue));
                mutation.cache = toDOMString(rawValue);
                return;
            }
        }

        // ── 1. Boolean attributes ────────────────────────────────────────────
        if (isBooleanAttribute(lowerName)) {
            if (rawValue) {
                el.setAttribute(lowerName, '');
                // also reflect IDL property where supported (disabled, hidden, …)
                try { (el as any)[lowerName] = true; } catch { /* ignore */ }
            } else {
                el.removeAttribute(lowerName);
                try { (el as any)[lowerName] = false; } catch { /* ignore */ }
            }
            mutation.cache = rawValue ? 'true' : '';
            return;
        }

        // ── 2. Form-control IDL properties (value/checked/selected) ─────────
        if (isIDLFormProperty(el.tagName, name)) {
            const propName = name === 'value' ? 'value'
                : name === 'checked' ? 'checked'
                    : name === 'selected' ? 'selected'
                        : name === 'indeterminate' ? 'indeterminate'
                            : name;
            try {
                if (propName === 'checked' || propName === 'selected' || propName === 'indeterminate') {
                    (el as any)[propName] = !!rawValue;
                } else {
                    (el as any)[propName] = toDOMString(rawValue);
                }
            } catch { /* ignore */ }
            // also keep the attribute in sync for SSR/CSS selectors
            if (propName !== 'value') {
                if (rawValue) el.setAttribute(name, ''); else el.removeAttribute(name);
            } else {
                el.setAttribute(name, toDOMString(rawValue));
            }
            mutation.cache = toDOMString(rawValue);
            return;
        }

        // ── 3. Class binding — supports object/array/string and merges ──────
        if (lowerName === 'class') {
            const newValue = normalizeClassValue(rawValue);

            if (mutation.cache === undefined) {
                const existingValue = el.getAttribute('class');
                const merged = existingValue ? `${existingValue} ${newValue}`.trim() : newValue;
                if (merged) el.setAttribute('class', merged); else el.removeAttribute('class');
            } else {
                const existingValue = el.getAttribute('class');
                const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
                const oldParts = new Set((mutation.cache as string).split(/\s+/).filter(Boolean));
                const newParts = newValue ? newValue.split(/\s+/).filter(Boolean) : [];

                const merged = [...existingParts.filter(p => !oldParts.has(p)), ...newParts].join(' ');
                if (merged) el.setAttribute('class', merged); else el.removeAttribute('class');
            }
            mutation.cache = newValue;
            return;
        }

        // ── 4. Style binding — supports object/array/string ─────────────────
        if (lowerName === 'style') {
            const newValue = normalizeStyleValue(rawValue);
            if (newValue) el.setAttribute('style', newValue); else el.removeAttribute('style');
            mutation.cache = newValue;
            return;
        }

        // ── 5. Default: replace attribute (no whitespace merge) ─────────────
        const stringValue = toDOMString(rawValue);
        if (stringValue === '' && evaluate && (rawValue === false || rawValue === null || rawValue === undefined)) {
            el.removeAttribute(name);
        } else {
            el.setAttribute(name, stringValue);
        }
        mutation.cache = stringValue;


    }

    @A_Frame.Define({
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
                const colonIdx = name.indexOf(':');
                if (colonIdx > 0) {
                    const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
                    if (ns) {
                        (element as Element).removeAttributeNS(ns, name.slice(colonIdx + 1));
                    } else {
                        (element as HTMLElement).removeAttribute(name);
                    }
                } else {
                    (element as HTMLElement).removeAttribute(name);
                }
            }
        } catch (error) {
            console.log('Error removing attribute:', error);
        }

    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── HideElement — Apply / Revert ─────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    // Drives the `$show` directive. Apply hides the element by forcing its inline
    // `display:none` (which beats stylesheet rules and, unlike rewriting the whole
    // `style` attribute, does NOT clobber other inline styles or `:style`
    // bindings). The element stays mounted — its subtree, listeners and scene
    // state are preserved — so toggling visibility is far cheaper than $if's
    // mount/unmount cycle. Revert restores the element's previous inline display.
    @A_Frame.Define({
        description: 'Hide an element by setting inline display:none, caching its previous inline display value for restoration on revert.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.HideElement)
    hideElement(
        @A_Inject(A_Caller) mutation: HideElementInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ): void {
        const element = context.getElementByInstruction(mutation.parent!);

        if (!element || element.nodeType !== Node.ELEMENT_NODE) return;

        const el = element as HTMLElement;

        // Remember the element's own inline display so it can be restored exactly.
        mutation.cache = el.style.display;
        el.style.display = 'none';
    }

    @A_Frame.Define({
        description: 'Restore an element hidden by a HideElement instruction back to its previous inline display value.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.HideElement)
    showElement(
        @A_Inject(A_Caller) mutation: HideElementInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ): void {
        const element = context.getElementByInstruction(mutation.parent!);

        if (!element || element.nodeType !== Node.ELEMENT_NODE) return;

        const el = element as HTMLElement;

        // Restore the cached inline display. An explicit payload display, when
        // provided, takes precedence; otherwise fall back to the cached value
        // (empty string clears the inline rule and reverts to the CSS default).
        el.style.display = mutation.payload?.display ?? mutation.cache ?? '';
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── addEventListener — Apply / Revert ────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    @A_Frame.Define({
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
         * e.g. @click="handleClick($event, element)"
         * e.g. @click.stop.prevent="handleClick"
         * e.g. @keydown.enter="submit"
         * e.g. @click="(e)=> user.name ? handleClick(e) : null"
         */

        const { event: eventName, modifiers } = parseEventName(mutation.payload.name);

        const listenerOptions: AddEventListenerOptions = {};
        if (modifiers.has('capture')) listenerOptions.capture = true;
        if (modifiers.has('once')) listenerOptions.once = true;
        if (modifiers.has('passive')) listenerOptions.passive = true;

        const handlers = syntax.extractEmitHandlers(mutation.payload.handler);

        // Holds the live DOM event so handler invocations (with or without
        // template arguments) always have access to it.
        let liveEvent: Event | null = null;

        const handlerScope: Record<string, any> = {};

        for (const handler of handlers) {
            const handlerFn = (...args: any[]) => {
                const event = new AreEvent(handler);
                // If user passed only template args (e.g. $h('x')), append the DOM
                // event as the last arg. If they passed nothing, args[0] is the DOM event.
                const effectiveArgs = args.length === 0 && liveEvent
                    ? [liveEvent]
                    : liveEvent
                        ? [...args, liveEvent]
                        : args;
                event.set('args', effectiveArgs);
                event.set('element', element);
                event.set('instruction', mutation);
                // Expose the raw DOM event under the conventional 'native' key so that
                // event handlers can do: event.get('native')?.target as HTMLInputElement
                if (liveEvent) event.set('native', liveEvent as any);
                mutation.owner.emit(event);
            };
            handlerScope[`$${handler}`] = handlerFn;
        }

        const callback = (e: Event) => {
            try {
                liveEvent = e;

                if (modifiers.has('self') && e.target !== element) return;
                if (modifiers.has('stop')) e.stopPropagation();
                if (modifiers.has('prevent')) e.preventDefault();

                // key-name modifiers for keyboard events: @keydown.enter / .esc / .tab / .space / .up / .down / .left / .right / .delete
                if (e instanceof KeyboardEvent && modifiers.size > 0) {
                    const key = (e.key || '').toLowerCase();
                    const KEY_ALIASES: Record<string, string[]> = {
                        enter: ['enter'],
                        esc: ['escape'],
                        escape: ['escape'],
                        tab: ['tab'],
                        space: [' ', 'spacebar'],
                        up: ['arrowup'],
                        down: ['arrowdown'],
                        left: ['arrowleft'],
                        right: ['arrowright'],
                        delete: ['delete', 'backspace'],
                    };
                    const keyMods = [...modifiers].filter(m =>
                        m in KEY_ALIASES ||
                        m === 'ctrl' || m === 'alt' || m === 'shift' || m === 'meta');

                    if (keyMods.length > 0) {
                        const keyMatch = keyMods.some(m => {
                            if (m === 'ctrl') return e.ctrlKey;
                            if (m === 'alt') return e.altKey;
                            if (m === 'shift') return e.shiftKey;
                            if (m === 'meta') return e.metaKey;
                            const aliases = KEY_ALIASES[m];
                            return aliases && aliases.includes(key);
                        });
                        if (!keyMatch) return;
                    }
                }

                context.startPerformance('event:' + eventName);

                const result = syntax.evaluate(mutation.payload.handler, store, {
                    ...handlerScope,
                    $event: e,
                    ...(directiveContext?.scope || {})
                });
                if (typeof result === 'function') result(e);

                context.endPerformance('event:' + eventName);
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
        // Track on both the context (for diagnostics) and the mutation itself
        // so the revert path can detach the exact same callback.
        (mutation.payload as any)._callback = callback;
        context.addListener(element, mutation.payload.name, callback);
    }


    @A_Frame.Define({
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
        const { event: eventName } = parseEventName(name);

        const listener = (mutation.payload as any)._callback as EventListenerOrEventListenerObject | undefined;

        if (listener) {
            element.removeEventListener(eventName, listener);
            context.removeListener(element, name, listener);
            (mutation.payload as any)._callback = undefined;
        }
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ── AddText — Apply / Revert ─────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    @A_Frame.Define({
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

        const rawValue = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;

        const value = toDOMString(rawValue);


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


    @A_Frame.Define({
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



    @A_Frame.Define({
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

        const rawValue = evaluate ? syntax.evaluate(content, store, {
            ...(directiveContext?.scope || {})
        }) : content;

        const value = toDOMString(rawValue);


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


    @A_Frame.Define({
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

    // ─────────────────────────────────────────────────────────────────────────────
    // ── AddStyle — Apply / Update / Revert ───────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    @A_Frame.Define({
        description: 'Inject a <style> element into the document <head> carrying the component CSS. Keyed by instruction ASEID so multiple components with styles do not collide. Subsequent Update calls refresh the textContent in-place.'
    })
    @AreInterpreter.Apply(AreHTMLInstructions.AddStyle)
    @AreInterpreter.Update(AreHTMLInstructions.AddStyle)
    addStyle(
        @A_Inject(A_Caller) mutation: AddStyleInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): void {
        try {


            const { styles } = mutation.payload;
            const styleId = `are-style-${String(mutation.aseid)}`;

            const existing = context.getElementByInstruction(mutation) as HTMLStyleElement | undefined;
            if (existing) {
                existing.textContent = styles;
            } else {
                const styleEl = context.container.createElement('style') as HTMLStyleElement;
                styleEl.setAttribute('data-are-id', styleId);
                styleEl.textContent = styles;
                (context.container.head ?? context.container.body).appendChild(styleEl);

                context.setInstructionElement(mutation, styleEl);
                logger?.debug('green', `Style injected for ${String(mutation.aseid)}`);
            }
        } catch (error) {
            logger?.error(error);
        }

    }

    @A_Frame.Define({
        description: 'Remove the <style> element that was injected by addStyle, cleaning up the document head.'
    })
    @AreInterpreter.Revert(AreHTMLInstructions.AddStyle)
    removeStyle(
        @A_Inject(A_Caller) mutation: AddStyleInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
    ): void {
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
    private isInSVGContext(node: AreHTMLNode): boolean {
        let current: AreHTMLNode | undefined = node.parent as AreHTMLNode | undefined;
        while (current) {
            if (current.tag === 'svg') return true;
            // <foreignObject> resets the namespace back to HTML
            if (current.tag === 'foreignobject') return false;
            current = current.parent as AreHTMLNode | undefined;
        }
        return false;
    }
}