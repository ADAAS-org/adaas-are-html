declare const AreDirectiveFeatures: {
    /**
     * Feature that should transform the tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
     */
    readonly Transform: "_AreDirective_Transform";
    /**
     * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
     */
    readonly Compile: "_AreDirective_Compile";
    /**
     * Feature that should update the directiveAttribute based on the changes in the store or other dependencies.
     */
    readonly Update: "_AreDirective_Update";
};

export { AreDirectiveFeatures };
