import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreDeclaration } from '@adaas/are';
import { AreHTMLInstructions } from './AreHTML.instructions.constants';

let AddCommentInstruction = class extends AreDeclaration {
  get content() {
    return this.payload.content;
  }
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddComment, props);
    }
  }
};
AddCommentInstruction = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AddCommentInstruction",
    description: "Appends a comment node to an element. Apply creates the comment node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddCommentInstruction);

export { AddCommentInstruction };
//# sourceMappingURL=AddComment.instruction.mjs.map
//# sourceMappingURL=AddComment.instruction.mjs.map