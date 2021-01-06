import { AbstractArtifactAdapter, TraceCollectionSubprovider } from '@0x/sol-tracing-utils';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It is used to report call stack traces whenever a revert occurs.
 */
export declare class RevertTraceSubprovider extends TraceCollectionSubprovider {
    private _contractsData;
    private readonly _artifactAdapter;
    private readonly _logger;
    /**
     * Instantiates a RevertTraceSubprovider instance
     * @param artifactAdapter Adapter for used artifacts format (0x, truffle, giveth, etc.)
     * @param defaultFromAddress default from address to use when sending transactions
     * @param isVerbose If true, we will log any unknown transactions. Otherwise we will ignore them
     */
    constructor(artifactAdapter: AbstractArtifactAdapter, defaultFromAddress: string, isVerbose?: boolean);
    protected _recordTxTraceAsync(address: string, data: string | undefined, txHash: string): Promise<void>;
    private _printStackTraceAsync;
}
//# sourceMappingURL=revert_trace_subprovider.d.ts.map