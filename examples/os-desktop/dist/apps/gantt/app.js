import {
  MouseState
} from "../../chunks/chunk-EIIGUL6N.js";
import {
  A_Logger,
  Are,
  Yt,
  __decorateClass,
  __decorateParam,
  __name,
  te
} from "../../chunks/chunk-6K72IBO4.js";

// examples/os-desktop/src/apps/gantt/GanttApp.component.ts
var _GanttApp = class _GanttApp extends Are {
  template(node) {
    node.setContent(`
            <div class="gt">
                <div class="gt-head">
                    <h2>Project Timeline</h2>
                    <span class="gt-be">backend \xB7 <code>/apps/gantt/api</code></span>
                </div>
                <gantt-toolbar></gantt-toolbar>
                <gantt-chart></gantt-chart>
            </div>
        `);
  }
  styles(node) {
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
};
__name(_GanttApp, "GanttApp");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _GanttApp.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _GanttApp.prototype, "styles", 1);
var GanttApp = _GanttApp;

// examples/os-desktop/src/apps/gantt/GanttStore.ts
var _GanttStoreImpl = class _GanttStoreImpl {
  constructor() {
    this._tasks = [];
    this._listeners = /* @__PURE__ */ new Set();
  }
  get tasks() {
    return this._tasks;
  }
  set(tasks) {
    this._tasks = tasks;
    this.emit();
  }
  add(task) {
    this._tasks = [...this._tasks, task];
    this.emit();
  }
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
  emit() {
    for (const listener of this._listeners) listener();
  }
};
__name(_GanttStoreImpl, "GanttStoreImpl");
var GanttStoreImpl = _GanttStoreImpl;
var GanttStore = new GanttStoreImpl();

// examples/os-desktop/src/apps/gantt/GanttToolbar.component.ts
var COLORS = ["#5b8def", "#34c759", "#ff9f0a", "#bf5af2", "#ff375f", "#64d2ff"];
var NAMES = ["Discovery", "Design", "Build", "Review", "QA", "Launch", "Retro"];
var _GanttToolbar = class _GanttToolbar extends Are {
  template(node) {
    node.setContent(`
            <div class="tb">
                <button class="tb-btn tb-add" @click="$add()">\uFF0B Add task</button>
                <button class="tb-btn" @click="$reload()">\u21BB Reload from backend</button>
                <span class="tb-hint">Tasks are served by the Gantt app's own backend.</span>
            </div>
        `);
  }
  add() {
    const tracks = GanttStore.tasks.length;
    const start = Math.floor(Math.random() * 20);
    const task = {
      id: `t-${Date.now()}`,
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      start,
      end: start + 3 + Math.floor(Math.random() * 6),
      color: COLORS[tracks % COLORS.length],
      track: tracks
    };
    GanttStore.add(task);
  }
  async reload(logger) {
    try {
      const res = await fetch("/apps/gantt/api/tasks");
      const data = await res.json();
      if (Array.isArray(data.tasks)) GanttStore.set(data.tasks);
    } catch (error) {
      logger.error(error);
    }
  }
  styles(node) {
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
};
__name(_GanttToolbar, "GanttToolbar");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _GanttToolbar.prototype, "template", 1);
__decorateClass([
  Are.EventHandler
], _GanttToolbar.prototype, "add", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(A_Logger))
], _GanttToolbar.prototype, "reload", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _GanttToolbar.prototype, "styles", 1);
var GanttToolbar = _GanttToolbar;

// examples/os-desktop/src/apps/gantt/GanttChart.component.ts
var TOTAL_DAYS = 30;
var ROW_H = 30;
var _GanttChart = class _GanttChart extends Are {
  template(node) {
    const cols = Array.from({ length: TOTAL_DAYS / 5 }, (_, i) => `<div class="gc-col"><span>d${i * 5}</span></div>`).join("");
    node.setContent(`
            <div class="gc">
                <div class="gc-grid">${cols}</div>
                <div class="gc-bars"></div>
                <div class="gc-cursor"></div>
            </div>
        `);
  }
  async onMount(logger) {
    this._unsubscribe = GanttStore.subscribe(() => this.paint());
    try {
      const res = await fetch("/apps/gantt/api/tasks");
      const data = await res.json();
      GanttStore.set(Array.isArray(data.tasks) ? data.tasks : []);
    } catch (error) {
      logger.error(error);
      this.paint();
    }
  }
  onUnmount() {
    this._unsubscribe?.();
    this._unsubscribe = void 0;
  }
  onMouse(signal) {
    const cursor = document.querySelector(".gc-cursor");
    if (!cursor || !cursor.parentElement) return;
    const rect = cursor.parentElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(signal.x - rect.left, rect.width));
    cursor.style.left = `${x}px`;
  }
  paint() {
    const bars = document.querySelector(".gc-bars");
    if (!bars) return;
    bars.style.height = `${Math.max(1, GanttStore.tasks.length) * ROW_H + 8}px`;
    bars.innerHTML = GanttStore.tasks.map((task) => {
      const left = task.start / TOTAL_DAYS * 100;
      const width = (task.end - task.start) / TOTAL_DAYS * 100;
      const top = task.track * ROW_H + 4;
      return `
                <div class="gc-bar" style="left:${left}%;width:${width}%;top:${top}px;background:${task.color}">
                    <span>${task.name}</span>
                </div>
            `;
    }).join("");
  }
  styles(node) {
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
};
__name(_GanttChart, "GanttChart");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _GanttChart.prototype, "template", 1);
__decorateClass([
  Are.onAfterMount,
  __decorateParam(0, Yt(A_Logger))
], _GanttChart.prototype, "onMount", 1);
__decorateClass([
  Are.onBeforeUnmount
], _GanttChart.prototype, "onUnmount", 1);
__decorateClass([
  Are.Signal(MouseState),
  __decorateParam(0, Yt(MouseState))
], _GanttChart.prototype, "onMouse", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _GanttChart.prototype, "styles", 1);
var GanttChart = _GanttChart;

// examples/os-desktop/src/apps/gantt/index.ts
var gantt_default = GanttApp;
export {
  GanttApp,
  GanttChart,
  GanttToolbar,
  gantt_default as default
};
