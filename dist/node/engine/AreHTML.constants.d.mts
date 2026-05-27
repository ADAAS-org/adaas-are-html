/** XML namespace URI for SVG elements. */
declare const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
/**
 * Maps namespace prefixes used in SVG/XML attributes to their canonical URIs.
 * Used by the interpreter when calling setAttributeNS / removeAttributeNS.
 */
declare const SVG_ATTRIBUTE_NS: Record<string, string>;
/**
 * Void HTML elements that cannot have children and must not have a closing tag.
 * Per the HTML5 spec these are treated as self-closing even when written as
 * `<input>` (without the trailing slash `/>`).
 *
 * Reference: https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
declare const VOID_ELEMENTS: Set<string>;
declare function isVoidElement(tagName: string): boolean;
/**
 * Boolean HTML attributes whose presence (regardless of value) implies "true",
 * and whose absence implies "false". Setting these via `setAttribute(name, value)`
 * always renders the attribute, which is wrong for reactive bindings.
 *
 * Reference: https://html.spec.whatwg.org/multipage/indices.html#attributes-3
 */
declare const BOOLEAN_ATTRIBUTES: Set<string>;
declare function isBooleanAttribute(name: string): boolean;
/**
 * Form-control IDL properties that must be set as a JS property
 * (not just an attribute) so live user input is reflected.
 *
 * `<input value="foo">` only sets the *default* value;
 * `input.value = "foo"` updates the live state.
 */
declare const IDL_FORM_PROPERTIES: Record<string, Set<string>>;
declare function isIDLFormProperty(tagName: string, attrName: string): boolean;
/**
 * Normalize a `:class` binding value into a single space-separated string.
 * Supports the common shapes:
 *   - string                                       → "a b"
 *   - array<string | object | falsy>               → ["a", { b: true, c: cond }, null]
 *   - object<string, boolean>                      → { a: true, b: false }
 */
declare function normalizeClassValue(value: any): string;
/**
 * Normalize a `:style` binding value into an inline-style string.
 * Supports:
 *   - string                                       → "color: red; font-size: 12px"
 *   - object<string, string|number>                → { color: 'red', fontSize: '12px' }
 *   - array<string | object>                       → ['color: red', { fontSize: '12px' }]
 */
declare function normalizeStyleValue(value: any): string;
/**
 * Parse a DOM event name with modifiers, e.g. "click.stop.prevent" or "keydown.enter".
 * Returns the bare event name plus the modifier set.
 */
interface ParsedEventName {
    event: string;
    modifiers: Set<string>;
}
declare function parseEventName(raw: string): ParsedEventName;
/**
 * Known event-listener modifiers that map directly to addEventListener options.
 */
declare const LISTENER_OPTION_MODIFIERS: Set<string>;
/**
 * Coerce a value into a string for DOM consumption.
 * Avoids "undefined"/"null"/"[object Object]" leaks into the DOM.
 */
declare function toDOMString(value: any): string;

export { BOOLEAN_ATTRIBUTES, IDL_FORM_PROPERTIES, LISTENER_OPTION_MODIFIERS, type ParsedEventName, SVG_ATTRIBUTE_NS, SVG_NAMESPACE, VOID_ELEMENTS, isBooleanAttribute, isIDLFormProperty, isVoidElement, normalizeClassValue, normalizeStyleValue, parseEventName, toDOMString };
