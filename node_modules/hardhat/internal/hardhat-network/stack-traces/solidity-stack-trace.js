"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNRECOGNIZED_CONTRACT_NAME = exports.PRECOMPILE_FUNCTION_NAME = exports.UNKNOWN_FUNCTION_NAME = exports.UNRECOGNIZED_FUNCTION_NAME = exports.CONSTRUCTOR_FUNCTION_NAME = exports.RECEIVE_FUNCTION_NAME = exports.FALLBACK_FUNCTION_NAME = exports.StackTraceEntryType = void 0;
var StackTraceEntryType;
(function (StackTraceEntryType) {
    StackTraceEntryType[StackTraceEntryType["CALLSTACK_ENTRY"] = 0] = "CALLSTACK_ENTRY";
    StackTraceEntryType[StackTraceEntryType["UNRECOGNIZED_CREATE_CALLSTACK_ENTRY"] = 1] = "UNRECOGNIZED_CREATE_CALLSTACK_ENTRY";
    StackTraceEntryType[StackTraceEntryType["UNRECOGNIZED_CONTRACT_CALLSTACK_ENTRY"] = 2] = "UNRECOGNIZED_CONTRACT_CALLSTACK_ENTRY";
    StackTraceEntryType[StackTraceEntryType["PRECOMPILE_ERROR"] = 3] = "PRECOMPILE_ERROR";
    StackTraceEntryType[StackTraceEntryType["REVERT_ERROR"] = 4] = "REVERT_ERROR";
    StackTraceEntryType[StackTraceEntryType["FUNCTION_NOT_PAYABLE_ERROR"] = 5] = "FUNCTION_NOT_PAYABLE_ERROR";
    StackTraceEntryType[StackTraceEntryType["INVALID_PARAMS_ERROR"] = 6] = "INVALID_PARAMS_ERROR";
    StackTraceEntryType[StackTraceEntryType["FALLBACK_NOT_PAYABLE_ERROR"] = 7] = "FALLBACK_NOT_PAYABLE_ERROR";
    StackTraceEntryType[StackTraceEntryType["FALLBACK_NOT_PAYABLE_AND_NO_RECEIVE_ERROR"] = 8] = "FALLBACK_NOT_PAYABLE_AND_NO_RECEIVE_ERROR";
    StackTraceEntryType[StackTraceEntryType["UNRECOGNIZED_FUNCTION_WITHOUT_FALLBACK_ERROR"] = 9] = "UNRECOGNIZED_FUNCTION_WITHOUT_FALLBACK_ERROR";
    StackTraceEntryType[StackTraceEntryType["MISSING_FALLBACK_OR_RECEIVE_ERROR"] = 10] = "MISSING_FALLBACK_OR_RECEIVE_ERROR";
    StackTraceEntryType[StackTraceEntryType["RETURNDATA_SIZE_ERROR"] = 11] = "RETURNDATA_SIZE_ERROR";
    StackTraceEntryType[StackTraceEntryType["NONCONTRACT_ACCOUNT_CALLED_ERROR"] = 12] = "NONCONTRACT_ACCOUNT_CALLED_ERROR";
    StackTraceEntryType[StackTraceEntryType["CALL_FAILED_ERROR"] = 13] = "CALL_FAILED_ERROR";
    StackTraceEntryType[StackTraceEntryType["DIRECT_LIBRARY_CALL_ERROR"] = 14] = "DIRECT_LIBRARY_CALL_ERROR";
    StackTraceEntryType[StackTraceEntryType["UNRECOGNIZED_CREATE_ERROR"] = 15] = "UNRECOGNIZED_CREATE_ERROR";
    StackTraceEntryType[StackTraceEntryType["UNRECOGNIZED_CONTRACT_ERROR"] = 16] = "UNRECOGNIZED_CONTRACT_ERROR";
    StackTraceEntryType[StackTraceEntryType["OTHER_EXECUTION_ERROR"] = 17] = "OTHER_EXECUTION_ERROR";
    // This is a special case to handle a regression introduced in solc 0.6.3
    // For more info: https://github.com/ethereum/solidity/issues/9006
    StackTraceEntryType[StackTraceEntryType["UNMAPPED_SOLC_0_6_3_REVERT_ERROR"] = 18] = "UNMAPPED_SOLC_0_6_3_REVERT_ERROR";
    StackTraceEntryType[StackTraceEntryType["CONTRACT_TOO_LARGE_ERROR"] = 19] = "CONTRACT_TOO_LARGE_ERROR";
    StackTraceEntryType[StackTraceEntryType["INTERNAL_FUNCTION_CALLSTACK_ENTRY"] = 20] = "INTERNAL_FUNCTION_CALLSTACK_ENTRY";
    StackTraceEntryType[StackTraceEntryType["CONTRACT_CALL_RUN_OUT_OF_GAS_ERROR"] = 21] = "CONTRACT_CALL_RUN_OUT_OF_GAS_ERROR";
})(StackTraceEntryType = exports.StackTraceEntryType || (exports.StackTraceEntryType = {}));
exports.FALLBACK_FUNCTION_NAME = "<fallback>";
exports.RECEIVE_FUNCTION_NAME = "<receive>";
exports.CONSTRUCTOR_FUNCTION_NAME = "constructor";
exports.UNRECOGNIZED_FUNCTION_NAME = "<unrecognized-selector>";
exports.UNKNOWN_FUNCTION_NAME = "<unknown>";
exports.PRECOMPILE_FUNCTION_NAME = "<precompile>";
exports.UNRECOGNIZED_CONTRACT_NAME = "<UnrecognizedContract>";
//# sourceMappingURL=solidity-stack-trace.js.map