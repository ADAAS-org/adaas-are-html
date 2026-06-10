import { AreMutation, AreDeclaration, AreInstructionSerialized } from '@adaas/are';
import { AreHtmlHideInstructionPayload } from './AreHTML.instructions.types.mjs';

declare class HideElementInstruction extends AreMutation<AreHtmlHideInstructionPayload> {
    /**
     * Caches the element's inline `display` value captured at apply time so it
     * can be restored verbatim on revert (mirrors Vue `v-show`).
     */
    cache?: string;
    constructor(parent: AreDeclaration, props: AreHtmlHideInstructionPayload | AreInstructionSerialized<AreHtmlHideInstructionPayload>);
}

export { HideElementInstruction };
