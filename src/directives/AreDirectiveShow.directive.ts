import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreScene, AreStore, AreSyntax } from "@adaas/are";
import { AreDirective } from "@adaas/are-html/directive/AreDirective.component";
import { AreDirectiveContext } from "@adaas/are-html/directive/AreDirective.context";
import { HideElementInstruction } from "@adaas/are-html/instructions/HideElement.instruction";
import { A_Frame } from "@adaas/a-frame/core";



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
@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'Built-in $show directive. Toggles an element\'s visibility by flipping its inline display value based on a store expression, keeping the element mounted (subtree, listeners and scene state preserved) instead of unmounting it like $if.'
})
@AreDirective.Priority(3)
export class AreDirectiveShow extends AreDirective {


    @AreDirective.Transform
    transform(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(A_Logger) logger: A_Logger,
        ...args: any[]
    ) {
        // $show makes no structural change to the tree — the element stays in
        // place and is only hidden/shown at interpret time. Nothing to do here
        // beyond overriding the base directive's default transform warning.
        logger.debug(`[Transform] directive $SHOW for <${attribute.owner.aseid.toString()}> (no structural change)`)
    }


    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,
        ...args: any[]
    ): void {
        /**
         * 1. Evaluate the expression to determine the initial visibility.
         */
        const visible = !!syntax.evaluate(attribute.content, store, {
            ...(directiveContext?.scope || {}),
        });

        attribute.value = visible;

        /**
         * 2. Create a single reusable HideElement mutation parented to the
         *    element's host instruction, and cache it on the attribute so
         *    update() can plan/unplan the exact same instance.
         */
        const hide = new HideElementInstruction(scene.host!, {});
        attribute.cache = hide;

        /**
         * 3. When initially hidden, plan the mutation so the first interpret
         *    applies `display:none`. When visible, leave it unplanned.
         */
        if (!visible)
            scene.plan(hide);
    }


    @AreDirective.Update
    update(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(AreDirectiveContext) directiveContext?: AreDirectiveContext,
        ...args: any[]
    ): void {
        /**
         * 1. Re-evaluate the expression, forwarding the directive context scope
         *    (e.g. a `$for` loop variable) so `$show` reacts correctly inside
         *    loops.
         */
        const previous = !!attribute.value;
        const next = !!syntax.evaluate(attribute.content, store, {
            ...(directiveContext?.scope || {}),
        });

        attribute.value = next;

        // Skip when visibility has not changed — avoids redundant DOM writes.
        if (previous === next) return;

        const hide = attribute.cache as HideElementInstruction | undefined;

        if (!hide) return;

        /**
         * 2. Toggle the cached mutation: unplan to reveal, plan to hide. Then
         *    re-interpret the owner so the scene diff applies/reverts it.
         */
        if (next)
            scene.unPlan(hide);
        else
            scene.plan(hide);

        attribute.owner.interpret();
    }

}
