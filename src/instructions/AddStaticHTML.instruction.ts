import { A_Frame } from "@adaas/a-frame/core"
import { AreDeclaration, AreMutation, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddStaticHTMLInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Materialises a fully static subtree (a "static island") onto its parent element in a single pass via browser-parsed innerHTML / a cached <template> clone. Apply injects the markup; revert clears it. Decodes HTML entities (e.g. &nbsp;) for free.'
})
export class AddStaticHTMLInstruction extends AreMutation<AreHtmlAddStaticHTMLInstructionPayload> {

    constructor(
        parent: AreDeclaration,
        props: AreHtmlAddStaticHTMLInstructionPayload | AreInstructionSerialized<AreHtmlAddStaticHTMLInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddStaticHTMLInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddStaticHTML, parent, props);
        }
    }
}
