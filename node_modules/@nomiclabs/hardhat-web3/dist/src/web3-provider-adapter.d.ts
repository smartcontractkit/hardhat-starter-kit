import { EthereumProvider } from "hardhat/types";
export interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params: any[];
    id: number;
}
export interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
}
export declare class Web3HTTPProviderAdapter {
    private readonly _provider;
    constructor(provider: EthereumProvider);
    send(payload: JsonRpcRequest, callback: (error: Error | null, response?: JsonRpcResponse) => void): void;
    send(payload: JsonRpcRequest[], callback: (error: Error | null, response?: JsonRpcResponse[]) => void): void;
    isConnected(): boolean;
    private _sendJsonRpcRequest;
}
//# sourceMappingURL=web3-provider-adapter.d.ts.map