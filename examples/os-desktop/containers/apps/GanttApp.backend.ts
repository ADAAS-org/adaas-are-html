import http from "http";
import type { AppDescriptor } from "../../src/runtime/AppRegistry.fragment";
import { AppBackend } from "./AppBackend";


/** Seed project plan served by the Gantt app's backend. */
const SEED_TASKS = [
    { id: 's1', name: 'Discovery', start: 0, end: 5, color: '#5b8def', track: 0 },
    { id: 's2', name: 'Design', start: 4, end: 11, color: '#34c759', track: 1 },
    { id: 's3', name: 'Build', start: 9, end: 22, color: '#ff9f0a', track: 2 },
    { id: 's4', name: 'QA', start: 18, end: 26, color: '#bf5af2', track: 3 },
    { id: 's5', name: 'Launch', start: 25, end: 30, color: '#ff375f', track: 4 },
];


/**
 * GanttAppBackend — the Gantt app's OWN server.
 *
 * Frontend: gantt-app / gantt-toolbar / gantt-chart (the gantt bundle).
 * Backend: a single `/apps/gantt/api/tasks` endpoint that serves the project
 * plan the chart renders.
 */
export class GanttAppBackend implements AppBackend {

    readonly entry = 'src/apps/gantt/index.ts';

    readonly descriptor: AppDescriptor = {
        id: 'gantt',
        name: 'Timeline',
        icon: '📊',
        accent: '#34c759',
        tagline: 'A project Gantt chart whose tasks are served by its own backend.',
        rootTag: 'gantt-app',
        bundle: '/apps/gantt/app.js',
        api: '/apps/gantt/api',
        components: [
            { tag: 'gantt-app', export: 'GanttApp' },
            { tag: 'gantt-toolbar', export: 'GanttToolbar' },
            { tag: 'gantt-chart', export: 'GanttChart' },
        ],
    };

    handle(
        pathname: string,
        _query: URLSearchParams,
        _req: http.IncomingMessage,
        res: http.ServerResponse,
    ): boolean {
        if (pathname === '/apps/gantt/api/tasks') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ tasks: SEED_TASKS }));
            return true;
        }
        return false;
    }
}
