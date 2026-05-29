type AreHtmlAddAttributeInstructionPayload = {
    name: string;
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddElementInstructionPayload = {
    tag: string;
};
type AreHtmlAddTextInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddCommentInstructionPayload = {
    /**
     * Static string content or a dynamic getter function.
     * When a function is provided, it receives the instruction instance
     * and should return the current text value (used for interpolations).
     */
    content: string;
    evaluate?: boolean;
};
type AreHtmlAddStyleInstructionPayload = {
    /** Full CSS string to inject as a <style> block scoped to the component. Applied to the document head and reverted on unmount. */
    styles: string;
};
type AreHtmlAddListenerInstructionPayload = {
    /** DOM event name (e.g. "click", "input", "submit") */
    name: string;
    /** Event handler callback */
    handler: string;
};
type AreHtmlAddInterpolationInstructionPayload = {
    /** The interpolation key used to look up the value in the store */
    key: string;
    /** Dynamic getter function that resolves the current interpolation value */
    content: (...args: any[]) => string;
};

export type { AreHtmlAddAttributeInstructionPayload, AreHtmlAddCommentInstructionPayload, AreHtmlAddElementInstructionPayload, AreHtmlAddInterpolationInstructionPayload, AreHtmlAddListenerInstructionPayload, AreHtmlAddStyleInstructionPayload, AreHtmlAddTextInstructionPayload };
