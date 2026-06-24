import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * MarketingApp — the root component of the Marketing app bundle.
 *
 * It only composes the app's own component set: a `<post-editor>` and a
 * `<post-preview>`. Those tags are not registered with the OS at boot — the
 * engine resolves them through the AppComponentResolver, which pulls them from
 * THIS same bundle (one bundle, three components).
 */
export class MarketingApp extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="mk">
                <div class="mk-head">
                    <h2>LinkedIn Post Builder</h2>
                    <span class="mk-be">backend · <code>/apps/marketing/api</code></span>
                </div>
                <div class="mk-grid">
                    <post-editor></post-editor>
                    <post-preview></post-preview>
                </div>
            </div>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            post-editor, post-preview { display: contents; }
            .mk { display: flex; flex-direction: column; height: 100%; color: #ececf1; }
            .mk-head {
                display: flex; align-items: baseline; justify-content: space-between;
                padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.07);
            }
            .mk-head h2 { font-size: 18px; font-weight: 700; }
            .mk-be { font-size: 11px; color: #8b7fb0; }
            .mk-be code { color: #c9b8ff; }
            .mk-grid {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0;
                min-height: 0;
            }
        `);
    }
}
