import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * Persistent application shell: the sidebar nav + the dynamic `<lazy-outlet>`.
 *
 * `<lazy-outlet>` is this example's dynamic slot. It plays the role `AreRoot`
 * plays in the signal-routing example, but it can also fetch + register a
 * component that wasn't in the initial bundle before rendering it.
 */
export class AppShell extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="shell">
                <nav-bar></nav-bar>
                <main class="shell-main">
                    <lazy-outlet></lazy-outlet>
                </main>
            </div>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .shell {
                display: grid;
                grid-template-columns: 240px 1fr;
                min-height: 100vh;
                background: #09090b;
                color: #f4f4f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .shell-main {
                padding: 0;
                overflow: auto;
            }
        `);
    }
}
