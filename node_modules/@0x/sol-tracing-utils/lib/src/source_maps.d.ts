import { OffsetToLocation, SourceCodes, SourceRange, Sources } from './types';
export interface SourceLocation {
    offset: number;
    length: number;
    fileIndex: number;
}
/**
 * Receives a string with newlines and returns a map of byte offset to LineColumn
 * @param str A string to process
 */
export declare function getOffsetToLocation(str: string): OffsetToLocation;
/**
 * Parses a sourcemap string.
 * The solidity sourcemap format is documented here: https://github.com/ethereum/solidity/blob/develop/docs/miscellaneous.rst#source-mappings
 * @param indexToSourceCode index to source code
 * @param srcMap source map string
 * @param bytecodeHex contract bytecode
 * @param indexToSource index to source file path
 */
export declare function parseSourceMap(sourceCodes: SourceCodes, srcMap: string, bytecodeHex: string, sources: Sources): {
    [programCounter: number]: SourceRange;
};
//# sourceMappingURL=source_maps.d.ts.map