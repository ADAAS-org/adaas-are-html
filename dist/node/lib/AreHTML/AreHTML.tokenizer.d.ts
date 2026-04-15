import { AreTokenizer, AreNode, AreContext } from '@adaas/are';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { d as AreHTMLAttribute } from '../../AreBinding.attribute-C6JasbJL.js';
import '@adaas/a-concept';
import '../AreStyle/AreStyle.context.js';

declare class AreHTMLTokenizer extends AreTokenizer {
    ATTR_PATTERN: RegExp;
    tokenize(node: AreNode, context: AreContext, logger?: A_Logger): void;
    extractAttributes(markup: string): AreHTMLAttribute[];
}

export { AreHTMLTokenizer };
