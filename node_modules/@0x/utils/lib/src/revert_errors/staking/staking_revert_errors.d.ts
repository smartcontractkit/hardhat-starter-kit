import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare enum MakerPoolAssignmentErrorCodes {
    MakerAddressAlreadyRegistered = 0,
    MakerAddressNotRegistered = 1,
    MakerAddressNotPendingAdd = 2,
    PoolIsFull = 3
}
export declare enum OperatorShareErrorCodes {
    OperatorShareTooLarge = 0,
    CanOnlyDecreaseOperatorShare = 1
}
export declare enum InvalidParamValueErrorCodes {
    InvalidCobbDouglasAlpha = 0,
    InvalidRewardDelegatedStakeWeight = 1,
    InvalidMaximumMakersInPool = 2,
    InvalidMinimumPoolStake = 3,
    InvalidEpochDuration = 4
}
export declare enum InitializationErrorCodes {
    MixinSchedulerAlreadyInitialized = 0,
    MixinParamsAlreadyInitialized = 1
}
export declare enum ExchangeManagerErrorCodes {
    ExchangeAlreadyRegistered = 0,
    ExchangeNotRegistered = 1
}
export declare class OnlyCallableByExchangeError extends RevertError {
    constructor(senderAddress?: string);
}
export declare class ExchangeManagerError extends RevertError {
    constructor(errorCode?: ExchangeManagerErrorCodes, senderAddress?: string);
}
export declare class InsufficientBalanceError extends RevertError {
    constructor(amount?: BigNumber | number | string, balance?: BigNumber | number | string);
}
export declare class OnlyCallableByPoolOperatorError extends RevertError {
    constructor(senderAddress?: string, poolId?: string);
}
export declare class MakerPoolAssignmentError extends RevertError {
    constructor(error?: MakerPoolAssignmentErrorCodes, makerAddress?: string, poolId?: string);
}
export declare class BlockTimestampTooLowError extends RevertError {
    constructor(epochEndTime?: BigNumber | number | string, currentBlockTimestamp?: BigNumber | number | string);
}
export declare class OnlyCallableByStakingContractError extends RevertError {
    constructor(senderAddress?: string);
}
export declare class OnlyCallableIfInCatastrophicFailureError extends RevertError {
    constructor();
}
export declare class OnlyCallableIfNotInCatastrophicFailureError extends RevertError {
    constructor();
}
export declare class OperatorShareError extends RevertError {
    constructor(error?: OperatorShareErrorCodes, poolId?: string, operatorShare?: BigNumber | number | string);
}
export declare class PoolExistenceError extends RevertError {
    constructor(poolId?: string, alreadyExists?: boolean);
}
export declare class InvalidParamValueError extends RevertError {
    constructor(error?: InvalidParamValueErrorCodes);
}
export declare class InvalidProtocolFeePaymentError extends RevertError {
    constructor(expectedProtocolFeePaid?: BigNumber | number | string, actualProtocolFeePaid?: BigNumber | number | string);
}
export declare class InitializationError extends RevertError {
    constructor(error?: InitializationErrorCodes);
}
export declare class ProxyDestinationCannotBeNilError extends RevertError {
    constructor();
}
export declare class PreviousEpochNotFinalizedError extends RevertError {
    constructor(closingEpoch?: BigNumber | number | string, unfinalizedPoolsRemaining?: BigNumber | number | string);
}
export declare class PoolNotFinalizedError extends RevertError {
    constructor(poolId: string, epoch: BigNumber | number | string);
}
//# sourceMappingURL=staking_revert_errors.d.ts.map