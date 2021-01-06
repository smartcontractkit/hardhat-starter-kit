import { OrderStatus } from '@0x/types';
import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare enum BatchMatchOrdersErrorCodes {
    ZeroLeftOrders = 0,
    ZeroRightOrders = 1,
    InvalidLengthLeftSignatures = 2,
    InvalidLengthRightSignatures = 3
}
export declare enum ExchangeContextErrorCodes {
    InvalidMaker = 0,
    InvalidTaker = 1,
    InvalidSender = 2
}
export declare enum FillErrorCode {
    InvalidTakerAmount = 0,
    TakerOverpay = 1,
    Overfill = 2,
    InvalidFillPrice = 3
}
export declare enum SignatureErrorCode {
    BadOrderSignature = 0,
    BadTransactionSignature = 1,
    InvalidLength = 2,
    Unsupported = 3,
    Illegal = 4,
    InappropriateSignatureType = 5,
    InvalidSigner = 6
}
export declare enum AssetProxyDispatchErrorCode {
    InvalidAssetDataLength = 0,
    UnknownAssetProxy = 1
}
export declare enum TransactionErrorCode {
    AlreadyExecuted = 0,
    Expired = 1
}
export declare enum IncompleteFillErrorCode {
    IncompleteMarketBuyOrders = 0,
    IncompleteMarketSellOrders = 1,
    IncompleteFillOrder = 2
}
export declare class BatchMatchOrdersError extends RevertError {
    constructor(error?: BatchMatchOrdersErrorCodes);
}
export declare class SignatureError extends RevertError {
    constructor(error?: SignatureErrorCode, hash?: string, signer?: string, signature?: string);
}
export declare class SignatureValidatorNotApprovedError extends RevertError {
    constructor(signer?: string, validator?: string);
}
export declare class SignatureWalletError extends RevertError {
    constructor(hash?: string, wallet?: string, signature?: string, errorData?: string);
}
export declare class EIP1271SignatureError extends RevertError {
    constructor(verifyingContract?: string, data?: string, signature?: string, errorData?: string);
}
export declare class OrderStatusError extends RevertError {
    constructor(orderHash?: string, status?: OrderStatus);
}
export declare class FillError extends RevertError {
    constructor(error?: FillErrorCode, orderHash?: string);
}
export declare class OrderEpochError extends RevertError {
    constructor(maker?: string, sender?: string, currentEpoch?: BigNumber);
}
export declare class AssetProxyExistsError extends RevertError {
    constructor(assetProxyId?: string, assetProxy?: string);
}
export declare class AssetProxyDispatchError extends RevertError {
    constructor(error?: AssetProxyDispatchErrorCode, orderHash?: string, assetData?: string);
}
export declare class AssetProxyTransferError extends RevertError {
    constructor(orderHash?: string, assetData?: string, errorData?: string);
}
export declare class NegativeSpreadError extends RevertError {
    constructor(leftOrderHash?: string, rightOrderHash?: string);
}
export declare class TransactionError extends RevertError {
    constructor(error?: TransactionErrorCode, transactionHash?: string);
}
export declare class TransactionExecutionError extends RevertError {
    constructor(transactionHash?: string, errorData?: string);
}
export declare class TransactionGasPriceError extends RevertError {
    constructor(transactionHash?: string, actualGasPrice?: BigNumber, requiredGasPrice?: BigNumber);
}
export declare class TransactionInvalidContextError extends RevertError {
    constructor(transactionHash?: string, currentContextAddress?: string);
}
export declare class IncompleteFillError extends RevertError {
    constructor(error?: IncompleteFillErrorCode, expectedAssetFillAmount?: BigNumber, actualAssetFillAmount?: BigNumber);
}
export declare class ExchangeInvalidContextError extends RevertError {
    constructor(error?: ExchangeContextErrorCodes, orderHash?: string, contextAddress?: string);
}
export declare class PayProtocolFeeError extends RevertError {
    constructor(orderHash?: string, protocolFee?: BigNumber, makerAddress?: string, takerAddress?: string, errorData?: string);
}
//# sourceMappingURL=revert_errors.d.ts.map