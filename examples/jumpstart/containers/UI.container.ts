import { A_Concept, A_Error, A_Feature, A_IdentityHelper, A_Inject } from "@adaas/a-concept"
import { A_Config } from "@adaas/a-utils/a-config";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Service, A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { AreContext } from "@adaas/are";
import { AreHTMLEngine } from "src/engine/AreHTML.engine";
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
        logger.log('Building UI Container...', process.cwd());
        const entryFile = path.resolve(__dirname, "../src/concept.ts");
        const BundleID = A_IdentityHelper.generateTimeId();
        const outFile = path.resolve(__dirname, `../dist/${BundleID}.js`);


        //  first to drop folder if exists
        if (fs.existsSync(path.resolve(__dirname, "../dist"))) {
            fs.rmSync(path.resolve(__dirname, "../dist"), { recursive: true, force: true });
        }


        //  STEP1 generate Bundle
        await build({
            entryPoints: [entryFile],
            outfile: outFile,
            bundle: true,            // ✅ includes all imports & node_modules
            // minify: config.get('A_CONCEPT_ENVIRONMENT') !== 'production' ? false : true,
            minify: false,
            keepNames: true, // <— preserve the original function/class names
            // sourcemap: config.get('A_CONCEPT_ENVIRONMENT') !== 'production' ? 'inline' : false,
            sourcemap: false,
            // platform: "browser",
            // conditions: ["browser", "import", "default"],
            // mainFields: ["browser", "module", "main"],    // ✅ builds for browser
            target: "es2020",
            format: "esm",           // ✅ ESM output for <script type="module">,
            // external: ["http", "https", "fs", "path", "net", 'crypto', 'url', 'buffer'], // ignore Node modules
            plugins: [
                {
                    name: 'circular-dependency-detector',
                    setup(build) {
                        const graph = new Map<string, Set<string>>();
                        const resolved = new Map<string, string>();

                        build.onResolve({ filter: /.*/ }, args => {
                            if (args.importer) {
                                if (!graph.has(args.importer)) {
                                    graph.set(args.importer, new Set());
                                }
                                graph.get(args.importer)!.add(args.path);
                            }
                            return null;
                        });

                        build.onEnd(() => {
                            const visited = new Set<string>();
                            const stack = new Set<string>();
                            const cycles: string[][] = [];

                            function dfs(node: string, path: string[]): void {
                                if (stack.has(node)) {
                                    const cycleStart = path.indexOf(node);
                                    cycles.push(path.slice(cycleStart));
                                    return;
                                }
                                if (visited.has(node)) return;

                                visited.add(node);
                                stack.add(node);

                                for (const dep of graph.get(node) ?? []) {
                                    dfs(dep, [...path, dep]);
                                }

                                stack.delete(node);
                            }

                            for (const node of graph.keys()) {
                                dfs(node, [node]);
                            }

                            if (cycles.length > 0) {
                                console.warn('\n⚠️  Circular dependencies detected:\n');
                                cycles.forEach((cycle, i) => {
                                    console.warn(`  ${i + 1}) ${cycle.join(' → ')}`);
                                });
                                console.warn('');
                            } else {
                                console.info('✓ No circular dependencies found');
                            }
                        });
                    }
                }
            ]
        });

        logger.log('green', 'UI Container built successfully.');



        //  STEP 2 replace bundle id in index.html with {{BUNDLE_ID}}
        let indexHtml = await fs.promises.readFile(path.resolve(__dirname, "../public/index.html"), 'utf-8');
        indexHtml = indexHtml.replace('{{BUNDLE_ID}}', BundleID);
        await fs.promises.writeFile(path.resolve(__dirname, `../dist/${BundleID}.js`), await fs.promises.readFile(outFile));
        await fs.promises.writeFile(path.resolve(__dirname, "../dist/index.html"), indexHtml);

        logger.log('green', 'UI Container index.html updated successfully with bundle id.');


        //  Step3 copy static assets and dicrectories recursively
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
                } else {
                    if (entry.name !== 'index.html') { // skip index.html as it's already handled
                        await fs.promises.copyFile(srcPath, destPath);
                    }
                }
            }
        };

        await copyRecursive(publicDir, distDir);

        logger.log('green', 'UI Container static assets copied successfully.');
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
        // Create the HTTP server
        this.server = http.createServer(this.serverStaticFiles.bind(this));

        const PORT = config.get('PORT') || 8080;

        // Start listening on the specified port
        this.server.listen(PORT, () => {
            logger.log('green', `UI Container Static Server is running at http://localhost:${PORT}`);
        });
    }


    protected async serverStaticFiles(
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ) {
        const url = req.url || '/';
        let filePath = path.join(__dirname, '../dist', url === '/' ? 'index.html' : url);

        const logger = this.scope.resolve<A_Logger>(A_Logger)!;
        logger.log('blue', `Serving file: ${filePath}`);


        // Determine the content type based on the file extension
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes: { [key: string]: string } = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        if (!fs.existsSync(filePath)) {
            logger.log('yellow', `File not found: ${filePath}, serving index.html instead.`);

            filePath = path.join(__dirname, '../dist', 'index.html');
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`, 'utf-8');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

} 