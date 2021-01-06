"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class InvalidMetaTransactionsArrayLengthsError extends revert_error_1.RevertError {
    constructor(mtxCount, signatureCount) {
        super('InvalidMetaTransactionsArrayLengthsError', 'InvalidMetaTransactionsArrayLengthsError(uint256 mtxCount, uint256 signatureCount)', {
            mtxCount,
            signatureCount,
        });
    }
}
exports.InvalidMetaTransactionsArrayLengthsError = InvalidMetaTransactionsArrayLengthsError;
class MetaTransactionAlreadyExecutedError extends revert_error_1.RevertError {
    constructor(mtxHash, executedBlockNumber) {
        super('MetaTransactionAlreadyExecutedError', 'MetaTransactionAlreadyExecutedError(bytes32 mtxHash, uint256 executedBlockNumber)', {
            mtxHash,
            executedBlockNumber,
        });
    }
}
exports.MetaTransactionAlreadyExecutedError = MetaTransactionAlreadyExecutedError;
class MetaTransactionUnsupportedFunctionError extends revert_error_1.RevertError {
    constructor(mtxHash, selector) {
        super('MetaTransactionUnsupportedFunctionError', 'MetaTransactionUnsupportedFunctionError(bytes32 mtxHash, bytes4 selector)', {
            mtxHash,
            selector,
        });
    }
}
exports.MetaTransactionUnsupportedFunctionError = MetaTransactionUnsupportedFunctionError;
class MetaTransactionWrongSenderError extends revert_error_1.RevertError {
    constructor(mtxHash, sender, expectedSender) {
        super('MetaTransactionWrongSenderError', 'MetaTransactionWrongSenderError(bytes32 mtxHash, address sender, address expectedSender)', {
            mtxHash,
            sender,
            expectedSender,
        });
    }
}
exports.MetaTransactionWrongSenderError = MetaTransactionWrongSenderError;
class MetaTransactionExpiredError extends revert_error_1.RevertError {
    constructor(mtxHash, time, expirationTime) {
        super('MetaTransactionExpiredError', 'MetaTransactionExpiredError(bytes32 mtxHash, uint256 time, uint256 expirationTime)', {
            mtxHash,
            time,
            expirationTime,
        });
    }
}
exports.MetaTransactionExpiredError = MetaTransactionExpiredError;
class MetaTransactionGasPriceError extends revert_error_1.RevertError {
    constructor(mtxHash, gasPrice, minGasPrice, maxGasPrice) {
        super('MetaTransactionGasPriceError', 'MetaTransactionGasPriceError(bytes32 mtxHash, uint256 gasPrice, uint256 minGasPrice, uint256 maxGasPrice)', {
            mtxHash,
            gasPrice,
            minGasPrice,
            maxGasPrice,
        });
    }
}
exports.MetaTransactionGasPriceError = MetaTransactionGasPriceError;
class MetaTransactionInsufficientEthError extends revert_error_1.RevertError {
    constructor(mtxHash, ethBalance, ethRequired) {
        super('MetaTransactionInsufficientEthError', 'MetaTransactionInsufficientEthError(bytes32 mtxHash, uint256 ethBalance, uint256 ethRequired)', {
            mtxHash,
            ethBalance,
            ethRequired,
        });
    }
}
exports.MetaTransactionInsufficientEthError = MetaTransactionInsufficientEthError;
class MetaTransactionInvalidSignatureError extends revert_error_1.RevertError {
    constructor(mtxHash, signature, errData) {
        super('MetaTransactionInvalidSignatureError', 'MetaTransactionInvalidSignatureError(bytes32 mtxHash, bytes signature, bytes errData)', {
            mtxHash,
            signature,
            errData,
        });
    }
}
exports.MetaTransactionInvalidSignatureError = MetaTransactionInvalidSignatureError;
class MetaTransactionCallFailedError extends revert_error_1.RevertError {
    constructor(mtxHash, callData, returnData) {
        super('MetaTransactionCallFailedError', 'MetaTransactionCallFailedError(bytes32 mtxHash, bytes callData, bytes returnData)', {
            mtxHash,
            callData,
            returnData,
        });
    }
}
exports.MetaTransactionCallFailedError = MetaTransactionCallFailedError;
const types = [
    InvalidMetaTransactionsArrayLengthsError,
    MetaTransactionAlreadyExecutedError,
    MetaTransactionUnsupportedFunctionError,
    MetaTransactionWrongSenderError,
    MetaTransactionExpiredError,
    MetaTransactionGasPriceError,
    MetaTransactionInsufficientEthError,
    MetaTransactionInvalidSignatureError,
    MetaTransactionCallFailedError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=meta_transaction_revert_errors.js.map