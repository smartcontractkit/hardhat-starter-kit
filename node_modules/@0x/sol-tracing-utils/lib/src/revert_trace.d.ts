import { StructLog } from 'ethereum-types';
import { EvmCallStack } from './types';
/**
 * Converts linear trace to a call stack by following calls and returns
 * @param structLogs Linear trace
 * @param startAddress The address of initial context
 */
export declare function getRevertTrace(structLogs: StructLog[], startAddress: string): EvmCallStack;
//# sourceMappingURL=revert_trace.d.ts.map