export interface GanttTask {
    id: string;
    name: string;
    start: number;   // day offset from project start
    end: number;     // day offset (exclusive)
    color: string;
    track: number;   // row index
}


/**
 * GanttStore — the Gantt app's OWN internal state (its task list).
 *
 * Like the Marketing app's store, this is private to the Gantt bundle and is
 * how the toolbar (writer) and the chart (reader) stay in sync without touching
 * the OS signal bus.
 */
class GanttStoreImpl {

    protected _tasks: GanttTask[] = [];
    protected _listeners: Set<() => void> = new Set();

    get tasks(): GanttTask[] {
        return this._tasks;
    }

    set(tasks: GanttTask[]): void {
        this._tasks = tasks;
        this.emit();
    }

    add(task: GanttTask): void {
        this._tasks = [...this._tasks, task];
        this.emit();
    }

    subscribe(listener: () => void): () => void {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    protected emit(): void {
        for (const listener of this._listeners) listener();
    }
}

export const GanttStore = new GanttStoreImpl();
