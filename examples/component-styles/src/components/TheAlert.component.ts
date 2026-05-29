import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreStore } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


/**
 * TheAlert — a styled status banner.
 * Shows how @Are.Styles can produce conditional-looking CSS
 * by injecting all variant rules and switching via class.
 */
export class TheAlert extends Are {

    props: Record<string, any> = {
        type: {
            type: 'string',
            default: 'info',   // 'info' | 'success' | 'warning' | 'error'
        },
        message: {
            type: 'string',
            default: '',
        },
    };

    @Are.Styles
    styles(
        @A_Inject(A_Caller) node: AreHTMLNode,
    ): void {
        node.setStyles(`
            .are-alert {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 14px 18px;
                border-radius: 8px;
                font-size: 0.9rem;
                line-height: 1.5;
                border-left: 4px solid transparent;
            }

            .are-alert__icon  { font-size: 1.1rem; flex-shrink: 0; }
            .are-alert__text  { flex: 1; }

            .are-alert--info    { background: #eff6ff; border-color: #3b82f6; color: #1e40af; }
            .are-alert--success { background: #f0fdf4; border-color: #22c55e; color: #166534; }
            .are-alert--warning { background: #fffbeb; border-color: #f59e0b; color: #92400e; }
            .are-alert--error   { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
        `);
    }

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        node.setContent(`
            <div class="are-alert are-alert--{{type}}">
                <span class="are-alert__icon">{{icon}}</span>
                <span class="are-alert__text">{{message}}</span>
            </div>
        `);
    }

    @Are.Data
    data(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        const type = store.get('type') ?? 'info';
        const icons: Record<string, string> = {
            info:    'ℹ️',
            success: '✅',
            warning: '⚠️',
            error:   '❌',
        };
        store.set({
            type,
            icon:    icons[type] ?? icons.info,
            message: store.get('message') ?? 'This is an alert message.',
        });
    }
}
