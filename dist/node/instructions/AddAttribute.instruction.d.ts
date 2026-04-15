import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddAttributeInstructionPayload } from './AreHTML.instructions.types.js';

declare class AddAttributeInstruction extends AreMutation<AreHtmlAddAttributeInstructionPayload> {
    cache?: string;
    constructor(parent: AreDeclaration, props: AreHtmlAddAttributeInstructionPayload | AreInstructionSerialized<AreHtmlAddAttributeInstructionPayload>);
}

export { AddAttributeInstruction };
