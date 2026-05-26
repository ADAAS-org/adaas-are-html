import { A_Frame } from "@adaas/a-frame/core"
import { AreDeclaration, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddTextInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations.'
})
export class AddTextInstruction extends AreDeclaration<AreHtmlAddTextInstructionPayload> {

    constructor(props: AreHtmlAddTextInstructionPayload | AreInstructionSerialized<AreHtmlAddTextInstructionPayload>) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddTextInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddText, props);
        }
    }
}
