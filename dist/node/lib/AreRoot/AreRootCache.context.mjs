import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Fragment } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';

let AreRootCache = class extends A_Fragment {
  constructor(limit = 10) {
    super({ name: "AreRootCache" });
    /**
     * rootId -> (component tag -> cache entry). The inner Map preserves
     * insertion order which is used as the LRU recency order: the first key is
     * the least-recently-used entry, the last key the most-recently-used.
     */
    this._cache = /* @__PURE__ */ new Map();
    this._limit = Math.max(0, Math.floor(limit));
  }
  /**
   * Maximum number of cached subtrees kept per root.
   */
  get limit() {
    return this._limit;
  }
  bucket(rootId) {
    let bucket = this._cache.get(rootId);
    if (!bucket) {
      bucket = /* @__PURE__ */ new Map();
      this._cache.set(rootId, bucket);
    }
    return bucket;
  }
  /**
   * Whether a subtree for the given component tag is currently cached.
   */
  has(rootId, tag) {
    return this.bucket(rootId).has(tag);
  }
  /**
   * Retrieve AND remove a cached subtree so it can become live again. Returns
   * `undefined` on a cache miss.
   */
  take(rootId, tag) {
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
  put(rootId, tag, entry) {
    const bucket = this.bucket(rootId);
    const evicted = [];
    const existing = bucket.get(tag);
    if (existing) {
      bucket.delete(tag);
      if (existing.node !== entry.node) {
        evicted.push(existing);
      }
    }
    bucket.set(tag, entry);
    while (bucket.size > this._limit) {
      const oldestKey = bucket.keys().next().value;
      if (oldestKey === void 0) {
        break;
      }
      const oldest = bucket.get(oldestKey);
      bucket.delete(oldestKey);
      evicted.push(oldest);
    }
    return evicted;
  }
  /**
   * Remove and return every cached entry for a root (e.g. on teardown) so the
   * caller can destroy them.
   */
  clear(rootId) {
    const bucket = this._cache.get(rootId);
    if (!bucket) {
      return [];
    }
    const entries = [...bucket.values()];
    bucket.clear();
    this._cache.delete(rootId);
    return entries;
  }
};
AreRootCache = __decorateClass([
  A_Frame.Define({
    namespace: "a-are-html",
    description: "AreRootCache is a fragment that keeps a small per-root LRU of previously rendered are-root subtrees. When an are-root swaps the component it displays, the outgoing subtree is stashed here (unmounted + detached, but not destroyed) so that routing back to it can re-inject the preserved scene instantly instead of rebuilding from scratch."
  })
], AreRootCache);

export { AreRootCache };
//# sourceMappingURL=AreRootCache.context.mjs.map
//# sourceMappingURL=AreRootCache.context.mjs.map