# `@adaas/are-html` — Template Syntax Reference

A complete reference for the template syntax understood by the **ARE‑HTML**
engine. This document is the source of truth for building syntax highlighting,
linting, and editor tooling (Monaco / VS Code TextMate / Tree-sitter / etc.).

> Conventions in this document
>
> - `<x>` denotes a placeholder (you write something there).
> - Code blocks tagged ` ```html ` are template fragments.
> - Code blocks tagged ` ```ts ` are companion JavaScript/TypeScript code.

---

## 1. Big picture

ARE‑HTML templates look like HTML, but element attributes can carry one of
**four sigils** that alter their meaning:

| Sigil | Attribute kind   | Example                     | Purpose                              |
| :---: | ---------------- | --------------------------- | ------------------------------------ |
| _none_ | **Static**      | `class="menu-item"`         | Plain HTML attribute                 |
| `:`   | **Binding**      | `:value="user.name"`        | Reactive expression → attribute/prop |
| `@`   | **Event**        | `@click="$save"`            | DOM event listener                   |
| `$`   | **Directive**    | `$if="visible"`             | Structural / behavioral directive    |

Inside text, `{{ … }}` is a **reactive interpolation**.

### 1.1 Lexical grammar (per-attribute)

Tokenizer regex used by the engine:

```
ATTR ::= ([$:@]?[\w.-]+) ( = "..." | = '...' | = bare )?
```

Effectively:

| Pattern                     | Token kind  |
| --------------------------- | ----------- |
| `$<name>`                   | Directive   |
| `:<name>`                   | Binding     |
| `@<name>(.<modifier>)*`     | Event       |
| `<name>` (`[\w.-]+`)        | Static attr |

Attribute **values** are always JS-like expressions when carried by `:`, `@`,
`$` or `{{ … }}`. Expressions are evaluated in a sandbox over the component's
`AreStore`, so any property you `store.set(…)` is in scope as a top-level
identifier.

### 1.2 File structure of a component

A component is a TypeScript class extending `Are`. Templates live in the
decorated `template()` method:

```ts
import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode, AreStore } from "@adaas/are";

export class HelloComponent extends Are {

    @Are.Template
    async template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="hello">
                Hello, {{name}}!
                <button @click="$greet">Greet</button>
            </div>
        `);
    }

    @Are.Data
    async data(@A_Inject(AreStore) store: AreStore) {
        store.set({ name: "World" });
    }

    @Are.EventHandler
    async greet(@A_Inject(AreStore) store: AreStore) {
        store.set("name", "ARE");
    }
}
```

---

## 2. Interpolations — `{{ expression }}`

Reactive text expressions inside text content (NOT inside attribute values).

```html
<span>Hello, {{ user.name }}!</span>
<span>Total: {{ items.length }}</span>
<span>{{ count > 0 ? 'has' : 'none' }}</span>
<span>{{ a + b * 2 }}</span>
```

Rules:

1. Whitespace inside `{{ }}` is ignored.
2. The expression is JS-like; any property in the component's store is a
   top-level identifier.
3. Result is coerced to a DOM string:
   - `null` / `undefined` → `""` (empty string, not the literal text).
   - `object` → `JSON.stringify(value)`.
   - everything else → `String(value)`.
4. Re-evaluated automatically when any dependency in the store changes.
5. **Not allowed in attributes.** Use `:attr="expr"` instead.

---

## 3. Static attributes (no sigil)

Plain HTML attributes. Value is a literal string.

```html
<div class="card primary" id="main" data-role="container"></div>
```

---

## 4. Bindings — `:<attribute>`

Reactive attribute / property bindings. The right-hand side is an **expression**.

```html
<input :value="user.email" :disabled="loading">
<a :href="'/users/' + user.id">Profile</a>
<img :src="avatar || '/default.png'" :alt="user.name">
```

### 4.1 Property name matching

The framework looks up the right destination key on the child component
using both **kebab-case** and **camelCase**:

```html
<my-card :user-name="user.name"></my-card>
<!-- writes either `user-name` or `userName` into the child store, whichever exists -->
```

### 4.2 Boolean attributes

For boolean HTML attributes (`disabled`, `checked`, `readonly`, `required`,
`hidden`, `multiple`, `selected`, `open`, `autofocus`, `autoplay`, `controls`,
`loop`, `muted`, `default`, `defer`, `async`, `nomodule`, `novalidate`,
`reversed`, `ismap`, `formnovalidate`, `playsinline`, `itemscope`, `truespeed`,
`typemustmatch`, `inert`, `allowfullscreen`):

```html
<button :disabled="loading"></button>
<input  :readonly="locked">
<input  :checked="agreed" type="checkbox">
```

- Truthy → attribute is present (and corresponding IDL property set to `true`).
- Falsy  → attribute is removed (IDL property `false`).

### 4.3 IDL form properties

For form inputs, the engine uses the **IDL property** (not `setAttribute`)
when binding:

| Element / attribute                   | Set as IDL property |
| ------------------------------------- | ------------------- |
| `<input :value="…">`                  | `input.value`       |
| `<input :checked="…">`                | `input.checked`     |
| `<select :value="…">`                 | `select.value`      |
| `<textarea :value="…">`               | `textarea.value`    |
| `<option :selected="…">`              | `option.selected`   |

This means `:value` round-trips correctly even after the user types into the
input.

### 4.4 `:class` (string, array, or object)

```html
<!-- string -->
<div :class="active ? 'on' : 'off'">…</div>

