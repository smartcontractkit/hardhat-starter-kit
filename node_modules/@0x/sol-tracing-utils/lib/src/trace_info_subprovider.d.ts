import { TraceCollectionSubprovider } from './trace_collection_subprovider';
import { SubTraceInfo, TraceInfo } from './types';
export declare abstract class TraceInfoSubprovider extends TraceCollectionSubprovider {
    protected abstract _handleSubTraceInfoAsync(subTraceInfo: SubTraceInfo): Promise<void>;
    protected _handleTraceInfoAsync(_traceInfo: TraceInfo): Promise<void>;
    protected _recordTxTraceAsync(address: string, dataIfExists: string | undefined, txHash: string): Promise<void>;
}
//# sourceMappingURL=trace_info_subprovider.d.ts.map