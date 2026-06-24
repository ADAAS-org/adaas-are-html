/**
 * Gantt app bundle entry.
 *
 * The OS lazily `import()`s this module when the Gantt app is installed/opened.
 * It exports the app's full component set; the AppComponentResolver selects each
 * class by the `export` name listed in the descriptor (see GanttApp.backend.ts).
 */
export { GanttApp } from "./GanttApp.component";
export { GanttToolbar } from "./GanttToolbar.component";
export { GanttChart } from "./GanttChart.component";

import { GanttApp } from "./GanttApp.component";
export default GanttApp;
