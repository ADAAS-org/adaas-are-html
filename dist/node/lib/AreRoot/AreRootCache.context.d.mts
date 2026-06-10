import { A_Fragment } from '@adaas/a-concept';
import { AreNode } from '@adaas/are';

/**
 * A single cached, detached component subtree for an are-root outlet.
 *
 * `node` is fully compiled and its scene plan is intact (it was `unmount()`ed,
 * not destroyed), so it can be re-mounted instantly without re-tokenizing,
 * re-loading, transforming or compiling. `subscribers` records the exact set of
 * nodes inside the subtree that were subscribed to the signal bus at the moment
 * of stashing — they are unsubscribed while cached (so the detached DOM never
 * reacts to signals) and re-subscribed verbatim on restore.
 */
type AreRootCacheEntry = {
    node: AreNode;
    subscribers: AreNode[];
};
declare class AreRootCache extends A_Fragment {
    /**
     * rootId -> (component tag -> cache entry). The inner Map preserves
     * insertion order which is used as the LRU recency order: the first key is
     * the least-recently-used entry, the last key the most-recently-used.
     */
    protected _cache: Map<string, Map<string, AreRootCacheEntry>>;
    /**
     * Maximum number of cached subtrees kept per root. Older entries beyond this
     * limit are evicted (and returned to the caller so it can destroy them).
     */
    protected _limit: number;
    constructor(limit?: number);
    /**
     * Maximum number of cached subtrees kept per root.
     */
    get limit(): number;
    protected bucket(rootId: string): Map<string, AreRootCacheEntry>;
    /**
     * Whether a subtree for the given component tag is currently cached.
     */
    has(rootId: string, tag: string): boolean;
    /**
     * Retrieve AND remove a cached subtree so it can become live again. Returns
     * `undefined` on a cache miss.
     */
    take(rootId: string, tag: string): AreRootCacheEntry | undefined;
    /**
     * Stash a detached subtree under the given component tag. Returns any entries
     * that were evicted to honour the LRU limit (or replaced for the same tag) so
     * the caller can `destroy()` them.
     */
    put(rootId: string, tag: string, entry: AreRootCacheEntry): AreRootCacheEntry[];
    /**
     * Remove and return every cached entry for a root (e.g. on teardown) so the
     * caller can destroy them.
     */
    clear(rootId: string): AreRootCacheEntry[];
}

export { AreRootCache, type AreRootCacheEntry };
