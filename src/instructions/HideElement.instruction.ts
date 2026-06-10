import { A_Frame } from "@adaas/a-frame/core"
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlHideInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Toggles the visibility of an existing element by setting its inline display to "none" on apply and restoring the previous inline display on revert. Used by the $show directive to hide/show an element without unmounting it, preserving its subtree, listeners and scene state.'
})
export class HideElementInstruction extends AreMutation<AreHtmlHideInstructionPayload> {

    /**
     * Caches the element's inline `display` value captured at apply time so it
     * can be restored verbatim on revert (mirrors Vue `v-show`).
     */
    cache?: string;

    constructor(
        parent: AreDeclaration,
        props: AreHtmlHideInstructionPayload | AreInstructionSerialized<AreHtmlHideInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlHideInstructionPayload>);
        } else {
            super(AreHTMLInstructions.HideElement, parent, props);
        }
    }
}
