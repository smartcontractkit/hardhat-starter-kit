"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3HTTPProviderAdapter = void 0;
const util_1 = __importDefault(require("util"));
class Web3HTTPProviderAdapter {
    constructor(provider) {
        this._provider = provider;
        // We bind everything here because some test suits break otherwise
        this.send = this.send.bind(this);
        this.isConnected = this.isConnected.bind(this);
        this._sendJsonRpcRequest = this._sendJsonRpcRequest.bind(this);
    }
    send(payload, callback) {
        if (!Array.isArray(payload)) {
            util_1.default.callbackify(() => this._sendJsonRpcRequest(payload))(callback);
            return;
        }
        util_1.default.callbackify(async () => {
            const responses = [];
            for (const request of payload) {
                const response = await this._sendJsonRpcRequest(request);
                responses.push(response);
                if (response.error !== undefined) {
                    break;
                }
            }
            return responses;
        })(callback);
    }
    isConnected() {
        return true;
    }
    async _sendJsonRpcRequest(request) {
        const response = {
            id: request.id,
            jsonrpc: "2.0",
        };
        try {
            const result = await this._provider.send(request.method, request.params);
            response.result = result;
        }
        catch (error) {
            if (error.code === undefined) {
                throw error;
            }
            response.error = {
                code: error.code ? +error.code : 404,
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
exports.Web3HTTPProviderAdapter = Web3HTTPProviderAdapter;
//# sourceMappingURL=web3-provider-adapter.js.map