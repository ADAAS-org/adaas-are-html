import { A_Caller, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreCompiler, AreEvent, AreIndex, AreNode, AreRouteSignal, AreScene, AreStore } from "@adaas/are";


export class ANavigation extends Are {


    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {

        console.log('ANavigation template called... : ', store
            .get('items'));

        node.setTemplate(`
            <div class="a-navigation">
                <h2>{{title}}</h2>

                <span> Navigate to: {{activeId}}</span>
                <ul>
                ${store
                .get('items')
                .map((item: string) => `
                        <li @click="navigate" class=${store.get('activeId') == item ? 'active' : ''} >
                            <a href="#${item.toLowerCase()}">${item}
                            </a>
                        </li>
                    `).join('')
            }
                </ul>
            </div>
        `);
    }


    @Are.Styles
    async styles(
        @A_Inject(A_Caller) node: AreNode,
    ): Promise<void> {
        node.setStyles(`
            .a-navigation {
                padding: 10px;
                position: absolute;
                top: 0;
                width: 250px;
                left: 0;    
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;


            }

            .a-navigation ul {
                list-style-type: none;
                padding: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .a-navigation li {
                padding: 10px 0;
                text-align: center;
                cursor: pointer;
                width: 100%;
            }

            .a-navigation li:hover {
                background-color: red;
            }

            .a-navigation li a {
                text-decoration: none;
                color: #333;
                font-weight: bold;
            }

            .a-navigation li.active a {
                color: #007BFF;
            }
        `);
    }

    @Are.Data
    async data(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            title: 'A_Navigation Component',
            items: ['Home', 'About', 'Services', 'Contact'],
        });
    }


    @Are.EventHandler
    async navigate(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent<{ target: HTMLElement }>,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreIndex) index: AreIndex,

        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,

        @A_Inject(A_SignalBus) bus: A_SignalBus,
        @A_Inject(AreCompiler) compiler: AreCompiler,
    ) {

        await bus.next(new AreRouteSignal('/home'))

        const existingItems = store.get('items') as string[];
        store.set('activeId', event.data.target.innerText);

        existingItems.push('New Item ' + Math.floor(Math.random() * 100));

        store.set('items', existingItems);

        //  drop all render plans related to this node
        // node.unmount()

        // //  load node again
        // scene.reset();
        // node.scope.deregister(scene);

        // node.scope.deregister(AreNode);

        // const newNodeScene = new AreScene(node.aseid);

        // node.scope.register(newNodeScene);

        const newNodeScene = scene;
        await this.template(node, store);


        

        compiler.index(node);

        logger?.debug(newNodeScene.debugPrefix + `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);

        for (const sceneNode of newNodeScene.nodes()) {
            if (!newNodeScene.isAttached(sceneNode)) {
                newNodeScene.attach(sceneNode)
                await sceneNode.load();
            }
        }

        console.log('Recompiled node:', node, node.scope);

        // finally compile and render
        await node.update();
    }



}