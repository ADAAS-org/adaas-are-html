import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddStyleInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class AddStyleInstruction extends AreMutation<AreHtmlAddStyleInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddStyleInstructionPayload | AreInstructionSerialized<AreHtmlAddStyleInstructionPayload>);
}

export { AddStyleInstruction };
