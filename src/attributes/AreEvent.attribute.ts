import { AreHTMLAttribute } from "@adaas/are-html/attribute";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding — the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element.'
})
export class AreEventAttribute extends AreHTMLAttribute {
}