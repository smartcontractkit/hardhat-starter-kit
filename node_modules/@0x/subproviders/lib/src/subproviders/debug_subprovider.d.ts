import { JSONRPCRequestPayload } from 'ethereum-types';
import { Callback, ErrorCallback } from '../types';
import { Subprovider } from './subprovider';
export interface DebugPayloadRawTransactionAttributes {
    gasPrice: string;
    gasLimit: string;
    nonce: string;
    value: string;
    to: string;
}
export interface DebugPayload extends JSONRPCRequestPayload {
    rawTransactionAttributes?: DebugPayloadRawTransactionAttributes;
}
export declare type WithDebugPayload = (debugPayload: DebugPayload) => void;
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * For every request, a object for debugging will be sent to the function specified in the constructor
 * Useful for debugging RPC requests which are not expecting as you expect.
 */
export declare class DebugSubprovider extends Subprovider {
    private readonly _debugCallback;
    private static _generateRawTransactionAttributes;
    constructor(debugCallback?: WithDebugPayload);
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
}
//# sourceMappingURL=debug_subprovider.d.ts.map