"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this._store = [];
    }
    pushBack(val) {
        this._store.push(val);
    }
    pushFront(val) {
        this._store.unshift(val);
    }
    popFront() {
        return this._store.shift();
    }
    popBack() {
        if (this._store.length === 0) {
            return undefined;
        }
        const backElement = this._store.splice(-1, 1)[0];
        return backElement;
    }
    mergeBack(q) {
        this._store = this._store.concat(q._store);
    }
    mergeFront(q) {
        this._store = q._store.concat(this._store);
    }
    getStore() {
        return this._store;
    }
    peekFront() {
        return this._store.length >= 0 ? this._store[0] : undefined;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map