import {
  SelectionState
} from "../../chunks/chunk-WOH7L5UR.js";
import {
  A_Logger,
  Are,
  AreEvent,
  Yt,
  __decorateClass,
  __decorateParam,
  __name,
  te
} from "../../chunks/chunk-6K72IBO4.js";

// examples/os-desktop/src/apps/marketing/MarketingApp.component.ts
var _MarketingApp = class _MarketingApp extends Are {
  template(node) {
    node.setContent(`
            <div class="mk">
                <div class="mk-head">
                    <h2>LinkedIn Post Builder</h2>
                    <span class="mk-be">backend \xB7 <code>/apps/marketing/api</code></span>
                </div>
                <div class="mk-grid">
                    <post-editor></post-editor>
                    <post-preview></post-preview>
                </div>
            </div>
        `);
  }
  styles(node) {
    node.setStyles(`
            post-editor, post-preview { display: contents; }
            .mk { display: flex; flex-direction: column; height: 100%; color: #ececf1; }
            .mk-head {
                display: flex; align-items: baseline; justify-content: space-between;
                padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.07);
            }
            .mk-head h2 { font-size: 18px; font-weight: 700; }
            .mk-be { font-size: 11px; color: #8b7fb0; }
            .mk-be code { color: #c9b8ff; }
            .mk-grid {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0;
                min-height: 0;
            }
        `);
  }
};
__name(_MarketingApp, "MarketingApp");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _MarketingApp.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _MarketingApp.prototype, "styles", 1);
var MarketingApp = _MarketingApp;

// examples/os-desktop/src/apps/marketing/MarketingStore.ts
var _MarketingStoreImpl = class _MarketingStoreImpl {
  constructor() {
    this._text = "Thrilled to share that we shipped runtime app loading in our OS shell! \u{1F680}\n\nEach app is its own bundle + backend, loaded on demand. No redeploys, no reloads.";
    this._listeners = /* @__PURE__ */ new Set();
  }
  get text() {
    return this._text;
  }
  set(text) {
    this._text = text;
    for (const listener of this._listeners) {
      listener();
    }
  }
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
};
__name(_MarketingStoreImpl, "MarketingStoreImpl");
var MarketingStoreImpl = _MarketingStoreImpl;
var MarketingStore = new MarketingStoreImpl();

// examples/os-desktop/src/apps/marketing/PostEditor.component.ts
var _PostEditor = class _PostEditor extends Are {
  constructor() {
    super(...arguments);
    this._hashtags = [];
  }
  template(node) {
    node.setContent(this.build());
  }
  edit(event) {
    const el = event.get("native")?.target;
    if (el) MarketingStore.set(el.value);
  }
  async suggest(logger) {
    const btn = document.getElementById("pe-suggest");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Asking backend\u2026";
    }
    try {
      const topic = encodeURIComponent(MarketingStore.text.slice(0, 60));
      const res = await fetch(`/apps/marketing/api/hashtags?topic=${topic}`);
      const data = await res.json();
      this._hashtags = Array.isArray(data.hashtags) ? data.hashtags : [];
    } catch (error) {
      logger.error(error);
      this._hashtags = [];
    }
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Suggest hashtags";
    }
    this.paintChips();
  }
  /**
   * Renders the suggested-hashtag chips imperatively. Each chip appends its
   * tag to the app's store (and the textarea) via a native listener — the
   * editor never re-renders, so the textarea keeps its caret and focus.
   */
  paintChips() {
    const host = document.getElementById("pe-chips");
    if (!host) return;
    host.innerHTML = "";
    if (!this._hashtags.length) {
      const empty = document.createElement("span");
      empty.className = "pe-empty";
      empty.textContent = "Click \u201CSuggest\u201D to ask the marketing backend for hashtags.";
      host.appendChild(empty);
      return;
    }
    for (const tag of this._hashtags) {
      const chip = document.createElement("button");
      chip.className = "pe-chip";
      chip.textContent = `#${tag}`;
      chip.addEventListener("click", () => this.appendTag(tag));
      host.appendChild(chip);
    }
  }
  appendTag(tag) {
    MarketingStore.set(`${MarketingStore.text} #${tag}`);
    const ta = document.querySelector(".pe-text");
    if (ta) ta.value = MarketingStore.text;
  }
  build() {
    return `
            <section class="pe">
                <label class="pe-label">Draft</label>
                <textarea class="pe-text" @input="$edit()" spellcheck="false">${this.escape(MarketingStore.text)}</textarea>
                <div class="pe-tools">
                    <button class="pe-suggest" id="pe-suggest" @click="$suggest()">Suggest hashtags</button>
                </div>
                <div class="pe-chips" id="pe-chips">
                    <span class="pe-empty">Click \u201CSuggest\u201D to ask the marketing backend for hashtags.</span>
                </div>
            </section>
        `;
  }
  escape(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  styles(node) {
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
};
__name(_PostEditor, "PostEditor");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _PostEditor.prototype, "template", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(AreEvent))
], _PostEditor.prototype, "edit", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(A_Logger))
], _PostEditor.prototype, "suggest", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _PostEditor.prototype, "styles", 1);
var PostEditor = _PostEditor;

// examples/os-desktop/src/apps/marketing/PostPreview.component.ts
var _PostPreview = class _PostPreview extends Are {
  template(node) {
    node.setContent(`
            <article class="pp">
                <header class="pp-top">
                    <div class="pp-avatar">A</div>
                    <div>
                        <div class="pp-name">ARE Platform</div>
                        <div class="pp-sub">Runtime \xB7 1m \xB7 \u{1F310}</div>
                    </div>
                </header>
                <p class="pp-body">${this.escape(MarketingStore.text)}</p>
                <div class="pp-sel" hidden></div>
                <footer class="pp-actions">
                    <span>\u{1F44D} Like</span><span>\u{1F4AC} Comment</span><span>\u21AA Share</span>
                </footer>
            </article>
        `);
  }
  onMount() {
    this._unsubscribe = MarketingStore.subscribe(() => {
      const el = document.querySelector(".pp-body");
      if (el) el.textContent = MarketingStore.text;
    });
  }
  onUnmount() {
    this._unsubscribe?.();
    this._unsubscribe = void 0;
  }
  onSelection(signal) {
    const el = document.querySelector(".pp-sel");
    if (!el) return;
    const text = signal.text.trim();
    if (text.length) {
      const tag = text.replace(/\s+/g, "").replace(/[^\w]/g, "").slice(0, 24);
      el.hidden = false;
      el.textContent = tag ? `Selected on desktop \u2192 add #${tag}` : `Selected ${signal.length} characters`;
    } else {
      el.hidden = true;
    }
  }
  escape(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  styles(node) {
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
};
__name(_PostPreview, "PostPreview");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _PostPreview.prototype, "template", 1);
__decorateClass([
  Are.onAfterMount
], _PostPreview.prototype, "onMount", 1);
__decorateClass([
  Are.onBeforeUnmount
], _PostPreview.prototype, "onUnmount", 1);
__decorateClass([
  Are.Signal(SelectionState),
  __decorateParam(0, Yt(SelectionState))
], _PostPreview.prototype, "onSelection", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _PostPreview.prototype, "styles", 1);
var PostPreview = _PostPreview;

// examples/os-desktop/src/apps/marketing/index.ts
var marketing_default = MarketingApp;
export {
  MarketingApp,
  PostEditor,
  PostPreview,
  marketing_default as default
};
