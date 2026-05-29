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