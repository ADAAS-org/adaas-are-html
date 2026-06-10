import { A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { AreNode } from "@adaas/are";


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
export type AreRootCacheEntry = {
    node: AreNode;
    subscribers: AreNode[];
};


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'AreRootCache is a fragment that keeps a small per-root LRU of previously rendered are-root subtrees. When an are-root swaps the component it displays, the outgoing subtree is stashed here (unmounted + detached, but not destroyed) so that routing back to it can re-inject the preserved scene instantly instead of rebuilding from scratch.'
})
export class AreRootCache extends A_Fragment {

    /**
     * rootId -> (component tag -> cache entry). The inner Map preserves
     * insertion order which is used as the LRU recency order: the first key is
     * the least-recently-used entry, the last key the most-recently-used.
     */
    protected _cache: Map<string, Map<string, AreRootCacheEntry>> = new Map();

    /**
     * Maximum number of cached subtrees kept per root. Older entries beyond this
     * limit are evicted (and returned to the caller so it can destroy them).
     */
    protected _limit: number;

    constructor(limit: number = 10) {
        super({ name: 'AreRootCache' });
        this._limit = Math.max(0, Math.floor(limit));
    }

    /**
     * Maximum number of cached subtrees kept per root.
     */
    get limit(): number {
        return this._limit;
    }

    protected bucket(rootId: string): Map<string, AreRootCacheEntry> {
        let bucket = this._cache.get(rootId);
        if (!bucket) {
            bucket = new Map();
            this._cache.set(rootId, bucket);
        }
        return bucket;
    }

    /**
     * Whether a subtree for the given component tag is currently cached.
     */
    has(rootId: string, tag: string): boolean {
        return this.bucket(rootId).has(tag);
    }

    /**
     * Retrieve AND remove a cached subtree so it can become live again. Returns
     * `undefined` on a cache miss.
     */
    take(rootId: string, tag: string): AreRootCacheEntry | undefined {
        const bucket = this.bucket(rootId);
        const entry = bucket.get(tag);
        if (entry) {
            bucket.delete(tag);
        }
        return entry;
    }

    /**
     * Stash a detached subtree under the given component tag. Returns any entries
     * that were evicted to honour the LRU limit (or replaced for the same tag) so
     * the caller can `destroy()` them.
     */
    put(rootId: string, tag: string, entry: AreRootCacheEntry): AreRootCacheEntry[] {
        const bucket = this.bucket(rootId);
        const evicted: AreRootCacheEntry[] = [];

        // Replace any stale entry for the same tag (should not normally happen,
        // since a displayed tag is never simultaneously cached) and surface it
        // for destruction so it does not leak.
        const existing = bucket.get(tag);
        if (existing) {
            bucket.delete(tag);
            if (existing.node !== entry.node) {
                evicted.push(existing);
            }
        }

        // A limit of 0 disables caching: the freshly added entry is evicted
        // immediately so the caller tears it down.
        bucket.set(tag, entry);

        while (bucket.size > this._limit) {
            const oldestKey = bucket.keys().next().value as string | undefined;
            if (oldestKey === undefined) {
                break;
            }
            const oldest = bucket.get(oldestKey)!;
            bucket.delete(oldestKey);
            evicted.push(oldest);
        }

        return evicted;
    }

    /**
     * Remove and return every cached entry for a root (e.g. on teardown) so the
     * caller can destroy them.
     */
    clear(rootId: string): AreRootCacheEntry[] {
        const bucket = this._cache.get(rootId);
        if (!bucket) {
            return [];
        }
        const entries = [...bucket.values()];
        bucket.clear();
        this._cache.delete(rootId);
        return entries;
    }
}
