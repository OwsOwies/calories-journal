export interface Action<P = void> {
    readonly type: string;
    readonly payload?: P;
}

// tslint:disable-next-line no-any
export type ActionDispatcher<A extends Action<any>> = (payload?: any) => A;
