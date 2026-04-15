import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddListenerInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class AddListenerInstruction extends AreMutation<AreHtmlAddListenerInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddListenerInstructionPayload | AreInstructionSerialized<AreHtmlAddListenerInstructionPayload>);
}

export { AddListenerInstruction };
