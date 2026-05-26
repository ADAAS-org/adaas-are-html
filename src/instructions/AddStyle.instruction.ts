import { A_Frame } from "@adaas/a-frame/core"
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddStyleInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Sets an inline CSS style property on an element. Apply sets the property; revert removes it.'
})
export class AddStyleInstruction extends AreMutation<AreHtmlAddStyleInstructionPayload> {

    constructor(
        parent: AreDeclaration,
        props: AreHtmlAddStyleInstructionPayload | AreInstructionSerialized<AreHtmlAddStyleInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddStyleInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddStyle, parent, props);
        }
    }
}
