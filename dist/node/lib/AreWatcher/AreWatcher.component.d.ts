import { A_Component } from '@adaas/a-concept';

declare class AreWatcher extends A_Component {
    private readonly handlers;
    private current;
    constructor();
    onChange(handler: (url: URL) => void): () => void;
    get url(): URL;
    destroy(): void;
    private onPopState;
    private onHashChange;
    private onURLChange;
    private attachListeners;
    private patchHistory;
    private notify;
}

export { AreWatcher };
