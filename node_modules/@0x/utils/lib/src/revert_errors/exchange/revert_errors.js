"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var BatchMatchOrdersErrorCodes;
(function (BatchMatchOrdersErrorCodes) {
    BatchMatchOrdersErrorCodes[BatchMatchOrdersErrorCodes["ZeroLeftOrders"] = 0] = "ZeroLeftOrders";
    BatchMatchOrdersErrorCodes[BatchMatchOrdersErrorCodes["ZeroRightOrders"] = 1] = "ZeroRightOrders";
    BatchMatchOrdersErrorCodes[BatchMatchOrdersErrorCodes["InvalidLengthLeftSignatures"] = 2] = "InvalidLengthLeftSignatures";
    BatchMatchOrdersErrorCodes[BatchMatchOrdersErrorCodes["InvalidLengthRightSignatures"] = 3] = "InvalidLengthRightSignatures";
})(BatchMatchOrdersErrorCodes = exports.BatchMatchOrdersErrorCodes || (exports.BatchMatchOrdersErrorCodes = {}));
var ExchangeContextErrorCodes;
(function (ExchangeContextErrorCodes) {
    ExchangeContextErrorCodes[ExchangeContextErrorCodes["InvalidMaker"] = 0] = "InvalidMaker";
    ExchangeContextErrorCodes[ExchangeContextErrorCodes["InvalidTaker"] = 1] = "InvalidTaker";
    ExchangeContextErrorCodes[ExchangeContextErrorCodes["InvalidSender"] = 2] = "InvalidSender";
})(ExchangeContextErrorCodes = exports.ExchangeContextErrorCodes || (exports.ExchangeContextErrorCodes = {}));
var FillErrorCode;
(function (FillErrorCode) {
    FillErrorCode[FillErrorCode["InvalidTakerAmount"] = 0] = "InvalidTakerAmount";
    FillErrorCode[FillErrorCode["TakerOverpay"] = 1] = "TakerOverpay";
    FillErrorCode[FillErrorCode["Overfill"] = 2] = "Overfill";
    FillErrorCode[FillErrorCode["InvalidFillPrice"] = 3] = "InvalidFillPrice";
})(FillErrorCode = exports.FillErrorCode || (exports.FillErrorCode = {}));
var SignatureErrorCode;
(function (SignatureErrorCode) {
    SignatureErrorCode[SignatureErrorCode["BadOrderSignature"] = 0] = "BadOrderSignature";
    SignatureErrorCode[SignatureErrorCode["BadTransactionSignature"] = 1] = "BadTransactionSignature";
    SignatureErrorCode[SignatureErrorCode["InvalidLength"] = 2] = "InvalidLength";
    SignatureErrorCode[SignatureErrorCode["Unsupported"] = 3] = "Unsupported";
    SignatureErrorCode[SignatureErrorCode["Illegal"] = 4] = "Illegal";
    SignatureErrorCode[SignatureErrorCode["InappropriateSignatureType"] = 5] = "InappropriateSignatureType";
    SignatureErrorCode[SignatureErrorCode["InvalidSigner"] = 6] = "InvalidSigner";
})(SignatureErrorCode = exports.SignatureErrorCode || (exports.SignatureErrorCode = {}));
var AssetProxyDispatchErrorCode;
(function (AssetProxyDispatchErrorCode) {
    AssetProxyDispatchErrorCode[AssetProxyDispatchErrorCode["InvalidAssetDataLength"] = 0] = "InvalidAssetDataLength";
    AssetProxyDispatchErrorCode[AssetProxyDispatchErrorCode["UnknownAssetProxy"] = 1] = "UnknownAssetProxy";
})(AssetProxyDispatchErrorCode = exports.AssetProxyDispatchErrorCode || (exports.AssetProxyDispatchErrorCode = {}));
var TransactionErrorCode;
(function (TransactionErrorCode) {
    TransactionErrorCode[TransactionErrorCode["AlreadyExecuted"] = 0] = "AlreadyExecuted";
    TransactionErrorCode[TransactionErrorCode["Expired"] = 1] = "Expired";
})(TransactionErrorCode = exports.TransactionErrorCode || (exports.TransactionErrorCode = {}));
var IncompleteFillErrorCode;
(function (IncompleteFillErrorCode) {
    IncompleteFillErrorCode[IncompleteFillErrorCode["IncompleteMarketBuyOrders"] = 0] = "IncompleteMarketBuyOrders";
    IncompleteFillErrorCode[IncompleteFillErrorCode["IncompleteMarketSellOrders"] = 1] = "IncompleteMarketSellOrders";
    IncompleteFillErrorCode[IncompleteFillErrorCode["IncompleteFillOrder"] = 2] = "IncompleteFillOrder";
})(IncompleteFillErrorCode = exports.IncompleteFillErrorCode || (exports.IncompleteFillErrorCode = {}));
class BatchMatchOrdersError extends revert_error_1.RevertError {
    constructor(error) {
        super('BatchMatchOrdersError', 'BatchMatchOrdersError(uint8 error)', { error });
    }
}
exports.BatchMatchOrdersError = BatchMatchOrdersError;
class SignatureError extends revert_error_1.RevertError {
    constructor(error, hash, signer, signature) {
        super('SignatureError', 'SignatureError(uint8 error, bytes32 hash, address signer, bytes signature)', {
            error,
            hash,
            signer,
            signature,
        });
    }
}
exports.SignatureError = SignatureError;
class SignatureValidatorNotApprovedError extends revert_error_1.RevertError {
    constructor(signer, validator) {
        super('SignatureValidatorNotApprovedError', 'SignatureValidatorNotApprovedError(address signer, address validator)', {
            signer,
            validator,
        });
    }
}
exports.SignatureValidatorNotApprovedError = SignatureValidatorNotApprovedError;
class SignatureWalletError extends revert_error_1.RevertError {
    constructor(hash, wallet, signature, errorData) {
        super('SignatureWalletError', 'SignatureWalletError(bytes32 hash, address wallet, bytes signature, bytes errorData)', {
            hash,
            wallet,
            signature,
            errorData,
        });
    }
}
exports.SignatureWalletError = SignatureWalletError;
class EIP1271SignatureError extends revert_error_1.RevertError {
    constructor(verifyingContract, data, signature, errorData) {
        super('EIP1271SignatureError', 'EIP1271SignatureError(address verifyingContract, bytes data, bytes signature, bytes errorData)', {
            verifyingContract,
            data,
            signature,
            errorData,
        });
    }
}
exports.EIP1271SignatureError = EIP1271SignatureError;
class OrderStatusError extends revert_error_1.RevertError {
    constructor(orderHash, status) {
        super('OrderStatusError', 'OrderStatusError(bytes32 orderHash, uint8 status)', { orderHash, status });
    }
}
exports.OrderStatusError = OrderStatusError;
class FillError extends revert_error_1.RevertError {
    constructor(error, orderHash) {
        super('FillError', 'FillError(uint8 error, bytes32 orderHash)', { error, orderHash });
    }
}
exports.FillError = FillError;
class OrderEpochError extends revert_error_1.RevertError {
    constructor(maker, sender, currentEpoch) {
        super('OrderEpochError', 'OrderEpochError(address maker, address sender, uint256 currentEpoch)', {
            maker,
            sender,
            currentEpoch,
        });
    }
}
exports.OrderEpochError = OrderEpochError;
class AssetProxyExistsError extends revert_error_1.RevertError {
    constructor(assetProxyId, assetProxy) {
        super('AssetProxyExistsError', 'AssetProxyExistsError(bytes4 assetProxyId, address assetProxy)', {
            assetProxyId,
            assetProxy,
        });
    }
}
exports.AssetProxyExistsError = AssetProxyExistsError;
class AssetProxyDispatchError extends revert_error_1.RevertError {
    constructor(error, orderHash, assetData) {
        super('AssetProxyDispatchError', 'AssetProxyDispatchError(uint8 error, bytes32 orderHash, bytes assetData)', {
            error,
            orderHash,
            assetData,
        });
    }
}
exports.AssetProxyDispatchError = AssetProxyDispatchError;
class AssetProxyTransferError extends revert_error_1.RevertError {
    constructor(orderHash, assetData, errorData) {
        super('AssetProxyTransferError', 'AssetProxyTransferError(bytes32 orderHash, bytes assetData, bytes errorData)', {
            orderHash,
            assetData,
            errorData,
        });
    }
}
exports.AssetProxyTransferError = AssetProxyTransferError;
class NegativeSpreadError extends revert_error_1.RevertError {
    constructor(leftOrderHash, rightOrderHash) {
        super('NegativeSpreadError', 'NegativeSpreadError(bytes32 leftOrderHash, bytes32 rightOrderHash)', {
            leftOrderHash,
            rightOrderHash,
        });
    }
}
exports.NegativeSpreadError = NegativeSpreadError;
class TransactionError extends revert_error_1.RevertError {
    constructor(error, transactionHash) {
        super('TransactionError', 'TransactionError(uint8 error, bytes32 transactionHash)', { error, transactionHash });
    }
}
exports.TransactionError = TransactionError;
class TransactionExecutionError extends revert_error_1.RevertError {
    constructor(transactionHash, errorData) {
        super('TransactionExecutionError', 'TransactionExecutionError(bytes32 transactionHash, bytes errorData)', {
            transactionHash,
            errorData,
        });
    }
}
exports.TransactionExecutionError = TransactionExecutionError;
class TransactionGasPriceError extends revert_error_1.RevertError {
    constructor(transactionHash, actualGasPrice, requiredGasPrice) {
        super('TransactionGasPriceError', 'TransactionGasPriceError(bytes32 transactionHash, uint256 actualGasPrice, uint256 requiredGasPrice)', {
            transactionHash,
            actualGasPrice,
            requiredGasPrice,
        });
    }
}
exports.TransactionGasPriceError = TransactionGasPriceError;
class TransactionInvalidContextError extends revert_error_1.RevertError {
    constructor(transactionHash, currentContextAddress) {
        super('TransactionInvalidContextError', 'TransactionInvalidContextError(bytes32 transactionHash, address currentContextAddress)', {
            transactionHash,
            currentContextAddress,
        });
    }
}
exports.TransactionInvalidContextError = TransactionInvalidContextError;
class IncompleteFillError extends revert_error_1.RevertError {
    constructor(error, expectedAssetFillAmount, actualAssetFillAmount) {
        super('IncompleteFillError', 'IncompleteFillError(uint8 error, uint256 expectedAssetFillAmount, uint256 actualAssetFillAmount)', {
            error,
            expectedAssetFillAmount,
            actualAssetFillAmount,
        });
    }
}
exports.IncompleteFillError = IncompleteFillError;
class ExchangeInvalidContextError extends revert_error_1.RevertError {
    constructor(error, orderHash, contextAddress) {
        super('ExchangeInvalidContextError', 'ExchangeInvalidContextError(uint8 error, bytes32 orderHash, address contextAddress)', { error, orderHash, contextAddress });
    }
}
exports.ExchangeInvalidContextError = ExchangeInvalidContextError;
class PayProtocolFeeError extends revert_error_1.RevertError {
    constructor(orderHash, protocolFee, makerAddress, takerAddress, errorData) {
        super('PayProtocolFeeError', 'PayProtocolFeeError(bytes32 orderHash, uint256 protocolFee, address makerAddress, address takerAddress, bytes errorData)', { orderHash, protocolFee, makerAddress, takerAddress, errorData });
    }
}
exports.PayProtocolFeeError = PayProtocolFeeError;
const types = [
    AssetProxyExistsError,
    AssetProxyDispatchError,
    AssetProxyTransferError,
    BatchMatchOrdersError,
    EIP1271SignatureError,
    ExchangeInvalidContextError,
    FillError,
    IncompleteFillError,
    NegativeSpreadError,
    OrderEpochError,
    OrderStatusError,
    PayProtocolFeeError,
    SignatureError,
    SignatureValidatorNotApprovedError,
    SignatureWalletError,
    TransactionError,
    TransactionExecutionError,
    TransactionGasPriceError,
    TransactionInvalidContextError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=revert_errors.js.map