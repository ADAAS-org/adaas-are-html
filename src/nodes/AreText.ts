import { AreNodeNewProps } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


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