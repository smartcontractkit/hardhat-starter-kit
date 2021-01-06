import { StructLog } from 'ethereum-types';
export interface ContractAddressToTraces {
    [contractAddress: string]: StructLog[];
}
/**
 * Converts linear stack trace to `ContractAddressToTraces`.
 * @param structLogs stack trace
 * @param startAddress initial context address
 */
export declare function getContractAddressToTraces(structLogs: StructLog[], startAddress: string): ContractAddressToTraces;
//# sourceMappingURL=trace.d.ts.map