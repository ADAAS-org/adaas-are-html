import { A_Scope, A_Feature } from '@adaas/a-concept';
import { AreLifecycle, AreSignalsContext, AreScene } from '@adaas/are';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { e as AreHTMLNode, b as AreDirectiveAttribute } from '../AreBinding.attribute-doUvtOjc.mjs';
import { AreHTMLEngineContext } from './AreHTML.context.mjs';
import '../lib/AreStyle/AreStyle.context.mjs';
import './AreHTML.types.mjs';

declare class AreHTMLLifecycle extends AreLifecycle {
    /**
     * Per-chunk time budget (ms) for the time-sliced initial mount walk. While
     * mounting a large subtree we keep applying nodes until this much wall-clock
     * time has elapsed, then yield to the browser so it can paint and process
     * input before the next chunk. ~16ms targets a single animation frame.
     */
    private static readonly MOUNT_BUDGET_MS;
    initComponent(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initRoot(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, signalsContext?: AreSignalsContext, logger?: A_Logger, ...args: any[]): void;
    initText(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    initInterpolation(node: AreHTMLNode, scope: A_Scope, context: AreHTMLEngineContext, logger?: A_Logger, ...args: any[]): void;
    mount(
    /**
     * Node to be mounted
     */
    node: AreHTMLNode, 
    /**
     * Node Content
     */
    scene: AreScene, logger?: A_Logger, ...args: any[]): void | Promise<void>;
    updateDirectiveAttribute(directive: AreDirectiveAttribute, scope: A_Scope, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
}

export { AreHTMLLifecycle };
