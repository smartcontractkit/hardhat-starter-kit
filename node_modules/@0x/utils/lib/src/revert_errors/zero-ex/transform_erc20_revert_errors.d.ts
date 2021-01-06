import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class InsufficientEthAttachedError extends RevertError {
    constructor(ethAttached?: Numberish, ethNeeded?: Numberish);
}
export declare class IncompleteTransformERC20Error extends RevertError {
    constructor(outputToken?: string, outputTokenAmount?: Numberish, minOutputTokenAmount?: Numberish);
}
export declare class NegativeTransformERC20OutputError extends RevertError {
    constructor(outputToken?: string, outputTokenLostAmount?: Numberish);
}
export declare class TransformerFailedError extends RevertError {
    constructor(transformer?: string, transformerData?: string, resultData?: string);
}
export declare class OnlyCallableByDeployerError extends RevertError {
    constructor(caller?: string, deployer?: string);
}
export declare class InvalidExecutionContextError extends RevertError {
    constructor(actualContext?: string, expectedContext?: string);
}
export declare enum InvalidTransformDataErrorCode {
    InvalidTokens = 0,
    InvalidArrayLength = 1
}
export declare class InvalidTransformDataError extends RevertError {
    constructor(errorCode?: InvalidTransformDataErrorCode, transformData?: string);
}
export declare class IncompleteFillSellQuoteError extends RevertError {
    constructor(sellToken?: string, soldAmount?: Numberish, sellAmount?: Numberish);
}
export declare class IncompleteFillBuyQuoteError extends RevertError {
    constructor(buyToken?: string, boughtAmount?: Numberish, buyAmount?: Numberish);
}
export declare class InsufficientTakerTokenError extends RevertError {
    constructor(tokenBalance?: Numberish, tokensNeeded?: Numberish);
}
export declare class InsufficientProtocolFeeError extends RevertError {
    constructor(ethBalance?: Numberish, ethNeeded?: Numberish);
}
export declare class InvalidERC20AssetDataError extends RevertError {
    constructor(assetData?: string);
}
export declare class WrongNumberOfTokensReceivedError extends RevertError {
    constructor(actual?: Numberish, expected?: Numberish);
}
export declare class InvalidTokenReceivedError extends RevertError {
    constructor(token?: string);
}
export declare class InvalidTakerFeeTokenError extends RevertError {
    constructor(token?: string);
}
//# sourceMappingURL=transform_erc20_revert_errors.d.ts.map