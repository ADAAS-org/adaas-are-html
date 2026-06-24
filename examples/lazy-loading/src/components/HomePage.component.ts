import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * Home page — EAGER. It ships in the initial app bundle and is registered at
 * bootstrap, so it paints with no extra network request.
 */
export class HomePage extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <section class="page">
                <span class="eyebrow eyebrow-eager">Eager · bundled</span>
                <h1 class="page-title">Runtime Lazy Component Loading</h1>
                <p class="page-lead">
                    This dashboard ships with only the shell, the navigation and this
                    home page. The other pages are <strong>separate JS bundles served by
                    the backend</strong> and fetched the first time you open them.
                </p>
                <ol class="steps">
                    <li><strong>Discover</strong> — the app fetches <code>/api/components</code> to learn which components exist and where to load them.</li>
                    <li><strong>Fetch</strong> — on first navigation the matching bundle is loaded via dynamic <code>import()</code>.</li>
                    <li><strong>Register</strong> — the returned class is registered into the live scope (<code>scope.register</code>).</li>
                    <li><strong>Render</strong> — the outlet builds + mounts the subtree; the new tag is now recognized.</li>
                </ol>
                <p class="hint">Open DevTools → Network and click a <em>Lazy</em> page to watch its bundle load once.</p>
            </section>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .page { padding: 48px 56px; max-width: 820px; }
            .eyebrow {
                display: inline-block;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                padding: 4px 10px;
                border-radius: 999px;
                margin-bottom: 20px;
            }
            .eyebrow-eager { color: #34d399; background: rgba(52, 211, 153, 0.12); }
            .page-title { font-size: 34px; font-weight: 800; color: #f4f4f5; margin-bottom: 16px; letter-spacing: -0.02em; }
            .page-lead { font-size: 17px; color: #a1a1aa; line-height: 1.7; margin-bottom: 28px; }
            .page-lead strong { color: #f4f4f5; }
            .steps { color: #d4d4d8; font-size: 15px; line-height: 1.8; padding-left: 22px; display: flex; flex-direction: column; gap: 6px; }
            .steps strong { color: #a78bfa; }
            code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a78bfa; font-size: 13px; }
            .hint { margin-top: 28px; font-size: 13px; color: #71717a; }
            .hint em { color: #fcd34d; font-style: normal; }
        `);
    }
}
