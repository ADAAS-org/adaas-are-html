import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * About page — LAZY. Built into its own bundle (`/lazy/about-page.js`) and NOT
 * registered at bootstrap. It is fetched + registered the first time the
 * `/about` route is visited.
 *
 * Authored exactly like an eager component — the only difference is it lives in
 * `src/lazy/` (its own esbuild entry point) and is `export default`ed so the
 * loader can grab the class without knowing its name.
 */
export class AboutPage extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <section class="page">
                <span class="eyebrow">Lazy · fetched on demand</span>
                <h1 class="page-title">About this example</h1>
                <p class="page-lead">
                    You just triggered a dynamic <code>import('/lazy/about-page.js')</code>.
                    The class was registered into the running scope and rendered into the
                    outlet — no page reload, and it wasn't in the initial bundle.
                </p>
                <div class="grid">
                    <div class="card"><h3>Code-split</h3><p>The app and every lazy bundle share framework chunks, so this class <code>extends</code> the same <code>Are</code> runtime.</p></div>
                    <div class="card"><h3>Backend-driven</h3><p>The server's <code>/api/components</code> manifest decided this page exists and where to fetch it.</p></div>
                    <div class="card"><h3>Cached</h3><p>Revisit /about — no second network request. The manifest marks it loaded.</p></div>
                </div>
            </section>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .page { padding: 48px 56px; max-width: 860px; }
            .eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px; margin-bottom: 20px; color: #fcd34d; background: rgba(252, 211, 77, 0.12); }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 14px; letter-spacing: -0.02em; }
            .page-lead { font-size: 16px; color: #a1a1aa; line-height: 1.7; margin-bottom: 28px; }
            code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a78bfa; font-size: 13px; }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
            .card { background: #1c1c1f; border: 1px solid #27272a; border-radius: 12px; padding: 20px; }
            .card h3 { font-size: 15px; font-weight: 600; color: #f4f4f5; margin-bottom: 8px; }
            .card p { font-size: 13px; color: #71717a; line-height: 1.6; }
            .card code { font-size: 12px; }
        `);
    }
}

export default AboutPage;
