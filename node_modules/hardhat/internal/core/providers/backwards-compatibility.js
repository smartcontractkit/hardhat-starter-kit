"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackwardsCompatibilityProviderAdapter = void 0;
const util_1 = __importDefault(require("util"));
const event_emitter_1 = require("../../util/event-emitter");
class BackwardsCompatibilityProviderAdapter extends event_emitter_1.EventEmitterWrapper {
    constructor(_provider) {
        super(_provider);
        this._provider = _provider;
        // We bind everything here because some test suits break otherwise
        this.sendAsync = this.sendAsync.bind(this);
        this.send = this.send.bind(this);
        this._sendJsonRpcRequest = this._sendJsonRpcRequest.bind(this);
    }
    request(args) {
        return this._provider.request(args);
    }
    send(method, params) {
        return this._provider.request({ method, params });
    }
    sendAsync(payload, callback) {
        util_1.default.callbackify(() => this._sendJsonRpcRequest(payload))(callback);
    }
    async _sendJsonRpcRequest(request) {
        const response = {
            id: request.id,
            jsonrpc: "2.0",
        };
        try {
            response.result = await this._provider.request({
                method: request.method,
                params: request.params,
            });
        }
        catch (error) {
            if (error.code === undefined) {
                // tslint:disable-next-line only-hardhat-error
                throw error;
            }
            response.error = {
                code: error.code ? +error.code : -1,
                message: error.message,
                data: {
                    stack: error.stack,
                    name: error.name,
                },
            };
        }
        return response;
    }
}
exports.BackwardsCompatibilityProviderAdapter = BackwardsCompatibilityProviderAdapter;
//# sourceMappingURL=backwards-compatibility.js.map