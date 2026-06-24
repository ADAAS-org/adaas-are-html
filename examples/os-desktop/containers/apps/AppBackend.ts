import http from "http";
import type { AppDescriptor } from "../../src/runtime/AppRegistry.fragment";


/**
 * AppBackend — the server-side half of an installable application.
 *
 * Each app owns BOTH a frontend bundle and a backend. The OS kernel
 * (OS.container.ts) never looks inside an app: it only asks each backend for
 * its {@link descriptor} (advertised at `GET /api/apps`), builds the bundle
 * named by {@link entry}, and forwards any request under the app's API base to
 * {@link handle}. This keeps every app fully self-contained.
 */
export interface AppBackend {
    /** Public metadata + bundle URL + component manifest for this app. */
    readonly descriptor: AppDescriptor;
    /** esbuild source entry for this app's single code-split bundle. */
    readonly entry: string;
    /**
     * Handle a request addressed to this app's API base (`descriptor.api/*`).
     * Return `true` if the request was served, `false` to let the kernel 404.
     */
    handle(
        pathname: string,
        query: URLSearchParams,
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ): boolean;
}
