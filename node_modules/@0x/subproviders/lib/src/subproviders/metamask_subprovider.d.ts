import { JSONRPCRequestPayload, SupportedProvider } from 'ethereum-types';
import { Callback, ErrorCallback } from '../types';
import { Subprovider } from './subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine)
 * subprovider interface and the provider sendAsync interface.
 * It handles inconsistencies with Metamask implementations of various JSON RPC methods.
 * It forwards JSON RPC requests involving the domain of a signer (getAccounts,
 * sendTransaction, signMessage etc...) to the provider instance supplied at instantiation. All other requests
 * are passed onwards for subsequent subproviders to handle.
 */
export declare class MetamaskSubprovider extends Subprovider {
    private readonly _web3Wrapper;
    private readonly _provider;
    /**
     * Instantiates a new MetamaskSubprovider
     * @param supportedProvider Web3 provider that should handle  all user account related requests
     */
    constructor(supportedProvider: SupportedProvider);
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
    /**
     * This method conforms to the provider sendAsync interface.
     * Allowing the MetamaskSubprovider to be used as a generic provider (outside of Web3ProviderEngine) with the
     * addition of wrapping the inconsistent Metamask behaviour
     * @param payload JSON RPC payload
     * @return The contents nested under the result key of the response body
     */
    sendAsync(payload: JSONRPCRequestPayload, callback: ErrorCallback): void;
}
//# sourceMappingURL=metamask_subprovider.d.ts.map