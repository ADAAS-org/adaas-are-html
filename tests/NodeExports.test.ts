/**
 * The package loads in Node through its public `exports`: the node build keeps the internal aliases
 * (`@adaas/are-html/node`, `/attribute`, `/context`, …) as package imports, so each must be an exported subpath.
 * Before 2026-11-10 only "." was exported and `require('@adaas/are-html')` failed in Node
 * ("Package subpath './attribute' is not defined by exports").
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');

describe('node exports', () => {
    it('every package self-import of the node build is an exported subpath', () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
        const exported = Object.keys(pkg.exports);
        const matches = (sub: string) => exported.some((e) => e === sub || (e.endsWith('/*') && sub.startsWith(e.slice(0, -1))));
        const files: string[] = [];
        const walk = (dir: string) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
            const p = path.join(dir, e.name);
            if (e.isDirectory()) walk(p); else if (/\.(js|mjs)$/.test(e.name)) files.push(p);
        });
        walk(path.join(ROOT, 'dist', 'node'));
        const missing = new Set<string>();
        for (const file of files) {
            for (const [, sub] of fs.readFileSync(file, 'utf8').matchAll(/['"]@adaas\/are-html(\/[^'"]+)['"]/g)) {
                if (!matches('.' + sub)) missing.add('.' + sub);
            }
        }
        expect([...missing]).toEqual([]);
    });

    it('loads with require() in a plain Node process (outside jest\'s module mapper)', () => {
        const out = execFileSync(process.execPath, ['-e', "const h = require('@adaas/are-html'); process.stdout.write(typeof h.AreHTMLEngine)"], { cwd: ROOT });
        expect(String(out)).toBe('function');
    });
});
