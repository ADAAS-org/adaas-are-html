import { AreNodeNewProps } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion.'
})
export class AreText extends AreHTMLNode {


    fromNew(newEntity: AreNodeNewProps): void {
        super.fromNew({
            ...newEntity,
            payload: {
                ...(newEntity.payload || {}),
                entity: 'are-text',
            }
        });
    }
}