<!-- array -->
<div :class="['btn', kind, isActive && 'btn-active']">…</div>

<!-- object: keys whose value is truthy are added -->
<div :class="{ 'btn': true, 'btn-primary': primary, 'btn-disabled': loading }">…</div>
```

`:class` is **merged** with any static `class="…"` on the same element — both
are preserved.

### 4.5 `:style` (string or object)

```html
<!-- string (raw CSS) -->
<div :style="'color:' + color + ';font-size:14px'">…</div>

<!-- object: camelCase or kebab-case keys; numbers get 'px' for length-like keys -->
<div :style="{ color: textColor, fontSize: '14px', marginTop: 8 }">…</div>
```

### 4.6 Other attributes

For everything else, the value is set with `setAttribute`. If the expression
evaluates to `false`, `null`, or `undefined`, the attribute is **removed**.

```html
<a :title="hover">…</a>
<img :alt="caption">
<div :data-id="row.id">…</div>
```

---

## 5. Events — `@<event>[.<modifier>…]`

Bind a DOM event to an `@Are.EventHandler` method on the component, or to an
inline expression.

### 5.1 Reference an event-handler method

When the value starts with `$<name>` it refers to an `@Are.EventHandler`
method named `<name>`:

```html
<button @click="$save">Save</button>
<button @click="$save(item, $event)">Save with args</button>
<form   @submit="$onSubmit($event)">…</form>
```

- Always available in the handler argument scope: `$event` (the DOM event).
- If no arguments are passed, the DOM event is appended automatically.
- Multiple handlers per call are allowed: `@click="$a(); $b($event)"`.

### 5.2 Inline expressions

Any expression is allowed; it runs each time the event fires:

```html
<button @click="count = count + 1">+1</button>
<a      @click="open = !open">Toggle</a>
```

### 5.3 Event modifiers

Append one or more `.<modifier>` to the event name:

| Modifier  | Effect                                                      |
| --------- | ----------------------------------------------------------- |
| `.stop`   | `event.stopPropagation()` before handler runs               |
| `.prevent`| `event.preventDefault()` before handler runs                |
| `.self`   | Only fire when `event.target === element`                   |
| `.capture`| `addEventListener(…, { capture: true })`                    |
| `.once`   | `addEventListener(…, { once: true })`                       |
| `.passive`| `addEventListener(…, { passive: true })`                    |

Modifiers can be combined in any order:

```html
<a    @click.stop.prevent="$open">Open</a>
<form @submit.prevent="$submit">…</form>
<div  @scroll.passive="$onScroll">…</div>
<div  @click.self="$onSelfOnly">…</div>
```

### 5.4 Key modifiers (keyboard events)

For `keydown` / `keyup` / `keypress`, the following keys can be used as
modifiers — handler only fires when the matching key is pressed:

| Modifier             | Matches `event.key`                  |
| -------------------- | ------------------------------------ |
| `.enter`             | `Enter`                              |
| `.esc` / `.escape`   | `Escape`                             |
| `.tab`               | `Tab`                                |
| `.space`             | `' '` (Space)                        |
| `.delete` / `.backspace` | `Delete` / `Backspace`           |
| `.up`                | `ArrowUp`                            |
| `.down`              | `ArrowDown`                          |
| `.left`              | `ArrowLeft`                          |
| `.right`             | `ArrowRight`                         |

Combined with system-key modifiers:

| Modifier  | Matches |
| --------- | ------- |
| `.ctrl`   | `event.ctrlKey`  must be true |
| `.alt`    | `event.altKey`   must be true |
| `.shift`  | `event.shiftKey` must be true |
| `.meta`   | `event.metaKey`  must be true |

System-key and key-name modifiers combine with **AND** semantics (as in Vue):
`@keydown.ctrl.enter` fires **only** when `Enter` is pressed **while** `Ctrl` is
held — never on `Ctrl` alone, nor on `Enter` alone. Every system modifier listed
must be active, and (when one or more key-name modifiers are present) at least
one of them must match the pressed key.

Examples:

```html
<input @keydown.enter="$submit">
<input @keydown.esc="$cancel">
<input @keydown.ctrl.enter="$saveDraft">
<div   @keydown.up.prevent="$moveUp">
```

### 5.5 The `$event` argument

Always available as the variable `$event` inside the handler call:

```html
<button @click="$save($event, row)">Save</button>
<input  @input="$onInput($event.target.value)">
```

### 5.6 Child → parent events

An `@event` binding placed directly on a **child-component tag** is authored in
the **parent** template, so its handler runs in the **parent** component — not in
the child instance. This is what lets a parent listen to events a child raises:

```html
<!-- parent template -->
<a-input @childsubmit="$onChildSubmit"></a-input>
```

The child raises the event by dispatching a **bubbling, composed**
`CustomEvent` from one of its internal elements; it travels up the DOM to the
child's host element, where the parent's bound handler catches it:

```ts
// child component handler
@Are.EventHandler
relay(@A_Inject(AreEvent) event: AreEvent): void {
    const el = event.get('element') as HTMLElement;
    el.dispatchEvent(new CustomEvent('childsubmit', {
        bubbles: true,
        composed: true,
        detail: { value: '…' },
    }));
}
```

The parent's handler receives the original DOM event under the `native` key, so
the payload is read from its `detail`:

```ts
// parent component handler
@Are.EventHandler
onChildSubmit(@A_Inject(AreEvent) event: AreEvent): void {
    const native = event.get('native') as CustomEvent;
    console.log(native.detail.value);
}
```

> An `@event` on a plain element (e.g. `<button @click>`) is still handled by the
> nearest enclosing component, exactly as before — only bindings on a
> child-component tag are routed to the parent.

---

## 6. Directives — `$<name>`

Structural / behavioral attributes. They have **higher priority** than other
attributes on the same element.

### 6.1 `$if="<expression>"`

Conditionally render an element subtree.

```html
<div   $if="user.isAdmin">Admin only content</div>
<span  $if="badge > 0" class="menu-badge">{{badge}}</span>
<p     $if="!loading && error">{{error}}</p>
```

- Re-evaluated reactively.
- Truthy ↔ falsy transitions mount / unmount the subtree.
- Identical truthiness across updates is a **no-op** (no remount).

> ⚠️ Do **not** combine `$if` and `$for` on the **same** element. Wrap one in a
> parent:
>
> ```html
> <!-- ✅ Right -->
> <div $if="active === 'list'">
>     <li $for="item in items">{{item.name}}</li>
> </div>
> ```

### 6.2 `$for="<binding> in <source> [track <key>]"`

Render a node once per item. The binding is one of:

```html
<li $for="item in items">…</li>
<li $for="item, i in items">…</li>
<li $for="(item, i) in items">…</li>
```

- `item`  — current value
- `i`     — current index (defaults to `index` when omitted)
- `items` — any expression returning an array

#### Stable identity: `track <expr>`

For correct reuse across reorders / removals, supply a `track` clause whose
expression yields a unique key per item. Dotted paths are supported:

```html
<li $for="row in rows track row.id">{{row.name}}</li>
<li $for="(item, i) in items track item.uid">{{item.title}}</li>
```

When `track` is omitted the engine falls back to identity by **reference**
(`===`). Use `track` whenever items can be re-created (e.g. after a
`store.set('items', [...next])`).

#### Filtering helper

Inline filtering is supported via a `filter(<source>, <key>)` helper:

```html
<li $for="item in filter(items, 'active') track item.id">{{item.name}}</li>
```

Inside `filter`, items are kept where the named property is truthy.

### 6.3 `$<custom>`

Any custom directive registered with the engine appears with the `$` prefix:

```html
<input $autofocus>
<div   $tooltip="'Click to edit'">…</div>
```

Custom directives implement `transform`, `compile`, and `update` lifecycles
on a `AreDirective` subclass. See `src/directives/AreDirectiveFor.directive.ts`
for a reference implementation.

---

## 7. Built-in scope keywords

These identifiers always exist when an expression is evaluated:

| Identifier  | Where         | Meaning                                  |
| ----------- | ------------- | ---------------------------------------- |
| `$event`    | `@event=…`    | The DOM event object                     |
| `item` / `<your-key>` | `$for=…`  | The current iteration value              |
| `index` / `<your-index>` | `$for=…` | The current iteration index             |
| store keys  | everywhere    | Anything `store.set(<key>, …)` registers |

Component instance methods decorated with `@Are.EventHandler` are exposed
under the `$` prefix in event expressions: `@click="$save"` calls `save()`.

---

## 8. Putting it together — full example

```html
<div class="dashboard" :class="{ loading: loading }">

    <h1>Hello, {{ user.name }}!</h1>

    <button :disabled="loading"
            @click.prevent="$refresh">
        Refresh
    </button>

    <input  :value="filter"
            @input="$onFilter($event.target.value)"
            @keydown.enter="$apply"
            @keydown.esc="$reset">

    <div $if="error" class="error">{{ error }}</div>

    <ul $if="!loading">
        <li $for="user in filter(users, 'active') track user.id"
            :class="{ selected: user.id === selectedId }"
            @click="$select(user)">

            <span class="name">{{ user.name }}</span>
            <span $if="user.unread > 0" class="badge">{{ user.unread }}</span>
            <button @click.stop="$remove(user)">×</button>
        </li>
    </ul>
