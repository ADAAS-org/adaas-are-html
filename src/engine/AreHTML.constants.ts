// ─────────────────────────────────────────────────────────────────────────────
// ── SVG ──────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/** XML namespace URI for SVG elements. */
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/**
 * Maps namespace prefixes used in SVG/XML attributes to their canonical URIs.
 * Used by the interpreter when calling setAttributeNS / removeAttributeNS.
 */
export const SVG_ATTRIBUTE_NS: Record<string, string> = {
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
};

// ─────────────────────────────────────────────────────────────────────────────
// ── HTML void elements ────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Void HTML elements that cannot have children and must not have a closing tag.
 * Per the HTML5 spec these are treated as self-closing even when written as
 * `<input>` (without the trailing slash `/>`).
 *
 * Reference: https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
export const VOID_ELEMENTS = new Set<string>([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

export function isVoidElement(tagName: string): boolean {
    return VOID_ELEMENTS.has(tagName.toLowerCase());
}

/**
 * Boolean HTML attributes whose presence (regardless of value) implies "true",
 * and whose absence implies "false". Setting these via `setAttribute(name, value)`
 * always renders the attribute, which is wrong for reactive bindings.
 *
 * Reference: https://html.spec.whatwg.org/multipage/indices.html#attributes-3
 */
export const BOOLEAN_ATTRIBUTES = new Set<string>([
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'inert',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected',
]);

export function isBooleanAttribute(name: string): boolean {
    return BOOLEAN_ATTRIBUTES.has(name.toLowerCase());
}

/**
 * Form-control IDL properties that must be set as a JS property
 * (not just an attribute) so live user input is reflected.
 *
 * `<input value="foo">` only sets the *default* value;
 * `input.value = "foo"` updates the live state.
 */
export const IDL_FORM_PROPERTIES: Record<string, Set<string>> = {
    INPUT: new Set(['value', 'checked', 'indeterminate']),
    TEXTAREA: new Set(['value']),
    SELECT: new Set(['value']),
    OPTION: new Set(['selected']),
};

export function isIDLFormProperty(tagName: string, attrName: string): boolean {
    const set = IDL_FORM_PROPERTIES[tagName.toUpperCase()];
    return !!set && set.has(attrName);
}

/**
 * Normalize a `:class` binding value into a single space-separated string.
 * Supports the common shapes:
 *   - string                                       → "a b"
 *   - array<string | object | falsy>               → ["a", { b: true, c: cond }, null]
 *   - object<string, boolean>                      → { a: true, b: false }
 */
export function normalizeClassValue(value: any): string {
    if (value === null || value === undefined || value === false) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);

    if (Array.isArray(value)) {
        return value.map(normalizeClassValue).filter(Boolean).join(' ');
    }
    if (typeof value === 'object') {
        const parts: string[] = [];
        for (const key of Object.keys(value)) {
            if (value[key]) parts.push(key);
        }
        return parts.join(' ');
    }
    return '';
}

/**
 * Normalize a `:style` binding value into an inline-style string.
 * Supports:
 *   - string                                       → "color: red; font-size: 12px"
 *   - object<string, string|number>                → { color: 'red', fontSize: '12px' }
 *   - array<string | object>                       → ['color: red', { fontSize: '12px' }]
 */
export function normalizeStyleValue(value: any): string {
    if (value === null || value === undefined || value === false) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);

    if (Array.isArray(value)) {
        return value.map(normalizeStyleValue).filter(Boolean).join('; ');
    }
    if (typeof value === 'object') {
        const parts: string[] = [];
        for (const key of Object.keys(value)) {
            const v = value[key];
            if (v === null || v === undefined || v === false) continue;
            const kebab = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            parts.push(`${kebab}: ${v}`);
        }
        return parts.join('; ');
    }
    return '';
}

/**
 * Parse a DOM event name with modifiers, e.g. "click.stop.prevent" or "keydown.enter".
 * Returns the bare event name plus the modifier set.
 */
export interface ParsedEventName {
    event: string;
    modifiers: Set<string>;
}

export function parseEventName(raw: string): ParsedEventName {
    const [event, ...modifiers] = raw.split('.');
    return { event, modifiers: new Set(modifiers) };
}

/**
 * Known event-listener modifiers that map directly to addEventListener options.
 */
export const LISTENER_OPTION_MODIFIERS = new Set(['capture', 'once', 'passive']);

/**
 * Coerce a value into a string for DOM consumption.
 * Avoids "undefined"/"null"/"[object Object]" leaks into the DOM.
 */
