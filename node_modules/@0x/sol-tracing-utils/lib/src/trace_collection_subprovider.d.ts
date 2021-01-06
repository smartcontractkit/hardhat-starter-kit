/// <reference types="web3-provider-engine" />
import { ErrorCallback, NextCallback, Subprovider, Web3ProviderEngine } from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { JSONRPCRequestPayload } from 'ethereum-types';
export interface TraceCollectionSubproviderConfig {
    shouldCollectTransactionTraces: boolean;
    shouldCollectCallTraces: boolean;
    shouldCollectGasEstimateTraces: boolean;
}
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It collects traces of all transactions that were sent and all calls that were executed through JSON RPC. It must
 * be extended by implementing the _recordTxTraceAsync method which is called for every transaction.
 */
export declare abstract class TraceCollectionSubprovider extends Subprovider {
    protected _web3Wrapper: Web3Wrapper;
    private readonly _lock;
    private readonly _defaultFromAddress;
    private _isEnabled;
    private readonly _config;
    /**
     * Instantiates a TraceCollectionSubprovider instance
     * @param defaultFromAddress default from address to use when sending transactions
     */
    constructor(defaultFromAddress: string, config: TraceCollectionSubproviderConfig);
    /**
     * Starts trace collection
     */
    start(): void;
    /**
     * Stops trace collection
     */
    stop(): void;
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param _end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: NextCallback, _end: ErrorCallback): Promise<void>;
    /**
     * Set's the subprovider's engine to the ProviderEngine it is added to.
     * This is only called within the ProviderEngine source code, do not call
     * directly.
     * @param engine The ProviderEngine this subprovider is added to
     */
    setEngine(engine: Web3ProviderEngine): void;
    protected abstract _recordTxTraceAsync(address: string, data: string | undefined, txHash: string): Promise<void>;
    private _onTransactionSentAsync;
    private _onCallOrGasEstimateExecutedAsync;
    private _recordCallOrGasEstimateTraceAsync;
}
//# sourceMappingURL=trace_collection_subprovider.d.ts.map