</div>
```

---

## 9. Cheat-sheet (one-liner per case)

```html
<!-- 1. Static attribute -->
<div class="card" id="x" data-x="1"></div>

<!-- 2. Interpolation in text -->
<span>{{ value }}</span>

<!-- 3. Reactive attribute binding -->
<a :href="url"></a>

<!-- 4. Boolean attribute -->
<button :disabled="loading"></button>

<!-- 5. IDL form property -->
<input :value="email" :checked="agreed" type="checkbox">

<!-- 6. :class merge — string / array / object -->
<div :class="active ? 'on' : 'off'"></div>
<div :class="['btn', kind]"></div>
<div :class="{ on: active, big: large }"></div>

<!-- 7. :style — string or object -->
<div :style="'color:' + color"></div>
<div :style="{ color, fontSize: 14 }"></div>

<!-- 8. Custom prop binding (kebab/camel both work) -->
<my-card :user-name="user.name"></my-card>

<!-- 9. Event — handler reference -->
<button @click="$save"></button>

<!-- 10. Event — handler call with args -->
<button @click="$save(item, $event)"></button>

<!-- 11. Event — inline expression -->
<button @click="count = count + 1"></button>

<!-- 12. Event modifiers -->
<a    @click.stop.prevent="$open"></a>
<form @submit.prevent="$submit"></form>
<div  @scroll.passive="$onScroll"></div>
<div  @click.self="$onSelf"></div>
<a    @click.once="$track"></a>
<div  @click.capture="$capture"></div>

