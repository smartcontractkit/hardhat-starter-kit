import { EIP1193Provider, EthereumProvider, JsonRpcRequest, JsonRpcResponse, RequestArguments } from "../../../types";
import { EventEmitterWrapper } from "../../util/event-emitter";
export declare class BackwardsCompatibilityProviderAdapter extends EventEmitterWrapper implements EthereumProvider {
    private readonly _provider;
    constructor(_provider: EIP1193Provider);
    request(args: RequestArguments): Promise<unknown>;
    send(method: string, params?: any[]): Promise<any>;
    sendAsync(payload: JsonRpcRequest, callback: (error: any, response: JsonRpcResponse) => void): void;
    private _sendJsonRpcRequest;
}
//# sourceMappingURL=backwards-compatibility.d.ts.map