import { JSONRPCRequestPayload, JSONRPCResponsePayload } from 'ethereum-types';
import Web3ProviderEngine = require('web3-provider-engine');
import { Callback, ErrorCallback, JSONRPCRequestPayloadWithMethod } from '../types';
/**
 * A altered version of the base class Subprovider found in [web3-provider-engine](https://github.com/MetaMask/provider-engine).
 * This one has an async/await `emitPayloadAsync` and also defined types.
 */
export declare abstract class Subprovider {
    private engine;
    protected static _createFinalPayload(payload: Partial<JSONRPCRequestPayloadWithMethod>): Partial<JSONRPCRequestPayloadWithMethod>;
    private static _getRandomId;
    /**
     * @param payload JSON RPC request payload
     * @param next A callback to pass the request to the next subprovider in the stack
     * @param end A callback called once the subprovider is done handling the request
     */
    abstract handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
    /**
     * Emits a JSON RPC payload that will then be handled by the ProviderEngine instance
     * this subprovider is a part of. The payload will cascade down the subprovider middleware
     * stack until finding the responsible entity for handling the request.
     * @param payload JSON RPC payload
     * @returns JSON RPC response payload
     */
    emitPayloadAsync(payload: Partial<JSONRPCRequestPayloadWithMethod>): Promise<JSONRPCResponsePayload>;
    /**
     * Set's the subprovider's engine to the ProviderEngine it is added to.
     * This is only called within the ProviderEngine source code, do not call
     * directly.
     * @param engine The ProviderEngine this subprovider is added to
     */
    setEngine(engine: Web3ProviderEngine): void;
}
//# sourceMappingURL=subprovider.d.ts.map