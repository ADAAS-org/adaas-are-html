import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreInterpreter, AreStore, AreSyntax } from '@adaas/are';
import { AddAttributeInstruction } from '../instructions/AddAttribute.instruction.js';
import { AddCommentInstruction } from '../instructions/AddComment.instruction.js';
import { AddElementInstruction } from '../instructions/AddElement.instruction.js';
import { AddListenerInstruction } from '../instructions/AddListener.instruction.js';
import { AddTextInstruction } from '../instructions/AddText.instruction.js';
import { AddStyleInstruction } from '../instructions/AddStyle.instruction.js';
import { AreDirectiveContext } from '../lib/AreDirective/AreDirective.context.js';
import { AreHTMLEngineContext } from './AreHTML.context.js';
import '../instructions/AreHTML.instructions.types.js';
import '@adaas/a-concept';
import '@adaas/a-utils/a-execution';
import './AreHTML.types.js';

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
    addStyle(mutation: AddStyleInstruction, context: AreHTMLEngineContext, logger?: A_Logger): void;
    removeStyle(mutation: AddStyleInstruction, context: AreHTMLEngineContext): void;
    /**
     * Returns true when any ancestor of the given node has the tag `svg`,
     * meaning the node lives inside an SVG subtree and its DOM element must be
     * created via createElementNS(SVG_NAMESPACE, tag).
     */
    private isInSVGContext;
}

export { AreHTMLInterpreter };
