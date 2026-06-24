import { AreSignal } from "@adaas/are";
import { A_Frame } from "@adaas/a-frame/core";


/**
 * MouseState — the live pointer-position signal.
 *
 * Emitted (throttled) from a global `mousemove` listener wired up in the
 * browser bootstrap. It is a *state* signal, not an event: the bus keeps only
 * the latest value, so any component that mounts later still sees the current
 * pointer position.
 *
 * This example uses it to drive the corner HUD's live coordinates and to prove
 * that several unrelated signal TYPES can travel the same bus and be consumed
 * by `@Are.Signal(MouseState)` typed handlers without interfering with routing.
 */
@A_Frame.Define({
    namespace: 'a-are-os-desktop',
    description: 'Live pointer-position state signal {x, y}. Emitted throttled from a global mousemove listener and consumed by the HUD via a typed @Are.Signal(MouseState) handler.'
})
export class MouseState extends AreSignal<{ x: number; y: number }> {

    constructor(x: number, y: number) {
        super({ data: { x, y } });
    }

    get x(): number {
        return this.data.x;
    }

    get y(): number {
        return this.data.y;
    }
}
