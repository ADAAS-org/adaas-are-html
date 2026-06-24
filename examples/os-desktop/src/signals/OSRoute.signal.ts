import { A_Signal } from "@adaas/a-utils/a-signal";
import { AreSignal } from "@adaas/are";
import { A_Frame } from "@adaas/a-frame/core";


/**
 * OSRoute — the routing signal for the OS desktop.
 *
 * The OS uses URL-style routes to decide what the screen shows:
 *   - `/` or `/desktop`  → empty desktop (wallpaper + dock, no window)
 *   - `/launchpad`       → the App Store overlay (install apps)
 *   - `/app/<id>`        → the focused application window for app `<id>`
 *
 * Dispatched by the Dock, the Launchpad and the window chrome. Multiple
 * components react to it independently (the AppStage swaps the visible surface,
 * the MenuBar updates the active-app title, the Dock highlights the running
 * app) — which is the whole point of signal-based routing: one signal, many
 * independent reactions, no shared controller.
 */
@A_Frame.Define({
    namespace: 'a-are-os-desktop',
    description: 'OS routing signal carrying the active route (/desktop, /launchpad, /app/<id>). Drives which surface the desktop shows and is consumed independently by the AppStage, MenuBar and Dock.'
})
export class OSRoute extends AreSignal<{ path: string }> {

    constructor(path: string) {
        super({ data: { path } });
    }

    get path(): string {
        return this.data.path;
    }

    compare(other: A_Signal<{ path: string }>): boolean {
        return this.data.path === other.data.path;
    }
}
