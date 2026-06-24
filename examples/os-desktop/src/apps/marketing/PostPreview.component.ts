import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { MarketingStore } from "./MarketingStore";
import { SelectionState } from "../../signals/SelectionState.signal";


/**
 * PostPreview — the live LinkedIn-style preview of the Marketing app.
 *
 * It mirrors the app's own {@link MarketingStore} (updated by the editor) and
 * also listens to the OS-wide {@link SelectionState} signal: whatever text the
 * user selects anywhere on the desktop is offered as a hashtag. Updates are
 * applied imperatively to the rendered DOM so the editor's textarea never loses
 * focus and so there is no teardown to coordinate.
 */
export class PostPreview extends Are {

    protected _unsubscribe?: () => void;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <article class="pp">
                <header class="pp-top">
                    <div class="pp-avatar">A</div>
                    <div>
                        <div class="pp-name">ARE Platform</div>
                        <div class="pp-sub">Runtime · 1m · 🌐</div>
                    </div>
                </header>
                <p class="pp-body">${this.escape(MarketingStore.text)}</p>
                <div class="pp-sel" hidden></div>
                <footer class="pp-actions">
                    <span>👍 Like</span><span>💬 Comment</span><span>↪ Share</span>
                </footer>
            </article>
        `);
    }

    @Are.onAfterMount
    onMount() {
        this._unsubscribe = MarketingStore.subscribe(() => {
            const el = document.querySelector('.pp-body');
            if (el) el.textContent = MarketingStore.text;
        });
    }

    @Are.onBeforeUnmount
    onUnmount() {
        this._unsubscribe?.();
        this._unsubscribe = undefined;
    }

    @Are.Signal(SelectionState)
    onSelection(@A_Inject(SelectionState) signal: SelectionState) {
        const el = document.querySelector('.pp-sel') as HTMLElement | null;
        if (!el) return;

        const text = signal.text.trim();
        if (text.length) {
            const tag = text.replace(/\s+/g, '').replace(/[^\w]/g, '').slice(0, 24);
            el.hidden = false;
            el.textContent = tag ? `Selected on desktop → add #${tag}` : `Selected ${signal.length} characters`;
        } else {
            el.hidden = true;
        }
    }

    protected escape(text: string): string {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .pp {
                margin: 22px 24px;
                padding: 18px;
                border-radius: 14px;
                background: #ffffff;
                color: #1d2226;
                box-shadow: 0 12px 30px rgba(0,0,0,0.25);
                align-self: start;
            }
            .pp-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
            .pp-avatar {
                width: 44px; height: 44px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                background: #2f6df6; color: white; font-weight: 700;
            }
            .pp-name { font-weight: 700; font-size: 14px; }
            .pp-sub { font-size: 12px; color: #66707a; }
            .pp-body { font-size: 14px; line-height: 1.55; white-space: pre-wrap; word-break: break-word; }
            .pp-sel {
                margin-top: 12px;
                padding: 8px 12px;
                border-radius: 8px;
                background: #eaf1ff;
                color: #2f6df6;
                font-size: 12px;
                font-weight: 600;
            }
            .pp-actions {
                display: flex; gap: 18px; margin-top: 14px; padding-top: 12px;
                border-top: 1px solid #e6e9ec; color: #66707a; font-size: 13px; font-weight: 600;
            }
        `);
    }
}
