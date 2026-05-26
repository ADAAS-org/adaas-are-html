import { A_Frame } from "@adaas/a-frame/core"
import { AreDeclaration, AreInstructionSerialized } from "@adaas/are";
import { AreHtmlAddCommentInstructionPayload } from "./AreHTML.instructions.types";
import { AreHTMLInstructions } from "./AreHTML.instructions.constants";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Appends a comment node to an element. Apply creates the comment node; revert removes it. Content can be a static string or a dynamic getter for interpolations.'
})
export class AddCommentInstruction extends AreDeclaration<AreHtmlAddCommentInstructionPayload> {

    get content() {
        return this.payload.content;
    }

    constructor(
        props: AreHtmlAddCommentInstructionPayload | AreInstructionSerialized<AreHtmlAddCommentInstructionPayload>
    ) {
        if ('aseid' in props) {
            super(props as AreInstructionSerialized<AreHtmlAddCommentInstructionPayload>);
        } else {
            super(AreHTMLInstructions.AddComment, props);
        }
    }
}
