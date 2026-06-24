import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { OSRoute } from "../signals/OSRoute.signal";
import { MouseState } from "../signals/MouseState.signal";
import { SelectionState } from "../signals/SelectionState.signal";


/**
 * Desktop — the OS shell root.
 *
 * It only lays out the persistent surfaces; every dynamic behaviour lives in a
 * child that reacts to signals on its own:
 *   - `<menu-bar>`   — top bar, reacts to OSRoute + SelectionState.
 *   - `<app-stage>`  — the routed surface (window / launchpad / empty desktop).
 *   - `<os-hud>`     — corner read-out, reacts to MouseState + SelectionState.
 *   - `<os-dock>`    — bottom dock, reacts to OSRoute.
 *
 * There is no central controller wiring these together — the signal bus is the
 * only coupling, which is exactly what "signal-based routing" buys you.
 *
 * Tag: `<os-desktop>` (class name must be `toPascalCase('os-desktop')`).
 */
export class OsDesktop extends Are {

    protected _lastMouse: number = 0;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="os">
                <menu-bar></menu-bar>
                <div class="os-stage">
                    <app-stage></app-stage>
                </div>
                <os-hud></os-hud>
                <os-dock></os-dock>
            </div>
        `);
    }

    /**
     * Wire the three global signals into the bus once the shell is mounted.
     * This is the single producer for the OS-wide signals:
     *   - pointer movement   → {@link MouseState} (throttled),
     *   - text selection     → {@link SelectionState},
     *   - browser navigation → {@link OSRoute} (back/forward).
     *
     * The listeners are attached on the next animation frame — i.e. AFTER the
     * engine's atomic initial mount has fully settled. The browser fires a
     * spurious `selectionchange` while the document is being built; dispatching
     * a signal into the engine mid-mount would race the first paint, so we wait
     * for the frame boundary before any signal can flow.
     *
     * There is no initial OSRoute dispatch: every route-aware surface
     * (MenuBar / Dock / AppStage) already reads `location.pathname` in its
     * template, so the first paint is correct without a signal.
     */
    @Are.onAfterMount
    onMount(@A_Inject(A_SignalBus) bus: A_SignalBus) {
        requestAnimationFrame(() => {
            window.addEventListener('mousemove', (event: MouseEvent) => {
                const now = Date.now();
                if (now - this._lastMouse < 100) return;   // ~10Hz throttle
                this._lastMouse = now;
                bus.next(new MouseState(event.clientX, event.clientY));
            });

            document.addEventListener('selectionchange', () => {
                const text = (window.getSelection()?.toString() || '');
                bus.next(new SelectionState(text));
            });

            window.addEventListener('popstate', () => {
                bus.next(new OSRoute(window.location.pathname || '/'));
            });
        });
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .os {
                position: relative;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #f5f5f7;
                background:
                    radial-gradient(120% 120% at 20% 0%, #5b3fb0 0%, transparent 55%),
                    radial-gradient(120% 120% at 100% 30%, #b03f8a 0%, transparent 50%),
                    linear-gradient(160deg, #1d1033 0%, #0c0a1a 60%, #050410 100%);
                user-select: none;
            }
            .os-stage {
                position: absolute;
                inset: 28px 0 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `);
    }
}
