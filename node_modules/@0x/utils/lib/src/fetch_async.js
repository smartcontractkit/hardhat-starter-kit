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
const isNode = require("detect-node");
require("isomorphic-fetch");
// WARNING: This needs to be imported after isomorphic-fetch: https://github.com/mo/abortcontroller-polyfill#using-it-on-browsers-without-fetch
// tslint:disable-next-line:ordered-imports
require("abortcontroller-polyfill/dist/abortcontroller-polyfill-only");
exports.fetchAsync = (endpoint, options = {}, timeoutMs = 20000) => __awaiter(this, void 0, void 0, function* () {
    if (options.signal || options.timeout) {
        throw new Error('Cannot call fetchAsync with options.signal or options.timeout. To set a timeout, please use the supplied "timeoutMs" parameter.');
    }
    let optionsWithAbortParam;
    if (!isNode) {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => {
            controller.abort();
        }, timeoutMs);
        optionsWithAbortParam = Object.assign({ signal }, options);
    }
    else {
        // HACK: the `timeout` param only exists in `node-fetch`, and not on the `isomorphic-fetch`
        // `RequestInit` type. Since `isomorphic-fetch` conditionally wraps `node-fetch` when the
        // execution environment is `Node.js`, we need to cast it to `any` in that scenario.
        optionsWithAbortParam = Object.assign({ timeout: timeoutMs }, options);
    }
    const response = yield fetch(endpoint, optionsWithAbortParam);
    return response;
});
//# sourceMappingURL=fetch_async.js.map