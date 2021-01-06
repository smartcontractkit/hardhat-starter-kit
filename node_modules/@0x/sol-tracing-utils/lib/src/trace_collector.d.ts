import { AbstractArtifactAdapter } from './artifact_adapters/abstract_artifact_adapter';
import { ContractData, Coverage, SourceRange, Subtrace, SubTraceInfo } from './types';
export declare type SingleFileSubtraceHandler = (contractData: ContractData, subtrace: Subtrace, pcToSourceRange: {
    [programCounter: number]: SourceRange;
}, fileIndex: number) => Coverage;
/**
 * TraceCollector is used by CoverageSubprovider to compute code coverage based on collected trace data.
 */
export declare class TraceCollector {
    private readonly _artifactAdapter;
    private readonly _logger;
    private _contractsData;
    private readonly _collector;
    private readonly _singleFileSubtraceHandler;
    /**
     * Instantiates a TraceCollector instance
     * @param artifactAdapter Adapter for used artifacts format (0x, truffle, giveth, etc.)
     * @param isVerbose If true, we will log any unknown transactions. Otherwise we will ignore them
     * @param singleFileSubtraceHandler A handler function for computing partial coverage for a single file & subtrace
     */
    constructor(artifactAdapter: AbstractArtifactAdapter, isVerbose: boolean, singleFileSubtraceHandler: SingleFileSubtraceHandler);
    writeOutputAsync(): Promise<void>;
    getContractDataByTraceInfoIfExistsAsync(address: string, bytecode: string, isContractCreation: boolean): Promise<ContractData | undefined>;
    computeSingleTraceCoverageAsync(subTraceInfo: SubTraceInfo): Promise<void>;
}
//# sourceMappingURL=trace_collector.d.ts.map