import { AreHTMLAttribute } from "@adaas/are-html/attribute";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Attribute type for plain static HTML attributes with no dynamic prefix. Its value is emitted verbatim via an AddAttribute instruction at compile time and does not participate in reactive update cycles.'
})
export class AreStaticAttribute extends AreHTMLAttribute {

}