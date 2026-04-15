import { A_TYPES__Ctor } from '@adaas/a-concept';
import { a as AreDirective } from '../../AreBinding.attribute-C6qrxN8K.mjs';
import '@adaas/are';
import '../AreStyle/AreStyle.context.mjs';

type AreDirectiveOrderDecoratorParameters = {
    /**
     * The directive that should be applied before the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    before: string | RegExp | A_TYPES__Ctor<AreDirective>;
    /**
     * The directive that should be applied after the decorated directive. It can be specified as a string (directive name), a regular expression (to match directive names) or a constructor of the directive class.
     */
    after: string | RegExp | A_TYPES__Ctor<AreDirective>;
};

export type { AreDirectiveOrderDecoratorParameters };
