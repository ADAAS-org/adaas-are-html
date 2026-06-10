import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { Are, AreEvent, AreNode, AreStore } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AreRoute } from "src/signals/AreRoute.signal";


/**
 * Settings page — rendered when the route is "/settings".
 */
@Are.Condition([new AreRoute('/settings')])
export class SettingsPage extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setContent(`
            <section class="page page-settings">
                <h1 class="page-title">Settings</h1>
                <p class="page-subtitle">Preferences are stored in the component's local store.</p>

                <div class="settings-group">
                    <h2>Appearance</h2>
                    <label class="setting-row">
                        <span>Dark mode</span>
                        <input type="checkbox" checked disabled />
                    </label>
                    <label class="setting-row">
                        <span>Compact layout</span>
                        <input type="checkbox" @change="$toggleCompact" />
                    </label>
                </div>

                <div class="settings-group">
                    <h2>Directive demo · <code>$show</code> vs <code>$if</code></h2>
                    <p class="hint">
                        Type something into both boxes below, then toggle <strong>Compact layout</strong>
                        twice. Both panels react to the same <code>compact</code> store flag, but:
                    </p>

                    <div class="demo-panel demo-show" $show="!compact">
                        <span class="demo-tag">$show</span>
                        <p>
                            Toggled with <code>$show</code> — I stay <strong>mounted</strong> and only my
                            inline <code>display</code> flips. Your text below <strong>survives</strong>
                            the toggle because the DOM node is never destroyed.
                        </p>
                        <input type="text" placeholder="Scratch text (survives toggle)…" />
                    </div>

                    <div class="demo-panel demo-if" $if="!compact">
                        <span class="demo-tag">$if</span>
                        <p>
                            Toggled with <code>$if</code> — I am <strong>unmounted</strong> and rebuilt
                            each time I reappear. Your text below is <strong>wiped</strong> on every toggle.
                        </p>
                        <input type="text" placeholder="Scratch text (lost on toggle)…" />
                    </div>
                </div>

                <div class="settings-group">
                    <h2>Display name</h2>
                    <div class="input-row">
                        <input
                            id="display-name"
                            type="text"
                            placeholder="Enter your name…"
                            @input="$onNameInput"
                        />
                        <span class="preview">Preview: <strong>{{displayName}}</strong></span>
                    </div>
                </div>

                <div class="settings-group">
                    <h2>Routing state</h2>
                    <p class="hint">
                        Current route is held in <code>A_SignalState</code> so refreshing the page
                        at <code>/settings</code> still lands here — no extra server config needed.
                    </p>
                </div>
            </section>
        `);
    }

    @Are.Data
    data(@A_Inject(AreStore) store: AreStore) {
        store.set({ displayName: 'Guest', compact: false });
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .page { padding: 48px 40px; max-width: 720px; margin: 0 auto; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 15px; color: #a1a1aa; margin-bottom: 36px; }
            .settings-group { margin-bottom: 36px; }
            .settings-group h2 { font-size: 15px; font-weight: 700; color: #e4e4e7; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #27272a; }
            .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; color: #a1a1aa; font-size: 14px; cursor: pointer; }
            .input-row { display: flex; align-items: center; gap: 16px; }
            .input-row input[type="text"] { background: #1c1c1f; border: 1px solid #3f3f46; border-radius: 8px; color: #f4f4f5; padding: 8px 14px; font-size: 14px; outline: none; width: 260px; }
            .input-row input[type="text"]:focus { border-color: #a78bfa; }
            .preview { font-size: 14px; color: #71717a; }
            .preview strong { color: #a78bfa; }
            .hint { font-size: 13px; color: #71717a; line-height: 1.7; }
            .hint code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; }
            .settings-group h2 code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; font-weight: 600; }
            .demo-panel { position: relative; background: #1c1c1f; border: 1px solid #27272a; border-radius: 10px; padding: 18px 18px 18px 20px; margin-top: 14px; }
            .demo-panel p { font-size: 13px; color: #a1a1aa; line-height: 1.7; margin: 0 0 12px; }
            .demo-panel p code { background: #27272a; padding: 1px 5px; border-radius: 3px; color: #a78bfa; font-size: 12px; }
            .demo-panel strong { color: #e4e4e7; }
            .demo-panel input[type="text"] { background: #131316; border: 1px solid #3f3f46; border-radius: 8px; color: #f4f4f5; padding: 8px 14px; font-size: 13px; outline: none; width: 100%; box-sizing: border-box; }
            .demo-panel input[type="text"]:focus { border-color: #a78bfa; }
            .demo-tag { display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; margin-bottom: 10px; }
            .demo-show { border-left: 3px solid #34d399; }
            .demo-show .demo-tag { background: rgba(52, 211, 153, 0.12); color: #34d399; }
            .demo-if { border-left: 3px solid #f59e0b; }
            .demo-if .demo-tag { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
        `);
    }

    @Are.EventHandler
    onNameInput(
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreEvent) event: AreEvent,
    ) {
        const el = (event.get('native') as Event)?.target as HTMLInputElement;
        store.set('displayName', el?.value || 'Guest');
    }

    @Are.EventHandler
    toggleCompact(
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreEvent) event: AreEvent,
    ) {
        const el = (event.get('native') as Event)?.target as HTMLInputElement;
        store.set('compact', el?.checked ?? false);
    }
}
