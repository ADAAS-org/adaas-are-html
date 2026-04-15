import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddInterpolationInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class AddInterpolationInstruction extends AreMutation<AreHtmlAddInterpolationInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddInterpolationInstructionPayload | AreInstructionSerialized<AreHtmlAddInterpolationInstructionPayload>);
}

export { AddInterpolationInstruction };
