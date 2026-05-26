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


