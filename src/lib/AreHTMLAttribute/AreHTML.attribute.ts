import { AreAttribute } from "@adaas/are";
import { AreHTMLNode } from "../AreHTMLNode/AreHTMLNode";
import { A_Frame } from "@adaas/a-frame/core";




@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Base class for all typed HTML attributes in the ARE framework. Provides typed access to the owning AreHTMLNode via the scope injector so that attribute subclasses can inspect host-node properties and resolve store bindings during transformation, compilation, and lifecycle phases.'
})
export class AreHTMLAttribute extends AreAttribute {

    get owner(): AreHTMLNode {
        return this.scope.issuer() as AreHTMLNode;
    }

}