import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";


/**
 * GanttApp — root of the Gantt app bundle. Composes the app's own component set:
 * a `<gantt-toolbar>` and a `<gantt-chart>`. Both are resolved lazily out of the
 * same bundle by the AppComponentResolver.
 */
export class GanttApp extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="gt">
                <div class="gt-head">
                    <h2>Project Timeline</h2>
                    <span class="gt-be">backend · <code>/apps/gantt/api</code></span>
                </div>
                <gantt-toolbar></gantt-toolbar>
                <gantt-chart></gantt-chart>
            </div>
        `);
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            gantt-toolbar, gantt-chart { display: block; }
            .gt { display: flex; flex-direction: column; height: 100%; color: #ececf1; }
            .gt-head {
                display: flex; align-items: baseline; justify-content: space-between;
                padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.07);
            }
            .gt-head h2 { font-size: 18px; font-weight: 700; }
            .gt-be { font-size: 11px; color: #7fa0c8; }
            .gt-be code { color: #b8d4ff; }
        `);
    }
}
