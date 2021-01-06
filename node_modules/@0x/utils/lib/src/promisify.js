"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transforms callback-based function -- func(arg1, arg2 .. argN, callback) -- into an ES6-compatible Promise.
 * Promisify provides a default callback of the form (error, result) and rejects when `error` is not null. You can also
 * supply thisArg object as the second argument which will be passed to `apply`.
 */
// HACK: This can't be properly typed without variadic kinds https://github.com/Microsoft/TypeScript/issues/5453
function promisify(originalFn, thisArg) {
    const promisifiedFunction = (...callArgs) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const callback = (err, data) => {
                err === null || err === undefined ? resolve(data) : reject(err);
            };
            originalFn.apply(thisArg, [...callArgs, callback]);
        });
    });
    return promisifiedFunction;
}
exports.promisify = promisify;
//# sourceMappingURL=promisify.js.map