import { A_Caller, A_Dependency, A_Feature, A_FormatterHelper, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_Frame } from "@adaas/a-frame/core";
import { AreCompiler, AreScene, AreCompilerError, AreStore, AreSyntax } from "@adaas/are";
import { AreDirectiveAttribute } from "@adaas/are-html/attributes/AreDirective.attribute";
import { AreStaticAttribute } from "@adaas/are-html/attributes/AreStatic.attribute";
import { AreDirectiveFeatures } from "@adaas/are-html/directive/AreDirective.constants";
import { AreEventAttribute } from "@adaas/are-html/attributes/AreEvent.attribute";
import { AreBindingAttribute } from "@adaas/are-html/attributes/AreBinding.attribute";
import { AreInterpolation } from "@adaas/are-html/nodes/AreInterpolation";
import { AreText } from "@adaas/are-html/nodes/AreText";
import { AddAttributeInstruction} from "@adaas/are-html/instructions/AddAttribute.instruction";
import { AddTextInstruction} from "@adaas/are-html/instructions/AddText.instruction";
import { AddListenerInstruction} from "@adaas/are-html/instructions/AddListener.instruction";




@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments.'
})
export class AreHTMLCompiler extends AreCompiler {

    // compile(
    //     @A_Inject(A_Caller) node: AreHTMLNode,
    //     @A_Inject(AreScene) scene: AreScene,
    //     ...args: any[]
    // ): void {
    //     super.compile(node, scene, ...args);
    // }

    // -----------------------------------------------------------------------------------------
    // -------------------------Are-Interpolation Compile Section-----------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Default compile method for interpolations, which can be overridden by specific implementations if needed.
     * 
     * @param interpolation 
     * @param scope 
     * @param scene 
     * @param store 
     * @param feature 
     */
    @AreCompiler.Compile(AreInterpolation)
    compileInterpolation(
        @A_Inject(A_Caller) interpolation: AreInterpolation,
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        // if (scene.host)
        //     console.log('Scene Host: ', scene.host);

        // let content = '';

        // logger?.debug('green', `AreHTMLCompiler: compile interpolation <${interpolation.aseid.toString()}> with key: "${interpolation.content}"`, store.get(interpolation.content));

        // try {
        //     content = AreCommonHelper.evaluate(interpolation.content, store);

        // } catch (error) {
        //     content = ''
        // }

        scene.plan(new AddTextInstruction({ content: interpolation.content, evaluate: true }));
    }

    // -----------------------------------------------------------------------------------------
    // ------------------------------Are-Text Compile Section-----------------------------------
    // -----------------------------------------------------------------------------------------
    @AreCompiler.Compile(AreText)
    compileText(
        @A_Inject(A_Caller) text: AreText,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        logger?.debug('cyan', `AreHTMLCompiler: compile text node <${text.aseid.toString()}> with content: "${text.content}"`);
        if (scene.host)
            scene.unPlan(scene.host);

        scene.plan(new AddTextInstruction({ content: text.content }));

    }

    // -----------------------------------------------------------------------------------------
    // -------------------------Are-Attribute Compile Section-----------------------------------
    // -----------------------------------------------------------------------------------------

    @AreCompiler.Compile(AreStaticAttribute)
    compileStaticAttribute(
        @A_Inject(A_Caller) attribute: AreStaticAttribute,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        if (!scene.host)
            throw new AreCompilerError({
                title: 'Scene Host Not Found',
                description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
            });

        const content = attribute.content;

        /**
         * If the attribute value contains {{ }} interpolations, transform them into
         * a JS string-concatenation expression so the interpreter can evaluate them.
         * e.g. "color:{{expr}}" → '"color:"+(expr)+""'
         */
        if (content.includes('{{')) {
            const transformed = '"' + content.replace(/\{\{([^}]+)\}\}/g, '"+($1)+"') + '"';
            scene.plan(new AddAttributeInstruction(scene.host, {
                name: attribute.name,
                content: transformed,
                evaluate: true,
            }));
            return;
        }

