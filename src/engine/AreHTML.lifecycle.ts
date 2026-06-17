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
import { AreSchedulerHelper } from "@adaas/are-html/helpers/AreScheduler.helper";


@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'HTML-specific lifecycle handler extending AreLifecycle. Wires DOM-aware init hooks for component nodes, root nodes, interpolations, text nodes, and directive attributes to the ARE rendering pipeline, connecting each entity to its HTML engine context and priming the scene for subsequent compilation and interpretation.'
})
export class AreHTMLLifecycle extends AreLifecycle {

    /**
     * Per-chunk time budget (ms) for the time-sliced initial mount walk. While
     * mounting a large subtree we keep applying nodes until this much wall-clock
     * time has elapsed, then yield to the browser so it can paint and process
     * input before the next chunk. ~16ms targets a single animation frame.
     */
    private static readonly MOUNT_BUDGET_MS = 16;

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
         * 1. Render the root of this mount itself.
         */
        node.interpret();

        /**
         * 2. Walk the descendant subtree iteratively with an explicit enter/exit
         *    stack so we can TIME-SLICE the work. The previous implementation
         *    recursed via `child.mount()`, which fires onBeforeMount → onMount
         *    (interpret + recurse) → onAfterMount per node and runs the whole tree
         *    in one synchronous, un-yielding block. For large initial trees that
         *    froze the main thread on first page load.
         *
         *    We replicate the exact per-node hook ordering:
         *      - enter  → onBeforeMount, then (if active) interpret + queue children
         *      - exit   → onAfterMount (fires AFTER the node's whole subtree, i.e.
         *                 post-order, matching the recursive `node.mount()` contract)
         *
         *    Small trees complete entirely within a single time budget and the
         *    handler returns `void` synchronously — a true fast-path with NO
         *    behavioural change for typical UIs. Only genuinely large trees exceed
         *    the budget, at which point we yield a macrotask (letting the browser
         *    paint / stay responsive) and resume the remaining work, returning a
         *    Promise that resolves when the whole subtree is mounted.
         */
        interface MountFrame { node: AreHTMLNode; entered: boolean; }

        const stack: MountFrame[] = [];
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push({ node: node.children[i] as AreHTMLNode, entered: false });
        }

        const step = (): void => {
            const frame = stack[stack.length - 1];
            const current = frame.node;

            if (frame.entered) {
                // Post-order exit: the whole subtree below `current` is mounted.
                stack.pop();
                current.call(AreNodeFeatures.onAfterMount, current.scope);
                return;
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
        };

        const drive = (): void | Promise<void> => {
            const start = AreSchedulerHelper.now();
            while (stack.length > 0) {
                step();
                if (stack.length > 0 && AreSchedulerHelper.now() - start >= AreHTMLLifecycle.MOUNT_BUDGET_MS) {
                    // Budget exhausted with work remaining — yield, then resume.
                    return new Promise<void>((resolve, reject) => {
                        AreSchedulerHelper.scheduleMacrotask(() => {
                            try {
                                resolve(drive());
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                }
            }
        };

        return drive();
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