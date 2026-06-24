import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { GanttStore, GanttTask } from "./GanttStore";


const COLORS = ['#5b8def', '#34c759', '#ff9f0a', '#bf5af2', '#ff375f', '#64d2ff'];
const NAMES = ['Discovery', 'Design', 'Build', 'Review', 'QA', 'Launch', 'Retro'];


/**
 * GanttToolbar — the Gantt app's controls. Writes into the app's own
 * {@link GanttStore} (add a task) and can reload the task list from the app's
 * OWN backend (`/apps/gantt/api/tasks`).
 */
export class GanttToolbar extends Are {

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="tb">
                <button class="tb-btn tb-add" @click="$add()">＋ Add task</button>
                <button class="tb-btn" @click="$reload()">↻ Reload from backend</button>
                <span class="tb-hint">Tasks are served by the Gantt app's own backend.</span>
            </div>
        `);
    }

    @Are.EventHandler
    add() {
        const tracks = GanttStore.tasks.length;
        const start = Math.floor(Math.random() * 20);
        const task: GanttTask = {
            id: `t-${Date.now()}`,
            name: NAMES[Math.floor(Math.random() * NAMES.length)],
            start,
            end: start + 3 + Math.floor(Math.random() * 6),
            color: COLORS[tracks % COLORS.length],
            track: tracks,
        };
        GanttStore.add(task);
    }

    @Are.EventHandler
    async reload(@A_Inject(A_Logger) logger: A_Logger) {
        try {
            const res = await fetch('/apps/gantt/api/tasks');
            const data = await res.json();
            if (Array.isArray(data.tasks)) GanttStore.set(data.tasks);
        } catch (error) {
            logger.error(error);
        }
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .tb {
                display: flex; align-items: center; gap: 10px;
                padding: 14px 24px; border-bottom: 1px solid rgba(255,255,255,0.07);
            }
            .tb-btn {
                padding: 7px 13px; border: 1px solid rgba(255,255,255,0.14);
                border-radius: 9px; background: rgba(255,255,255,0.06);
                color: #ececf1; font-size: 13px; font-weight: 600; cursor: pointer;
            }
            .tb-btn:hover { background: rgba(255,255,255,0.12); }
            .tb-add { background: #2f6df6; border-color: transparent; }
            .tb-hint { font-size: 11px; color: #7d889a; margin-left: auto; }
        `);
    }
}
