import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are, AreNode, AreSignalsContext } from '@adaas/are';

declare class AreRoot extends Are {
    template(root: AreNode, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
    onSignal(root: AreNode, vector: A_SignalVector, logger: A_Logger, signalsContext?: AreSignalsContext): Promise<void>;
}

export { AreRoot };
