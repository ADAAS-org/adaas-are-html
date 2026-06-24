# ARE · Lazy Loading example

Runtime, on-demand loading of components that are **served by the backend** and
were **not part of the initial bundle**. The browser fetches a component's JS
the first time its route is visited, registers the returned class into the live
DI scope, and renders it into an already-mounted tree — no full reload, no
pre-registration at bootstrap.

```bash
npm run example:lazy-loading
# → http://localhost:8083
# manifest → http://localhost:8083/api/components
```

Open DevTools → Network and click an **About / Settings / Reports** link: the
matching `/lazy/*.js` bundle loads exactly once, the first time.

## How it works

1. **Discover** — on boot the app fetches `GET /api/components` (served by the
   `UIContainer` backend) to learn which components exist and where to load
   the lazy ones (`ComponentManifest` fragment).
2. **Navigate** — `NavBar` dispatches an `AreRoute` signal on the bus.
3. **Resolve + fetch** — `LazyOutlet` (the dynamic slot) maps the route to a
   component. If it's lazy and not yet loaded, it does a dynamic
   `import(url)`.
4. **Register** — the returned class is registered into the live scope via
   `scope.register(Class)` (this bumps the resolution version so the engine can
   immediately resolve the new tag).
5. **Render** — the outlet sets its content to `<the-tag>` and runs the
   `tokenize → init → load → transform → compile → mount` subtree build.

### Code-splitting = shared runtime singletons

The app bundle and every lazy bundle are built in **one esbuild pass with
`splitting: true`**. esbuild hoists the framework code (`@adaas/are`,
`@adaas/a-concept`, …) into shared chunks that both the app and each lazy bundle
import **by URL**. When the browser later `import()`s a lazy bundle it reuses the
already-evaluated shared chunk — so the lazy `class X extends Are` references the
**same** `Are` and the **same** DI context the host app is running. Without this,
the dynamically-loaded class would fail `instanceof` / DI lookups.

## Files

| File | Role |
| --- | --- |
| `concept.ts` | Node entry — runs the backend (`UIContainer`). |
| `containers/UI.container.ts` | Builds app + lazy bundles (code-split), serves static files, exposes `/api/components`. The `COMPONENTS` array is the single source of truth. |
| `public/index.html` | SPA shell with the outer `<are-root id="app">`. |
| `src/concept.ts` | Browser app bootstrap — fetches the manifest, wires the `AreContainer`. |
| `src/components/AppShell` · `NavBar` · `HomePage` | **Eager** UI (in the app bundle). |
| `src/components/LazyOutlet` | The dynamic slot that fetches + registers + renders lazy components. |
| `src/lazy/*` | **Lazy** components — each its own esbuild entry, served on demand. |
| `src/runtime/ComponentManifest.fragment.ts` | Holds the backend manifest + "already loaded" set. |

## What this surfaced about the engine

Building `LazyOutlet` is essentially a **fork of `AreRoot`** with an async
fetch+register step inserted. That duplication points at three primitives the
**engine** (adaas-are) should own so are-html/apps don't reinvent them:

- **(A) Runtime component-registration entry point.** We call
  `node.scope.register(Class)` directly; there's no documented
  `context.registerComponent(Class)` that targets the scope root nodes resolve
  against.
- **(B) Async unresolved-component resolver hook.** Resolution is synchronous
  today — a tag miss becomes a plain element forever. We had to intercept
  *before* building. The load path should be able to consult a pluggable async
  provider (`AreComponentResolver`) when `node.component` is undefined.
- **(C) One reusable build+mount subtree primitive.** The
  `tokenize → init/load/transform/compile/mount` loop in `LazyOutlet.render()`
  is copy-pasted from `AreRoot.onSignal` — exactly the duplication that has
  caused mount-point regressions. It belongs in `node.render()` /
  `engine.renderSubtree(node)`.

Dynamic `import()` itself (network + bundling) stays an **are-html/app** concern.
