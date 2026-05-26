import { A_Fragment, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Context fragment that holds the resolved CSS style rules string for a component scope. Populated during lifecycle initialisation and read by the compiler when emitting AddStyle instructions for inline styles declared on the component host element.'
})
export class AreStyle extends A_Fragment {

    styles!: string;

    constructor(
        styles: string,
        aseid?: ASEID | string,

    ) {
        super({
            name: aseid ? aseid.toString() : 'default-style',
        });

        this.styles = styles;
    }

}