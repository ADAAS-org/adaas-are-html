import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, AreNode, AreSignalsContext, AreStore } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AreRoute } from "src/signals/AreRoute.signal";


/**
 * Home page — rendered when the route is "/".
 */
@Are.Condition([new AreRoute('/')])
export class HomePage extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <section class="page page-home">
                <div class="page-hero">
                    <h1 class="page-title">Welcome to Signal Routing</h1>
                    <p class="page-subtitle">
                        This page is rendered because the current route matched <code>/</code>.<br/>
                        Navigate using the links above — no full page reload, just signals.
                    </p>
                </div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-icon">⚡</div>
                        <h3>Signal-based</h3>
                        <p>Route changes emit an <code>AreRoute</code> signal on the bus. <code>AreRoot</code> responds and swaps the active component.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🔀</div>
                        <h3>Zero reload</h3>
                        <p>No browser navigation occurs. <code>history.pushState</code> keeps the URL bar in sync so deep-links and back/forward still work.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🧩</div>
                        <h3>Component-level</h3>
                        <p>Each page is a plain <code>Are</code> component. Register it in <code>AreSignalsContext</code> and the router does the rest.</p>
                    </div>
                </div>
            </section>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .page { padding: 48px 40px; max-width: 960px; margin: 0 auto; }
            .page-hero { margin-bottom: 40px; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 16px; color: #a1a1aa; line-height: 1.7; }
            .page-subtitle code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a78bfa; font-size: 13px; }
            .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
            .card { background: #1c1c1f; border: 1px solid #27272a; border-radius: 12px; padding: 24px; }
            .card-icon { font-size: 28px; margin-bottom: 12px; }
            .card h3 { font-size: 16px; font-weight: 600; color: #f4f4f5; margin-bottom: 8px; }
            .card p { font-size: 14px; color: #71717a; line-height: 1.6; }
            .card p code { background: #27272a; padding: 1px 5px; border-radius: 3px; color: #a78bfa; font-size: 12px; }
        `);
    }


    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) root: AreNode,
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreStore) store: AreStore<{ default: string }>,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        ) {
        const rootId = root.id;


        console.log(`HomePage received signal: ${vector.toString()} for rootId: ${rootId}`, root, signalsContext);
    }
}
