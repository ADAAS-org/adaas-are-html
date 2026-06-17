/**
 * AreSchedulerHelper
 *
 * Cooperative time-slicing primitives shared by the chunked (async) render
 * paths — the initial whole-page mount walk and the `$for` directive. Both need
 * the SAME two capabilities:
 *   1. a high-resolution clock to measure how long the current chunk has run, and
 *   2. a zero-delay macrotask scheduler to yield to the browser between chunks
 *      so it can paint and process input before resuming work.
 *
 * Keeping these in one helper avoids duplicating the `MessageChannel` plumbing
 * across directives/lifecycle and gives a single place to tune the strategy.
 */
export class AreSchedulerHelper {

    /**
     * Lazily-created `MessageChannel` used to post zero-delay macrotasks.
     * Created on first use so non-DOM environments (tests / SSR) that never
     * schedule a chunk pay nothing.
     */
    private static _channel?: MessageChannel;

    /** FIFO queue of callbacks waiting for their posted macrotask to fire. */
    private static readonly _queue: Array<() => void> = [];

    /**
     * High-resolution wall-clock time in milliseconds. Uses `performance.now()`
     * when available (monotonic, sub-millisecond), falling back to `Date.now()`.
     */
    static now(): number {
        return (typeof performance !== 'undefined' && typeof performance.now === 'function')
            ? performance.now()
            : Date.now();
    }

    /**
     * Schedule `fn` to run on the next macrotask.
     *
     * `MessageChannel` yields a true macrotask without the ~4ms clamp that nested
     * `setTimeout(0)` calls incur, so the browser can paint between chunks with
     * minimal scheduling overhead. Falls back to `setTimeout` in non-DOM
     * environments (e.g. tests / SSR).
     */
    static scheduleMacrotask(fn: () => void): void {
        if (typeof MessageChannel === 'undefined') {
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
