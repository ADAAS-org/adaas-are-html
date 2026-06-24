import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { Are, AreEvent, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AppRegistry } from "../runtime/AppRegistry.fragment";
import { OSRoute } from "../signals/OSRoute.signal";


/**
 * Dock — the bottom app launcher.
 *
 * Shows the currently installed apps plus a Launchpad (＋) button. Clicking an
 * app dispatches an {@link OSRoute} to focus it; the Dock itself also listens
 * for OSRoute so a freshly installed app reveals its icon and the running app's
 * running-dot lights up.
 *
 * Every available app gets a (hidden) button wired up front, so the engine
 * binds its `@click` handler once at mount. Reacting to a route signal is then
 * a cheap imperative DOM toggle — no subtree teardown, no re-binding.
 */
export class OsDock extends Are {

    protected _route: string = document.location.pathname || '/';

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        node.setContent(this.build(registry));
    }

    @Are.Signal(OSRoute)
    onRoute(
        @A_Inject(OSRoute) signal: OSRoute,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        this._route = signal.path;
        const activeId = this._route.match(/^\/app\/([^/]+)/)?.[1];

        let anyVisible = false;
        for (const app of registry.available()) {
            const btn = document.getElementById(`dock-app-${app.id}`);
            if (!btn) continue;
            if (registry.isInstalled(app.id)) {
                btn.hidden = false;
                anyVisible = true;
            }
            btn.classList.toggle('running', app.id === activeId);
        }

        const sep = document.getElementById('dock-sep');
        if (sep) sep.hidden = !anyVisible;

        const lp = document.getElementById('dock-launchpad');
        if (lp) lp.classList.toggle('running', this._route === '/launchpad');
    }

    @Are.EventHandler
    open(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
    ) {
        (event.get('native') as MouseEvent)?.preventDefault();
        const id = event.get('args')?.[0] as string;
        if (!id) return;
        const path = `/app/${id}`;
        history.pushState({}, '', path);
        bus.next(new OSRoute(path));
    }

    @Are.EventHandler
    launchpad(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
    ) {
        (event.get('native') as MouseEvent)?.preventDefault();
        history.pushState({}, '', '/launchpad');
        bus.next(new OSRoute('/launchpad'));
    }

    protected build(registry: AppRegistry): string {
        const activeId = this._route.match(/^\/app\/([^/]+)/)?.[1];

        const apps = registry.available().map(app => {
            const installed = registry.isInstalled(app.id);
            const running = app.id === activeId ? 'running' : '';
            return `
                <button id="dock-app-${app.id}" class="dock-item ${running}" @click="$open('${app.id}')" title="${app.name}"${installed ? '' : ' hidden'}>
                    <span class="dock-glyph" style="--accent:${app.accent}">${app.icon}</span>
                    <span class="dock-dot"></span>
                </button>
            `;
        }).join('');

        const anyInstalled = registry.installed().length > 0;
        const launchpadActive = this._route === '/launchpad' ? 'running' : '';

        return `
            <div class="dock">
                ${apps}
                <span class="dock-sep" id="dock-sep"${anyInstalled ? '' : ' hidden'}></span>
                <button id="dock-launchpad" class="dock-item ${launchpadActive}" @click="$launchpad()" title="Launchpad — install apps">
                    <span class="dock-glyph dock-plus">＋</span>
                    <span class="dock-dot"></span>
                </button>
            </div>
        `;
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .dock {
                position: absolute;
                left: 50%;
                bottom: 14px;
                transform: translateX(-50%);
                display: flex;
                align-items: flex-end;
                gap: 10px;
                padding: 8px 12px;
                border-radius: 22px;
                background: rgba(30, 24, 48, 0.45);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid rgba(255,255,255,0.12);
                box-shadow: 0 18px 50px rgba(0,0,0,0.45);
                z-index: 95;
            }
            .dock-item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                border: none;
                background: none;
                cursor: pointer;
                padding: 0;
            }
            /* The HTML 'hidden' attribute must win over 'display: flex' so an
               uninstalled app icon (and the separator) stays out of the dock. */
            .dock-item[hidden], #dock-sep[hidden] { display: none !important; }
            .dock-glyph {
                width: 52px; height: 52px;
                display: flex; align-items: center; justify-content: center;
                font-size: 28px;
                border-radius: 14px;
                background: linear-gradient(160deg, color-mix(in srgb, var(--accent, #7c6fd6) 85%, white 0%), color-mix(in srgb, var(--accent, #7c6fd6) 70%, black 18%));
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 14px rgba(0,0,0,0.35);
                transition: transform 0.18s ease;
            }
            .dock-plus {
                background: rgba(255,255,255,0.12);
                color: #f5f5f7;
                font-size: 26px;
                font-weight: 300;
            }
            .dock-item:hover .dock-glyph { transform: translateY(-10px) scale(1.12); }
            .dock-dot {
                width: 4px; height: 4px; border-radius: 50%;
                background: transparent;
            }
            .dock-item.running .dock-dot { background: rgba(245,245,247,0.85); }
            .dock-sep {
                width: 1px;
                align-self: stretch;
                margin: 6px 2px;
                background: rgba(255,255,255,0.16);
            }
        `);
    }
}
