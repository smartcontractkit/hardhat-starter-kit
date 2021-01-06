/**
 * Transforms callback-based function -- func(arg1, arg2 .. argN, callback) -- into an ES6-compatible Promise.
 * Promisify provides a default callback of the form (error, result) and rejects when `error` is not null. You can also
 * supply thisArg object as the second argument which will be passed to `apply`.
 */
export declare function promisify<T>(originalFn: (...args: any[]) => void, thisArg?: any): (...callArgs: any[]) => Promise<T>;
//# sourceMappingURL=promisify.d.ts.map