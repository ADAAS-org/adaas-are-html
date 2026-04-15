import { Are } from '@adaas/are';
import { e as AreHTMLNode } from '../AreBinding.attribute-C6qrxN8K.mjs';
import '@adaas/a-concept';
import '../lib/AreStyle/AreStyle.context.mjs';

declare class AreComponentNode extends AreHTMLNode {
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined;
}

export { AreComponentNode };
