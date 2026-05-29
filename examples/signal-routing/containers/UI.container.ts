import { A_Concept, A_Error, A_IdentityHelper, A_Inject } from "@adaas/a-concept";
import { A_Config } from "@adaas/a-utils/a-config";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Service } from "@adaas/a-utils/a-service";
import { build } from "esbuild";
import fs from "fs";
import http from "http";
import path from "path";


export class UIContainer extends A_Service {

    protected server!: any;

    @A_Concept.Build()
    async build(
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(A_Config) config: A_Config
    ): Promise<void> {
        logger.log('Building Signal Routing example...');
        const entryFile = path.resolve(__dirname, "../src/concept.ts");
        const BundleID = A_IdentityHelper.generateTimeId();
        const outFile = path.resolve(__dirname, `../dist/${BundleID}.js`);

        if (fs.existsSync(path.resolve(__dirname, "../dist"))) {
            fs.rmSync(path.resolve(__dirname, "../dist"), { recursive: true, force: true });
        }

        await build({
            entryPoints: [entryFile],
            outfile: outFile,
            bundle: true,
            minify: false,
            keepNames: true,
            sourcemap: false,
            target: "es2020",
            format: "esm",
        });

        logger.log('green', 'Bundle built successfully.');

        // Replace {{BUNDLE_ID}} in index.html
        let indexHtml = await fs.promises.readFile(
            path.resolve(__dirname, "../public/index.html"), 'utf-8'
        );
        indexHtml = indexHtml.replace('{{BUNDLE_ID}}', BundleID);
        await fs.promises.writeFile(path.resolve(__dirname, "../dist/index.html"), indexHtml);

        // Copy static assets recursively
        const publicDir = path.resolve(__dirname, "../public");
        const distDir = path.resolve(__dirname, "../dist");
        const copyRecursive = async (src: string, dest: string) => {
            const entries = await fs.promises.readdir(src, { withFileTypes: true });
            await fs.promises.mkdir(dest, { recursive: true });
            for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                if (entry.isDirectory()) {
                    await copyRecursive(srcPath, destPath);
                } else if (entry.name !== 'index.html') {
                    await fs.promises.copyFile(srcPath, destPath);
                }
            }
        };
        await copyRecursive(publicDir, distDir);

        logger.log('green', 'Static assets copied.');
    }

    @A_Concept.Load()
    async preLoadBuild(
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(A_Config) config: A_Config
    ) {
        await this.build(logger, config);
    }

    @A_Concept.Start()
    async startStaticServer(
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(A_Config) config: A_Config
    ) {
        this.server = http.createServer(this.serveStaticFiles.bind(this));
        const PORT = config.get('PORT') || 8082;
        this.server.listen(PORT, () => {
            logger.log('green', `Signal Routing example running at http://localhost:${PORT}`);
        });
    }

    protected async serveStaticFiles(
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ) {
        const url = req.url || '/';
        let filePath = path.join(__dirname, '../dist', url === '/' ? 'index.html' : url);

        const logger = this.scope.resolve<A_Logger>(A_Logger)!;
        logger.log('blue', `Serving: ${filePath}`);

        const mimeTypes: Record<string, string> = {
            '.html': 'text/html',
            '.js':   'text/javascript',
            '.css':  'text/css',
            '.json': 'application/json',
            '.png':  'image/png',
            '.svg':  'image/svg+xml',
        };
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        if (!fs.existsSync(filePath)) {
            // SPA fallback — serve index.html for all unknown paths
            filePath = path.join(__dirname, '../dist', 'index.html');
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, 'utf-8');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
}
