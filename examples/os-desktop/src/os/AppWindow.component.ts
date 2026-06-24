import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { Are, AreEvent, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AppRegistry } from "../runtime/AppRegistry.fragment";
import { OSRoute } from "../signals/OSRoute.signal";


/**
 * AppWindow — the macOS-style window chrome that hosts a running app.
 *
 * It reads the current `/app/<id>` route, looks the app up in the
 * {@link AppRegistry}, draws the title bar (traffic-light controls + app name)
 * and mounts the app's ROOT tag in its body. That root tag is (usually) not a
 * registered component yet — the engine resolves it through the
 * AppComponentResolver, which imports the app's bundle. The window neither
 * knows nor cares where the app's code comes from.
 *
 * The red traffic-light closes the window by routing back to `/desktop`.
 */
export class AppWindow extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        const id = (document.location.pathname.match(/^\/app\/([^/]+)/) || [])[1];
        const app = id ? registry.get(id) : undefined;

        if (!app) {
            node.setContent(`<div class="win win-missing">Application not found.</div>`);
            return;
        }

        node.setContent(`
            <div class="win" style="--accent:${app.accent}">
                <header class="win-bar">
                    <div class="traffic">
                        <button class="tl tl-red" @click="$close()" title="Close"></button>
                        <span class="tl tl-amber"></span>
                        <span class="tl tl-green"></span>
                    </div>
                    <div class="win-title">${app.icon} ${app.name}</div>
                    <div class="win-spacer"></div>
                </header>
                <div class="win-body">
                    <${app.rootTag}></${app.rootTag}>
                </div>
            </div>
        `);
    }

    @Are.EventHandler
    close(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
    ) {
        (event.get('native') as MouseEvent)?.preventDefault();
        history.pushState({}, '', '/desktop');
        bus.next(new OSRoute('/desktop'));
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .win {
                width: min(960px, 86vw);
                height: min(620px, 80vh);
                display: flex;
                flex-direction: column;
                border-radius: 14px;
                overflow: hidden;
                background: #16131f;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4);
                animation: win-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            @keyframes win-in {
                from { opacity: 0; transform: translateY(14px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .win-bar {
                display: flex;
                align-items: center;
                height: 40px;
                padding: 0 14px;
                background: linear-gradient(180deg, color-mix(in srgb, var(--accent, #6d5fd0) 26%, #221b33), #1a1526);
                border-bottom: 1px solid rgba(255,255,255,0.06);
            }
            .traffic { display: flex; gap: 8px; width: 80px; }
            .tl { width: 12px; height: 12px; border-radius: 50%; border: none; padding: 0; cursor: default; }
            .tl-red { background: #ff5f57; cursor: pointer; }
            .tl-amber { background: #febc2e; }
            .tl-green { background: #28c840; }
            .win-title { flex: 1; text-align: center; font-size: 13px; font-weight: 600; color: rgba(245,245,247,0.9); }
            .win-spacer { width: 80px; }
            .win-body { flex: 1; overflow: auto; background: #14111d; }
            .win-missing { padding: 40px; color: #a1a1aa; }
        `);
    }
}
