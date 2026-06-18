import { A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreCompiler, AreScene, AreStore, AreSyntax } from '@adaas/are';
import { e as AreHTMLNode, f as AreStaticAttribute, b as AreDirectiveAttribute, c as AreEventAttribute, A as AreBindingAttribute } from '../AreBinding.attribute-BWzEIw6H.mjs';
import { AreInterpolation } from '../nodes/AreInterpolation.mjs';
import { AreText } from '../nodes/AreText.mjs';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreHTMLCompiler extends AreCompiler {
    /**
     * Extends the base compile for all AreHTMLNode instances (elements, components, root nodes).
     * After the standard element/attribute/children instructions are emitted, checks whether
     * the node has a registered AreStyle and plans an AddStyleInstruction so the interpreter
     * can inject the CSS into the document head during mount.
     */
    compileHTMLNode(node: AreHTMLNode, scene: AreScene, logger?: A_Logger, ...args: any[]): void;
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
    compileBindingAttribute(attribute: AreBindingAttribute, scene: AreScene, parentStore: AreStore, store: AreStore, syntax: AreSyntax, ...args: any[]): void;
}

export { AreHTMLCompiler };
