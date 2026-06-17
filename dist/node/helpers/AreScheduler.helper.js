'use strict';

class AreSchedulerHelper {
  /**
   * High-resolution wall-clock time in milliseconds. Uses `performance.now()`
   * when available (monotonic, sub-millisecond), falling back to `Date.now()`.
   */
  static now() {
    return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
  }
  /**
   * Schedule `fn` to run on the next macrotask.
   *
   * `MessageChannel` yields a true macrotask without the ~4ms clamp that nested
   * `setTimeout(0)` calls incur, so the browser can paint between chunks with
   * minimal scheduling overhead. Falls back to `setTimeout` in non-DOM
   * environments (e.g. tests / SSR).
   */
  static scheduleMacrotask(fn) {
    if (typeof MessageChannel === "undefined") {
      setTimeout(fn, 0);
      return;
    }
    if (!this._channel) {
      this._channel = new MessageChannel();
      this._channel.port1.onmessage = () => {
        const next = this._queue.shift();
        if (next) next();
      };
    }
    this._queue.push(fn);
    this._channel.port2.postMessage(null);
  }
}
/** FIFO queue of callbacks waiting for their posted macrotask to fire. */
AreSchedulerHelper._queue = [];

exports.AreSchedulerHelper = AreSchedulerHelper;
//# sourceMappingURL=AreScheduler.helper.js.map
//# sourceMappingURL=AreScheduler.helper.js.map