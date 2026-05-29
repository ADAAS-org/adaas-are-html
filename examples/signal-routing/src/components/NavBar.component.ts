import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_SignalBus, A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, AreEvent, AreNode, AreSignalsContext, AreStore } from "@adaas/are";
import { AreHTMLNode } from "src";
import { AreRoute } from "@adaas/are-html/signals/AreRoute.signal";


/**
 * Top navigation bar.
 *
 * Each nav link dispatches an `AreRoute` signal via the SignalBus.
 * `AreRoot` picks up the signal and swaps the active page component.
 *
 * No browser hard-navigation happens — history.pushState keeps the URL
 * in sync for deep-linking and the back/forward buttons.
 */
export class NavBar extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <nav class="navbar">
                <div class="navbar-brand">ARE · Signal Router</div>
                <ul class="navbar-links">
                    <li><a href="/" @click="$navigate('/')">Home</a></li>
                    <li><a href="/about" @click="$navigate('/about')">About</a></li>
                    <li><a href="/settings" @click="$navigate('/settings')">Settings</a></li>
                </ul>
            </nav>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .navbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 32px;
                height: 56px;
                background: #18181b;
                border-bottom: 1px solid #27272a;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            .navbar-brand {
                font-size: 16px;
                font-weight: 700;
                color: #a78bfa;
                letter-spacing: -0.02em;
            }
            .navbar-links {
                list-style: none;
                display: flex;
                gap: 8px;
                margin: 0;
                padding: 0;
            }
            .navbar-links a {
                display: inline-block;
                padding: 6px 16px;
                border-radius: 6px;
                text-decoration: none;
                color: #a1a1aa;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.15s, color 0.15s;
            }
            .navbar-links a:hover {
                background: #27272a;
                color: #f4f4f5;
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


        @Are.Signal
        async onSignal(
            @A_Inject(A_Caller) root: AreNode,
            @A_Inject(A_SignalVector) vector: A_SignalVector,
            @A_Inject(AreStore) store: AreStore<{ default: string }>,
            @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
            ) {
            const rootId = root.id;
    
    
            console.log(`NavBar received signal: ${vector.toString()} for rootId: ${rootId}`, root, signalsContext);
        }
}
