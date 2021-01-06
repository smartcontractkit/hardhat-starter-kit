import { OpCode, StructLog } from 'ethereum-types';
import { ContractData, LineColumn, SingleFileSourceRange } from './types';
export declare const utils: {
    compareLineColumn(lhs: LineColumn, rhs: LineColumn): number;
    removeHexPrefix(hex: string): string;
    isRangeInside(childRange: SingleFileSourceRange, parentRange: SingleFileSourceRange): boolean;
    isRangeEqual(childRange: SingleFileSourceRange, parentRange: SingleFileSourceRange): boolean;
    bytecodeToBytecodeRegex(bytecode: string): string;
    getContractDataIfExists(contractsData: ContractData[], bytecode: string): ContractData | undefined;
    isCallLike(op: OpCode): boolean;
    isEndOpcode(op: OpCode): boolean;
    getAddressFromStackEntry(stackEntry: string): string;
    normalizeStructLogs(structLogs: StructLog[]): StructLog[];
    getRange(sourceCode: string, range: SingleFileSourceRange): string;
    shortenHex(hex: string, length: number): string;
};
//# sourceMappingURL=utils.d.ts.map