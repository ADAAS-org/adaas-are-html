import { A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreTransformer, AreStore } from '@adaas/are';
import { b as AreDirectiveAttribute } from '../AreBinding.attribute-C6qrxN8K.mjs';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreHTMLTransformer extends AreTransformer {
    transformDirectiveAttribute(directive: AreDirectiveAttribute, store: AreStore, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
}

export { AreHTMLTransformer };
