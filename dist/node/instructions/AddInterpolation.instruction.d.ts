import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlAddInterpolationInstructionPayload } from './AreHTML.instructions.types.js';

declare class AddInterpolationInstruction extends AreMutation<AreHtmlAddInterpolationInstructionPayload> {
    constructor(parent: AreDeclaration, props: AreHtmlAddInterpolationInstructionPayload | AreInstructionSerialized<AreHtmlAddInterpolationInstructionPayload>);
}

export { AddInterpolationInstruction };
