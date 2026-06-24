import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreEvent, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { MarketingStore } from "./MarketingStore";


/**
 * PostEditor — the writing surface of the Marketing app.
 *
 * It writes the draft into the app's own {@link MarketingStore} on every
 * keystroke (so the preview can mirror it) and talks to the app's OWN backend
 * (`/apps/marketing/api/hashtags`) to fetch suggested hashtags — proving each
 * app carries its own server, not just its own UI.
 */
export class PostEditor extends Are {

    protected _hashtags: string[] = [];

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(this.build());
    }

    @Are.EventHandler
    edit(@A_Inject(AreEvent) event: AreEvent) {
        const el = event.get('native')?.target as HTMLTextAreaElement;
        if (el) MarketingStore.set(el.value);
    }

    @Are.EventHandler
    async suggest(
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const btn = document.getElementById('pe-suggest') as HTMLButtonElement | null;
        if (btn) { btn.disabled = true; btn.textContent = 'Asking backend…'; }

        try {
            const topic = encodeURIComponent(MarketingStore.text.slice(0, 60));
            const res = await fetch(`/apps/marketing/api/hashtags?topic=${topic}`);
            const data = await res.json();
            this._hashtags = Array.isArray(data.hashtags) ? data.hashtags : [];
        } catch (error) {
            logger.error(error);
            this._hashtags = [];
        }

        if (btn) { btn.disabled = false; btn.textContent = 'Suggest hashtags'; }
        this.paintChips();
    }

    /**
     * Renders the suggested-hashtag chips imperatively. Each chip appends its
     * tag to the app's store (and the textarea) via a native listener — the
     * editor never re-renders, so the textarea keeps its caret and focus.
     */
    protected paintChips() {
        const host = document.getElementById('pe-chips');
        if (!host) return;
        host.innerHTML = '';
        if (!this._hashtags.length) {
            const empty = document.createElement('span');
            empty.className = 'pe-empty';
            empty.textContent = 'Click “Suggest” to ask the marketing backend for hashtags.';
            host.appendChild(empty);
            return;
        }
        for (const tag of this._hashtags) {
            const chip = document.createElement('button');
            chip.className = 'pe-chip';
            chip.textContent = `#${tag}`;
            chip.addEventListener('click', () => this.appendTag(tag));
            host.appendChild(chip);
        }
    }

    protected appendTag(tag: string) {
        MarketingStore.set(`${MarketingStore.text} #${tag}`);
        const ta = document.querySelector('.pe-text') as HTMLTextAreaElement | null;
        if (ta) ta.value = MarketingStore.text;
    }

    protected build(): string {
        return `
            <section class="pe">
                <label class="pe-label">Draft</label>
                <textarea class="pe-text" @input="$edit()" spellcheck="false">${this.escape(MarketingStore.text)}</textarea>
                <div class="pe-tools">
                    <button class="pe-suggest" id="pe-suggest" @click="$suggest()">Suggest hashtags</button>
                </div>
                <div class="pe-chips" id="pe-chips">
                    <span class="pe-empty">Click “Suggest” to ask the marketing backend for hashtags.</span>
                </div>
            </section>
        `;
    }

    protected escape(text: string): string {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .pe {
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 22px 24px;
                border-right: 1px solid rgba(255,255,255,0.07);
                min-height: 0;
            }
            .pe-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8b7fb0; }
            .pe-text {
                flex: 1;
                min-height: 200px;
                resize: none;
                padding: 14px 16px;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.1);
                background: rgba(0,0,0,0.25);
                color: #f2f2f5;
                font-size: 14px;
                line-height: 1.6;
                font-family: inherit;
            }
            .pe-text:focus { outline: none; border-color: #7c6fd6; }
            .pe-suggest {
                padding: 9px 16px;
                border: none;
                border-radius: 10px;
                background: #2f6df6;
                color: white;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
            }
            .pe-suggest:disabled { opacity: 0.6; cursor: default; }
            .pe-chips { display: flex; flex-wrap: wrap; gap: 6px; min-height: 24px; }
            .pe-chip {
                padding: 4px 10px;
                border: 1px solid rgba(124,111,214,0.5);
                border-radius: 999px;
                background: rgba(124,111,214,0.14);
                color: #c9b8ff;
                font-size: 12px;
                cursor: pointer;
            }
            .pe-chip:hover { background: rgba(124,111,214,0.28); }
            .pe-empty { font-size: 12px; color: #6f6790; }
        `);
    }
}
