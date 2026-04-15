import { A_TYPES__Ctor } from "@adaas/a-concept";
import type { AreDirective } from "./AreDirective.component";

export type AreDirectiveOrderDecoratorParameters = {
    /**
     * The directive that should be applied before the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    before: string | RegExp | A_TYPES__Ctor<AreDirective>
    /**
     * The directive that should be applied after the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    after: string | RegExp | A_TYPES__Ctor<AreDirective>
}

