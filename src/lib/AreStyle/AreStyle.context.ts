import { A_Fragment, ASEID } from "@adaas/a-concept";


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