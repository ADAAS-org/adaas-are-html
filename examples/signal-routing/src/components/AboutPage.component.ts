import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AreRoute } from "src/signals/AreRoute.signal";


/**
 * About page — rendered when the route is "/about".
 */
@Are.Condition([new AreRoute('/about')])
export class AboutPage extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <section class="page page-about">
                <h1 class="page-title">About this example</h1>
                <p class="page-subtitle">
                    This example demonstrates signal-based SPA routing using the ARE framework.
                </p>

                <div class="about-block">
                    <h2>How it works</h2>
                    <ol class="steps">
                        <li>
                            <strong>Signal emitted</strong> — clicking a nav link calls
                            <code>bus.emit(new AreRoute('/about'))</code> and updates the browser
                            URL via <code>history.pushState</code>.
                        </li>
                        <li>
                            <strong>AreRoot reacts</strong> — the root node is subscribed to the
                            signal bus. When the vector matches a registered condition it replaces
                            its inner content with the mapped component.
                        </li>
                        <li>
                            <strong>Page renders</strong> — the new component goes through the normal
                            ARE lifecycle: <code>@Are.Template</code> → <code>@Are.Data</code> →
                            <code>@Are.Styles</code> → mount.
                        </li>
                    </ol>
                </div>

                <div class="about-block">
                    <h2>Key pieces</h2>
                    <table class="info-table">
                        <tr><th>AreRoute(path)</th><td>Signal carrying the new URL path.</td></tr>
                        <tr><th>AreRouteWatcher</th><td>Listens to popstate / pushState and re-emits the signal on browser back/forward.</td></tr>
                        <tr><th>AreSignalsContext</th><td>Fragment that maps (rootId, signal vector) → component class.</td></tr>
                        <tr><th>A_SignalState</th><td>Persists the last emitted signal so a fresh page load still routes correctly.</td></tr>
                    </table>
                </div>
            </section>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .page { padding: 48px 40px; max-width: 860px; margin: 0 auto; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 16px; color: #a1a1aa; line-height: 1.7; margin-bottom: 36px; }
            .about-block { margin-bottom: 40px; }
            .about-block h2 { font-size: 18px; font-weight: 700; color: #e4e4e7; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #27272a; }
            .steps { padding-left: 24px; color: #a1a1aa; line-height: 2; font-size: 14px; }
            .steps li { margin-bottom: 8px; }
            .steps strong { color: #e4e4e7; }
            .steps code, .info-table code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; }
            .info-table { width: 100%; border-collapse: collapse; font-size: 14px; }
            .info-table tr { border-bottom: 1px solid #27272a; }
            .info-table th { text-align: left; padding: 10px 12px; color: #a78bfa; font-weight: 600; width: 200px; }
            .info-table td { padding: 10px 12px; color: #a1a1aa; }
        `);
    }
}
