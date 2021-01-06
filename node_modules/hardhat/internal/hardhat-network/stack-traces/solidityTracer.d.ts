import { MessageTrace } from "./message-trace";
import { SolidityStackTrace } from "./solidity-stack-trace";
export declare const FIRST_SOLC_VERSION_SUPPORTED = "0.5.1";
export declare class SolidityTracer {
    getStackTrace(maybeDecodedMessageTrace: MessageTrace): SolidityStackTrace;
    private _getCallMessageStackTrace;
    private _getUnrecognizedMessageStackTrace;
    private _getCreateMessageStackTrace;
    private _getPrecompileMessageStackTrace;
    private _traceEvmExecution;
    private _rawTraceEvmExecution;
    private _isContractTooLargeError;
    private _isSubtraceErrorPropagated;
    private _isContractCallRunOutOfGasError;
    private _isReturnDataSizeError;
    private _failsRightAfterCall;
    private _isCalledNonContractAccountError;
    private _isCallFailedError;
    private _hasFailedInsideTheFallbackFunction;
    private _hasFailedInsideTheReceiveFunction;
    private _hasFailedInsideFunction;
    private _isProxyErrorPropagated;
    private _isConstructorNotPayableError;
    private _isConstructorInvalidArgumentsError;
    private _isDirectLibraryCall;
    private _isFunctionNotPayableError;
    private _isMissingFunctionAndFallbackError;
    private _emptyCalldataAndNoReceive;
    private _isFallbackNotPayableError;
    private _getDirectLibraryCallErrorStackTrace;
    private _getOtherErrorBeforeCalledFunctionStackTraceEntry;
    private _instructionToCallstackStackTraceEntry;
    private _callInstructionToCallFailedToExecuteStackTraceEntry;
    private _instructionWithinFunctionToRevertStackTraceEntry;
    private _getEntryBeforeFailureInModifier;
    private _getEntryBeforeInitialModifierCallstackEntry;
    private _getContractStartWithoutFunctionSourceReference;
    /**
     * Returns a source reference pointing to the constructor if it exists, or to the contract
     * otherwise.
     */
    private _getConstructorStartSourceReference;
    private _getFallbackStartSourceReference;
    private _getFunctionStartSourceReference;
    private _getLastSourceReference;
    private _sourceLocationToSourceReference;
    private _getLastSubtrace;
    private _getLastInstructionWithValidLocationStepIndex;
    private _getLastInstructionWithValidLocation;
    private _isLastLocation;
    private _solidity063GetFrameForUnmappedRevertBeforeFunction;
    private _solidity063GetFrameForUnmappedRevertWithinFunction;
    private _solidity063MaybeUnmappedRevert;
    private _solidity063CorrectLineNumber;
}
//# sourceMappingURL=solidityTracer.d.ts.map