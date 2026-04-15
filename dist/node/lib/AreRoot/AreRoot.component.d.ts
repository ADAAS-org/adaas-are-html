import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are, ArePropDefinition, AreNode, AreSignalsContext, AreStore } from '@adaas/are';

declare class AreRoot extends Are {
    props: Record<string, ArePropDefinition>;
    template(root: AreNode, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
    onSignal(root: AreNode, vector: A_SignalVector, store: AreStore<{
        default: string;
    }>, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
}

export { AreRoot };
