import { A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreEvent, AreNode } from "@adaas/are";
import { A_Caller } from "@adaas/a-concept";
import { AreHTMLNode } from "src";
import { AppRegistry } from "../runtime/AppRegistry.fragment";
import { AppComponentResolver } from "../runtime/AppComponentResolver.fragment";
import { OSRoute } from "../signals/OSRoute.signal";


/**
 * Launchpad — the OS "App Store" overlay.
 *
 * Lists every app the backend offers. For an app the user has not installed it
 * shows **Install**; installing it:
 *   1. records the app in the {@link AppRegistry} (it now shows up in the dock),
 *   2. warms its bundle via {@link AppComponentResolver.preload} — i.e. "adding
 *      the app loads all its components" (one network fetch for the whole app),
 *   3. routes to `/app/<id>`, opening the freshly installed app.
 *
 * Already-installed apps show **Open** and simply route to them. The engine
 * registers each component lazily on first render (instant, since preload
 * already fetched the bundle).
 */
export class OsLaunchpad extends Are {

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AppRegistry) registry: AppRegistry,
    ) {
        node.setContent(this.build(registry));
    }

    @Are.EventHandler
    async install(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
        @A_Inject(AppRegistry) registry: AppRegistry,
        @A_Inject(AppComponentResolver) resolver: AppComponentResolver,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        (event.get('native') as MouseEvent)?.preventDefault();
        const id = event.get('args')?.[0] as string;
        const app = id ? registry.get(id) : undefined;
        if (!app) return;

        registry.install(app.id);

        // Fetch the app's entire bundle now — "installing loads all its
        // components". The window will then mount instantly from memory.
        try {
            await resolver.preload(app);
            logger.log('green', `Installed "${app.name}" (${app.components.length} components loaded).`);
        } catch (error) {
            logger.error(error);
        }

        const path = `/app/${app.id}`;
        history.pushState({}, '', path);
        bus.next(new OSRoute(path));
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
    close(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
    ) {
        (event.get('native') as MouseEvent)?.preventDefault();
        history.pushState({}, '', '/desktop');
        bus.next(new OSRoute('/desktop'));
    }

    protected build(registry: AppRegistry): string {
        const tiles = registry.available().map(app => {
            const installed = registry.isInstalled(app.id);
            const action = installed
                ? `<button class="lp-btn lp-open" @click="$open('${app.id}')">Open</button>`
                : `<button class="lp-btn lp-install" @click="$install('${app.id}')">Install</button>`;

            const chips = app.components
                .map(c => `<code>&lt;${c.tag}&gt;</code>`)
                .join('');

            return `
                <article class="lp-tile" style="--accent:${app.accent}">
                    <div class="lp-icon">${app.icon}</div>
                    <h3 class="lp-name">${app.name}</h3>
                    <p class="lp-tagline">${app.tagline}</p>
                    <div class="lp-meta">
                        <span class="lp-bundle">${app.bundle}</span>
                        <div class="lp-components">${chips}</div>
                    </div>
                    ${action}
                </article>
            `;
        }).join('');

        return `
            <div class="lp-backdrop" @click.self="$close()">
                <div class="lp">
                    <header class="lp-head">
                        <h1>Launchpad</h1>
                        <p>Each app is an independent bundle with its own backend and its own set of components. Install one to add it to your dock and load its code.</p>
                    </header>
                    <div class="lp-grid">${tiles}</div>
                </div>
            </div>
        `;
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .lp-backdrop {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(8, 6, 18, 0.55);
                backdrop-filter: blur(26px) saturate(160%);
                -webkit-backdrop-filter: blur(26px) saturate(160%);
                animation: lp-fade 0.2s ease;
            }
            @keyframes lp-fade { from { opacity: 0; } to { opacity: 1; } }
            .lp { width: min(900px, 88vw); max-height: 80vh; overflow: auto; }
            .lp-head { text-align: center; margin-bottom: 30px; }
            .lp-head h1 { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
            .lp-head p { margin-top: 10px; color: rgba(245,245,247,0.7); font-size: 14px; max-width: 560px; margin-left: auto; margin-right: auto; line-height: 1.6; }
            .lp-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 18px;
            }
            .lp-tile {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                padding: 22px;
                border-radius: 18px;
                background: rgba(30, 24, 48, 0.5);
                border: 1px solid rgba(255,255,255,0.1);
            }
            .lp-icon {
                width: 56px; height: 56px;
                display: flex; align-items: center; justify-content: center;
                font-size: 30px;
                border-radius: 15px;
                background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 85%, white 0%), color-mix(in srgb, var(--accent) 65%, black 20%));
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
                margin-bottom: 4px;
            }
            .lp-name { font-size: 17px; font-weight: 700; }
            .lp-tagline { font-size: 13px; color: rgba(245,245,247,0.7); line-height: 1.5; }
            .lp-meta { width: 100%; margin: 8px 0 6px; }
            .lp-bundle { font-size: 11px; font-family: ui-monospace, monospace; color: #8b7fb0; }
            .lp-components { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
            .lp-components code { font-size: 10px; padding: 2px 6px; border-radius: 6px; background: rgba(255,255,255,0.08); color: #c9b8ff; }
            .lp-btn {
                margin-top: auto;
                align-self: stretch;
                padding: 9px 14px;
                border: none;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: filter 0.15s;
            }
            .lp-btn:hover { filter: brightness(1.12); }
            .lp-install { background: var(--accent); color: white; }
            .lp-open { background: rgba(255,255,255,0.14); color: #f5f5f7; }
        `);
    }
}
