import { A_FormatterHelper, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { Are } from "@adaas/are";
import { AreHTMLNode } from "@adaas/are-html/node";


@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreComponentNode',
    description: 'AreComponentNode represents a node in the scene graph that corresponds to a component. It extends the base AreNode and includes additional properties and methods specific to component nodes, such as handling attributes, bindings, directives, events, styles, and interpolations associated with the component.'
})
export class AreComponentNode extends AreHTMLNode {

    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
     * 
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     * 
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined {
        return this.scope.resolve<Are>(A_FormatterHelper.toPascalCase(this.aseid.entity)) as Are | undefined;
    }

}