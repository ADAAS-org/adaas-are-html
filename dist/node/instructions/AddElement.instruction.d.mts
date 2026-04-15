import { AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddElementInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class AddElementInstruction extends AreDeclaration<AreHtmlAddElementInstructionPayload> {
    constructor(props: AreHtmlAddElementInstructionPayload | AreInstructionSerialized<AreHtmlAddElementInstructionPayload>);
}

export { AddElementInstruction };
