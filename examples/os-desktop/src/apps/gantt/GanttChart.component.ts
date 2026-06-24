import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { GanttStore } from "./GanttStore";
import { MouseState } from "../../signals/MouseState.signal";


const TOTAL_DAYS = 30;
const ROW_H = 30;


/**
 * GanttChart — the Gantt app's visualization.
 *
 * On mount it loads tasks from the app's OWN backend (`/apps/gantt/api/tasks`),
 * mirrors the app's {@link GanttStore}, and re-paints its bars imperatively so
 * the toolbar can add tasks without a full re-render. It also consumes the
 * OS-wide {@link MouseState} signal to glide a vertical guide line under the
 * pointer — the same signal the HUD reads, proving signals fan out to any
 * component that cares.
 */
export class GanttChart extends Are {

    protected _unsubscribe?: () => void;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        const cols = Array.from({ length: TOTAL_DAYS / 5 }, (_, i) =>
            `<div class="gc-col"><span>d${i * 5}</span></div>`).join('');

        node.setContent(`
            <div class="gc">
                <div class="gc-grid">${cols}</div>
                <div class="gc-bars"></div>
                <div class="gc-cursor"></div>
            </div>
        `);
    }

    @Are.onAfterMount
    async onMount(@A_Inject(A_Logger) logger: A_Logger) {
        this._unsubscribe = GanttStore.subscribe(() => this.paint());

        try {
            const res = await fetch('/apps/gantt/api/tasks');
            const data = await res.json();
            GanttStore.set(Array.isArray(data.tasks) ? data.tasks : []);
        } catch (error) {
            logger.error(error);
            this.paint();
        }
    }

    @Are.onBeforeUnmount
    onUnmount() {
        this._unsubscribe?.();
        this._unsubscribe = undefined;
    }

    @Are.Signal(MouseState)
    onMouse(@A_Inject(MouseState) signal: MouseState) {
        const cursor = document.querySelector('.gc-cursor') as HTMLElement | null;
        if (!cursor || !cursor.parentElement) return;
        const rect = cursor.parentElement.getBoundingClientRect();
        const x = Math.max(0, Math.min(signal.x - rect.left, rect.width));
        cursor.style.left = `${x}px`;
    }

    protected paint() {
        const bars = document.querySelector('.gc-bars') as HTMLElement | null;
        if (!bars) return;

        bars.style.height = `${Math.max(1, GanttStore.tasks.length) * ROW_H + 8}px`;
        bars.innerHTML = GanttStore.tasks.map(task => {
            const left = (task.start / TOTAL_DAYS) * 100;
            const width = ((task.end - task.start) / TOTAL_DAYS) * 100;
            const top = task.track * ROW_H + 4;
            return `
                <div class="gc-bar" style="left:${left}%;width:${width}%;top:${top}px;background:${task.color}">
                    <span>${task.name}</span>
                </div>
            `;
        }).join('');
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .gc {
                position: relative;
                flex: 1;
                margin: 18px 24px;
                border-radius: 12px;
                background: rgba(0,0,0,0.22);
                border: 1px solid rgba(255,255,255,0.08);
                overflow: hidden;
            }
            .gc-grid { position: absolute; inset: 0; display: flex; }
            .gc-col {
                flex: 1;
                border-right: 1px dashed rgba(255,255,255,0.07);
                padding: 6px 8px;
            }
            .gc-col span { font-size: 10px; color: #6f7a8c; font-family: ui-monospace, monospace; }
            .gc-bars { position: relative; margin-top: 26px; }
            .gc-bar {
                position: absolute;
                height: ${ROW_H - 8}px;
                border-radius: 6px;
                display: flex; align-items: center;
                padding: 0 10px;
                color: white; font-size: 12px; font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                overflow: hidden; white-space: nowrap;
                transition: left 0.2s, width 0.2s;
            }
            .gc-cursor {
                position: absolute; top: 0; bottom: 0; left: 0; width: 2px;
                background: rgba(255,255,255,0.55);
                pointer-events: none;
                box-shadow: 0 0 10px rgba(255,255,255,0.5);
            }
        `);
    }
}
