import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are, AreNode } from "@adaas/are";
import { AreHTMLNode } from "src";
import { MouseState } from "../signals/MouseState.signal";
import { SelectionState } from "../signals/SelectionState.signal";


/**
 * Hud — a small translucent read-out pinned to the bottom-left corner.
 *
 * It exists purely to visualise that the bus carries more than route signals:
 *   - {@link MouseState}     → live X / Y coordinates (high-frequency, throttled).
 *   - {@link SelectionState} → the number of characters currently selected.
 *
 * Because this is the only component that re-renders on every (throttled) mouse
 * move, the cost of the high-frequency signal is isolated to a tiny subtree.
 */
export class OsHud extends Are {

    protected _x: number = 0;
    protected _y: number = 0;
    protected _selection: number = 0;

    @Are.Template
    template(@A_Inject(A_Caller) node: AreNode) {
        node.setContent(this.build());
    }

    @Are.Signal(MouseState)
    onMouse(@A_Inject(MouseState) signal: MouseState) {
        this._x = signal.x;
        this._y = signal.y;
        const x = document.getElementById('hud-x');
        const y = document.getElementById('hud-y');
        if (x) x.textContent = String(this._x);
        if (y) y.textContent = String(this._y);
    }

    @Are.Signal(SelectionState)
    onSelection(@A_Inject(SelectionState) signal: SelectionState) {
        this._selection = signal.length;
        const sel = document.getElementById('hud-sel');
        if (sel) sel.textContent = String(this._selection);
    }

    protected build(): string {
        return `
            <div class="hud">
                <span class="hud-row"><b>signals</b></span>
                <span class="hud-row">MouseState&nbsp;<i>x</i> <span id="hud-x">${this._x}</span>&nbsp;<i>y</i> <span id="hud-y">${this._y}</span></span>
                <span class="hud-row">SelectionState&nbsp;<i>len</i> <span id="hud-sel">${this._selection}</span></span>
            </div>
        `;
    }

    @Are.Styles
    styles(@A_Inject(A_Caller) node: AreHTMLNode) {
        node.setStyles(`
            .hud {
                position: absolute;
                left: 16px;
                bottom: 104px;
                display: flex;
                flex-direction: column;
                gap: 2px;
                padding: 10px 14px;
                border-radius: 12px;
                background: rgba(12, 10, 24, 0.5);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                border: 1px solid rgba(255,255,255,0.08);
                font-size: 11px;
                font-family: ui-monospace, 'SF Mono', Menlo, monospace;
                color: rgba(245,245,247,0.85);
                z-index: 90;
                pointer-events: none;
            }
            .hud b { color: #c9b8ff; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; }
            .hud i { color: #8b7fb0; font-style: normal; }
            .hud-row { white-space: nowrap; }
        `);
    }
}