<!-- 13. Key modifiers -->
<input @keydown.enter="$submit">
<input @keydown.esc="$cancel">
<input @keydown.ctrl.enter="$saveDraft">

<!-- 14. $if -->
<div $if="visible"></div>

<!-- 15. $for, with index, with parens -->
<li $for="item in items">{{item}}</li>
<li $for="item, i in items">{{i}}: {{item}}</li>
<li $for="(item, i) in items">{{i}}: {{item}}</li>

<!-- 16. $for with track -->
<li $for="row in rows track row.id">{{row.name}}</li>

<!-- 17. $for with inline filter -->
<li $for="u in filter(users, 'active') track u.id">{{u.name}}</li>

<!-- 18. $if + $for (must be on different elements!) -->
<div $if="show">
    <li $for="x in xs track x.id">{{x.name}}</li>
</div>
```

---

## 10. Tooling reference (for Monaco / TextMate / Tree-sitter)

This section enumerates **every token kind** in a machine-friendly form so you
can wire up syntax highlighting.

### 10.1 Token kinds

| Kind                | Pattern (regex, JS flavor)                                     | Notes |
| ------------------- | --------------------------------------------------------------- | ----- |
| `tag.open`          | `<[a-zA-Z][\w-]*`                                               | Opening tag start |
| `tag.close`         | `</[a-zA-Z][\w-]*\s*>`                                          | Closing tag |
| `tag.selfClose`     | `/>`                                                            | End of self-closing tag |
| `tag.end`           | `>`                                                             | End of opening tag |
| `attr.static`       | `\b[\w-]+(?=\s*=\|\s\|>\|/)`                                    | Plain attribute name |
| `attr.binding`      | `:[\w-]+`                                                       | `:value`, `:class`, `:user-name`, … |
| `attr.event`        | `@[\w-]+(\.[\w-]+)*`                                            | `@click`, `@keydown.enter`, `@click.stop.prevent` |
| `attr.directive`    | `\$[\w-]+`                                                      | `$if`, `$for`, `$tooltip`, … |
| `attr.assign`       | `=`                                                             | Attribute assignment |
| `attr.value.dq`     | `"[^"]*"`                                                       | Double-quoted value (expression for `:`,`@`,`$`) |
| `attr.value.sq`     | `'[^']*'`                                                       | Single-quoted value |
| `attr.value.bare`   | `[^\s>/"'=]+`                                                   | Unquoted value |
| `interp.delimiter`  | `\{\{` … `\}\}`                                                 | Interpolation start/end |
| `interp.expression` | content between `{{` and `}}`                                   | JS-like expression |
| `comment.html`      | `<!--` … `-->`                                                  | HTML comment |
| `text`              | anything else                                                   | Plain text |

