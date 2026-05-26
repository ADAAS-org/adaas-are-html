import { AreNodeNewProps } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Node type representing a reactive inline expression in the AreHTMLNode tree. Its content expression is resolved from the store at render time and kept live via an AddInterpolation instruction that updates the corresponding text node on each reactive cycle.'
})
export class AreInterpolation extends AreHTMLNode {

        fromNew(newEntity: AreNodeNewProps): void {
            super.fromNew({
                ...newEntity,
                payload:{
                    ...(newEntity.payload || {}),
                    entity: 'are-interpolation',
                }
            });
        }
}