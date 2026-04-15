import { A_Caller, A_Context, A_FormatterHelper, A_Inject, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, ArePropDefinition, AreStore, AreNode, AreSignals, AreSignalsMeta, AreSignalsContext, AreRoute } from "@adaas/are";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreRoot',
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

        // No routing config for this root — leave the existing template content intact
        if (signalsContext && !signalsContext.hasRoot(rootId)) {
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

        // 3. Fall back to the 'default' attribute on the node directly
        //    (store props are not yet compiled at template phase)
        if (!componentName) {
            const defaultAttr = root.attributes.find(attr => attr.name === 'default');
            componentName = defaultAttr?.content;
        }

        if (!componentName) {
            logger.warning('AreRoot: No component found for initial render. Please ensure a route condition or "default" attribute is set.');
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
        console.log('Received signal vector in AreRoot:', root, vector);

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

        if (!componentName) {
            logger.warning('No component found for rendering in AreRoot. Please ensure that the signal vector matches at least one component or that a default component name is provided in the store.');
            return;
        }

        root.setContent(`<${componentName}></${componentName}>`);

        for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
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
