import { AreSignal } from "@adaas/are";
import { A_Frame } from "@adaas/a-frame/core";


/**
 * SelectionState — the current text-selection signal.
 *
 * Emitted from a global `selectionchange` listener wired up in the browser
 * bootstrap. Carries the selected text and its length. Like {@link MouseState}
 * it is a *state* signal — the bus retains the latest selection.
 *
 * Two unrelated consumers react to it, demonstrating cross-component reuse of a
 * single signal: the OS HUD shows "N chars selected", and the Marketing app
 * (when open) offers to turn the current selection into a hashtag. Neither
 * consumer knows about the other.
 */
@A_Frame.Define({
    namespace: 'a-are-os-desktop',
    description: 'Current text-selection state signal {text, length}. Emitted from a global selectionchange listener and consumed independently by the OS HUD and the Marketing app.'
})
export class SelectionState extends AreSignal<{ text: string; length: number }> {

    constructor(text: string) {
        super({ data: { text, length: text.length } });
    }

    get text(): string {
        return this.data.text;
    }

    get length(): number {
        return this.data.length;
    }
}
