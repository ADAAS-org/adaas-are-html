import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are } from "@adaas/are";
import { AreEvent } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreScene } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class DashboardMain extends Are {

    @Are.Template
     template(
        @A_Inject(A_Caller) node: AreNode,
    ) {
        node.setContent(`
            <main class="main">
                <div class="main-header">
                    <div>
                        <h1 class="main-title">{{pageTitle}}</h1>
                        <div class="main-subtitle">{{pageSubtitle}}</div>
                    </div>
                    <div class="main-actions">
                        <button class="btn btn-outline"><span class="btn-icon">⬇</span> {{exportLabel}}</button>
                        <button class="btn btn-primary" @click="(e)=>!!pageTitle? $testHandler(e,'item'):null"><span class="btn-icon">+</span>  {{addLabel}}</button>
                    </div>
                </div>
                <dashboard-stats></dashboard-stats>
                <dashboard-table></dashboard-table>
            </main>
        `);
    }

    @Are.Data
     data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            pageTitle: 'Overview',
            pageSubtitle: 'Welcome back, John. Here\'s what\'s happening today.',
            exportLabel: 'Export',
            addLabel: 'New Record',
        });
    }

    @Are.EventHandler
    async testHandler(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreScene) scene: AreScene,
    ) {

        console.log('Button clicked! This is a test event handler.', event);
    }
}
