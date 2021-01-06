import { AbiDefinition, DecodedLogArgs, LogEntry, LogWithDecodedArgs, RawLog } from 'ethereum-types';
import { DecodedCalldata } from './types';
/**
 * AbiDecoder allows you to decode event logs given a set of supplied contract ABI's. It takes the contract's event
 * signature from the ABI and attempts to decode the logs using it.
 */
export declare class AbiDecoder {
    private readonly _eventIds;
    private readonly _selectorToFunctionInfo;
    /**
     * Retrieves the function selector from calldata.
     * @param calldata hex-encoded calldata.
     * @return hex-encoded function selector.
     */
    private static _getFunctionSelector;
    /**
     * Instantiate an AbiDecoder
     * @param abiArrays An array of contract ABI's
     * @return AbiDecoder instance
     */
    constructor(abiArrays: AbiDefinition[][]);
    /**
     * Attempt to decode a log given the ABI's the AbiDecoder knows about.
     * @param log The log to attempt to decode
     * @return The decoded log if the requisite ABI was available. Otherwise the log unaltered.
     */
    tryToDecodeLogOrNoop<ArgsType extends DecodedLogArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    /**
     * Decodes calldata for a known ABI.
     * @param calldata hex-encoded calldata.
     * @param contractName used to disambiguate similar ABI's (optional).
     * @return Decoded calldata. Includes: function name and signature, along with the decoded arguments.
     */
    decodeCalldataOrThrow(calldata: string, contractName?: string): DecodedCalldata;
    /**
     * Adds a set of ABI definitions, after which calldata and logs targeting these ABI's can be decoded.
     * Additional properties can be included to disambiguate similar ABI's. For example, if two functions
     * have the same signature but different parameter names, then their ABI definitions can be disambiguated
     * by specifying a contract name.
     * @param abiDefinitions ABI definitions for a given contract.
     * @param contractName Name of contract that encapsulates the ABI definitions (optional).
     *                     This can be used when decoding calldata to disambiguate methods with
     *                     the same signature but different parameter names.
     */
    addABI(abiArray: AbiDefinition[], contractName?: string): void;
    private _addEventABI;
    private _addMethodABI;
}
//# sourceMappingURL=abi_decoder.d.ts.map