import { A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";


/** A single component contributed by an app's bundle. */
export type AppComponentRef = {
    /** Custom-element tag (kebab-case of the class name). */
    tag: string;
    /** Named export inside the app bundle that provides this component's class. */
    export: string;
};

/**
 * The public descriptor of an installable application, served by the OS kernel
 * at `GET /api/apps`. It is the single contract between the OS shell and an
 * app: the OS never imports an app's source — it only knows its metadata, the
 * URL of its single code-split bundle, and which tags that bundle provides.
 */
export type AppDescriptor = {
    /** Stable id, also the URL segment: `/app/<id>`. */
    id: string;
    /** Human-facing name shown in the dock and window title. */
    name: string;
    /** Emoji used as the app icon. */
    icon: string;
    /** Accent colour for the app's window chrome / dock highlight. */
    accent: string;
    /** Short marketing line shown in the Launchpad. */
    tagline: string;
    /** Root component tag the OS mounts inside the window (e.g. `marketing-app`). */
    rootTag: string;
    /** Public URL of the app's single (code-split) bundle. */
    bundle: string;
    /** Base path of the app's OWN backend API (e.g. `/apps/marketing/api`). */
    api: string;
    /** Every component the bundle exports, so any of its tags can be resolved. */
    components: AppComponentRef[];
};


/**
 * AppRegistry — the OS's view of the application catalogue.
 *
 * It holds the list of *available* apps (discovered from the backend) and the
 * set the user has *installed*. Installing an app is a frontend-only state
 * change here (the bundle is fetched lazily on demand by the resolver); a real
 * OS would persist this and gate it behind auth/licensing.
 *
 * The registry is a plain data fragment shared across the OS shell components
 * (Dock, Launchpad, MenuBar, AppStage) and the {@link AppComponentResolver}.
 */
@A_Frame.Define({
    namespace: 'a-are-os-desktop',
    description: 'Holds the catalogue of available applications (from GET /api/apps) and the set the user has installed. Shared by the OS shell components and the AppComponentResolver to map component tags to their owning app bundle.'
})
export class AppRegistry extends A_Fragment {

    protected _available: AppDescriptor[] = [];
    protected _installed: Set<string> = new Set();

    constructor(data: { available: AppDescriptor[]; installed?: string[] }) {
        super({ name: 'AppRegistry' });
        this._available = data.available ?? [];
        for (const id of data.installed ?? []) {
            this._installed.add(id);
        }
    }

    /** Every app the backend offers. */
    available(): AppDescriptor[] {
        return this._available;
    }

    /** Apps the user has installed, in catalogue order. */
    installed(): AppDescriptor[] {
        return this._available.filter(app => this._installed.has(app.id));
    }

    isInstalled(id: string): boolean {
        return this._installed.has(id);
    }

    install(id: string): void {
        if (this._available.some(app => app.id === id)) {
            this._installed.add(id);
        }
    }

    uninstall(id: string): void {
        this._installed.delete(id);
    }

    /** Look up an app by its id. */
    get(id: string): AppDescriptor | undefined {
        return this._available.find(app => app.id === id);
    }

    /** Find the installed app that owns a given component tag (root or child). */
    appByComponentTag(tag: string): AppDescriptor | undefined {
        return this.installed().find(app =>
            app.rootTag === tag || app.components.some(c => c.tag === tag)
        );
    }
}
