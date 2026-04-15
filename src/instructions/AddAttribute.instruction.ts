import { A_Frame } from "@adaas/a-frame";
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddAttributeInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AddAttributeInstruction',
    description: 'Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute.'
})
export class AddAttributeInstruction extends AreMutation<AreHtmlAddAttributeInstructionPayload> {

    cache?: string;

    constructor(
        parent: AreDeclaration,
        props: AreHtmlAddAttributeInstructionPayload | AreInstructionSerialized<AreHtmlAddAttributeInstructionPayload>) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddAttributeInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddAttribute, parent, props);
        }
    }
}
