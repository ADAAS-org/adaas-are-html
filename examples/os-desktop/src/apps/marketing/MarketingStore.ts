/**
 * MarketingStore — the Marketing app's OWN internal state.
 *
 * It lives entirely inside the marketing bundle and has nothing to do with the
 * OS signal bus. This demonstrates that an app manages its own state however it
 * likes: here a tiny observable holding the post draft, shared between the
 * editor (writer) and the preview (reader). Both components ship in the same
 * bundle, so they share this singleton.
 */
class MarketingStoreImpl {

    protected _text: string =
        "Thrilled to share that we shipped runtime app loading in our OS shell! 🚀\n\nEach app is its own bundle + backend, loaded on demand. No redeploys, no reloads.";

    protected _listeners: Set<() => void> = new Set();

    get text(): string {
        return this._text;
    }

    set(text: string): void {
        this._text = text;
        for (const listener of this._listeners) {
            listener();
        }
    }

    subscribe(listener: () => void): () => void {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }
}

export const MarketingStore = new MarketingStoreImpl();
