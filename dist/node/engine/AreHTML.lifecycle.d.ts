import { A_Scope, A_Feature } from '@adaas/a-concept';
import { AreLifecycle, AreSignalsContext } from '@adaas/are';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { e as AreHTMLNode, b as AreDirectiveAttribute } from '../AreBinding.attribute-C6JasbJL.js';
import { AreHTMLEngineContext } from './AreHTML.context.js';
import '../lib/AreStyle/AreStyle.context.js';
import './AreHTML.types.js';

declare class AreHTMLLifecycle extends AreLifecycle {
    initComponent(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initRoot(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initText(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initInterpolation(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    updateDirectiveAttribute(directive: AreDirectiveAttribute, scope: A_Scope, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
}

export { AreHTMLLifecycle };