        /**
         * Default case: regular static attribute rendered as-is.
         */
        scene.plan(new AddAttributeInstruction(scene.host, {
            name: attribute.name,
            content: attribute.content
        }));
    }

    @AreCompiler.Compile(AreDirectiveAttribute)
    compileDirectiveAttribute(
        @A_Inject(A_Caller) directive: AreDirectiveAttribute,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        store.watch(directive);

        /**
         * 3. If the attribute is a directive, then we should find a component that is responsible for
         *    the directive compiling logic, and call it. 
         *    In case component is not found we just want to log a warning, 
         *    since the directive may be handled by some parent component or simply is a mistake in the template.
         */
        if (directive.component) {
            feature.chain(directive.component, AreDirectiveFeatures.Compile, directive.owner.scope);
        } else {
            logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(directive.name)}" to handle this directive.`);
        }

        store.unwatch(directive);
    }


    @AreCompiler.Compile(AreEventAttribute)
    compileEventAttribute(
        @A_Inject(A_Caller) attribute: AreEventAttribute,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {

        if (!scene.host)
            throw new AreCompilerError({
                title: 'Scene Host Not Found',
                description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
            });
        /**
         * 2. In case the attribute is an event listener, then 
         *    we should simply add a callback handler that will be used to proxy an event 
         *    into the ComponentNode component.  
         *[!] In this case AreAttribute is AreEventAttribute that has prepared callback function to be used 
         *    in the event listener. It is important to store callback function once 
         *    to prevent duplicated functions in case of multiple compilations during development.
         */
        scene.plan(new AddListenerInstruction(scene.host, {
            name: attribute.name,
            handler: attribute.content
        }));
    }


    @AreCompiler.Compile(AreBindingAttribute)
    compileBindingAttribute(
        @A_Inject(A_Caller) attribute: AreBindingAttribute,
        @A_Inject(AreScene) scene: AreScene,
        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        ...args: any[]
    ) {
        if (!scene.host)
            throw new AreCompilerError({
                title: 'Scene Host Not Found',
                description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
            });


        const node = attribute.owner;
        const props = node.component?.props;

        // Component prop names are typically declared in camelCase, while template
        // markup uses kebab-case. Try both forms when matching.
        let propName: string | undefined;
        if (props) {
            if (props[attribute.name]) {
                propName = attribute.name;
            } else {
                const camel = A_FormatterHelper.toCamelCase(attribute.name);
                if (props[camel]) propName = camel;
            }
        }

        /**
         * 1. Component prop binding — evaluate against the parent store and
         *    keep the child store reactive to upstream changes.
         */
        if (propName && props) {
            const propDefinition = props[propName];

            const coerce = (raw: any): any => {
                let value = raw;
                if (propDefinition.type) {
                    switch (propDefinition.type) {
                        case 'string': value = value === undefined || value === null ? '' : String(value); break;
                        case 'number': value = Number(value); break;
                        case 'boolean': value = Boolean(value); break;
                    }
                }
                return value;
            };

            // The watcher entity below is registered against parentStore so that
            // updates to the bound expression in the parent flow into the child store.
            const watcher = {
                update: () => {
                    try {
                        parentStore.watch(watcher);
                        const next = coerce(syntax.evaluate(attribute.content, parentStore));
                        parentStore.unwatch(watcher);
                        store.set(propName!, next);
                    } catch (e) {
                        parentStore.unwatch(watcher);
                    }
                }
            };

            // Initial read with watch active so dependencies are recorded.
            parentStore.watch(watcher);
            const initial = coerce(syntax.evaluate(attribute.content, parentStore));
            parentStore.unwatch(watcher);

            store.set(propName, initial);
            return;
        }

        /**
         * 2. Default attribute binding — evaluated reactively against the local store.
         */
        const instruction = new AddAttributeInstruction(scene.host, {
            name: attribute.name,
            content: attribute.content,
            evaluate: true
        })

        scene.plan(instruction);
    }


}