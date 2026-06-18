import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-GpT-5Qmf.js';
import { AreStore, AreScene, AreSyntax } from '@adaas/are';
import { AreDirectiveContext } from '../lib/AreDirective/AreDirective.context.js';
import '@adaas/a-concept';
import '../lib/AreStyle/AreStyle.context.js';
import '@adaas/a-utils/a-execution';

/**
 * `$show` directive — conditionally toggles an element's visibility.
 *
 * Unlike `$if`, `$show` keeps the element fully mounted at all times and only
 * flips its inline `display` (Vue `v-show` semantics). The element's subtree,
 * event listeners and scene state are preserved across toggles, which makes it
 * far cheaper than `$if` for things that flip on/off frequently. Use `$if` when
 * the hidden branch is expensive and rarely shown; use `$show` when it toggles
 * often.
 *
 * ⚠️ Known limitations:
 *  - Do NOT combine `$show` with `$if`/`$for` on the SAME element — they share
 *    an owner node and would fight over its host instruction. Wrap one in a
 *    parent element instead.
 *  - `$show` forces inline `display:none`, which beats stylesheet rules but will
 *    NOT override the element's own inline `:style="display:..."` binding.
 */
declare class AreDirectiveShow extends AreDirective {
    transform(attribute: AreDirectiveAttribute, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, syntax: AreSyntax, directiveContext?: AreDirectiveContext, ...args: any[]): void;
}

export { AreDirectiveShow };
