# Known issues & wanted features — @adaas/are-html

Found while building apps on the framework. Each entry: what happens, and the workaround apps currently use.

Reviewed 2026-11-10 against the source and the published `0.0.29`. Open items have a test that shows them
(`it.failing` — drop `.failing` and move the entry when fixed). "Next release" = in this source tree, not on npm.

## Open

### AH-9. A component that IS the `$for` element runs `onAfterMount` once more than its items (narrowed 2026-11-10)
- `<item-card $for="i in items track i.key"></item-card>` renders one card per item, but the component's
  `onAfterMount` runs once extra (3 times for 2 items) — most likely the `$for` template copy. Anything an
  `onAfterMount` starts (a subscription, a poll, a fetch) starts one time too many.
- A component **inside** an item (`<div $for="…"><item-card></item-card></div>`) renders and mounts exactly once per
  item, including items added later — the original AH-9 ("never mounted") no longer happens.
- Workaround: wrap the component in an element that carries the `$for`.
- Tests: `tests/ForComponentItem.test.ts` (inside an item: passes; as the `$for` element: `it.failing`).

## Fixed — next release

### AH-F11. A `$if` mounted its content where it had no host (was AH-11, fixed 2026-11-10)
- A `$if` whose condition changed while it was off the page — inside an outer `$if` that is false, or in a component
  being torn down — mounted (or unmounted) its template anyway: `mount-point-not-found` ("its parent … has no
  rendered host element"), followed by a cascade of `Element Not Found` for its attributes, text and listeners.
  Seen in a-folder (details panel) and the a-marketplace Updates view (about 60 console errors on open).
- Fixed in `src/directives/AreDirectiveIf.directive.ts`: the directive records the new state (activates /
  deactivates its scene) but mounts or unmounts only while it is live — its anchor rendered and no ancestor's scene
  inactive — as `$for` already did. When the outer subtree comes back, the content is shown as its scene says, once.
- Test: `tests/ForInsideIf.test.ts` ("a nested $if that changes while its parent $if is false…"; fails without the fix).
- The a-folder workaround (panels hidden with a class instead of `$if`) can go after the release.

### AH-F12. The package could not be loaded in Node (`require('@adaas/are-html')` failed) (fixed 2026-11-10)
- The node build is unbundled and keeps the source's aliases (`@adaas/are-html/node`, `/attribute`, `/context`, …)
  as package imports, but `exports` declared only `"."`: Node refused them ("Package subpath './attribute' is not
  defined by exports"). Browser bundles worked (esbuild resolves differently); Node — SSR, tests, a node script that
  imports UI classes — did not. Published 0.0.29 has it.
- Now every alias of `tsconfig.json` `paths` is an exported subpath (node / import / require).
- Test: `tests/NodeExports.test.ts` (scans the node build's self-imports; loads the package in a plain Node process).

### Also in the next release
- `tests/SignalsDetached.test.ts` for `@adaas/are` ARE-F8 (signals skip removed or hidden nodes).

## Fixed — released (0.0.29)

### AH-F8. `$if` on an element with an `id` mounted once, then never again
- `<input id="x" $if="on" />`: the `$if` template is a clone that keeps the HTML id, so it had the same ASEID as its anchor node. The node-to-element index was keyed by ASEID. The template overwrote the anchor's entry, and its unmount deleted it, so the next mount threw "Mount Point Not Found" and the element never came back (a-folder's tag input).
- Fixed in `src/engine/AreHTML.context.ts`: the index is keyed by the node itself, and an entry is only deleted if it still points to the element being removed.
- Test: `tests/ForInsideIf.test.ts`.

### AH-F9. A void element's raw source became its text content (was AH-10)
- `<input class="…" @keydown="$h" />` got its attribute source as a text child (seen in DOM text scans and accessibility snapshots). Fixed in `src/engine/AreHTML.engine.ts`: self-closing and void elements have empty content. Attributes are still read from the markup.
- Test: `tests/ForInsideIf.test.ts`.

### AH-F10. Hiding a `$if` and changing a binding inside it in one `set()` threw "Element Not Found"
- Fixed in `@adaas/are` (`AreStore.notify` skips watchers torn down earlier in the same flush). See ARE-F7 there.
- Test: `tests/ForInsideIf.test.ts`.

### AH-F5. `:binding` literals rejected Unicode punctuation (was AH-1)
- Fixed in `@adaas/are` `AreSyntax.context.ts`: string-literal contents (`'…'`, `"…"`, `` `…` ``) are exempt from the ALLOWED_CHARS guard, and the guard accepts Unicode letters, numbers, marks and symbols. `:prop="'Loading…'"` and `·`, `•`, `❯` now work, so ASCII substitutes are no longer needed.

### AH-F6. Whitespace around adjacent interpolations was trimmed (was AH-2)
- `A {{x}} B {{y}}` rendered as `A xB y`. Fixed in `@adaas/are` `AreTokenizer.component.ts` (`keepBoundarySpace`). With `trimWhitespace` on, text keeps one space on any side where the source had whitespace next to an interpolation or element. This follows HTML whitespace collapsing, so pure-whitespace text nodes are still dropped. The combined-string workaround is no longer needed.
- Test: `tests/InterpolationWhitespace.test.ts`.
- **Behavior change:** text directly beside an element now keeps a single boundary space, e.g. `<b>x</b> Test` → `' Test'`. Before, it was `'Test'`.

### AH-F7. `addStaticHTML` "Element Not Found" on `$if` / `$for` placeholders
- The compiler planned a static island for a subtree whose host was the directive's placeholder comment. That failed silently until the interpreter started logging errors. Fixed in `src/engine/AreHTML.compiler.ts`: no static island is planned when the host is an `AddCommentInstruction`.
- Tests: `tests/StaticIsland.test.ts`, `tests/ForKeyedUpdate.test.ts`.

### AH-F2. `$for` keyed reuse did not re-render the item's bindings (was AH-3)
- A reused item (same `track` key) kept its old `{{ }}` / `:attr` / `$if` / nested `$for` output. Fixed in `src/directives/AreDirectiveFor.directive.ts` (`refreshItem`): when a reused item's value or index changes, its evaluating instructions and nested directives are re-run. The `JSON.stringify(row)` track-key workaround is no longer needed. Test: `tests/ForKeyedUpdate.test.ts`.

### AH-F3. Stray `$for` rows in random places after a component was detached mid-render
- A large `$for` renders in chunks. If its owner was unmounted between chunks, the remaining rows were mounted into the nearest still-mounted ancestor. Fixed: `$for` re-checks liveness before each item, and `addElement` only mounts into the direct parent's element (no ancestor walk-up). Test: `tests/ForChunkedDetach.test.ts`.

### AH-F4. Every text / interpolation node rendered an extra empty `<are-text>` / `<are-interpolation>` element
- `compileHTMLNode` also ran for `AreText` / `AreInterpolation` and planned a host element for them. Fixed in `src/engine/AreHTML.compiler.ts`. The `are-text { display: contents; }` CSS workaround is no longer needed.

### AH-F1. `.prevent`/`.stop` ran before the key-name gate (fixed 2026-07)
- `@keydown.enter.prevent` called `preventDefault()` on every key. Fixed in `src/engine/AreHTML.interpreter.ts`: modifiers now run after the key match.
