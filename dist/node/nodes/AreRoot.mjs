import { __decorateClass } from '../chunk-EQQGB2QZ.mjs';
import { A_FormatterHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreHTMLNode } from '@adaas/are-html/node';

let AreRootNode = class extends AreHTMLNode {
  /**
   * For the root node, we can default to a generic container element like <div> since it serves as the root of the component tree and does not correspond to a specific HTML tag defined in the markup. The actual content and structure of the root node will be determined by the child nodes and components that are rendered within it, allowing for flexibility in how the root node is used and what it contains.
   */
  get tag() {
    return "div";
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(A_FormatterHelper.toPascalCase(this.aseid.entity));
  }
};
AreRootNode = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreRootNode",
    description: "AreRootNode represents the root node in the scene graph. It extends the base AreHTMLNode and includes additional properties and methods specific to the root node, such as handling the root element and its associated component."
  })
], AreRootNode);

export { AreRootNode };
//# sourceMappingURL=AreRoot.mjs.map
//# sourceMappingURL=AreRoot.mjs.map