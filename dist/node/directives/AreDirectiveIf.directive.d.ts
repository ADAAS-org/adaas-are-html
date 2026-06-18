import { A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-GpT-5Qmf.js';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirectiveContext } from '../lib/AreDirective/AreDirective.context.js';
import '../lib/AreStyle/AreStyle.context.js';
import '@adaas/a-utils/a-execution';

/**
 * `$if` directive — conditionally renders a node based on an expression.
 *
 * ⚠️ Known limitation: do NOT use `$if` and `$for` on the SAME element.
 *    Doing so produces duplicated DOM on toggle because the two directives
 *    share an owner node and clone its scope independently. Wrap one in a
 *    parent element instead, e.g.:
 *
 *        <div $if="visible">
 *            <li $for="item in items">{{item.name}}</li>
 *        </div>
 *
 *    or
 *
 *        <ul $for="item in items">
 *            <li $if="item.visible">{{item.name}}</li>
 *        </ul>
 */
declare class AreDirectiveIf extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scope: A_Scope, syntax: AreSyntax, scene: AreScene, ...args: any[]): void;
}

export { AreDirectiveIf };
