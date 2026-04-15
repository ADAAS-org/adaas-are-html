import { AreAttribute } from "@adaas/are";
import { AreHTMLNode } from "../AreHTMLNode/AreHTMLNode";




export class AreHTMLAttribute extends AreAttribute {

    get owner(): AreHTMLNode {
        return this.scope.issuer() as AreHTMLNode;
    }

}