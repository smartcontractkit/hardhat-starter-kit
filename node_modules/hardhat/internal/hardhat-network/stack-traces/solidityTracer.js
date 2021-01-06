"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidityTracer = exports.FIRST_SOLC_VERSION_SUPPORTED = void 0;
const exceptions_1 = require("@nomiclabs/ethereumjs-vm/dist/exceptions");
const semver_1 = __importDefault(require("semver"));
const mapped_inlined_internal_functions_heuristics_1 = require("./mapped-inlined-internal-functions-heuristics");
const message_trace_1 = require("./message-trace");
const model_1 = require("./model");
const opcodes_1 = require("./opcodes");
const solidity_stack_trace_1 = require("./solidity-stack-trace");
// tslint:disable only-hardhat-error
exports.FIRST_SOLC_VERSION_SUPPORTED = "0.5.1";
const FIRST_SOLC_VERSION_CREATE_PARAMS_VALIDATION = "0.5.9";
const FIRST_SOLC_VERSION_RECEIVE_FUNCTION = "0.6.0";
const FIRST_SOLC_VERSION_WITH_UNMAPPED_REVERTS = "0.6.3";
const EIP170_BYTECODE_SIZE_INCLUSIVE_LIMIT = 0x6000;
class SolidityTracer {
    getStackTrace(maybeDecodedMessageTrace) {
        if (maybeDecodedMessageTrace.error === undefined) {
            return [];
        }
        if (message_trace_1.isPrecompileTrace(maybeDecodedMessageTrace)) {
            return this._getPrecompileMessageStackTrace(maybeDecodedMessageTrace);
        }
        if (message_trace_1.isDecodedCreateTrace(maybeDecodedMessageTrace)) {
            return this._getCreateMessageStackTrace(maybeDecodedMessageTrace);
        }
        if (message_trace_1.isDecodedCallTrace(maybeDecodedMessageTrace)) {
            return this._getCallMessageStackTrace(maybeDecodedMessageTrace);
        }
        return this._getUnrecognizedMessageStackTrace(maybeDecodedMessageTrace);
    }
    _getCallMessageStackTrace(trace) {
        if (this._isDirectLibraryCall(trace)) {
            return this._getDirectLibraryCallErrorStackTrace(trace);
        }
        const calledFunction = trace.bytecode.contract.getFunctionFromSelector(trace.calldata.slice(0, 4));
        if (this._isFunctionNotPayableError(trace, calledFunction)) {
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.FUNCTION_NOT_PAYABLE_ERROR,
                    sourceReference: this._getFunctionStartSourceReference(trace, calledFunction),
                    value: trace.value,
                },
            ];
        }
        if (this._isMissingFunctionAndFallbackError(trace, calledFunction)) {
            if (this._emptyCalldataAndNoReceive(trace)) {
                return [
                    {
                        type: solidity_stack_trace_1.StackTraceEntryType.MISSING_FALLBACK_OR_RECEIVE_ERROR,
                        sourceReference: this._getContractStartWithoutFunctionSourceReference(trace),
                    },
                ];
            }
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.UNRECOGNIZED_FUNCTION_WITHOUT_FALLBACK_ERROR,
                    sourceReference: this._getContractStartWithoutFunctionSourceReference(trace),
                },
            ];
        }
        if (this._isFallbackNotPayableError(trace, calledFunction)) {
            if (this._emptyCalldataAndNoReceive(trace)) {
                return [
                    {
                        type: solidity_stack_trace_1.StackTraceEntryType.FALLBACK_NOT_PAYABLE_AND_NO_RECEIVE_ERROR,
                        sourceReference: this._getFallbackStartSourceReference(trace),
                        value: trace.value,
                    },
                ];
            }
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.FALLBACK_NOT_PAYABLE_ERROR,
                    sourceReference: this._getFallbackStartSourceReference(trace),
                    value: trace.value,
                },
            ];
        }
        return this._traceEvmExecution(trace);
    }
    _getUnrecognizedMessageStackTrace(trace) {
        const subtrace = this._getLastSubtrace(trace);
        if (subtrace !== undefined) {
            // This is not a very exact heuristic, but most of the time it will be right, as solidity
            // reverts if a call fails, and most contracts are in solidity
            if (subtrace.error !== undefined &&
                trace.returnData.equals(subtrace.returnData)) {
                let unrecognizedEntry;
                if (message_trace_1.isCreateTrace(trace)) {
                    unrecognizedEntry = {
                        type: solidity_stack_trace_1.StackTraceEntryType.UNRECOGNIZED_CREATE_CALLSTACK_ENTRY,
                    };
                }
                else {
                    unrecognizedEntry = {
                        type: solidity_stack_trace_1.StackTraceEntryType.UNRECOGNIZED_CONTRACT_CALLSTACK_ENTRY,
                        address: trace.address,
                    };
                }
                return [unrecognizedEntry, ...this.getStackTrace(subtrace)];
            }
        }
        if (message_trace_1.isCreateTrace(trace)) {
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.UNRECOGNIZED_CREATE_ERROR,
                    message: trace.returnData,
                },
            ];
        }
        return [
            {
                type: solidity_stack_trace_1.StackTraceEntryType.UNRECOGNIZED_CONTRACT_ERROR,
                address: trace.address,
                message: trace.returnData,
            },
        ];
    }
    _getCreateMessageStackTrace(trace) {
        if (this._isConstructorNotPayableError(trace)) {
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.FUNCTION_NOT_PAYABLE_ERROR,
                    sourceReference: this._getConstructorStartSourceReference(trace),
                    value: trace.value,
                },
            ];
        }
        if (this._isConstructorInvalidArgumentsError(trace)) {
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.INVALID_PARAMS_ERROR,
                    sourceReference: this._getConstructorStartSourceReference(trace),
                },
            ];
        }
        return this._traceEvmExecution(trace);
    }
    _getPrecompileMessageStackTrace(trace) {
        return [
            {
                type: solidity_stack_trace_1.StackTraceEntryType.PRECOMPILE_ERROR,
                precompile: trace.precompile,
            },
        ];
    }
    _traceEvmExecution(trace) {
        const stackTrace = this._rawTraceEvmExecution(trace);
        if (mapped_inlined_internal_functions_heuristics_1.stackTraceMayRequireAdjustments(stackTrace, trace)) {
            return mapped_inlined_internal_functions_heuristics_1.adjustStackTrace(stackTrace, trace);
        }
        return stackTrace;
    }
    _rawTraceEvmExecution(trace) {
        const stacktrace = [];
        let subtracesSeen = 0;
        let jumpedIntoFunction = false;
        const functionJumpdests = [];
        let consumedAllInstructions = false;
        for (let stepIndex = 0; stepIndex < trace.steps.length; stepIndex++) {
            const step = trace.steps[stepIndex];
            const nextStep = trace.steps[stepIndex + 1];
            if (message_trace_1.isEvmStep(step)) {
                const inst = trace.bytecode.getInstruction(step.pc);
                if (inst.jumpType === model_1.JumpType.INTO_FUNCTION) {
                    const nextEvmStep = nextStep; // A jump can't be followed by a subtrace
                    const nextInst = trace.bytecode.getInstruction(nextEvmStep.pc);
                    if (nextInst !== undefined && nextInst.opcode === opcodes_1.Opcode.JUMPDEST) {
                        if (jumpedIntoFunction || !message_trace_1.isDecodedCallTrace(trace)) {
                            stacktrace.push(this._instructionToCallstackStackTraceEntry(trace.bytecode, inst));
                        }
                        jumpedIntoFunction = true;
                        functionJumpdests.push(nextInst);
                    }
                }
                else if (inst.jumpType === model_1.JumpType.OUTOF_FUNCTION) {
                    stacktrace.pop();
                    functionJumpdests.pop();
                }
                else if (opcodes_1.isCall(inst.opcode) || opcodes_1.isCreate(inst.opcode)) {
                    // If a call can't be executed, we don't get an execution trace from it. We can detect
                    // this by checking if the next step is an EvmStep.
                    if (nextStep !== undefined && message_trace_1.isEvmStep(nextStep)) {
                        if (this._isCallFailedError(trace, stepIndex, inst)) {
                            stacktrace.push(this._callInstructionToCallFailedToExecuteStackTraceEntry(trace.bytecode, inst));
                            consumedAllInstructions = true;
                            break;
                        }
                    }
                    else {
                        stacktrace.push(this._instructionToCallstackStackTraceEntry(trace.bytecode, inst));
                    }
                }
                else if (inst.opcode === opcodes_1.Opcode.REVERT ||
                    inst.opcode === opcodes_1.Opcode.INVALID) {
                    // Failures with invalid locations are handled later
                    if (inst.location === undefined) {
                        continue;
                    }
                    if (message_trace_1.isDecodedCallTrace(trace) && !jumpedIntoFunction) {
                        // Failures in the prelude are resolved later.
                        continue;
                    }
                    // There should always be a function here, but that's not the case with optimizations.
                    //
                    // If this is a create trace, we already checked args and nonpayable failures before
                    // calling this function.
                    //
                    // If it's a call trace, we already jumped into a function. But optimizations can happen.
                    const failingFunction = inst.location.getContainingFunction();
                    // If the failure is in a modifier we add an entry with the function/constructor
                    if (failingFunction !== undefined &&
                        failingFunction.type === model_1.ContractFunctionType.MODIFIER) {
                        stacktrace.push(this._getEntryBeforeFailureInModifier(trace, functionJumpdests));
                    }
                    if (failingFunction !== undefined) {
                        stacktrace.push(this._instructionWithinFunctionToRevertStackTraceEntry(trace, inst));
                    }
                    else if (message_trace_1.isDecodedCallTrace(trace)) {
                        // This is here because of the optimizations
                        stacktrace.push({
                            type: solidity_stack_trace_1.StackTraceEntryType.REVERT_ERROR,
                            sourceReference: this._getFunctionStartSourceReference(trace, trace.bytecode.contract.getFunctionFromSelector(trace.calldata.slice(0, 4))),
                            message: trace.returnData,
                            isInvalidOpcodeError: inst.opcode === opcodes_1.Opcode.INVALID,
                        });
                    }
                    else {
                        // This is here because of the optimizations
                        stacktrace.push({
                            type: solidity_stack_trace_1.StackTraceEntryType.REVERT_ERROR,
                            sourceReference: this._getConstructorStartSourceReference(trace),
                            message: trace.returnData,
                            isInvalidOpcodeError: inst.opcode === opcodes_1.Opcode.INVALID,
                        });
                    }
                    consumedAllInstructions = true;
                    break;
                }
            }
            else {
                subtracesSeen += 1;
                // If there are more subtraces, this one didn't terminate the execution
                if (subtracesSeen < trace.numberOfSubtraces) {
                    stacktrace.pop();
                    continue;
                }
                if (step.error === undefined) {
                    // If this is a subtrace, we pushed a stack frame pointing to the instruction that
                    // generated the subtrace.
                    const callStackFrame = stacktrace.pop();
                    if (this._isReturnDataSizeError(trace, stepIndex)) {
                        stacktrace.push({
                            type: solidity_stack_trace_1.StackTraceEntryType.RETURNDATA_SIZE_ERROR,
                            sourceReference: callStackFrame.sourceReference,
                        });
                        consumedAllInstructions = true;
                        break;
                    }
                }
                else {
                    if (this._isSubtraceErrorPropagated(trace, stepIndex) ||
                        (message_trace_1.isDecodedCallTrace(trace) &&
                            this._isProxyErrorPropagated(trace, stepIndex))) {
                        const subTrace = this.getStackTrace(step);
                        stacktrace.push(...subTrace);
                        if (this._isContractCallRunOutOfGasError(trace, stepIndex)) {
                            const lastFrame = stacktrace.pop();
                            stacktrace.push({
                                type: solidity_stack_trace_1.StackTraceEntryType.CONTRACT_CALL_RUN_OUT_OF_GAS_ERROR,
                                sourceReference: lastFrame.sourceReference,
                            });
                        }
                        consumedAllInstructions = true;
                        break;
                    }
                    stacktrace.pop();
                }
            }
        }
        if (consumedAllInstructions) {
            const firstEntry = stacktrace[0];
            if (firstEntry.type === solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY &&
                firstEntry.functionType === model_1.ContractFunctionType.MODIFIER) {
                stacktrace.unshift(this._getEntryBeforeInitialModifierCallstackEntry(trace));
            }
            return stacktrace;
        }
        const lastStep = trace.steps[trace.steps.length - 1];
        if (!message_trace_1.isEvmStep(lastStep)) {
            throw new Error("This should not happen: MessageTrace ends with a subtrace");
        }
        const lastInstruction = trace.bytecode.getInstruction(lastStep.pc);
        if (message_trace_1.isDecodedCallTrace(trace) && !jumpedIntoFunction) {
            if (this._hasFailedInsideTheFallbackFunction(trace) ||
                this._hasFailedInsideTheReceiveFunction(trace)) {
                return [
                    this._instructionWithinFunctionToRevertStackTraceEntry(trace, lastInstruction),
                ];
            }
            // Sometimes we do fail inside of a function but there's no jump into
            if (lastInstruction.location !== undefined) {
                const failingFunction = lastInstruction.location.getContainingFunction();
                if (failingFunction !== undefined) {
                    return [
                        {
                            type: solidity_stack_trace_1.StackTraceEntryType.REVERT_ERROR,
                            sourceReference: this._getFunctionStartSourceReference(trace, failingFunction),
                            message: trace.returnData,
                            isInvalidOpcodeError: lastInstruction.opcode === opcodes_1.Opcode.INVALID,
                        },
                    ];
                }
            }
            const calledFunction = trace.bytecode.contract.getFunctionFromSelector(trace.calldata.slice(0, 4));
            if (calledFunction !== undefined) {
                return [
                    {
                        type: solidity_stack_trace_1.StackTraceEntryType.INVALID_PARAMS_ERROR,
                        sourceReference: this._getFunctionStartSourceReference(trace, calledFunction),
                    },
                ];
            }
            if (this._solidity063MaybeUnmappedRevert(trace)) {
                const revertFrame = this._solidity063GetFrameForUnmappedRevertBeforeFunction(trace);
                if (revertFrame !== undefined) {
                    return [revertFrame];
                }
            }
            return [this._getOtherErrorBeforeCalledFunctionStackTraceEntry(trace)];
        }
        if (this._isCalledNonContractAccountError(trace)) {
            stacktrace.push({
                type: solidity_stack_trace_1.StackTraceEntryType.NONCONTRACT_ACCOUNT_CALLED_ERROR,
                // We are sure this is not undefined because there was at least a call instruction
                sourceReference: this._getLastSourceReference(trace),
            });
        }
        else {
            if (this._solidity063MaybeUnmappedRevert(trace)) {
                const revertFrame = this._solidity063GetFrameForUnmappedRevertWithinFunction(trace);
                if (revertFrame !== undefined) {
                    stacktrace.push(revertFrame);
                    return stacktrace;
                }
            }
            if (message_trace_1.isCreateTrace(trace) && this._isContractTooLargeError(trace)) {
                return [
                    {
                        type: solidity_stack_trace_1.StackTraceEntryType.CONTRACT_TOO_LARGE_ERROR,
                        sourceReference: this._getConstructorStartSourceReference(trace),
                    },
                ];
            }
            stacktrace.push({
                type: solidity_stack_trace_1.StackTraceEntryType.OTHER_EXECUTION_ERROR,
                sourceReference: this._getLastSourceReference(trace),
            });
        }
        return stacktrace;
    }
    // Heuristics
    _isContractTooLargeError(trace) {
        if (trace.error === undefined || trace.error.error !== exceptions_1.ERROR.OUT_OF_GAS) {
            return false;
        }
        // This error doesn't come from solidity, but actually from the VM.
        // The deployment code executes correctly, but it OOGs.
        const lastStep = trace.steps[trace.steps.length - 1];
        if (!message_trace_1.isEvmStep(lastStep)) {
            return false;
        }
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        if (lastInst.opcode !== opcodes_1.Opcode.RETURN) {
            return false;
        }
        // TODO: This is an over approximation, as we should be comparing the
        //  runtime bytecode.
        if (trace.bytecode.normalizedCode.length <=
            EIP170_BYTECODE_SIZE_INCLUSIVE_LIMIT) {
            return false;
        }
        // TODO: What happens if it's an actual out of gas that OOGs at the return?
        //   maybe traces should have gasLimit and gasUsed.
        return true;
    }
    _isSubtraceErrorPropagated(trace, callSubtraceStepIndex) {
        var _a, _b;
        const call = trace.steps[callSubtraceStepIndex];
        if (!trace.returnData.equals(call.returnData)) {
            return false;
        }
        if (((_a = trace.error) === null || _a === void 0 ? void 0 : _a.error) === exceptions_1.ERROR.OUT_OF_GAS &&
            ((_b = call.error) === null || _b === void 0 ? void 0 : _b.error) === exceptions_1.ERROR.OUT_OF_GAS) {
            return true;
        }
        return this._failsRightAfterCall(trace, callSubtraceStepIndex);
    }
    _isContractCallRunOutOfGasError(trace, callStepIndex) {
        var _a, _b;
        if (trace.returnData.length > 0) {
            return false;
        }
        if (((_a = trace.error) === null || _a === void 0 ? void 0 : _a.error) !== exceptions_1.ERROR.REVERT) {
            return false;
        }
        const call = trace.steps[callStepIndex];
        if (((_b = call.error) === null || _b === void 0 ? void 0 : _b.error) !== exceptions_1.ERROR.OUT_OF_GAS) {
            return false;
        }
        return this._failsRightAfterCall(trace, callStepIndex);
    }
    _isReturnDataSizeError(trace, callStepIndex) {
        return this._failsRightAfterCall(trace, callStepIndex);
    }
    _failsRightAfterCall(trace, callSubtraceStepIndex) {
        const lastStep = trace.steps[trace.steps.length - 1];
        if (!message_trace_1.isEvmStep(lastStep)) {
            return false;
        }
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        if (lastInst.opcode !== opcodes_1.Opcode.REVERT) {
            return false;
        }
        const callOpcodeStep = trace.steps[callSubtraceStepIndex - 1];
        const callInst = trace.bytecode.getInstruction(callOpcodeStep.pc);
        return this._isLastLocation(trace, callSubtraceStepIndex + 1, callInst.location // Calls are always made from within functions
        );
    }
    _isCalledNonContractAccountError(trace) {
        // We could change this to checking that the last valid location maps to a call, but
        // it's way more complex as we need to get the ast node from that location.
        const lastIndex = this._getLastInstructionWithValidLocationStepIndex(trace);
        if (lastIndex === undefined || lastIndex === 0) {
            return false;
        }
        const lastStep = trace.steps[lastIndex]; // We know this is an EVM step
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        if (lastInst.opcode !== opcodes_1.Opcode.ISZERO) {
            return false;
        }
        const prevStep = trace.steps[lastIndex - 1]; // We know this is an EVM step
        const prevInst = trace.bytecode.getInstruction(prevStep.pc);
        return prevInst.opcode === opcodes_1.Opcode.EXTCODESIZE;
    }
    _isCallFailedError(trace, instIndex, callInstruction) {
        const callLocation = callInstruction.location; // Calls are always made from within functions
        return this._isLastLocation(trace, instIndex, callLocation);
    }
    _hasFailedInsideTheFallbackFunction(trace) {
        const contract = trace.bytecode.contract;
        if (contract.fallback === undefined) {
            return false;
        }
        return this._hasFailedInsideFunction(trace, contract.fallback);
    }
    _hasFailedInsideTheReceiveFunction(trace) {
        const contract = trace.bytecode.contract;
        if (contract.receive === undefined) {
            return false;
        }
        return this._hasFailedInsideFunction(trace, contract.receive);
    }
    _hasFailedInsideFunction(trace, func) {
        const lastStep = trace.steps[trace.steps.length - 1];
        const lastInstruction = trace.bytecode.getInstruction(lastStep.pc);
        return (lastInstruction.location !== undefined &&
            lastInstruction.opcode === opcodes_1.Opcode.REVERT &&
            func.location.contains(lastInstruction.location));
    }
    _isProxyErrorPropagated(trace, callSubtraceStepIndex) {
        const callStep = trace.steps[callSubtraceStepIndex - 1];
        if (!message_trace_1.isEvmStep(callStep)) {
            return false;
        }
        const callInst = trace.bytecode.getInstruction(callStep.pc);
        if (callInst.opcode !== opcodes_1.Opcode.DELEGATECALL) {
            return false;
        }
        const subtrace = trace.steps[callSubtraceStepIndex];
        if (message_trace_1.isEvmStep(subtrace)) {
            return false;
        }
        if (message_trace_1.isPrecompileTrace(subtrace)) {
            return false;
        }
        // If we can't recognize the implementation we'd better don't consider it as such
        if (subtrace.bytecode === undefined) {
            return false;
        }
        if (subtrace.bytecode.contract.type === model_1.ContractType.LIBRARY) {
            return false;
        }
        if (!trace.returnData.equals(subtrace.returnData)) {
            return false;
        }
        for (let i = callSubtraceStepIndex + 1; i < trace.steps.length; i++) {
            const step = trace.steps[i];
            if (!message_trace_1.isEvmStep(step)) {
                return false;
            }
            const inst = trace.bytecode.getInstruction(step.pc);
            // All the remaining locations should be valid, as they are part of the inline asm
            if (inst.location === undefined) {
                return false;
            }
            if (inst.jumpType === model_1.JumpType.INTO_FUNCTION ||
                inst.jumpType === model_1.JumpType.OUTOF_FUNCTION) {
                return false;
            }
        }
        const lastStep = trace.steps[trace.steps.length - 1];
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        return lastInst.opcode === opcodes_1.Opcode.REVERT;
    }
    _isConstructorNotPayableError(trace) {
        // This error doesn't return data
        if (trace.returnData.length > 0) {
            return false;
        }
        const constructor = trace.bytecode.contract.constructorFunction;
        // This function is only matters with contracts that have constructors defined. The ones that
        // don't are abstract contracts, or their constructor doesn't take any argument.
        if (constructor === undefined) {
            return false;
        }
        return (trace.value.gtn(0) &&
            (constructor.isPayable === undefined || !constructor.isPayable));
    }
    _isConstructorInvalidArgumentsError(trace) {
        // This error doesn't return data
        if (trace.returnData.length > 0) {
            return false;
        }
        const contract = trace.bytecode.contract;
        const constructor = contract.constructorFunction;
        // This function is only matters with contracts that have constructors defined. The ones that
        // don't are abstract contracts, or their constructor doesn't take any argument.
        if (constructor === undefined) {
            return false;
        }
        if (semver_1.default.lt(trace.bytecode.compilerVersion, FIRST_SOLC_VERSION_CREATE_PARAMS_VALIDATION)) {
            return false;
        }
        const lastStep = trace.steps[trace.steps.length - 1];
        if (!message_trace_1.isEvmStep(lastStep)) {
            return false;
        }
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        if (lastInst.opcode !== opcodes_1.Opcode.REVERT || lastInst.location !== undefined) {
            return false;
        }
        let hasReadDeploymentCodeSize = false;
        // tslint:disable-next-line prefer-for-of
        for (let stepIndex = 0; stepIndex < trace.steps.length; stepIndex++) {
            const step = trace.steps[stepIndex];
            if (!message_trace_1.isEvmStep(step)) {
                return false;
            }
            const inst = trace.bytecode.getInstruction(step.pc);
            if (inst.location !== undefined &&
                !contract.location.equals(inst.location) &&
                !constructor.location.equals(inst.location)) {
                return false;
            }
            if (inst.opcode === opcodes_1.Opcode.CODESIZE && message_trace_1.isCreateTrace(trace)) {
                hasReadDeploymentCodeSize = true;
            }
        }
        return hasReadDeploymentCodeSize;
    }
    _isDirectLibraryCall(trace) {
        return (trace.depth === 0 && trace.bytecode.contract.type === model_1.ContractType.LIBRARY);
    }
    _isFunctionNotPayableError(trace, calledFunction) {
        if (calledFunction === undefined) {
            return false;
        }
        // This error doesn't return data
        if (trace.returnData.length > 0) {
            return false;
        }
        if (trace.value.lten(0)) {
            return false;
        }
        // Libraries don't have a nonpayable check
        if (trace.bytecode.contract.type === model_1.ContractType.LIBRARY) {
            return false;
        }
        return calledFunction.isPayable === undefined || !calledFunction.isPayable;
    }
    _isMissingFunctionAndFallbackError(trace, calledFunction) {
        // This error doesn't return data
        if (trace.returnData.length > 0) {
            return false;
        }
        // the called function exists in the contract
        if (calledFunction !== undefined) {
            return false;
        }
        // there's a receive function and no calldata
        if (trace.calldata.length === 0 &&
            trace.bytecode.contract.receive !== undefined) {
            return false;
        }
        return trace.bytecode.contract.fallback === undefined;
    }
    _emptyCalldataAndNoReceive(trace) {
        // this only makes sense when receive functions are available
        if (semver_1.default.lt(trace.bytecode.compilerVersion, FIRST_SOLC_VERSION_RECEIVE_FUNCTION)) {
            return false;
        }
        return (trace.calldata.length === 0 &&
            trace.bytecode.contract.receive === undefined);
    }
    _isFallbackNotPayableError(trace, calledFunction) {
        if (calledFunction !== undefined) {
            return false;
        }
        // This error doesn't return data
        if (trace.returnData.length > 0) {
            return false;
        }
        if (trace.value.lten(0)) {
            return false;
        }
        if (trace.bytecode.contract.fallback === undefined) {
            return false;
        }
        const isPayable = trace.bytecode.contract.fallback.isPayable;
        return isPayable === undefined || !isPayable;
    }
    // Stack trace entry factories
    _getDirectLibraryCallErrorStackTrace(trace) {
        const func = trace.bytecode.contract.getFunctionFromSelector(trace.calldata.slice(0, 4));
        if (func !== undefined) {
            return [
                {
                    type: solidity_stack_trace_1.StackTraceEntryType.DIRECT_LIBRARY_CALL_ERROR,
                    sourceReference: this._getFunctionStartSourceReference(trace, func),
                },
            ];
        }
        return [
            {
                type: solidity_stack_trace_1.StackTraceEntryType.DIRECT_LIBRARY_CALL_ERROR,
                sourceReference: this._getContractStartWithoutFunctionSourceReference(trace),
            },
        ];
    }
    _getOtherErrorBeforeCalledFunctionStackTraceEntry(trace) {
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.OTHER_EXECUTION_ERROR,
            sourceReference: this._getContractStartWithoutFunctionSourceReference(trace),
        };
    }
    _instructionToCallstackStackTraceEntry(bytecode, inst) {
        // This means that a jump is made from within an internal solc function.
        // These are normally made from yul code, so they don't map to any Solidity
        // function
        if (inst.location === undefined) {
            return {
                type: solidity_stack_trace_1.StackTraceEntryType.INTERNAL_FUNCTION_CALLSTACK_ENTRY,
                pc: inst.pc,
                sourceReference: {
                    file: bytecode.contract.location.file,
                    contract: bytecode.contract.name,
                    function: undefined,
                    line: bytecode.contract.location.getStartingLineNumber(),
                },
            };
        }
        const func = inst.location.getContainingFunction();
        if (func !== undefined) {
            return {
                type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
                sourceReference: this._sourceLocationToSourceReference(bytecode, inst.location),
                functionType: func.type,
            };
        }
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
            sourceReference: {
                function: undefined,
                contract: bytecode.contract.name,
                file: inst.location.file,
                line: inst.location.getStartingLineNumber(),
            },
            functionType: model_1.ContractFunctionType.FUNCTION,
        };
    }
    _callInstructionToCallFailedToExecuteStackTraceEntry(bytecode, callInst) {
        // Calls only happen within functions
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.CALL_FAILED_ERROR,
            sourceReference: this._sourceLocationToSourceReference(bytecode, callInst.location),
        };
    }
    _instructionWithinFunctionToRevertStackTraceEntry(trace, inst) {
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.REVERT_ERROR,
            sourceReference: this._sourceLocationToSourceReference(trace.bytecode, inst.location),
            message: trace.returnData,
            isInvalidOpcodeError: inst.opcode === opcodes_1.Opcode.INVALID,
        };
    }
    _getEntryBeforeFailureInModifier(trace, functionJumpdests) {
        // If there's a jumpdest, this modifier belongs to the last function that it represents
        if (functionJumpdests.length > 0) {
            return this._instructionToCallstackStackTraceEntry(trace.bytecode, functionJumpdests[functionJumpdests.length - 1]);
        }
        // This function is only called after we jumped into the initial function in call traces, so
        // there should always be at least a function jumpdest.
        if (!message_trace_1.isDecodedCreateTrace(trace)) {
            throw new Error("This shouldn't happen: a call trace has no functionJumpdest but has already jumped into a function");
        }
        // If there's no jump dest, we point to the constructor.
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
            sourceReference: this._getConstructorStartSourceReference(trace),
            functionType: model_1.ContractFunctionType.CONSTRUCTOR,
        };
    }
    _getEntryBeforeInitialModifierCallstackEntry(trace) {
        if (message_trace_1.isDecodedCreateTrace(trace)) {
            return {
                type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
                sourceReference: this._getConstructorStartSourceReference(trace),
                functionType: model_1.ContractFunctionType.CONSTRUCTOR,
            };
        }
        const calledFunction = trace.bytecode.contract.getFunctionFromSelector(trace.calldata.slice(0, 4));
        if (calledFunction !== undefined) {
            return {
                type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
                sourceReference: this._getFunctionStartSourceReference(trace, calledFunction),
                functionType: model_1.ContractFunctionType.FUNCTION,
            };
        }
        // If it failed or made a call from within a modifier, and the selector doesn't match
        // any function, it must have a fallback.
        return {
            type: solidity_stack_trace_1.StackTraceEntryType.CALLSTACK_ENTRY,
            sourceReference: this._getFallbackStartSourceReference(trace),
            functionType: model_1.ContractFunctionType.FALLBACK,
        };
    }
    // Source reference factories
    _getContractStartWithoutFunctionSourceReference(trace) {
        return {
            file: trace.bytecode.contract.location.file,
            contract: trace.bytecode.contract.name,
            line: trace.bytecode.contract.location.getStartingLineNumber(),
        };
    }
    /**
     * Returns a source reference pointing to the constructor if it exists, or to the contract
     * otherwise.
     */
    _getConstructorStartSourceReference(trace) {
        const contract = trace.bytecode.contract;
        const constructor = contract.constructorFunction;
        const line = constructor !== undefined
            ? constructor.location.getStartingLineNumber()
            : contract.location.getStartingLineNumber();
        return {
            file: contract.location.file,
            contract: contract.name,
            function: solidity_stack_trace_1.CONSTRUCTOR_FUNCTION_NAME,
            line,
        };
    }
    _getFallbackStartSourceReference(trace) {
        const func = trace.bytecode.contract.fallback;
        if (func === undefined) {
            throw new Error("This shouldn't happen: trying to get fallback source reference from a contract without fallback");
        }
        return {
            file: func.location.file,
            contract: trace.bytecode.contract.name,
            function: solidity_stack_trace_1.FALLBACK_FUNCTION_NAME,
            line: func.location.getStartingLineNumber(),
        };
    }
    _getFunctionStartSourceReference(trace, func) {
        return {
            file: func.location.file,
            contract: trace.bytecode.contract.name,
            function: func.name,
            line: func.location.getStartingLineNumber(),
        };
    }
    _getLastSourceReference(trace) {
        for (let i = trace.steps.length - 1; i >= 0; i--) {
            const step = trace.steps[i];
            if (!message_trace_1.isEvmStep(step)) {
                continue;
            }
            const inst = trace.bytecode.getInstruction(step.pc);
            if (inst.location === undefined) {
                continue;
            }
            return this._sourceLocationToSourceReference(trace.bytecode, inst.location);
        }
        return undefined;
    }
    _sourceLocationToSourceReference(bytecode, location) {
        if (location === undefined) {
            return undefined;
        }
        const func = location.getContainingFunction();
        if (func === undefined) {
            return undefined;
        }
        let funcName = func.name;
        if (func.type === model_1.ContractFunctionType.CONSTRUCTOR) {
            funcName = solidity_stack_trace_1.CONSTRUCTOR_FUNCTION_NAME;
        }
        else if (func.type === model_1.ContractFunctionType.FALLBACK) {
            funcName = solidity_stack_trace_1.FALLBACK_FUNCTION_NAME;
        }
        else if (func.type === model_1.ContractFunctionType.RECEIVE) {
            funcName = solidity_stack_trace_1.RECEIVE_FUNCTION_NAME;
        }
        return {
            function: funcName,
            contract: bytecode.contract.name,
            file: func.location.file,
            line: location.getStartingLineNumber(),
        };
    }
    // Utils
    _getLastSubtrace(trace) {
        if (trace.numberOfSubtraces < 1) {
            return undefined;
        }
        let i = trace.steps.length - 1;
        while (message_trace_1.isEvmStep(trace.steps[i])) {
            i -= 1;
        }
        return trace.steps[i];
    }
    _getLastInstructionWithValidLocationStepIndex(trace) {
        for (let i = trace.steps.length - 1; i >= 0; i--) {
            const step = trace.steps[i];
            if (!message_trace_1.isEvmStep(step)) {
                return undefined;
            }
            const inst = trace.bytecode.getInstruction(step.pc);
            if (inst.location !== undefined) {
                return i;
            }
        }
        return undefined;
    }
    _getLastInstructionWithValidLocation(trace) {
        const lastLocationIndex = this._getLastInstructionWithValidLocationStepIndex(trace);
        if (lastLocationIndex === undefined) {
            return undefined;
        }
        const lastLocationStep = trace.steps[lastLocationIndex];
        if (message_trace_1.isEvmStep(lastLocationStep)) {
            const lastInstructionWithLocation = trace.bytecode.getInstruction(lastLocationStep.pc);
            return lastInstructionWithLocation;
        }
        return undefined;
    }
    _isLastLocation(trace, fromStep, location) {
        for (let i = fromStep; i < trace.steps.length; i++) {
            const step = trace.steps[i];
            if (!message_trace_1.isEvmStep(step)) {
                return false;
            }
            const stepInst = trace.bytecode.getInstruction(step.pc);
            if (stepInst.location === undefined) {
                continue;
            }
            if (!location.equals(stepInst.location)) {
                return false;
            }
        }
        return true;
    }
    // Solidity 0.6.3 unmapped reverts special handling
    // For more info: https://github.com/ethereum/solidity/issues/9006
    _solidity063GetFrameForUnmappedRevertBeforeFunction(trace) {
        let revertFrame = this._solidity063GetFrameForUnmappedRevertWithinFunction(trace);
        if (revertFrame === undefined ||
            revertFrame.sourceReference === undefined) {
            if (trace.bytecode.contract.receive === undefined ||
                trace.calldata.length > 0) {
                if (trace.bytecode.contract.fallback !== undefined) {
                    // Failed within the fallback
                    revertFrame = {
                        type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR,
                        sourceReference: {
                            contract: trace.bytecode.contract.name,
                            function: solidity_stack_trace_1.FALLBACK_FUNCTION_NAME,
                            file: trace.bytecode.contract.fallback.location.file,
                            line: trace.bytecode.contract.fallback.location.getStartingLineNumber(),
                        },
                    };
                    this._solidity063CorrectLineNumber(revertFrame);
                }
            }
            else {
                // Failed within the receive function
                revertFrame = {
                    type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR,
                    sourceReference: {
                        contract: trace.bytecode.contract.name,
                        function: solidity_stack_trace_1.RECEIVE_FUNCTION_NAME,
                        file: trace.bytecode.contract.receive.location.file,
                        line: trace.bytecode.contract.receive.location.getStartingLineNumber(),
                    },
                };
                this._solidity063CorrectLineNumber(revertFrame);
            }
        }
        return revertFrame;
    }
    _solidity063GetFrameForUnmappedRevertWithinFunction(trace) {
        // If we are within a function there's a last valid location. It may
        // be the entire contract.
        const prevInst = this._getLastInstructionWithValidLocation(trace);
        const lastStep = trace.steps[trace.steps.length - 1];
        const nextInstPc = lastStep.pc + 1;
        const hasNextInst = trace.bytecode.hasInstruction(nextInstPc);
        if (hasNextInst) {
            const nextInst = trace.bytecode.getInstruction(nextInstPc);
            const prevLoc = prevInst.location;
            const nextLoc = nextInst.location;
            const prevFunc = prevLoc.getContainingFunction();
            const nextFunc = nextLoc === null || nextLoc === void 0 ? void 0 : nextLoc.getContainingFunction();
            // This is probably a require. This means that we have the exact
            // line, but the stack trace may be degraded (e.g. missing our
            // synthetic call frames when failing in a modifier) so we still
            // add this frame as UNMAPPED_SOLC_0_6_3_REVERT_ERROR
            if (prevFunc !== undefined &&
                nextLoc !== undefined &&
                prevLoc.equals(nextLoc)) {
                return Object.assign(Object.assign({}, this._instructionWithinFunctionToRevertStackTraceEntry(trace, nextInst)), { type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR });
            }
            let revertFrame;
            // If the previous and next location don't match, we try to use the
            // previous one if it's inside a function, otherwise we use the next one
            if (prevFunc !== undefined) {
                revertFrame = Object.assign(Object.assign({}, this._instructionWithinFunctionToRevertStackTraceEntry(trace, prevInst)), { type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR });
            }
            else if (nextFunc !== undefined) {
                revertFrame = Object.assign(Object.assign({}, this._instructionWithinFunctionToRevertStackTraceEntry(trace, nextInst)), { type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR });
            }
            if (revertFrame !== undefined) {
                this._solidity063CorrectLineNumber(revertFrame);
            }
            return revertFrame;
        }
        if (message_trace_1.isCreateTrace(trace)) {
            // Solidity is smart enough to stop emitting extra instructions after
            // an unconditional revert happens in a constructor. If this is the case
            // we just return a special error.
            const constructorRevertFrame = Object.assign(Object.assign({}, this._instructionWithinFunctionToRevertStackTraceEntry(trace, prevInst)), { type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR });
            // When the latest instruction is not within a function we need
            // some default sourceReference to show to the user
            if (constructorRevertFrame.sourceReference === undefined) {
                const defaultSourceReference = {
                    function: solidity_stack_trace_1.CONSTRUCTOR_FUNCTION_NAME,
                    contract: trace.bytecode.contract.name,
                    file: trace.bytecode.contract.location.file,
                    line: trace.bytecode.contract.location.getStartingLineNumber(),
                };
                if (trace.bytecode.contract.constructorFunction !== undefined) {
                    defaultSourceReference.line = trace.bytecode.contract.constructorFunction.location.getStartingLineNumber();
                }
                constructorRevertFrame.sourceReference = defaultSourceReference;
            }
            else {
                this._solidity063CorrectLineNumber(constructorRevertFrame);
            }
            return constructorRevertFrame;
        }
        // We may as well just be in a function or modifier and just happen
        // to be at the last instruction of the runtime bytecode.
        // In this case we just return whatever the last mapped intruction
        // points to.
        const latestInstructionRevertFrame = Object.assign(Object.assign({}, this._instructionWithinFunctionToRevertStackTraceEntry(trace, prevInst)), { type: solidity_stack_trace_1.StackTraceEntryType.UNMAPPED_SOLC_0_6_3_REVERT_ERROR });
        if (latestInstructionRevertFrame.sourceReference !== undefined) {
            this._solidity063CorrectLineNumber(latestInstructionRevertFrame);
        }
        return latestInstructionRevertFrame;
    }
    _solidity063MaybeUnmappedRevert(trace) {
        const lastStep = trace.steps[trace.steps.length - 1];
        if (!message_trace_1.isEvmStep(lastStep)) {
            return false;
        }
        const lastInst = trace.bytecode.getInstruction(lastStep.pc);
        return (semver_1.default.satisfies(trace.bytecode.compilerVersion, `^${FIRST_SOLC_VERSION_WITH_UNMAPPED_REVERTS}`) && lastInst.opcode === opcodes_1.Opcode.REVERT);
    }
    _solidity063CorrectLineNumber(revertFrame) {
        const file = revertFrame.sourceReference.file;
        const lines = file.content.split("\n");
        const currentLine = lines[revertFrame.sourceReference.line - 1];
        if (currentLine.includes("require") || currentLine.includes("revert")) {
            return;
        }
        const nextLines = lines.slice(revertFrame.sourceReference.line);
        const firstNonEmptyLine = nextLines.findIndex((l) => l.trim() !== "");
        if (firstNonEmptyLine === -1) {
            return;
        }
        const nextLine = nextLines[firstNonEmptyLine];
        if (nextLine.includes("require") || nextLine.includes("revert")) {
            revertFrame.sourceReference.line += 1 + firstNonEmptyLine;
        }
    }
}
exports.SolidityTracer = SolidityTracer;
//# sourceMappingURL=solidityTracer.js.map