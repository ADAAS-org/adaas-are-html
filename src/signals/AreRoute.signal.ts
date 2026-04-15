import { A_Route } from "@adaas/a-utils/a-route";
import { A_Signal } from "@adaas/a-utils/a-signal";
import { AreSignal } from "@adaas/are";



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