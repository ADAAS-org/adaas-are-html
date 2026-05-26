import { A_Route } from "@adaas/a-utils/a-route";
import { A_Signal } from "@adaas/a-utils/a-signal";
import { AreSignal } from "@adaas/are";
import { A_Frame } from "@adaas/a-frame/core";



@A_Frame.Define({
    namespace: 'a-are-html',
    description: 'ARE signal that carries an A_Route value. Dispatched by AreWatcher on client-side navigation events (pushState, replaceState, popstate). The signal bus delivers it to all subscribed root nodes, triggering route-based conditional rendering across the component tree.'
})
export class AreRoute extends AreSignal<A_Route> {

    constructor(path: string | RegExp) {
        super({
            data: new A_Route(path)
        });
    }

    get route(): A_Route {
        return this.data;
    }

    static default(): AreRoute | undefined {
        return new AreRoute(document.location.pathname || '/');
    }


    compare(other: A_Signal<A_Route>): boolean {
        return this.route.toRegExp().test(other.data.toString());
    }
}