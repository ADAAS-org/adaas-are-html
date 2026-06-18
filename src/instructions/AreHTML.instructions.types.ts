export type AreHtmlAddAttributeInstructionPayload = {
    name: string;
    content: string;
    evaluate?: boolean; // Optional flag to indicate if content should be evaluated as an expression
}

export type AreHtmlAddElementInstructionPayload = {
    tag: string;
}

export type AreHtmlAddTextInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string ;
    evaluate?: boolean; // Optional flag to indicate if content should be evaluated as an expression
}

export type AreHtmlAddCommentInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string ;
    evaluate?: boolean; // Optional flag to indicate if content should be evaluated as an expression

}

export type AreHtmlAddStyleInstructionPayload = {
    /** Full CSS string to inject as a <style> block scoped to the component. Applied to the document head and reverted on unmount. */
    styles: string;
}

export type AreHtmlAddStaticHTMLInstructionPayload = {
    /**
     * Verbatim inner markup of a static island, materialised on the parent
     * element in a single pass (browser-parsed `innerHTML` / cached `<template>`
     * clone). Decodes HTML entities (e.g. `&nbsp;`) for free via the parser.
     */
    html: string;
}

export type AreHtmlHideInstructionPayload = {
    /**
     * Optional explicit display value to restore when the element becomes
     * visible again. When omitted, the interpreter caches and restores the
     * element's own prior inline `display` value (Vue `v-show` semantics).
     */
    display?: string;
}

export type AreHtmlAddListenerInstructionPayload = {
    /** DOM event name (e.g. "click", "input", "submit") */
    name: string;
    /** Event handler callback */
    handler: string;
}

export type AreHtmlAddInterpolationInstructionPayload = {
    /** The interpolation key used to look up the value in the store */
    key: string;
    /** Dynamic getter function that resolves the current interpolation value */
    content: (...args: any[]) => string;
}