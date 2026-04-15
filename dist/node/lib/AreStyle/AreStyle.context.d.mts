import { A_Fragment, ASEID } from '@adaas/a-concept';

declare class AreStyle extends A_Fragment {
    styles: string;
    constructor(styles: string, aseid?: ASEID | string);
}

export { AreStyle };
