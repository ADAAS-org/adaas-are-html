import { A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-C6JasbJL.js';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirectiveContext } from '../lib/AreDirective/AreDirective.context.js';
import '../lib/AreStyle/AreStyle.context.js';
import '@adaas/a-utils/a-execution';

declare class AreDirectiveIf extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scope: A_Scope, syntax: AreSyntax, scene: AreScene, ...args: any[]): void;
}

export { AreDirectiveIf };
