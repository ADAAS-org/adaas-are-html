import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreStore } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


/**
 * TheCard — a styled card container.
 * Demonstrates @Are.Styles injecting a <style> block into <head>.
 */
export class TheCard extends Are {

    @Are.Styles
    styles(
        @A_Inject(A_Caller) node: AreHTMLNode,
    ): void {
        node.setStyles(`
            .are-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 2px 12px rgba(0, 0, 0, .08);
                padding: 24px 28px;
                max-width: 480px;
                width: 100%;
            }

            .are-card__title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 8px;
            }

            .are-card__body {
                font-size: 0.95rem;
                color: #5a5a7a;
                line-height: 1.6;
            }
        `);
    }

    @Are.Template
    template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        node.setContent(`
            <div class="are-card">
                <div class="are-card__title">{{title}}</div>
                <div class="are-card__body">{{body}}</div>
            </div>
        `);
    }

    @Are.Data
    data(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ): void {
        store.set({
            title: 'Component Styles Demo',
            body:  'Each component below injects its own <style> block into the document <head> through the @Are.Styles pipeline.',
        });
    }
}
