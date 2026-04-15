import { A_Caller, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";

import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreEvent, AreNode, AreScene, AreStore } from "@adaas/are";


export class AInput extends Are {


    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Logger) logger: A_Logger
    ) {
        logger.info('blue', `AInput template called... : <${node.aseid.entity}> : `, node.aseid.toString());

        node.setTemplate(`
            <div><input $no-update @input="onChange" :value="inputValue" type="text" :placeholder="placeholder"> </input>  {{inputValue}}</div>
            `);
    }

    @Are.Data
    async data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            placeholder: 'A_Input Element',
            inputValue: 'Test',
        });
    }


    @Are.EventHandler
    async A_UI_NODE_onBeforeLoad(
        @A_Inject(AreNode) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.log('green', `AInput is initializing... : <${node.aseid.entity}> : `, node.aseid.toString());

        // store.data.set('btnName', 'Nope');
    }


    @Are.EventHandler
    async onChange(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent<InputEvent>,
        @A_Inject(AreScene) scene: AreScene,
    ) {

        // const timeout = store.get('timeout');

        // clearTimeout(timeout);
        if (event.data.target === null
            ||
            store.get('inputValue') === (event.data.target as HTMLInputElement).value
        ) return;

        logger.log('green', `AInput onChange event triggered... : <${node.aseid.entity}> : `, node.aseid.toString(), (event.data.target as HTMLInputElement).value);



        store.set('inputValue', (event.data.target as HTMLInputElement).value);


        // store.set('timeout', setTimeout(async () => {
        await node.update();

        // }, 1000))

    }

}