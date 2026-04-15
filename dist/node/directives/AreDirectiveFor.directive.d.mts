import { A_Scope } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreDirective, b as AreDirectiveAttribute } from '../AreBinding.attribute-C6qrxN8K.mjs';
import { AreStore, AreScene } from '@adaas/are';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreDirectiveFor extends AreDirective {
    transform(attribute: AreDirectiveAttribute, scope: A_Scope, store: AreStore, scene: AreScene, logger: A_Logger, ...args: any[]): void;
    compile(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
    update(attribute: AreDirectiveAttribute, store: AreStore, scene: AreScene, ...args: any[]): void;
    /**
     * Parses the $for expression string into its constituent parts.
     *
     * Supported formats:
     *   item in items
     *   item, index in items
     *   (item, index) in items
     *   item in filter(items)
     *   item, index in filter(items, 'active')
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
