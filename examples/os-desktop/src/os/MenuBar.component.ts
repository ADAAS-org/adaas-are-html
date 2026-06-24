import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AppRegistry } from "../runtime/AppRegistry.fragment";
import { OSRoute } from "../signals/OSRoute.signal";
import { SelectionState } from "../signals/SelectionState.signal";


/**
 * MenuBar — the translucent top bar.
 *
 * Demonstrates a component that reacts to TWO independent signal types via
 * typed `@Are.Signal(...)` handlers:
 *   - {@link OSRoute}        → the active application's name (left side).
 *   - {@link SelectionState} → a "N selected" chip (right side).
 *
 * Each handler patches the rendered DOM imperatively, so reacting to a
 * high-frequency selection or route change never tears down and rebuilds the
 * bar's subtree.
 */
export class MenuBar extends Are {

    protected _route: string = document.location.pathname || '/';
    protected _selectionLength: number = 0;
    protected _clockTimer?: ReturnType<typeof setInterval>;

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        node.setContent(this.build(registry));
    }

    @Are.onAfterMount
    onMount() {
        this._clockTimer = setInterval(() => {
            const clock = document.getElementById('mb-clock');
            if (clock) clock.textContent = this.now();
        }, 15000);
    }

    @Are.onBeforeUnmount
    onUnmount() {
        if (this._clockTimer) clearInterval(this._clockTimer);
        this._clockTimer = undefined;
    }

    @Are.Signal(OSRoute)
    onRoute(
        @A_Inject(OSRoute) signal: OSRoute,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        this._route = signal.path;
        const el = document.getElementById('mb-active');
        if (el) {
            const { icon, name } = this.activeTitle(registry);
            el.textContent = `${icon ? icon + ' ' : ''}${name}`;
        }
    }

    @Are.Signal(SelectionState)
    onSelection(@A_Inject(SelectionState) signal: SelectionState) {
        this._selectionLength = signal.length;
        const chip = document.getElementById('mb-chip');
        if (!chip) return;
        if (this._selectionLength > 0) {
            chip.hidden = false;
            chip.textContent = `\u2702 ${this._selectionLength} selected`;
        } else {
            chip.hidden = true;
        }
    }

    protected now(): string {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    protected activeTitle(registry: AppRegistry): { icon: string; name: string } {
        const match = this._route.match(/^\/app\/([^/]+)/);
        if (match) {
            const app = registry.get(match[1]);
            if (app) return { icon: app.icon, name: app.name };
        }
        if (this._route === '/launchpad') {
            return { icon: '🚀', name: 'Launchpad' };
        }
        return { icon: '', name: 'Finder' };
    }

    protected build(registry: AppRegistry): string {
        const { icon, name } = this.activeTitle(registry);
        const hasSel = this._selectionLength > 0;

        return `
            <div class="menubar">
                <div class="mb-left">
                    <span class="mb-logo"></span>
                    <span class="mb-active" id="mb-active">${icon ? icon + ' ' : ''}${name}</span>
                    <span class="mb-menu">File</span>
                    <span class="mb-menu">Edit</span>
                    <span class="mb-menu">View</span>
                    <span class="mb-menu">Window</span>
                </div>
                <div class="mb-right">
                    <span class="mb-chip" id="mb-chip"${hasSel ? '' : ' hidden'}>✂ ${this._selectionLength} selected</span>
                    <span class="mb-icon">􀙇</span>
                    <span class="mb-clock" id="mb-clock">${this.now()}</span>
                </div>
            </div>
        `;
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .menubar {
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 14px;
                background: rgba(20, 16, 32, 0.55);
                backdrop-filter: blur(18px) saturate(160%);
                -webkit-backdrop-filter: blur(18px) saturate(160%);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                font-size: 13px;
                z-index: 100;
            }
            .mb-left, .mb-right { display: flex; align-items: center; gap: 16px; }
            .mb-logo {
                width: 14px; height: 14px;
                background: #f5f5f7;
                -webkit-mask: radial-gradient(circle at 70% 22%, transparent 22%, #000 23%) 0 0/100% 100%;
                mask: radial-gradient(circle at 70% 22%, transparent 22%, #000 23%) 0 0/100% 100%;
                clip-path: path('M7 0C3 0 0 3.4 0 7.6c0 3.4 2.2 6.4 5.2 6.4 1 0 1.8-.6 2.8-.6s1.6.6 2.6.6c3 0 5.4-3 5.4-6.4C16 3.4 12.8 0 9 0 8 0 7.6.4 7 .4 6.6.4 8 0 7 0z');
                opacity: 0.9;
            }
            .mb-active { font-weight: 700; }
            .mb-menu { color: rgba(245,245,247,0.82); font-weight: 500; }
            .mb-menu:first-of-type { margin-left: 2px; }
            .mb-icon { opacity: 0.85; }
            .mb-clock { font-variant-numeric: tabular-nums; font-weight: 500; }
            .mb-chip {
                font-size: 11px;
                font-weight: 600;
                padding: 2px 9px;
                border-radius: 999px;
                color: #ffe5a3;
                background: rgba(255, 196, 84, 0.18);
            }
        `);
    }
}
