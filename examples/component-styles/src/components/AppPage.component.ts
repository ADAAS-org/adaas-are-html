import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreStore } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


/**
 * AppPage — the shell component mounted at <are-root id="app">.
 * Owns the page layout styles and composes TheCard, TheButton, TheAlert.
 */
export class AppPage extends Are {

    @Are.Styles
    styles(
        @A_Inject(A_Caller) node: AreHTMLNode,
    ): void {
        node.setStyles(`
            .app-page {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 24px;
                padding: 48px 24px;
                min-height: 100vh;
            }

            .app-page__heading {
                font-size: 1.9rem;
                font-weight: 700;
                color: #1a1a2e;
                text-align: center;
            }

            .app-page__sub {
                font-size: 1rem;
                color: #6b7280;
                text-align: center;
                max-width: 500px;
            }

            .app-page__row {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
            }
        `);
    }

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
    ): void {
        node.setContent(`
            <div class="app-page">
                <h1 class="app-page__heading">@Are.Styles Pipeline</h1>
                <p class="app-page__sub">
                    Each component below owns its CSS — injected as a scoped
                    &lt;style&gt; block in &lt;head&gt; when the component mounts.
                </p>

                <the-card></the-card>

                <the-alert :type="'success'" :message="'Styles injected from TheAlert component ✓'"></the-alert>
                <the-alert :type="'warning'" :message="'A second TheAlert with a different type variant'"></the-alert>

                <div class="app-page__row">
                    <the-button :label="'Primary'"   :variant="'primary'"></the-button>
                    <the-button :label="'Secondary'" :variant="'secondary'"></the-button>
                    <the-button :label="'Danger'"    :variant="'danger'"></the-button>
                </div>
            </div>
        `);
    }
}
