"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var MakerPoolAssignmentErrorCodes;
(function (MakerPoolAssignmentErrorCodes) {
    MakerPoolAssignmentErrorCodes[MakerPoolAssignmentErrorCodes["MakerAddressAlreadyRegistered"] = 0] = "MakerAddressAlreadyRegistered";
    MakerPoolAssignmentErrorCodes[MakerPoolAssignmentErrorCodes["MakerAddressNotRegistered"] = 1] = "MakerAddressNotRegistered";
    MakerPoolAssignmentErrorCodes[MakerPoolAssignmentErrorCodes["MakerAddressNotPendingAdd"] = 2] = "MakerAddressNotPendingAdd";
    MakerPoolAssignmentErrorCodes[MakerPoolAssignmentErrorCodes["PoolIsFull"] = 3] = "PoolIsFull";
})(MakerPoolAssignmentErrorCodes = exports.MakerPoolAssignmentErrorCodes || (exports.MakerPoolAssignmentErrorCodes = {}));
var OperatorShareErrorCodes;
(function (OperatorShareErrorCodes) {
    OperatorShareErrorCodes[OperatorShareErrorCodes["OperatorShareTooLarge"] = 0] = "OperatorShareTooLarge";
    OperatorShareErrorCodes[OperatorShareErrorCodes["CanOnlyDecreaseOperatorShare"] = 1] = "CanOnlyDecreaseOperatorShare";
})(OperatorShareErrorCodes = exports.OperatorShareErrorCodes || (exports.OperatorShareErrorCodes = {}));
var InvalidParamValueErrorCodes;
(function (InvalidParamValueErrorCodes) {
    InvalidParamValueErrorCodes[InvalidParamValueErrorCodes["InvalidCobbDouglasAlpha"] = 0] = "InvalidCobbDouglasAlpha";
    InvalidParamValueErrorCodes[InvalidParamValueErrorCodes["InvalidRewardDelegatedStakeWeight"] = 1] = "InvalidRewardDelegatedStakeWeight";
    InvalidParamValueErrorCodes[InvalidParamValueErrorCodes["InvalidMaximumMakersInPool"] = 2] = "InvalidMaximumMakersInPool";
    InvalidParamValueErrorCodes[InvalidParamValueErrorCodes["InvalidMinimumPoolStake"] = 3] = "InvalidMinimumPoolStake";
    InvalidParamValueErrorCodes[InvalidParamValueErrorCodes["InvalidEpochDuration"] = 4] = "InvalidEpochDuration";
})(InvalidParamValueErrorCodes = exports.InvalidParamValueErrorCodes || (exports.InvalidParamValueErrorCodes = {}));
var InitializationErrorCodes;
(function (InitializationErrorCodes) {
    InitializationErrorCodes[InitializationErrorCodes["MixinSchedulerAlreadyInitialized"] = 0] = "MixinSchedulerAlreadyInitialized";
    InitializationErrorCodes[InitializationErrorCodes["MixinParamsAlreadyInitialized"] = 1] = "MixinParamsAlreadyInitialized";
})(InitializationErrorCodes = exports.InitializationErrorCodes || (exports.InitializationErrorCodes = {}));
var ExchangeManagerErrorCodes;
(function (ExchangeManagerErrorCodes) {
    ExchangeManagerErrorCodes[ExchangeManagerErrorCodes["ExchangeAlreadyRegistered"] = 0] = "ExchangeAlreadyRegistered";
    ExchangeManagerErrorCodes[ExchangeManagerErrorCodes["ExchangeNotRegistered"] = 1] = "ExchangeNotRegistered";
})(ExchangeManagerErrorCodes = exports.ExchangeManagerErrorCodes || (exports.ExchangeManagerErrorCodes = {}));
class OnlyCallableByExchangeError extends revert_error_1.RevertError {
    constructor(senderAddress) {
        super('OnlyCallableByExchangeError', 'OnlyCallableByExchangeError(address senderAddress)', { senderAddress });
    }
}
exports.OnlyCallableByExchangeError = OnlyCallableByExchangeError;
class ExchangeManagerError extends revert_error_1.RevertError {
    constructor(errorCode, senderAddress) {
        super('ExchangeManagerError', 'ExchangeManagerError(uint8 errorCode, address senderAddress)', {
            errorCode,
            senderAddress,
        });
    }
}
exports.ExchangeManagerError = ExchangeManagerError;
class InsufficientBalanceError extends revert_error_1.RevertError {
    constructor(amount, balance) {
        super('InsufficientBalanceError', 'InsufficientBalanceError(uint256 amount, uint256 balance)', {
            amount,
            balance,
        });
    }
}
exports.InsufficientBalanceError = InsufficientBalanceError;
class OnlyCallableByPoolOperatorError extends revert_error_1.RevertError {
    constructor(senderAddress, poolId) {
        super('OnlyCallableByPoolOperatorError', 'OnlyCallableByPoolOperatorError(address senderAddress, bytes32 poolId)', { senderAddress, poolId });
    }
}
exports.OnlyCallableByPoolOperatorError = OnlyCallableByPoolOperatorError;
class MakerPoolAssignmentError extends revert_error_1.RevertError {
    constructor(error, makerAddress, poolId) {
        super('MakerPoolAssignmentError', 'MakerPoolAssignmentError(uint8 error, address makerAddress, bytes32 poolId)', {
            error,
            makerAddress,
            poolId,
        });
    }
}
exports.MakerPoolAssignmentError = MakerPoolAssignmentError;
class BlockTimestampTooLowError extends revert_error_1.RevertError {
    constructor(epochEndTime, currentBlockTimestamp) {
        super('BlockTimestampTooLowError', 'BlockTimestampTooLowError(uint256 epochEndTime, uint256 currentBlockTimestamp)', { epochEndTime, currentBlockTimestamp });
    }
}
exports.BlockTimestampTooLowError = BlockTimestampTooLowError;
class OnlyCallableByStakingContractError extends revert_error_1.RevertError {
    constructor(senderAddress) {
        super('OnlyCallableByStakingContractError', 'OnlyCallableByStakingContractError(address senderAddress)', {
            senderAddress,
        });
    }
}
exports.OnlyCallableByStakingContractError = OnlyCallableByStakingContractError;
class OnlyCallableIfInCatastrophicFailureError extends revert_error_1.RevertError {
    constructor() {
        super('OnlyCallableIfInCatastrophicFailureError', 'OnlyCallableIfInCatastrophicFailureError()', {});
    }
}
exports.OnlyCallableIfInCatastrophicFailureError = OnlyCallableIfInCatastrophicFailureError;
class OnlyCallableIfNotInCatastrophicFailureError extends revert_error_1.RevertError {
    constructor() {
        super('OnlyCallableIfNotInCatastrophicFailureError', 'OnlyCallableIfNotInCatastrophicFailureError()', {});
    }
}
exports.OnlyCallableIfNotInCatastrophicFailureError = OnlyCallableIfNotInCatastrophicFailureError;
class OperatorShareError extends revert_error_1.RevertError {
    constructor(error, poolId, operatorShare) {
        super('OperatorShareError', 'OperatorShareError(uint8 error, bytes32 poolId, uint32 operatorShare)', {
            error,
            poolId,
            operatorShare,
        });
    }
}
exports.OperatorShareError = OperatorShareError;
class PoolExistenceError extends revert_error_1.RevertError {
    constructor(poolId, alreadyExists) {
        super('PoolExistenceError', 'PoolExistenceError(bytes32 poolId, bool alreadyExists)', {
            poolId,
            alreadyExists,
        });
    }
}
exports.PoolExistenceError = PoolExistenceError;
class InvalidParamValueError extends revert_error_1.RevertError {
    constructor(error) {
        super('InvalidParamValueError', 'InvalidParamValueError(uint8 error)', {
            error,
        });
    }
}
exports.InvalidParamValueError = InvalidParamValueError;
class InvalidProtocolFeePaymentError extends revert_error_1.RevertError {
    constructor(expectedProtocolFeePaid, actualProtocolFeePaid) {
        super('InvalidProtocolFeePaymentError', 'InvalidProtocolFeePaymentError(uint256 expectedProtocolFeePaid, uint256 actualProtocolFeePaid)', { expectedProtocolFeePaid, actualProtocolFeePaid });
    }
}
exports.InvalidProtocolFeePaymentError = InvalidProtocolFeePaymentError;
class InitializationError extends revert_error_1.RevertError {
    constructor(error) {
        super('InitializationError', 'InitializationError(uint8 error)', { error });
    }
}
exports.InitializationError = InitializationError;
class ProxyDestinationCannotBeNilError extends revert_error_1.RevertError {
    constructor() {
        super('ProxyDestinationCannotBeNilError', 'ProxyDestinationCannotBeNilError()', {});
    }
}
exports.ProxyDestinationCannotBeNilError = ProxyDestinationCannotBeNilError;
class PreviousEpochNotFinalizedError extends revert_error_1.RevertError {
    constructor(closingEpoch, unfinalizedPoolsRemaining) {
        super('PreviousEpochNotFinalizedError', 'PreviousEpochNotFinalizedError(uint256 closingEpoch, uint256 unfinalizedPoolsRemaining)', { closingEpoch, unfinalizedPoolsRemaining });
    }
}
exports.PreviousEpochNotFinalizedError = PreviousEpochNotFinalizedError;
class PoolNotFinalizedError extends revert_error_1.RevertError {
    constructor(poolId, epoch) {
        super('PoolNotFinalizedError', 'PoolNotFinalizedError(bytes32 poolId, uint256 epoch)', { poolId, epoch });
    }
}
exports.PoolNotFinalizedError = PoolNotFinalizedError;
const types = [
    BlockTimestampTooLowError,
    ExchangeManagerError,
    InitializationError,
    InsufficientBalanceError,
    InvalidProtocolFeePaymentError,
    InvalidParamValueError,
    MakerPoolAssignmentError,
    OnlyCallableByExchangeError,
    OnlyCallableByPoolOperatorError,
    OnlyCallableByStakingContractError,
    OnlyCallableIfInCatastrophicFailureError,
    OnlyCallableIfNotInCatastrophicFailureError,
    OperatorShareError,
    PoolExistenceError,
    PreviousEpochNotFinalizedError,
    ProxyDestinationCannotBeNilError,
    PoolNotFinalizedError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=staking_revert_errors.js.map