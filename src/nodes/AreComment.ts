import { AreNodeNewProps } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";

export class AreComment extends AreHTMLNode {



    fromNew(newEntity: AreNodeNewProps): void {
        super.fromNew({
            ...newEntity,
            payload:{
                ...(newEntity.payload || {}),
                entity: 'are-comment',
            }
        });
    }
}