import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreStore } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


/**
 * TheButton — a styled button component.
 * Uses @Are.Styles to scope its own CSS so it never leaks into other components.
 */
export class TheButton extends Are {

    props: Record<string, any> = {
        label: {
            type: 'string',
            default: 'Click me',
        },
        variant: {
            type: 'string',
            default: 'primary',  // 'primary' | 'secondary' | 'danger'
        },
    };

    @Are.Styles
    styles(
        @A_Inject(A_Caller) node: AreHTMLNode,
    ): void {
        node.setStyles(`
            .are-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 10px 22px;
                font-size: 0.9rem;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: opacity .15s, transform .1s;
                letter-spacing: 0.02em;
            }

            .are-btn:hover  { opacity: .88; }
            .are-btn:active { transform: scale(.97); }

            .are-btn--primary   { background: #4f46e5; color: #fff; }
            .are-btn--secondary { background: #e5e7eb; color: #374151; }
            .are-btn--danger    { background: #ef4444; color: #fff; }
        `);
    }

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        node.setContent(`
            <button class="are-btn are-btn--{{variant}}">{{label}}</button>
        `);
    }

    @Are.Data
    data(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        store.set({
            label:   store.get('label')   ?? 'Click Me',
            variant: store.get('variant') ?? 'primary',
        });
    }
}
