import { A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreCompiler, AreScene, AreStore } from '@adaas/are';
import { f as AreStaticAttribute, b as AreDirectiveAttribute, c as AreEventAttribute, A as AreBindingAttribute } from '../AreBinding.attribute-C6qrxN8K.mjs';
import { AreInterpolation } from '../nodes/AreInterpolation.mjs';
import { AreText } from '../nodes/AreText.mjs';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreHTMLCompiler extends AreCompiler {
    /**
     * Default compile method for interpolations, which can be overridden by specific implementations if needed.
     *
     * @param interpolation
     * @param scope
     * @param scene
     * @param store
     * @param feature
     */
    compileInterpolation(interpolation: AreInterpolation, scene: AreScene, store: AreStore, logger?: A_Logger, ...args: any[]): void;
    compileText(text: AreText, scene: AreScene, logger?: A_Logger, ...args: any[]): void;
    compileStaticAttribute(attribute: AreStaticAttribute, scene: AreScene, ...args: any[]): void;
    compileDirectiveAttribute(directive: AreDirectiveAttribute, store: AreStore, feature: A_Feature, logger?: A_Logger, ...args: any[]): void;
    compileEventAttribute(attribute: AreEventAttribute, scene: AreScene, ...args: any[]): void;
    compileBindingAttribute(attribute: AreBindingAttribute, scene: AreScene, parentStore: AreStore, store: AreStore, ...args: any[]): void;
}

export { AreHTMLCompiler };
