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
