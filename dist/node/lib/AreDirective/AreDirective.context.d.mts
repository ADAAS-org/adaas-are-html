import { ASEID } from '@adaas/a-concept';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

declare class AreDirectiveContext extends A_ExecutionContext {
    scope: Record<string, any>;
    constructor(aseid: ASEID | string);
}

export { AreDirectiveContext };
