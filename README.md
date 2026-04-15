<img align="left" style="margin-right:40px; margin-bottom:80px;" width="180" height="80" src="./docs/a-logo-docs.png" alt="ADAAS Logo">

# ARE HTML Rendering Engine

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![Version](https://img.shields.io/npm/v/@adaas/a-utils)
![Downloads](https://img.shields.io/npm/dm/@adaas/a-utils)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)



## HTML Rendering Engine for the [ARE](https://github.com/ADAAS-org/adaas-are) (A-Concept Rendering Engine) framework.

`@adaas/are-html` bridges the ARE reactive scene graph to the browser DOM. It provides a full HTML compilation, interpreting, and lifecycle pipeline — turning ARE component templates written in standard HTML syntax into live, reactive DOM trees.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Template Syntax](#template-syntax)
  - [Interpolations `{{ }}`](#interpolations-)
  - [Static Attributes](#static-attributes)
  - [Dynamic Bindings `:attr`](#dynamic-bindings-attr)
  - [Event Listeners `@event`](#event-listeners-event)
  - [Conditional Rendering `$if`](#conditional-rendering-if)
  - [List Rendering `$for`](#list-rendering-for)
  - [HTML Comments](#html-comments)
- [Component Authoring](#component-authoring)
  - [`@Are.Template`](#aretemplate)
  - [`@Are.Data`](#aredata)
  - [`@Are.Styles`](#arestyles)
  - [`@Are.EventHandler`](#areeventhandler)
  - [`props`](#props)
- [Engine Architecture](#engine-architecture)
  - [AreHTMLEngine](#arehtmlengine)
  - [AreHTMLCompiler](#arehtmlcompiler)
  - [AreHTMLInterpreter](#arehtmlinterpreter)
  - [AreHTMLLifecycle](#arehtmllifecycle)
  - [AreHTMLTokenizer](#arehtmltokenizer)
  - [AreHTMLTransformer](#arehtmltransformer)
  - [AreHTMLEngineContext](#arehtmlenginecontext)
- [Nodes](#nodes)
- [Instructions](#instructions)
- [Directives](#directives)
  - [Built-in: `$if`](#built-in-if)
  - [Built-in: `$for`](#built-in-for)
  - [Custom Directives](#custom-directives)
- [Signals & Routing](#signals--routing)
  - [AreRoute](#areroute)
  - [AreRoot component](#areroot-component)
- [Watcher](#watcher)
- [API Reference](#api-reference)
- [License](#license)

---

## Overview

```
@adaas/are-html
     │
     ├── AreHTMLEngine         ← registers compiler, interpreter, tokenizer, lifecycle, transformer
     ├── AreHTMLCompiler       ← converts AreNodes + attributes into SceneInstructions
     ├── AreHTMLInterpreter    ← applies SceneInstructions to the real DOM
     ├── AreHTMLLifecycle      ← initialises nodes, subscribes to signals
     ├── AreHTMLTokenizer      ← parses HTML markup into AreHTMLNode attribute objects
     ├── AreHTMLTransformer    ← runs directive transform phase (tree restructuring)
     │
     ├── nodes/                ← AreHTMLNode, AreComponentNode, AreRootNode, AreText, AreInterpolation, AreComment
     ├── attributes/           ← AreStaticAttribute, AreBindingAttribute, AreEventAttribute, AreDirectiveAttribute
     ├── directives/           ← AreDirectiveIf ($if), AreDirectiveFor ($for)
     ├── instructions/         ← AddElement, AddText, AddAttribute, AddStyle, AddListener, AddInterpolation, AddComment
     └── signals/              ← AreRoute (client-side routing signal)
```

The engine follows a strict pipeline per node:

1. **Tokenize** — parse raw HTML markup, extract attributes
2. **Transform** — run directive transforms that may restructure the node tree
3. **Compile** — emit `SceneInstruction` objects describing DOM mutations
4. **Mount** — apply instructions through the interpreter, writing to the real DOM
5. **Update** — re-compile reactive instructions when store values change
6. **Unmount** — revert instructions and clean up the DOM

---

## Installation

```bash
npm install @adaas/are-html
```

Peer dependencies (installed automatically as transitive deps):

| Package | Purpose |
|---|---|
| `@adaas/are` | Core ARE scene graph, store, compiler, interpreter |
| `@adaas/a-concept` | Dependency injection, component model |
| `@adaas/a-frame` | Component metadata decorators |
| `@adaas/a-utils` | Logger, signal bus, execution context |

---

## Quick Start

### 1. Write a component

```typescript
import { Are, AreNode, AreStore, AreEvent } from '@adaas/are';
import { A_Caller, A_Inject } from '@adaas/a-concept';

export class CounterComponent extends Are {

    @Are.Template
    async template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(`
            <div class="counter">
                <p>Count: {{count}}</p>
                <button @click="increment">+</button>
            </div>
        `);
    }

    @Are.Data
    async data(@A_Inject(AreStore) store: AreStore) {
        store.set({ count: 0 });
    }

    @Are.EventHandler
    async increment(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set('count', store.get('count') + 1);
        await node.update();
    }
}
```

### 2. Bootstrap with `AreHTMLEngine`

```typescript
import { A_Concept, A_Context } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_SignalBus } from '@adaas/a-utils/a-signal';
import { AreInit, AreRoute } from '@adaas/are';
import { AreHTMLEngine } from '@adaas/are-html';
import { AreRoot } from '@adaas/are-html';
import { AreHTMLEngineContext } from '@adaas/are-html';
import { AreDirectiveIf, AreDirectiveFor } from '@adaas/are-html';
import { CounterComponent } from './counter.component';

// Your app container (extends A_Service or any A-Concept service)
class AppContainer extends A_Service {
    // ... build/load/start lifecycle hooks
}

const container = new AppContainer({
    name: 'my-app',
    components: [
        CounterComponent,
        AreDirectiveIf,
        AreDirectiveFor,
        AreRoot,
        AreHTMLEngine,
        A_SignalBus,
        A_Logger,
    ],
    fragments: [
        new AreHTMLEngineContext({ container: document }),
    ],
    entities: [AreInit, AreRoute],
});

const concept = new A_Concept({
    name: 'my-concept',
    containers: [container],
    components: [A_Logger],
});

await concept.load();
await concept.start();
```

### 3. `index.html`

```html
<!DOCTYPE html>
<html>
<body>
    <!-- The engine mounts onto existing DOM elements by their id -->
    <are-root id="app" default="counter-component"></are-root>
</body>
</html>
```

---

## Template Syntax

Templates are plain HTML strings written inside `node.setContent(...)` inside an `@Are.Template` method.

### Interpolations `{{ }}`

Double-curly-brace syntax renders a reactive value from the component store:

```html
<p>Hello, {{username}}!</p>
<span class="badge">{{count}}</span>
```

The value is re-evaluated and the text node is updated on every `node.update()` call.

---

### Static Attributes

Regular HTML attributes are treated as static and written directly to the DOM element:

```html
<button class="btn btn-primary" type="button">Click me</button>
<img src="/logo.png" alt="Logo" />
```

---

### Dynamic Bindings `:attr`

Prefix an attribute name with `:` to evaluate its value as a store expression:

```html
<!-- binds the "class" attribute to an expression -->
<li :class="active === item.name ? 'menu-item-active' : ''" class="menu-item">...</li>

<!-- binds href dynamically -->
<a :href="user.profileUrl">Profile</a>

<!-- binds a boolean attribute -->
<input :disabled="isLoading" />
```

The expression has access to all values in the component store.

---

### Event Listeners `@event`

Prefix an attribute name with `@` to attach a DOM event listener that fires an ARE event routed to an `@Are.EventHandler` method on the component:

```html
<button @click="handleClick">Submit</button>
<input @input="onInput" />
<form @submit="onSubmit">...</form>
```

Pass arguments to the handler:

```html
<li @click="$select(item.id)">{{item.name}}</li>
<button @click="$remove(item)">Delete</button>
```

Inside the handler use `event.get('args')` to retrieve the passed arguments.

---

### Conditional Rendering `$if`

The `$if` directive conditionally renders an element based on a store expression. When the expression is falsy the element is replaced by a comment placeholder and removed from the DOM:

```html
<!-- simple boolean -->
<div $if="isVisible">Visible content</div>

<!-- expression -->
<span $if="user.role === 'admin'">Admin panel</span>

<!-- combined with $for -->
<li $for="item in items" $if="item.badge > 0" class="menu-item">
    {{item.name}} <span class="badge">{{item.badge}}</span>
</li>
```

---

### List Rendering `$for`

The `$for` directive renders a template element for each item in a store array. It supports key, optional index, and function-call expressions:

```html
<!-- basic -->
<li $for="item in items">{{item.name}}</li>

<!-- with index -->
<tr $for="row, idx in rows">
    <td>{{idx}}</td><td>{{row.value}}</td>
</tr>

<!-- expression with parentheses -->
<li $for="(item, i) in items">{{i}}: {{item.label}}</li>

<!-- filter function defined in the store -->
<li $for="item in filter(items)">{{item.name}}</li>
```

Each generated node receives its own isolated `AreDirectiveContext` holding the item-scoped variables, so bindings like `{{item.name}}` resolve correctly per clone.

---

### HTML Comments

HTML comments are first-class nodes — they pass through to the DOM as `Comment` nodes and are also used internally by the `$if` and `$for` directives as placeholder anchors:

```html
<!-- This is a static comment -->
```

---

## Component Authoring

ARE components extend the `Are` base class from `@adaas/are`.

### `@Are.Template`

Defines the HTML structure. Called once during the compile phase.

```typescript
@Are.Template
async template(@A_Inject(A_Caller) node: AreNode) {
    node.setContent(`<div class="card">{{title}}</div>`);
}
```

### `@Are.Data`

Initialises the component store. Called once before compilation.

```typescript
@Are.Data
async data(@A_Inject(AreStore) store: AreStore) {
    store.set({ title: 'Hello World', count: 0 });
}
```

### `@Are.Styles`

Attaches scoped CSS to the component node.

```typescript
@Are.Styles
async styles(@A_Inject(A_Caller) node: AreNode) {
    node.setStyles(`
        .card { padding: 16px; border-radius: 8px; }
    `);
}
```

### `@Are.EventHandler`

Declares a DOM event handler. The method is resolved by name from the template's `@event="handlerName"` binding.

```typescript
@Are.EventHandler
async handleClick(
    @A_Inject(A_Caller)  node:  AreNode,
    @A_Inject(AreStore)  store: AreStore,
    @A_Inject(AreEvent)  event: AreEvent,
) {
    store.set('count', store.get('count') + 1);
    await node.update();
}
```

Access DOM event arguments:
```typescript
const [arg1] = event.get('args') ?? [];
const domElement = event.get('element');
```

### `props`

Define typed, default-valued props that parent components can pass via `:propName="expression"` bindings:

```typescript
export class CardComponent extends Are {
    props: Record<string, ArePropDefinition> = {
        title:    { type: 'string',  default: '' },
        disabled: { type: 'boolean', default: false },
        count:    { type: 'number',  default: 0 },
    };
}
```

Usage in a parent template:
```html
<card-component :title="selectedItem.name" :disabled="isLoading"></card-component>
```

---

## Engine Architecture

### AreHTMLEngine

The top-level engine class registered as a component in the container. On load it packages the entire pipeline:

```typescript
import { AreHTMLEngine } from '@adaas/are-html';
```

Registers: `AreHTMLCompiler`, `AreHTMLInterpreter`, `AreHTMLTokenizer`, `AreHTMLLifecycle`, `AreHTMLTransformer`, and the `AreHTMLEngineContext` context.

---

### AreHTMLCompiler

Extends `AreCompiler`. Converts visited `AreNode` / `AreAttribute` instances into `AreInstruction` objects planned onto a `AreScene`:

| Visitor target | Emits |
|---|---|
| `AreInterpolation` | `AddTextInstruction` (evaluated) |
| `AreText` | `AddTextInstruction` (static) |
| `AreStaticAttribute` | `AddAttributeInstruction` |
| `AreEventAttribute` | `AddListenerInstruction` |
| `AreBindingAttribute` | `AddAttributeInstruction` (evaluated) or prop injection |
| Directive attributes | delegated to the directive's compile method |

---

### AreHTMLInterpreter

Extends `AreInterpreter`. Applies and reverts instructions against the real DOM:

| Instruction | Apply | Revert |
|---|---|---|
| `AddElement` | `createElement` + `appendChild` / `replaceChild` | `removeChild` |
| `AddAttribute` | `setAttribute` (with cache-diff for reactive updates) | `removeAttribute` |
| `AddListener` | `addEventListener` | `removeEventListener` |
| `AddText` | `createTextNode` + `appendChild` | `removeChild` |
| `AddComment` | `createComment` + `appendChild` | `removeChild` |

---

### AreHTMLLifecycle

Extends `AreLifecycle`. Handles per-node initialisation hooks:

- `AreComponentNode` — standard init + scope registration
- `AreRootNode` — subscribes the node to the `AreSignalsContext`
- `AreText` / `AreInterpolation` — creates a lightweight `AreScene` per text node

Also manages the directive attribute update pipeline, chaining updates when store values change.

---

### AreHTMLTokenizer

Extends `AreTokenizer`. Parses the raw markup string on `AreComponentNode` and `AreRootNode`, extracting attributes and registering them into the node scope:

| Prefix | Attribute class |
|---|---|
| `$` | `AreDirectiveAttribute` |
| `:` | `AreBindingAttribute` |
| `@` | `AreEventAttribute` |
| _(none)_ | `AreStaticAttribute` |

---

### AreHTMLTransformer

Extends `AreTransformer`. Runs before compilation and delegates to a directive component's `Transform` phase for `AreDirectiveAttribute` instances. Transformations may restructure the node tree (e.g. `$if` and `$for` move original nodes into template clones before the compile cycle starts).

---

### AreHTMLEngineContext

The shared context object that maps AreNodes and instructions to their DOM nodes:

```typescript
import { AreHTMLEngineContext } from '@adaas/are-html';

// provide as a fragment during container setup
fragments: [
    new AreHTMLEngineContext({ container: document }),
]
```

Maintains internal indices for: `nodeToHostElements`, `instructionToElement`, `elementListeners`.

---

## Nodes

| Class | Description |
|---|---|
| `AreHTMLNode` | Base node class. Exposes `staticAttributes`, `bindings`, `directives`, `events`, `interpolations`, `styles`. |
| `AreComponentNode` | Generic HTML element node. Resolves a matching `Are` component instance from the scope. |
| `AreRootNode` | Special root element node (`<are-root>`). Fixed `tag = 'div'`. |
| `AreText` | Plain text node. |
| `AreInterpolation` | `{{ expression }}` node. |
| `AreComment` | HTML comment node. |

---

## Instructions

Instructions are immutable descriptions of DOM mutations that can be applied (mounted) or reverted (unmounted):

| Class | Type | Description |
|---|---|---|
| `AddElementInstruction` | `AreDeclaration` | Creates one DOM element. |
| `AddTextInstruction` | `AreDeclaration` | Creates one text node (static or evaluated). |
| `AddCommentInstruction` | `AreDeclaration` | Creates one comment node. |
| `AddAttributeInstruction` | `AreMutation` | Sets an attribute on the parent element. Supports reactive diff updates. |
| `AddStyleInstruction` | `AreMutation` | Sets an inline CSS property on the parent element. |
| `AddListenerInstruction` | `AreMutation` | Attaches a DOM event listener. |
| `AddInterpolationInstruction` | `AreMutation` | Reactive text node resolved from the store. |

---

## Directives

Directives are prefixed with `$` in templates and processed in priority order (higher number runs first):

### Built-in: `$if`

Priority: **2**

Conditionally shows or hides an element. During the transform phase the original node is wrapped in a group + comment anchor. During compile/update the inner template's scene is activated or deactivated.

```html
<div $if="isAuthenticated">Welcome back, {{username}}!</div>
```

### Built-in: `$for`

Priority: **1**

Renders a list by cloning the template node for each array item. Each clone has an isolated `AreDirectiveContext` with item-scoped variables. Supports incremental updates — unchanged items are kept, new items are appended, removed items are unmounted.

```html
<li $for="product in products">
    {{product.name}} — ${{product.price}}
</li>
```

### Custom Directives

Extend `AreDirective` and give it a priority, then implement `Transform`, `Compile`, and/or `Update` phases:

```typescript
import { AreDirective } from '@adaas/are-html';
import { AreDirectiveAttribute, AreDirectiveContext } from '@adaas/are-html';
import { A_Inject, A_Caller } from '@adaas/a-concept';
import { AreStore, AreScene } from '@adaas/are';

@AreDirective.Priority(3)
export class AreDirectivePermission extends AreDirective {

    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
    ) {
        const allowed = store.get(attribute.content);
        if (!allowed) scene.deactivate();
    }
}
```

Register the directive in your container's `components` array and name it `AreDirective<PascalCaseName>` — the tokenizer resolves components by name automatically.

---

## Signals & Routing

### AreRoute

`AreRoute` wraps an `A_Route` (path or regex) as an ARE signal. It is used to match the current `document.location.pathname` against registered route conditions:

```typescript
import { AreRoute } from '@adaas/are-html';

// Matches /dashboard or any sub-path
new AreRoute('/dashboard');

// Regex route
new AreRoute(/^\/user\/\d+/);
```

`AreRoute.default()` returns an `AreRoute` for the current pathname.

---

### AreRoot component

`AreRoot` is a built-in `Are` component that powers `<are-root>` elements. It resolves which child component to render based on incoming signals or a `default` attribute, then performs a full lifecycle cycle (tokenize → compile → mount) on the new child:

```html
<!-- render 'dashboard-component' by default -->
<are-root id="main" default="dashboard-component"></are-root>
```

Route-driven rendering uses `AreSignalsContext` / `AreSignalsMeta` to select the component; when a new signal arrives the old child is unmounted, destroyed, and replaced.

---

## Watcher

`AreWatcher` observes browser navigation events (`pushState`, `replaceState`, `popstate`, `hashchange`) and notifies handlers on URL change:

```typescript
import { AreWatcher } from '@adaas/are-html';

const watcher = new AreWatcher();
const unsubscribe = watcher.onChange((url: URL) => {
    console.log('Navigated to:', url.pathname);
});

// later
unsubscribe();
watcher.destroy();
```

---

## API Reference

| Export | Description |
|---|---|
| `AreHTMLEngine` | Main engine — register as a component |
| `AreHTMLEngineContext` | Context fragment — register as a fragment |
| `AreHTMLNode` | Base HTML node class |
| `AreHTMLAttribute` | Base attribute class |
| `AreHTMLCompiler` | Compiler (extendable) |
| `AreHTMLInterpreter` | DOM interpreter (extendable) |
| `AreHTMLLifecycle` | Node lifecycle hooks (extendable) |
| `AreHTMLTokenizer` | Markup attribute parser (extendable) |
| `AreHTMLTransformer` | Directive transform runner (extendable) |
| `AreComponentNode` | Generic element node |
| `AreRootNode` | `<are-root>` node |
| `AreText` | Text node |
| `AreInterpolation` | `{{ }}` interpolation node |
| `AreComment` | Comment node |
| `AreStaticAttribute` | Plain HTML attribute |
| `AreBindingAttribute` | `:prop` dynamic binding |
| `AreEventAttribute` | `@event` listener binding |
| `AreDirectiveAttribute` | `$directive` attribute |
| `AreDirectiveIf` | Built-in `$if` directive |
| `AreDirectiveFor` | Built-in `$for` directive |
| `AreDirective` | Base class for custom directives |
| `AreDirectiveContext` | Per-item scope context for directives |
| `AreRoot` | `<are-root>` component |
| `AreWatcher` | Browser navigation observer |
| `AreRoute` | Client-side routing signal |
| `AddElementInstruction` | DOM element creation instruction |
| `AddTextInstruction` | Text node instruction |
| `AddCommentInstruction` | Comment node instruction |
| `AddAttributeInstruction` | Attribute mutation instruction |
| `AddStyleInstruction` | Inline style mutation instruction |
| `AddListenerInstruction` | Event listener mutation instruction |
| `AddInterpolationInstruction` | Reactive interpolation instruction |
| `AreHTMLInstructions` | Instruction name constants |

---

## License

ISC © [ADAAS](https://adaas.org)