export function toDOMString(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
        return JSON.stringify(value);
    } catch {
        return '';
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ── Static-island detection ──────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard HTML element names that are safe to materialise wholesale via
 * `innerHTML` / a cached `<template>` clone.
 *
 * The set is intentionally an allow-list of plain HTML flow/phrasing/table/list
 * /form-display tags. Anything NOT in this set — custom elements, registered
 * ARE components (resolved by PascalCase tag), and SVG/MathML elements — is
 * excluded so those subtrees keep flowing through the normal per-node pipeline
 * (SVG needs createElementNS; components need their own lifecycle).
 */
export const STANDARD_HTML_TAGS = new Set<string>([
    // root / sections
    'html', 'body', 'header', 'footer', 'main', 'nav', 'section', 'article',
    'aside', 'address', 'hgroup',
    // headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // grouping
    'div', 'p', 'span', 'pre', 'blockquote', 'figure', 'figcaption',
    'hr', 'br', 'wbr',
    // lists
    'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'menu',
    // text-level / phrasing
    'a', 'b', 'i', 'u', 's', 'em', 'strong', 'small', 'mark', 'abbr', 'cite',
    'q', 'code', 'kbd', 'samp', 'var', 'sub', 'sup', 'time', 'data', 'dfn',
    'bdi', 'bdo', 'ruby', 'rt', 'rp', 'del', 'ins',
    // media / embedded (no special namespace handling needed)
    'img', 'picture', 'source', 'figure', 'audio', 'video', 'track',
    // tables
    'table', 'caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot',
    'tr', 'th', 'td',
    // forms (display only — these still render fine from innerHTML)
    'label', 'fieldset', 'legend', 'datalist', 'option', 'optgroup', 'output',
    'progress', 'meter',
    // interactive
    'details', 'summary', 'dialog',
]);

/**
 * Detects whether an inner-markup string is a fully *static island* — i.e. it
 * contains no ARE-reactive constructs and therefore can be rendered in one shot
 * (browser-parsed `innerHTML` / cached `<template>` clone) instead of being
 * exploded into one AreNode per element/text/interpolation.
 *
 * A subtree is static iff it contains:
 *   1. no `{{ }}` interpolations, and
 *   2. no dynamic attributes (`$`-directive / `:`-binding / `@`-event), and
 *   3. only standard HTML tags (no custom elements, ARE components or SVG).
 *
 * The scanner is quote-aware so a `:` / `@` / `$` inside an attribute *value*
 * (e.g. `href="http://…"`, `style="color:red"`) is never mistaken for a
 * dynamic-attribute prefix. The detector is deliberately conservative: any
 * ambiguity resolves to `false` (skip the optimisation, keep the safe path).
 *
 * NOTE: pure-text content (no tags at all) is also considered static — this is
 * what lets `&nbsp;`, `&amp;`, `&#160;` and friends decode correctly, since the
 * browser HTML parser handles entities that hand-built text nodes do not.
 */
export function isStaticMarkup(inner: string): boolean {
    if (!inner) return false;
    // 1. interpolations make the subtree dynamic
    if (inner.indexOf('{{') !== -1) return false;

    const n = inner.length;
    let i = 0;

    while (i < n) {
        const lt = inner.indexOf('<', i);
        if (lt === -1) break; // remaining content is plain text — safe

        // HTML comment — inert, skip over it
        if (inner.startsWith('<!--', lt)) {
            const end = inner.indexOf('-->', lt + 4);
            if (end === -1) return false; // malformed
            i = end + 3;
            continue;
        }

        // closing tag, doctype or processing instruction — skip to its '>'
        if (inner[lt + 1] === '/' || inner[lt + 1] === '!' || inner[lt + 1] === '?') {
            const gt = inner.indexOf('>', lt);
            if (gt === -1) return false;
            i = gt + 1;
            continue;
        }

        // opening tag — extract the tag name
        const nameMatch = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(inner.slice(lt));
        if (!nameMatch) { i = lt + 1; continue; }

        const tag = nameMatch[1].toLowerCase();
        // custom element / ARE component / non-standard (incl. SVG) → not static
        if (tag.indexOf('-') !== -1 || !STANDARD_HTML_TAGS.has(tag)) return false;

        // walk the opening tag (quote-aware) to find its closing '>' and inspect
        // attribute-name boundaries for dynamic prefixes
        let j = lt + nameMatch[0].length;
        let inSingle = false;
        let inDouble = false;
        let atNameBoundary = true; // true right after whitespace / '/' inside a tag
        let tagEnd = -1;

        while (j < n) {
            const ch = inner[j];

            if (inDouble) {
                if (ch === '"') inDouble = false;
            } else if (inSingle) {
                if (ch === "'") inSingle = false;
            } else if (ch === '"') {
                inDouble = true;
                atNameBoundary = false;
            } else if (ch === "'") {
                inSingle = true;
                atNameBoundary = false;
            } else if (ch === '>') {
                tagEnd = j;
                break;
            } else if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '/') {
                atNameBoundary = true;
            } else {
                // a dynamic-attribute prefix only counts when it STARTS an
                // attribute name (i.e. sits at a name boundary, outside quotes)
                if (atNameBoundary && (ch === '$' || ch === ':' || ch === '@')) {
                    return false;
                }
                atNameBoundary = false;
            }
            j++;
        }

        if (tagEnd === -1) return false; // unterminated tag — bail to safe path
        i = tagEnd + 1;
    }

    return true;
}


