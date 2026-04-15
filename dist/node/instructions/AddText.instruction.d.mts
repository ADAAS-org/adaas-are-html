import { AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddTextInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class AddTextInstruction extends AreDeclaration<AreHtmlAddTextInstructionPayload> {
    constructor(props: AreHtmlAddTextInstructionPayload | AreInstructionSerialized<AreHtmlAddTextInstructionPayload>);
}

export { AddTextInstruction };
