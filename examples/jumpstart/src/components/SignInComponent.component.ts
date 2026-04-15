import { A_Caller, A_Concept, A_Context, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreNode, AreStore } from "@adaas/are";

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function showAlert(message: string): void {
    alert(message);
}

export class SignInComponent extends Are {


    @Are.Data
    async data(
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {

        store.set({
            btnName: 'Sign In'
        });
    }

    @Are.Styles
    async styles(
        @A_Inject(A_Caller) node: AreNode,
    ): Promise<void> {
        node.setStyles(` 
        .card {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            max-width: 300px;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
        }
            `   );
    }

    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.info('blue', `SignInComponent template called... : <${node.aseid.entity}> : `, node.aseid.toString());

        node.setTemplate(`
              <div class="card">
                <h2>Sign In</h2>
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <a-btn  :name="btnName" :style="{ color: 'red' }"></a-btn>
              </div>
            `);
    }


    // @A_Feature.Extend({
    //     scope: [SignInComponent]
    // })
    // async A_UI_NODE_onBeforeLoad(
    //     @A_Inject(AreNode) node: AreNode,
    //     @A_Inject(A_Scope) scope: A_Scope,
    //     @A_Inject(A_UI_NodeStore) store: A_UI_NodeStore,
    //     @A_Inject(A_Logger) logger: A_Logger,
    // ): Promise<void> {

    //     logger.log('green', `SignInComponent is initializing... : <${node.aseid.entity}> : `, node.aseid.toString());


    //     store.data.set('btnName', 'Custom Sign In Button');
    // }


    // private addListeners(): void {
    //     const btn = document.getElementById("signInBtn") as HTMLButtonElement;
    //     btn.addEventListener("click", () => this.signIn());
    // }

    // private async signIn(): Promise<void> {
    //     const email = (document.getElementById("email") as HTMLInputElement).value;
    //     const password = (document.getElementById("password") as HTMLInputElement).value;

    //     const signInCommand = new SignInCommand({
    //         username: email,
    //         password
    //     });


    //     A_Context.scope(this).register(signInCommand);

    //     await signInCommand.execute();

    //     console.log("SignIn Command Result:", signInCommand.toJSON());
    // }


    // @A_Feature.Extend({
    //     name: A_CommandFeatures.onComplete,
    //     scope: {
    //         include: [SignInCommand]
    //     }
    // })
    // async handleSuccessSignIn(
    //     @A_Inject(A_Memory) memory: A_Memory<{ token: SerializedToken }>,
    //     @A_Inject(A_Caller) command: SignInCommand,
    // ) {

    //     console.log("Sign-in completed with result:", command.result);

    //     alert(command.result)

    //     const resultToken = await memory.get('token')

    //     const token = new Token(resultToken);

    //     memory.set('token', token as any);
    // }
}
