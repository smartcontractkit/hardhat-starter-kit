import { JSONRPCRequestPayload } from 'ethereum-types';
import { Callback, ErrorCallback } from '../types';
import { Subprovider } from './subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It intercepts the `eth_estimateGas` JSON RPC call and always returns a constant gas amount when queried.
 */
export declare class FakeGasEstimateSubprovider extends Subprovider {
    private readonly _constantGasAmount;
    /**
     * Instantiates an instance of the FakeGasEstimateSubprovider
     * @param constantGasAmount The constant gas amount you want returned
     */
    constructor(constantGasAmount: number);
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
//# sourceMappingURL=fake_gas_estimate_subprovider.d.ts.map