export declare class Queue<T> {
    private _store;
    pushBack(val: T): void;
    pushFront(val: T): void;
    popFront(): T | undefined;
    popBack(): T | undefined;
    mergeBack(q: Queue<T>): void;
    mergeFront(q: Queue<T>): void;
    getStore(): T[];
    peekFront(): T | undefined;
}
//# sourceMappingURL=queue.d.ts.map