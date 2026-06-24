# ARE · OS Desktop

A macOS-style **operating-system desktop** built with ARE, showing how to manage
**dynamically installable applications** where **each app is its own bundle with
its own frontend *and* its own backend**, wired together by **signal-based
routing**.

```
┌──────────────────────────────────────────────── menu bar (OSRoute, Selection)
│  desktop (wallpaper)
│        ┌────────────── app window (macOS chrome) ──────────────┐
│        │  Marketing  ·  post-editor | post-preview              │
│        │  Timeline   ·  gantt-toolbar | gantt-chart             │
│        └───────────────────────────────────────────────────────┘
│  HUD (MouseState, Selection)                          dock (OSRoute)
└──────────────────────────────────────────────────────────────────
```

## Run

```bash
npm run example:os-desktop
# http://localhost:8084
```

The desktop boots empty. Click the dock's **＋ (Launchpad)** button, **Install**
an app — that fetches the app's bundle and adds it to the dock — then open it.

## What it demonstrates

### 1. Apps are self-contained bundles (FE + BE), installed at runtime
Each app is a single code-split bundle exporting a **set** of components plus a
matching backend:

| App         | Frontend components                          | Backend endpoint                  |
|-------------|----------------------------------------------|-----------------------------------|
| Marketing   | `marketing-app` · `post-editor` · `post-preview` | `GET /apps/marketing/api/hashtags` |
| Timeline    | `gantt-app` · `gantt-toolbar` · `gantt-chart`    | `GET /apps/gantt/api/tasks`        |

The OS kernel (`containers/OS.container.ts`) never imports an app's source. It
only:
- advertises descriptors at `GET /api/apps`,
- builds the shell + every app bundle in **one code-split esbuild pass** (so a
  lazily-`import()`ed app reuses the SAME framework runtime singletons), and
- routes `/apps/<id>/api/*` to that app's own backend.

Adding an app = adding one `AppBackend` to the kernel. Installing it in the UI
(`AppRegistry.install`) makes it appear in the dock; the
`AppComponentResolver` then lazily imports its bundle on first render — one
network request per app, however many components it ships.

### 2. Signal-based routing with several signals
Three OS-wide signals travel on one bus, and many components react to each one
**independently** — there is no central controller:

| Signal           | Produced by                          | Consumed by                                   |
|------------------|--------------------------------------|-----------------------------------------------|
| `OSRoute`        | dock / launchpad / window chrome     | `AppStage` (swaps surface), `MenuBar` (title), `OsDock` (running dot) |
| `MouseState`     | global `mousemove` (throttled)       | `OsHud` (x/y read-out), `GanttChart` (guide line) |
| `SelectionState` | global `selectionchange`             | `OsHud` (length), `MenuBar` (chip), `PostPreview` (hashtag hint) |

`AppStage` is a custom **signal outlet**: it maps the current `OSRoute` to one
surface (`app-window` / `os-launchpad` / empty desktop) and swaps it with the
engine primitives `clear()` + `render()`, unsubscribing the outgoing subtree
from the bus first.

> Every dispatched signal type is listed in BOTH `entities` and the
> `A_SignalState([...])` structure in `src/concept.ts` — otherwise the bus
> silently drops it.

## Layout

```
os-desktop/
├── concept.ts                     # node entry (kernel)
├── public/index.html              # <are-root id="os"><os-desktop>
├── containers/
│   ├── OS.container.ts            # build + serve + /api/apps + app-API routing
│   └── apps/
│       ├── AppBackend.ts          # app backend interface
│       ├── MarketingApp.backend.ts
│       └── GanttApp.backend.ts
└── src/
    ├── concept.ts                 # browser bootstrap (registry + resolver + bus)
    ├── signals/                   # OSRoute · MouseState · SelectionState
    ├── runtime/                   # AppRegistry + AppComponentResolver
    ├── os/                        # shell: desktop, menu bar, dock, hud, stage, window, launchpad
    └── apps/
        ├── marketing/             # marketing bundle (FE) + own store
        └── gantt/                 # gantt bundle (FE) + own store
```
