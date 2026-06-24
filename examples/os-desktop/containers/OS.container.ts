import { A_Concept, A_Inject } from "@adaas/a-concept";
import { A_Config } from "@adaas/a-utils/a-config";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Service } from "@adaas/a-utils/a-service";
import { build } from "esbuild";
import fs from "fs";
import http from "http";
import path from "path";
import { AppBackend } from "./apps/AppBackend";
import { MarketingAppBackend } from "./apps/MarketingApp.backend";
import { GanttAppBackend } from "./apps/GanttApp.backend";


/**
 * OS.container — the "kernel" of the OS-desktop example.
 *
 * It is a backend service that:
 *   1. builds the OS shell bundle AND every installed app's bundle in ONE
 *      code-split esbuild pass (so the shell and all apps share the SAME
 *      framework runtime singletons — required for `import()`ed app classes to
 *      `extend` the same `Are`/DI context the shell runs),
 *   2. serves the static SPA (with deep-link fallback to index.html),
 *   3. advertises the installable apps at `GET /api/apps`, and
 *   4. delegates `/apps/<id>/api/*` to that app's OWN backend.
 *
 * Apps are registered ONLY by adding their backend to {@link backends} — its
 * descriptor drives the build entry, the `/api/apps` catalogue, and the API
 * routing all at once.
 */
export class OSContainer extends A_Service {

    protected server!: http.Server;

    /** Every installable app = one backend (descriptor + bundle entry + API). */
    protected backends: AppBackend[] = [
        new MarketingAppBackend(),
        new GanttAppBackend(),
    ];

    @A_Concept.Build()
    async build(
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.log('Building OS Desktop example...');

        const distDir = path.resolve(__dirname, "../dist");
        const shellEntry = path.resolve(__dirname, "../src/concept.ts");

        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }

        // OS shell + every app bundle, code-split in a single pass. esbuild
        // hoists shared framework code (@adaas/are, @adaas/a-concept, …) into
        // shared chunks that the shell and each app import by URL, so a
        // dynamically-imported app reuses the already-evaluated runtime.
        const entryPoints: Record<string, string> = {
            app: shellEntry,
        };
        for (const backend of this.backends) {
            // bundle URL '/apps/marketing/app.js' → entry key 'apps/marketing/app'
            const key = backend.descriptor.bundle.replace(/^\//, '').replace(/\.js$/, '');
            entryPoints[key] = path.resolve(__dirname, "..", backend.entry);
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

        logger.log('green', `OS shell + ${this.backends.length} app bundles built (code-split).`);

        const indexHtml = await fs.promises.readFile(
            path.resolve(__dirname, "../public/index.html"), 'utf-8'
        );
        await fs.promises.writeFile(path.join(distDir, "index.html"), indexHtml);

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
    async startServer(
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(A_Config) config: A_Config,
    ) {
        this.server = http.createServer(this.handleRequest.bind(this));
        const PORT = config.get('PORT') || 8084;
        this.server.listen(PORT, () => {
            logger.log('green', `OS Desktop example running at http://localhost:${PORT}`);
            logger.log('blue', `App catalogue at http://localhost:${PORT}/api/apps`);
        });
    }

    /**
     * Routes:
     *   - GET /api/apps        → the installable-app catalogue (descriptors)
     *   - /apps/<id>/api/*     → delegated to that app's own backend
     *   - everything else      → static files (SPA fallback to index.html)
     */
    protected handleRequest(
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ) {
        const parsed = new URL(req.url || '/', 'http://localhost');
        const pathname = parsed.pathname;

        if (pathname === '/api/apps') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(this.backends.map(b => b.descriptor)));
            return;
        }

        // Delegate app API calls to the owning app's backend.
        const backend = this.backends.find(b => pathname.startsWith(`${b.descriptor.api}/`));
        if (backend) {
            const handled = backend.handle(pathname, parsed.searchParams, req, res);
            if (!handled) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `No handler for ${pathname}` }));
            }
            return;
        }

        this.serveStaticFile(pathname, res);
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
            // SPA fallback for deep links (e.g. /app/marketing). Asset misses
            // (.js) 404 honestly so loading bugs stay visible.
            if (ext && ext !== '.html') {
                logger.log('red', `404: ${filePath}`);
                res.writeHead(404);
                res.end(`Not Found: ${url}`);
                return;
            }
            filePath = path.join(distDir, 'index.html');
        }

        const servedExt = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[servedExt] || 'application/octet-stream';

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
