import { A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-BWzEIw6H.mjs';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirectiveContext } from '../lib/AreDirective/AreDirective.context.mjs';
import '../lib/AreStyle/AreStyle.context.mjs';
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
    update(attribute: AreDirectiveAttribute, store: AreStore, scope: A_Scope, syntax: AreSyntax, scene: AreScene, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    /**
     * Evaluates the `$if` condition defensively.
     *
     * A condition can reference data that is momentarily unavailable — most
     * commonly a nested `$if` (e.g. `$if="selected.fields.length"`) living
     * inside a parent `$if="selected"` whose object has just become `null`.
     * Because the nested directive is still subscribed to the store, its
     * update fires on that same change and the raw expression would throw
     * `Cannot read properties of null`, crashing the whole update pipeline.
     *
     * Treating an evaluation error as `false` is the correct contract for a
     * conditional: if the condition cannot be resolved, the subtree simply
     * stays hidden until the referenced data is present again (at which point
     * the parent `$if` re-activates and re-evaluates this one).
     */
    private evaluateCondition;
}

export { AreDirectiveIf };
