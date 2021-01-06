import { JSONRPCRequestPayload } from 'ethereum-types';
import { Callback, ErrorCallback } from '../types';
import { Subprovider } from './subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It forwards on JSON RPC requests to the supplied `rpcUrl` endpoint
 */
export declare class RPCSubprovider extends Subprovider {
    private readonly _rpcUrl;
    private readonly _requestTimeoutMs;
    /**
     * @param rpcUrl URL to the backing Ethereum node to which JSON RPC requests should be sent
     * @param requestTimeoutMs Amount of miliseconds to wait before timing out the JSON RPC request
     */
    constructor(rpcUrl: string, requestTimeoutMs?: number);
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param _next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, _next: Callback, end: ErrorCallback): Promise<void>;
}
//# sourceMappingURL=rpc_subprovider.d.ts.map