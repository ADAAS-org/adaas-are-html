import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * Root shell — holds the persistent NavBar and the router outlet (`<are-root>`).
 *
 * The inner `<are-root id="page-outlet">` is the actual dynamic slot.
 * `AreSignalsContext` maps route signals to page components keyed by "page-outlet".
 */
export class AppShell extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="app-shell">
                <nav-bar></nav-bar>
                <main class="app-main">
                    <are-root id="page-outlet"><home-page></home-page></are-root>
                </main>
            </div>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .app-shell {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background: #09090b;
                color: #f4f4f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .app-main {
                flex: 1;
            }
        `);
    }
}
