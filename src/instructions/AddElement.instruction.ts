import { A_Frame } from "@adaas/a-frame";
import { AreDeclaration, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddElementInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AddElementInstruction',
    description: 'Creates a new HTML element in the DOM. Apply creates the element; revert removes it.'
})
export class AddElementInstruction extends AreDeclaration<AreHtmlAddElementInstructionPayload> {
    constructor(
        props: AreHtmlAddElementInstructionPayload | AreInstructionSerialized<AreHtmlAddElementInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props);
        } else {
            super(AreHTMLInstructions.AddElement, props);
        }
    }
}
