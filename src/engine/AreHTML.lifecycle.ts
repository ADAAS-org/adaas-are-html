import { A_Caller, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { AreLifecycle, AreScene, AreAttributeFeatures, AreSignalsContext, AreNodeFeatures, AreFeatures } from "@adaas/are";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreComponentNode } from "@adaas/are-html/nodes/AreComponent";
import { AreRootNode } from "@adaas/are-html/nodes/AreRoot";
import { AreInterpolation } from "@adaas/are-html/nodes/AreInterpolation";
import { AreText } from "@adaas/are-html/nodes/AreText";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreDirectiveFeatures } from "@adaas/are-html/directive/AreDirective.constants";
import { AreHTMLEngineContext } from "./AreHTML.context";
import { AreHTMLNode } from "../lib/AreHTMLNode/AreHTMLNode";
import { A_Frame } from "@adaas/a-frame/core";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'HTML-specific lifecycle handler extending AreLifecycle. Wires DOM-aware init hooks for component nodes, root nodes, interpolations, text nodes, and directive attributes to the ARE rendering pipeline, connecting each entity to its HTML engine context and priming the scene for subsequent compilation and interpretation.'
})
export class AreHTMLLifecycle extends AreLifecycle {

    @AreLifecycle.Init(AreComponentNode)
    initComponent(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {

        if (node.component)
            signalsContext?.subscribe(node);

        super.init(node, scope, context, logger, ...args);
    }


    @AreLifecycle.Init(AreRootNode)
    initRoot(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(AreSignalsContext) signalsContext?: AreSignalsContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        signalsContext?.subscribe(node);
        super.init(node, scope, context, logger, ...args);
    }


    @AreLifecycle.Init(AreText)
    initText(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        const scene = new AreScene(node.aseid);

        scope.register(scene);
    }


    @AreLifecycle.Init(AreInterpolation)
    initInterpolation(
        @A_Inject(A_Caller) node: AreHTMLNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void {
        const scene = new AreScene(node.aseid);

        scope.register(scene);
    }

    @A_Feature.Extend({
        name: AreNodeFeatures.onMount,
        scope: [AreHTMLNode]
    })
    mount(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreHTMLNode,
        /**
         * Node Content
         */
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ): void | Promise<void> {

        logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        /**
         * Skip mounting nodes whose scene has been deactivated (e.g. $if template nodes
         * when the condition is false). Mirrors the guard in AreLifecycle.mount.
         */
        if (scene.isInactive) return;

        /**
         * Open a batching scope for the whole (synchronous) mount pass. Every
         * element created below is built into a *detached* root and attached to
         * the live DOM only when the batch flushes — turning O(nodes) reflows into
         * a single one per mount root. `try/finally` guarantees the batch closes
         * (and the depth counter stays balanced) even if interpretation throws.
         *
         * The context is resolved from the node's scope (the scope the onMount
         * feature runs in) so the override keeps the base `mount` signature.
         */
        const context = node.scope.resolve<AreHTMLEngineContext>(AreHTMLEngineContext);

        context?.beginBatch();

        /**
         * `onAfterMount` must observe the node already connected to the live
         * document (consumer components may measure layout / focus there). Since
         * the subtree is built off-document and attached only when the batch
         * flushes, we collect the post-order `onAfterMount` targets here and fire
         * them once the flush has connected everything.
         */
        const afterMountQueue: AreHTMLNode[] = [];

        try {
            /**
             * 1. Render the root of this mount itself.
             */
            node.interpret();

            /**
             * 2. Walk the descendant subtree iteratively with an explicit enter/exit
             *    stack. We keep the iterative (non-recursive) shape — it is cheaper
             *    than deep recursion and gives us a single, clear place that owns the
             *    per-node hook ordering:
             *      - enter  → onBeforeMount, then (if active) interpret + queue children
             *      - exit   → onAfterMount (fires AFTER the node's whole subtree, i.e.
             *                 post-order, matching the recursive `node.mount()` contract)
             *
             * [!] The initial mount is intentionally ATOMIC (fully synchronous). It
             *     does NOT time-slice / yield. Yielding mid-walk exposes a partially
             *     mounted tree to the event loop: any update dispatched during a gap
             *     (signal-driven re-render, async data load, etc.) interprets a node
             *     whose parent has not been mounted yet — producing
             *     `mount-point-not-found` and out-of-order DOM. The whole page must
             *     therefore appear in the DOM in one uninterrupted pass. Heavy lists
             *     are sliced at the source instead (see AreDirectiveFor), where the
             *     batching is reentrancy-safe.
             */
            interface MountFrame { node: AreHTMLNode; entered: boolean; }

            const stack: MountFrame[] = [];
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ node: node.children[i] as AreHTMLNode, entered: false });
            }

            while (stack.length > 0) {
                const frame = stack[stack.length - 1];
                const current = frame.node;

                if (frame.entered) {
                    // Post-order exit: the whole subtree below `current` is mounted.
                    // Defer the onAfterMount hook until after the batch flush so the
                    // node is connected to the live DOM when it runs.
                    stack.pop();
                    afterMountQueue.push(current);
                    continue;
                }

                frame.entered = true;

                // onBeforeMount always fires (even for inactive nodes), matching the
                // recursive AreNode.mount() semantics.
                current.call(AreNodeFeatures.onBeforeMount, current.scope);

                if (!current.scene.isInactive) {
                    current.interpret();
                    // Push children in reverse so they pop in document order.
                    for (let i = current.children.length - 1; i >= 0; i--) {
                        stack.push({ node: current.children[i] as AreHTMLNode, entered: false });
                    }
                }
            }
        } finally {
            // Flush the deferred attachments — the fully built subtree lands in the
            // live DOM in a single pass.
            context?.endBatch();
        }

        // The subtree is now connected; fire onAfterMount in the original
        // post-order, each with its node live in the document.
        for (let i = 0; i < afterMountQueue.length; i++) {
            const mounted = afterMountQueue[i];
            mounted.call(AreNodeFeatures.onAfterMount, mounted.scope);
        }
    }


    @A_Feature.Extend({
        name: AreAttributeFeatures.Update,
        scope: [AreDirectiveAttribute],
    })
    updateDirectiveAttribute(
        @A_Inject(A_Caller) directive: AreDirectiveAttribute,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        /**
         * 3. If the attribute is a directive, then we should find a component that is responsible for
         *    the directive compiling logic, and call it. 
         *    In case component is not found we just want to log a warning, 
         *    since the directive may be handled by some parent component or simply is a mistake in the template.
         */
        if (directive.component) {
            feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
        } else {
            logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
        }
    }

}