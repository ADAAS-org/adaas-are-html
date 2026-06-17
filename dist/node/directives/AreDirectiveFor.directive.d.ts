import { A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-Bm5LlOyE.js';
import { AreStore, AreScene } from '@adaas/are';
import '../lib/AreStyle/AreStyle.context.js';

declare class AreDirectiveFor extends AreDirective {
    /**
     * Lists whose number of NEW item nodes is at or below this threshold render
     * fully synchronously — byte-for-byte the previous behavior. Typical UIs
     * (menus, small tables) are therefore completely unaffected; only genuinely
     * large lists pay the (tiny) scheduling cost to keep the main thread responsive.
     */
    private static readonly SYNC_THRESHOLD;
    /**
     * Per-chunk time budget (ms). During a large-list render we mount item nodes
     * until this much time has elapsed, then yield to the browser so it can paint
     * and process input before the next chunk. ~16ms targets one animation frame.
     */
    private static readonly CHUNK_BUDGET_MS;
    /**
     * Per-attribute serialization state. A new update() that arrives while a
     * chunked render of the SAME `$for` is still in flight does NOT start a second
     * concurrent pass (which could interleave mutations on the shared children
     * list); instead it marks `pending` and the in-flight run re-runs once more
     * with the latest data when it finishes. This guarantees the children list is
     * only ever mutated by one pass at a time and the final state always reflects
     * the most recent store value.
     */
    private static readonly renderState;
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void | Promise<void>;
    /**
     * Core of the `$for` update: re-diff the source array against the current
     * children, reconcile reused/removed items, then mount the new ones (small
     * lists synchronously, large lists time-sliced). Never called while another
     * pass for the same `$for` is in flight (see `update`).
     */
    private performUpdate;
    /**
     * Completes an update pass. If another update() arrived while a chunked
     * render was streaming, run exactly one more pass now from the latest store
     * value so the final DOM always reflects the most recent data.
     */
    private finishUpdate;
    /**
     * Walks the node's ancestor chain (inclusive) and reports whether the
     * whole path is currently active — i.e. the subtree is actually rendered
     * into the DOM. A single inactive ancestor scene (e.g. a `$if` whose
     * condition is false) means the subtree is detached.
     */
    private isAttached;
    /**
     * Build a key-function that derives a stable identity from each item.
     * If the user provided a `track <expr>` clause, evaluate it as a path on
     * the item; otherwise fall back to the item identity (reference equality).
     */
    private makeKeyFn;
    /**
     * Parses the $for expression string into its constituent parts.
     *
     * Supported formats:
     *   item in items
     *   item, index in items
     *   (item, index) in items
     *   item in filter(items)
     *   item, index in filter(items, 'active')
     *   item in items track item.id
     *   (item, i) in items track item.id
     */
    private parseExpression;
    /**
     * Resolves the array expression against the store.
     * Supports both plain key lookups and function-call expressions:
     *   items          → store.get('items')
     *   filter(items)  → store.get('filter')(store.get('items'))
     */
    private resolveArray;
    /**
     * Creates a single item node from the template, registers it as a child of
     * the owner, initialises it, injects item-scoped store values, and activates
     * its scene so the mount/compile cycle will include it.
     *
     * NOTE: This method does NOT call compile() or mount() — the caller is
     * responsible for doing so when the main lifecycle cycle won't cover it
     * (i.e. during update, but not during the initial compile phase).
     */
    private spawnItemNode;
}

export { AreDirectiveFor };
