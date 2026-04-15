import { AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddCommentInstructionPayload } from './AreHTML.instructions.types.js';

declare class AddCommentInstruction extends AreDeclaration<AreHtmlAddCommentInstructionPayload> {
    get content(): string;
    constructor(props: AreHtmlAddCommentInstructionPayload | AreInstructionSerialized<AreHtmlAddCommentInstructionPayload>);
}

export { AddCommentInstruction };
