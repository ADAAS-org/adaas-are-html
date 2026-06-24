import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { Are, AreEvent, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AreRoute } from "@adaas/are-html/signals/AreRoute.signal";


/**
 * Sidebar navigation. Each link dispatches an `AreRoute` signal on the bus;
 * `LazyOutlet` picks it up and swaps (lazy-loading if necessary) the page.
 *
 * The "Lazy" badge marks pages whose code is NOT in the initial bundle — open
 * the network tab and watch the corresponding `.js` request fire the first time
 * you click one.
 */
export class NavBar extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <aside class="nav">
                <div class="nav-brand">ARE · Lazy Loading</div>
                <nav class="nav-links">
                    <a href="/" @click="$navigate('/')">Home</a>
                    <a href="/about" @click="$navigate('/about')">About <span class="badge">Lazy</span></a>
                    <a href="/settings" @click="$navigate('/settings')">Settings <span class="badge">Lazy</span></a>
                    <a href="/reports" @click="$navigate('/reports')">Reports <span class="badge">Lazy</span></a>
                </nav>
                <div class="nav-foot">Pages tagged <span class="badge">Lazy</span> are fetched on first visit.</div>
            </aside>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .nav {
                display: flex;
                flex-direction: column;
                gap: 6px;
                padding: 24px 16px;
                background: #18181b;
                border-right: 1px solid #27272a;
            }
            .nav-brand {
                font-size: 15px;
                font-weight: 700;
                color: #a78bfa;
                letter-spacing: -0.02em;
                margin-bottom: 16px;
            }
            .nav-links { display: flex; flex-direction: column; gap: 4px; }
            .nav-links a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 9px 14px;
                border-radius: 8px;
                text-decoration: none;
                color: #a1a1aa;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.15s, color 0.15s;
            }
            .nav-links a:hover { background: #27272a; color: #f4f4f5; }
            .badge {
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                color: #fcd34d;
                background: rgba(252, 211, 77, 0.12);
                padding: 2px 6px;
                border-radius: 999px;
            }
            .nav-foot {
                margin-top: auto;
                font-size: 11px;
                color: #52525b;
                line-height: 1.5;
                padding: 12px 14px;
            }
        `);
    }

    @Are.EventHandler
    navigate(
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_SignalBus) bus: A_SignalBus,
    ) {
        const e = event.get('native') as MouseEvent;
        e?.preventDefault();

        const path = event.get('args')?.[0] as string ?? '/';
        history.pushState({}, '', path);
        bus.next(new AreRoute(path));
    }
}
