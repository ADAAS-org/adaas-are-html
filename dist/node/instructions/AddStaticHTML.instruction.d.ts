import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddStaticHTMLInstructionPayload } from './AreHTML.instructions.types.js';

declare class AddStaticHTMLInstruction extends AreMutation<AreHtmlAddStaticHTMLInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddStaticHTMLInstructionPayload | AreInstructionSerialized<AreHtmlAddStaticHTMLInstructionPayload>);
}

export { AddStaticHTMLInstruction };
