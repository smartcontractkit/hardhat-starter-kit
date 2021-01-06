"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderWrapper = void 0;
const event_emitter_1 = require("../../util/event-emitter");
const errors_1 = require("./errors");
class ProviderWrapper extends event_emitter_1.EventEmitterWrapper {
    constructor(_wrappedProvider) {
        super(_wrappedProvider);
        this._wrappedProvider = _wrappedProvider;
    }
    _getParams(args) {
        const params = args.params;
        if (params === undefined) {
            return [];
        }
        if (!Array.isArray(params)) {
            // -32000	is Invalid input according to https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md#error-codes
            // tslint:disable-next-line only-hardhat-error
            throw new errors_1.ProviderError("Hardhat Network doesn't support JSON-RPC params sent as an object", -32000);
        }
        return params;
    }
}
exports.ProviderWrapper = ProviderWrapper;
//# sourceMappingURL=wrapper.js.map