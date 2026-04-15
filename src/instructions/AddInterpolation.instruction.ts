import { A_Frame } from "@adaas/a-frame";
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddInterpolationInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AddInterpolationInstruction',
    description: 'Appends a reactive text node whose content is resolved dynamically from the store. Apply creates the text node with the getter; revert removes it.'
})
export class AddInterpolationInstruction extends AreMutation<AreHtmlAddInterpolationInstructionPayload> {

    constructor(
        parent: AreDeclaration,
        props: AreHtmlAddInterpolationInstructionPayload | AreInstructionSerialized<AreHtmlAddInterpolationInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddInterpolationInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddInterpolation, parent, props);
        }
    }
}
