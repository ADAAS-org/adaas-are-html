import { A_Concept, A_Inject } from "@adaas/a-concept";
import { A_Config } from "@adaas/a-utils/a-config";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Service } from "@adaas/a-utils/a-service";
import { build } from "esbuild";
import fs from "fs";
import http from "http";
import path from "path";


/**
 * Single source of truth for "which components exist".
 *
 * - `entry === null`  → the component is part of the eager app bundle
 *   (registered at bootstrap). The home page is eager so something paints
 *   immediately.
 * - `entry !== null`  → the component is a *lazy* component. It is built into
 *   its own JS file and is NOT registered at bootstrap. The browser fetches it
 *   on demand the first time its route is visited.
 *
 * This array drives BOTH the esbuild entry points AND the `/api/components`
 * manifest the browser app consumes — so adding a backend component is a
 * one-line change here.
 */
type ComponentDescriptor = {
    /** Route that activates this component. */
    route: string;
    /** Custom-element tag (kebab-case of the class name). */
    tag: string;
    /** Class name (PascalCase). */
    name: string;
    /** Source entry for lazy components, or null when bundled eagerly. */
    entry: string | null;
    /** Public URL the browser dynamically imports (lazy components only). */
    url: string | null;
};

const COMPONENTS: ComponentDescriptor[] = [
    { route: '/', tag: 'home-page', name: 'HomePage', entry: null, url: null },
    { route: '/about', tag: 'about-page', name: 'AboutPage', entry: 'src/lazy/AboutPage.component.ts', url: '/lazy/about-page.js' },
    { route: '/settings', tag: 'settings-page', name: 'SettingsPage', entry: 'src/lazy/SettingsPage.component.ts', url: '/lazy/settings-page.js' },
    { route: '/reports', tag: 'reports-page', name: 'ReportsPage', entry: 'src/lazy/ReportsPage.component.ts', url: '/lazy/reports-page.js' },
];


export class UIContainer extends A_Service {

    protected server!: http.Server;

    @A_Concept.Build()
    async build(
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.log('Building Lazy Loading example...');

        const distDir = path.resolve(__dirname, "../dist");
        const appEntry = path.resolve(__dirname, "../src/concept.ts");

        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }

        // Build the eager app + every lazy component in ONE esbuild pass with
        // code-splitting enabled. This is the key to runtime lazy loading:
        // esbuild hoists the shared framework code (@adaas/are, @adaas/a-concept,
        // ...) into shared chunks that BOTH the app and each lazy bundle import
        // by URL. When the browser later `import()`s a lazy bundle, it reuses the
        // already-evaluated shared chunk module — so the lazy component's
        // `class X extends Are` references the SAME `Are` (and the SAME DI
        // context) the host app is running. Without shared singletons, the
        // dynamically-loaded class would fail `instanceof` / DI lookups.
        const entryPoints: Record<string, string> = {
            app: appEntry,
        };
        for (const comp of COMPONENTS) {
            if (comp.entry && comp.url) {
                // 'lazy/about-page' → dist/lazy/about-page.js
                const key = comp.url.replace(/^\//, '').replace(/\.js$/, '');
                entryPoints[key] = path.resolve(__dirname, "..", comp.entry);
            }
        }

        await build({
            entryPoints,
            outdir: distDir,
            bundle: true,
            splitting: true,
            format: "esm",
            target: "es2020",
            keepNames: true,
            minify: false,
            sourcemap: false,
            entryNames: '[dir]/[name]',
            chunkNames: 'chunks/[name]-[hash]',
        });

        logger.log('green', 'App + lazy component bundles built (code-split).');

        // index.html → dist (no BUNDLE_ID needed; the app entry has a stable name)
        const indexHtml = await fs.promises.readFile(
            path.resolve(__dirname, "../public/index.html"), 'utf-8'
        );
        await fs.promises.writeFile(path.join(distDir, "index.html"), indexHtml);

        // Copy any remaining static assets (excluding index.html, handled above)
        const publicDir = path.resolve(__dirname, "../public");
        const entries = await fs.promises.readdir(publicDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isFile() && entry.name !== 'index.html') {
                await fs.promises.copyFile(
                    path.join(publicDir, entry.name),
                    path.join(distDir, entry.name),
                );
            }
        }

        logger.log('green', 'Static assets copied.');
    }

    @A_Concept.Load()
    async preLoadBuild(
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        await this.build(logger);
    }

    @A_Concept.Start()
    async startStaticServer(
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(A_Config) config: A_Config
    ) {
        this.server = http.createServer(this.handleRequest.bind(this));
        const PORT = config.get('PORT') || 8083;
        this.server.listen(PORT, () => {
            logger.log('green', `Lazy Loading example running at http://localhost:${PORT}`);
            logger.log('blue', `Component manifest at http://localhost:${PORT}/api/components`);
        });
    }

    /**
     * Routes requests:
     *   - GET /api/components → JSON manifest the browser app discovers at runtime
     *   - everything else     → static files (with SPA fallback to index.html)
     */
    protected handleRequest(
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ) {
        const url = req.url || '/';

        if (url === '/api/components') {
            const manifest = COMPONENTS.map(({ route, tag, name, url }) => ({
                route, tag, name, url,
                lazy: url !== null,
            }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(manifest));
            return;
        }

        this.serveStaticFile(url, res);
    }

    protected serveStaticFile(
        url: string,
        res: http.ServerResponse,
    ) {
        const distDir = path.resolve(__dirname, "../dist");
        let filePath = path.join(distDir, url === '/' ? 'index.html' : url);

        const logger = this.scope.resolve<A_Logger>(A_Logger)!;

        const mimeTypes: Record<string, string> = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.svg': 'image/svg+xml',
        };
        const ext = path.extname(filePath).toLowerCase();

        if (!fs.existsSync(filePath)) {
            // SPA fallback — serve index.html for unknown *non-asset* paths so
            // deep links (e.g. /about) still boot the app. Asset misses (.js)
            // should 404 honestly so loading bugs are visible.
            if (ext && ext !== '.html') {
                logger.log('red', `404: ${filePath}`);
                res.writeHead(404);
                res.end(`Not Found: ${url}`);
                return;
            }
            filePath = path.join(distDir, 'index.html');
        }

        // Resolve the content type from the FILE WE WILL ACTUALLY SERVE, not the
        // requested URL. A deep link like /about is extensionless → without this
        // the fallback index.html would be sent as application/octet-stream and
        // the browser would download it instead of rendering the SPA.
        const servedExt = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[servedExt] || 'application/octet-stream';

        logger.log('blue', `Serving: ${filePath}`);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
}