### 10.2 Reserved attribute names

Highlight these as **directive keywords** when prefixed with `$`:

```
if for else else-if show hide model ref slot key
```

> Currently shipped: `$if`, `$for`. The rest are reserved for future built-ins.

### 10.3 Reserved event modifiers

Highlight these as **modifier keywords** when following a `.` after an event
name:

```
stop prevent self capture once passive
enter esc escape tab space delete backspace
up down left right
ctrl alt shift meta
```

### 10.4 Inside expression values

Inside the value of `:`, `@`, `$`, and `{{ … }}`, the content is a
**JS-like expression**:

- Identifiers: `[A-Za-z_$][\w$]*`
- Member access: `\.`, `?.`
- Numbers: `\d+(\.\d+)?`
- Strings: `'…'` and `"…"` with escapes
- Operators: `+ - * / % == != === !== < > <= >= && || ?? ! ?:`
- Punctuation: `( ) [ ] , ; { }`
- Reserved literals: `true`, `false`, `null`, `undefined`

Special identifiers worth highlighting:

| Identifier | Where                | As                              |
| ---------- | -------------------- | ------------------------------- |
| `$event`   | event expressions    | `variable.special`              |
| `$<name>`  | event expressions    | `function.handler` (calls method) |
| `track`    | `$for` value         | `keyword.control` (only after `in <expr>`) |
| `in`       | `$for` value         | `keyword.control`               |
| `filter`   | `$for` value         | `support.function`              |

### 10.5 Suggested Monaco scope mapping (Monarch)

Drop-in starter for a Monaco Monarch language definition:

