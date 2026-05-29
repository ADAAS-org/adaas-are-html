import { A_Caller, A_Context, A_FormatterHelper, A_Inject, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, ArePropDefinition, AreStore, AreNode, AreSignals, AreSignalsMeta, AreSignalsContext } from "@adaas/are";
import { AreRoute } from "@adaas/are-html/signals/AreRoute.signal";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions.'
})
export class AreRoot extends Are {

    props: Record<string, ArePropDefinition> = {
        default: {
            type: 'string',
            default: '',
        }
    }


    @Are.Template
    async template(
        @A_Inject(A_Caller) root: AreNode,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
    ) {

        const rootId = root.id;

        // No routing config for this root — but still honour body content or
        // a 'default' attribute if one is present on the markup.
        if (signalsContext && !signalsContext.hasRoot(rootId)) {
            if (!root.content?.trim()) {
                // Fallback: legacy default= attribute
                const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
                const defaultComponent = defaultMatch?.[1];
                if (defaultComponent) {
                    root.setContent(`<${defaultComponent}></${defaultComponent}>`);
                }
            }
            // Body content (or none) — tokenizer picks it up without intervention
            return;
        }

        const currentRoute = AreRoute.default();

        let componentName: string | undefined;

        if (currentRoute) {
            const initialVector = new A_SignalVector([currentRoute]);

            // 1. Lookup via AreSignalsContext (per root-id conditions)
            let renderTarget = signalsContext?.findComponentByVector(rootId, initialVector);

            // 2. Fall back to global AreSignalsMeta
            if (!renderTarget) {
                const signalsMeta = A_Context.meta<AreSignalsMeta>(AreSignals);
                renderTarget = signalsMeta?.findComponentByVector(initialVector);
            }

            if (renderTarget?.name) {
                componentName = A_FormatterHelper.toKebabCase(renderTarget.name);
            }
        }

        // 3. Fall back to body content (the nodes already placed inside the
        //    <are-root> tag act as the default).  No setContent() call needed —
        //    the tokenizer will process root.content as-is.
        if (!componentName) {
            if (root.content?.trim()) {
                return;
            }
        }

        // 4. Last resort: legacy default= attribute on the markup.
        if (!componentName) {
            const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
            componentName = defaultMatch?.[1];
        }

        if (!componentName) {
            logger.warning('AreRoot: No component found for initial render. Provide body content, a route condition, or a "default" attribute.');
            return;
        }

        root.setContent(`<${componentName}></${componentName}>`);
    }


    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) root: AreNode,
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreStore) store: AreStore<{ default: string }>,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
    ) {
        const rootId = root.id;

        // No routing config for this root — signals do not affect its content
        if (signalsContext && !signalsContext.hasRoot(rootId)) {
            return;
        }

        // 1. Try root-specific lookup via AreSignalsContext (keyed by the are-root's id attribute)
        let renderTarget = signalsContext?.findComponentByVector(rootId, vector);

        // 2. Fall back to global AreSignalsMeta lookup
        if (!renderTarget) {
            const signalsMeta = A_Context.meta<AreSignalsMeta>(AreSignals);
            renderTarget = signalsMeta?.findComponentByVector(vector);
        }

        const componentName = renderTarget?.name
            ? A_FormatterHelper.toKebabCase(renderTarget.name)
            : store.get('default');

        // No matching condition for this signal vector (e.g. AreInit before any route).
        // Keep the current outlet content and do nothing.
        if (!componentName) {
            return;
        }

        root.setContent(`<${componentName}></${componentName}>`);

        // Unsubscribe old children BEFORE destroying them.
        // Without this, AreSignals.handleSignalVector keeps iterating stale
        // (scope-less) nodes on every subsequent signal and throws an error.
        for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
            signalsContext?.unsubscribe(child);
            child.unmount();
            child.destroy();
            root.removeChild(child);
        }


        root.tokenize();

        for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
            child.init();

            const res = child.load();
            if (res instanceof Promise) {
                await res;
            }
            child.transform();

            child.compile();
            child.mount();
        }
    }
}
