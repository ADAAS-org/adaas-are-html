import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreTokenizer, AreNode, AreContext } from '@adaas/are';
import { d as AreHTMLAttribute } from '../AreBinding.attribute-C6qrxN8K.mjs';
import '@adaas/a-concept';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreHTMLTokenizer extends AreTokenizer {
    ATTR_PATTERN: RegExp;
    tokenize(node: AreNode, context: AreContext, logger?: A_Logger): void;
    extractAttributes(markup: string): AreHTMLAttribute[];
}

export { AreHTMLTokenizer };