```js
export const areHtmlLanguage = {
    defaultToken: '',
    tokenPostfix: '.arehtml',

    keywords: ['if', 'for', 'else', 'else-if', 'show', 'hide', 'model', 'ref', 'slot', 'key'],

    eventModifiers: [
        'stop','prevent','self','capture','once','passive',
        'enter','esc','escape','tab','space','delete','backspace',
        'up','down','left','right',
        'ctrl','alt','shift','meta'
    ],

    tokenizer: {
        root: [
            [/<!--/, 'comment', '@comment'],
            [/\{\{/, { token: 'delimiter.interpolation', next: '@interp' }],
            [/<\/[a-zA-Z][\w-]*\s*>/, 'tag'],
            [/<[a-zA-Z][\w-]*/, { token: 'tag', next: '@tagAttrs' }],
            [/[^<{]+/, ''],
        ],

        comment: [
            [/-->/, 'comment', '@pop'],
            [/[^-]+/, 'comment'],
            [/./, 'comment'],
        ],

        interp: [
            [/\}\}/, { token: 'delimiter.interpolation', next: '@pop' }],
            { include: '@expr' },
        ],

        tagAttrs: [
            [/\s+/, ''],
            [/\/?>/, { token: 'tag', next: '@pop' }],

            // directive
            [/\$[\w-]+/, {
                cases: {
                    '$if|$for': 'keyword.directive.builtin',
                    '@default': 'keyword.directive'
                }
            }],

            // binding
            [/:[\w-]+/, 'attribute.name.binding'],

            // event with optional modifiers
            [/@[\w-]+(?:\.[\w-]+)*/, {
                cases: {
                    '@default': 'attribute.name.event'
                }
            }],

            // static attribute
            [/[\w-]+/, 'attribute.name'],

            [/=/, 'delimiter'],

            // expression-bearing values (anything quoted after :, @, $)
            [/"/, { token: 'string.quote', next: '@dqValue' }],
            [/'/, { token: 'string.quote', next: '@sqValue' }],
            [/[^\s>/"'=]+/, 'string'],
        ],

        dqValue: [
            [/"/, { token: 'string.quote', next: '@pop' }],
            { include: '@expr' },
        ],
        sqValue: [
            [/'/, { token: 'string.quote', next: '@pop' }],
            { include: '@expr' },
        ],

        expr: [
            [/\$event\b/, 'variable.predefined'],
            [/\$[A-Za-z_]\w*/, 'function.handler'],
            [/\b(true|false|null|undefined)\b/, 'constant.language'],
            [/\b(in|track|filter)\b/, 'keyword.control'],
            [/[A-Za-z_]\w*/, 'identifier'],
            [/\d+(\.\d+)?/, 'number'],
            [/[+\-*/%<>=!&|?:.,;()\[\]{}]+/, 'operator'],
            [/\s+/, ''],
        ],
    }
};
```

### 10.6 Suggested TextMate-style scope names

For VS Code grammars, map ARE‑HTML tokens to these scopes:

| Token                | TextMate scope                                     |
| -------------------- | -------------------------------------------------- |
| `attr.binding`       | `entity.other.attribute-name.binding.arehtml`      |
| `attr.event`         | `entity.other.attribute-name.event.arehtml`        |
| `attr.directive`     | `entity.other.attribute-name.directive.arehtml`    |
| `event.modifier`     | `keyword.other.modifier.event.arehtml`             |
| `directive.builtin`  | `keyword.control.directive.arehtml`                |
| `interp.delimiter`   | `punctuation.section.embedded.begin/end.arehtml`   |
| `interp.expression`  | `meta.embedded.expression.arehtml`                 |
| `$event`             | `variable.language.event.arehtml`                  |
| `$<handler>`         | `entity.name.function.handler.arehtml`             |
| `track` / `in` / `filter` | `keyword.control.loop.arehtml`                |

---

## 11. Notes for tooling authors

1. Treat any attribute starting with `:`, `@`, or `$` as **expression-bearing**:
   the value should be tokenized as JS, not as a literal string.
2. The set of valid event modifiers is closed (see §5.3, §5.4). Anything else
   after `@event.` is a **key name** (the framework matches `event.key === '<mod>'`).
3. The set of currently-shipped directives is `$if`, `$for`. All other `$<name>`
   should still be highlighted (custom directives), but not flagged as errors.
4. Within `$for` values, the keywords `in`, `track`, and the helper `filter`
   are reserved. The grammar is:
   `(<key> | (<key>) | <key>, <index> | (<key>, <index>)) in <expr> ( track <expr> )?`.
5. `:class` and `:style` accept string / array / object — the grammar inside is
   plain JS; only the host attribute name is special.
6. Boolean attributes and IDL form properties (see §4.2 and §4.3) are
   **runtime** behaviors only — there is no syntactic difference for the editor.
