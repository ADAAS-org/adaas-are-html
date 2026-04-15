import { A_Frame } from "@adaas/a-frame";
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddListenerInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AddListenerInstruction',
    description: 'Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener.'
})
export class AddListenerInstruction extends AreMutation<AreHtmlAddListenerInstructionPayload> {

    constructor(
        parent: AreDeclaration,
        props: AreHtmlAddListenerInstructionPayload | AreInstructionSerialized<AreHtmlAddListenerInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddListenerInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddListener, parent, props);
        }
    }
}
