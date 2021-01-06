/// <reference types="node" />
/// <reference types="bn.js" />
import { BN } from "ethereumjs-util";
import { ContractFunctionType, SourceFile } from "./model";
export declare enum StackTraceEntryType {
    CALLSTACK_ENTRY = 0,
    UNRECOGNIZED_CREATE_CALLSTACK_ENTRY = 1,
    UNRECOGNIZED_CONTRACT_CALLSTACK_ENTRY = 2,
    PRECOMPILE_ERROR = 3,
    REVERT_ERROR = 4,
    FUNCTION_NOT_PAYABLE_ERROR = 5,
    INVALID_PARAMS_ERROR = 6,
    FALLBACK_NOT_PAYABLE_ERROR = 7,
    FALLBACK_NOT_PAYABLE_AND_NO_RECEIVE_ERROR = 8,
    UNRECOGNIZED_FUNCTION_WITHOUT_FALLBACK_ERROR = 9,
    MISSING_FALLBACK_OR_RECEIVE_ERROR = 10,
    RETURNDATA_SIZE_ERROR = 11,
    NONCONTRACT_ACCOUNT_CALLED_ERROR = 12,
    CALL_FAILED_ERROR = 13,
    DIRECT_LIBRARY_CALL_ERROR = 14,
    UNRECOGNIZED_CREATE_ERROR = 15,
    UNRECOGNIZED_CONTRACT_ERROR = 16,
    OTHER_EXECUTION_ERROR = 17,
    UNMAPPED_SOLC_0_6_3_REVERT_ERROR = 18,
    CONTRACT_TOO_LARGE_ERROR = 19,
    INTERNAL_FUNCTION_CALLSTACK_ENTRY = 20,
    CONTRACT_CALL_RUN_OUT_OF_GAS_ERROR = 21
}
export declare const FALLBACK_FUNCTION_NAME = "<fallback>";
export declare const RECEIVE_FUNCTION_NAME = "<receive>";
export declare const CONSTRUCTOR_FUNCTION_NAME = "constructor";
export declare const UNRECOGNIZED_FUNCTION_NAME = "<unrecognized-selector>";
export declare const UNKNOWN_FUNCTION_NAME = "<unknown>";
export declare const PRECOMPILE_FUNCTION_NAME = "<precompile>";
export declare const UNRECOGNIZED_CONTRACT_NAME = "<UnrecognizedContract>";
export interface SourceReference {
    file: SourceFile;
    contract: string;
    function?: string;
    line: number;
}
export interface CallstackEntryStackTraceEntry {
    type: StackTraceEntryType.CALLSTACK_ENTRY;
    sourceReference: SourceReference;
    functionType: ContractFunctionType;
}
export interface UnrecognizedCreateCallstackEntryStackTraceEntry {
    type: StackTraceEntryType.UNRECOGNIZED_CREATE_CALLSTACK_ENTRY;
    sourceReference?: undefined;
}
export interface UnrecognizedContractCallstackEntryStackTraceEntry {
    type: StackTraceEntryType.UNRECOGNIZED_CONTRACT_CALLSTACK_ENTRY;
    address: Buffer;
    sourceReference?: undefined;
}
export interface PrecompileErrorStackTraceEntry {
    type: StackTraceEntryType.PRECOMPILE_ERROR;
    precompile: number;
    sourceReference?: undefined;
}
export interface RevertErrorStackTraceEntry {
    type: StackTraceEntryType.REVERT_ERROR;
    message: Buffer;
    sourceReference: SourceReference;
    isInvalidOpcodeError: boolean;
}
export interface UnmappedSolc063RevertErrorStackTraceEntry {
    type: StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR;
    sourceReference: SourceReference;
}
export interface FunctionNotPayableErrorStackTraceEntry {
    type: StackTraceEntryType.FUNCTION_NOT_PAYABLE_ERROR;
    value: BN;
    sourceReference: SourceReference;
}
export interface InvalidParamsErrorStackTraceEntry {
    type: StackTraceEntryType.INVALID_PARAMS_ERROR;
    sourceReference: SourceReference;
}
export interface FallbackNotPayableErrorStackTraceEntry {
    type: StackTraceEntryType.FALLBACK_NOT_PAYABLE_ERROR;
    value: BN;
    sourceReference: SourceReference;
}
export interface FallbackNotPayableAndNoReceiveErrorStackTraceEntry {
    type: StackTraceEntryType.FALLBACK_NOT_PAYABLE_AND_NO_RECEIVE_ERROR;
    value: BN;
    sourceReference: SourceReference;
}
export interface UnrecognizedFunctionWithoutFallbackErrorStackTraceEntry {
    type: StackTraceEntryType.UNRECOGNIZED_FUNCTION_WITHOUT_FALLBACK_ERROR;
    sourceReference: SourceReference;
}
export interface MissingFallbackOrReceiveErrorStackTraceEntry {
    type: StackTraceEntryType.MISSING_FALLBACK_OR_RECEIVE_ERROR;
    sourceReference: SourceReference;
}
export interface ReturndataSizeErrorStackTraceEntry {
    type: StackTraceEntryType.RETURNDATA_SIZE_ERROR;
    sourceReference: SourceReference;
}
export interface NonContractAccountCalledErrorStackTraceEntry {
    type: StackTraceEntryType.NONCONTRACT_ACCOUNT_CALLED_ERROR;
    sourceReference: SourceReference;
}
export interface CallFailedErrorStackTraceEntry {
    type: StackTraceEntryType.CALL_FAILED_ERROR;
    sourceReference: SourceReference;
}
export interface DirectLibraryCallErrorStackTraceEntry {
    type: StackTraceEntryType.DIRECT_LIBRARY_CALL_ERROR;
    sourceReference: SourceReference;
}
export interface UnrecognizedCreateErrorStackTraceEntry {
    type: StackTraceEntryType.UNRECOGNIZED_CREATE_ERROR;
    message: Buffer;
    sourceReference?: undefined;
}
export interface UnrecognizedContractErrorStackTraceEntry {
    type: StackTraceEntryType.UNRECOGNIZED_CONTRACT_ERROR;
    address: Buffer;
    message: Buffer;
    sourceReference?: undefined;
}
export interface OtherExecutionErrorStackTraceEntry {
    type: StackTraceEntryType.OTHER_EXECUTION_ERROR;
    sourceReference?: SourceReference;
}
export interface ContractTooLargeErrorStackTraceEntry {
    type: StackTraceEntryType.CONTRACT_TOO_LARGE_ERROR;
    sourceReference: SourceReference;
}
export interface InternalFunctionCallStackEntry {
    type: StackTraceEntryType.INTERNAL_FUNCTION_CALLSTACK_ENTRY;
    pc: number;
    sourceReference: SourceReference;
}
export interface ContractCallRunOutOfGasError {
    type: StackTraceEntryType.CONTRACT_CALL_RUN_OUT_OF_GAS_ERROR;
    sourceReference?: SourceReference;
}
export declare type SolidityStackTraceEntry = CallstackEntryStackTraceEntry | UnrecognizedCreateCallstackEntryStackTraceEntry | UnrecognizedContractCallstackEntryStackTraceEntry | PrecompileErrorStackTraceEntry | RevertErrorStackTraceEntry | FunctionNotPayableErrorStackTraceEntry | InvalidParamsErrorStackTraceEntry | FallbackNotPayableErrorStackTraceEntry | FallbackNotPayableAndNoReceiveErrorStackTraceEntry | UnrecognizedFunctionWithoutFallbackErrorStackTraceEntry | MissingFallbackOrReceiveErrorStackTraceEntry | ReturndataSizeErrorStackTraceEntry | NonContractAccountCalledErrorStackTraceEntry | CallFailedErrorStackTraceEntry | DirectLibraryCallErrorStackTraceEntry | UnrecognizedCreateErrorStackTraceEntry | UnrecognizedContractErrorStackTraceEntry | OtherExecutionErrorStackTraceEntry | UnmappedSolc063RevertErrorStackTraceEntry | ContractTooLargeErrorStackTraceEntry | InternalFunctionCallStackEntry | ContractCallRunOutOfGasError;
export declare type SolidityStackTrace = SolidityStackTraceEntry[];
//# sourceMappingURL=solidity-stack-trace.d.ts.map