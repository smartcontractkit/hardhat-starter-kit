"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class InsufficientEthAttachedError extends revert_error_1.RevertError {
    constructor(ethAttached, ethNeeded) {
        super('InsufficientEthAttachedError', 'InsufficientEthAttachedError(uint256 ethAttached, uint256 ethNeeded)', {
            ethAttached,
            ethNeeded,
        });
    }
}
exports.InsufficientEthAttachedError = InsufficientEthAttachedError;
class IncompleteTransformERC20Error extends revert_error_1.RevertError {
    constructor(outputToken, outputTokenAmount, minOutputTokenAmount) {
        super('IncompleteTransformERC20Error', 'IncompleteTransformERC20Error(address outputToken, uint256 outputTokenAmount, uint256 minOutputTokenAmount)', {
            outputToken,
            outputTokenAmount,
            minOutputTokenAmount,
        });
    }
}
exports.IncompleteTransformERC20Error = IncompleteTransformERC20Error;
class NegativeTransformERC20OutputError extends revert_error_1.RevertError {
    constructor(outputToken, outputTokenLostAmount) {
        super('NegativeTransformERC20OutputError', 'NegativeTransformERC20OutputError(address outputToken, uint256 outputTokenLostAmount)', {
            outputToken,
            outputTokenLostAmount,
        });
    }
}
exports.NegativeTransformERC20OutputError = NegativeTransformERC20OutputError;
class TransformerFailedError extends revert_error_1.RevertError {
    constructor(transformer, transformerData, resultData) {
        super('TransformerFailedError', 'TransformerFailedError(address transformer, bytes transformerData, bytes resultData)', {
            transformer,
            transformerData,
            resultData,
        });
    }
}
exports.TransformerFailedError = TransformerFailedError;
class OnlyCallableByDeployerError extends revert_error_1.RevertError {
    constructor(caller, deployer) {
        super('OnlyCallableByDeployerError', 'OnlyCallableByDeployerError(address caller, address deployer)', {
            caller,
            deployer,
        });
    }
}
exports.OnlyCallableByDeployerError = OnlyCallableByDeployerError;
class InvalidExecutionContextError extends revert_error_1.RevertError {
    constructor(actualContext, expectedContext) {
        super('InvalidExecutionContextError', 'InvalidExecutionContextError(address actualContext, address expectedContext)', {
            actualContext,
            expectedContext,
        });
    }
}
exports.InvalidExecutionContextError = InvalidExecutionContextError;
var InvalidTransformDataErrorCode;
(function (InvalidTransformDataErrorCode) {
    InvalidTransformDataErrorCode[InvalidTransformDataErrorCode["InvalidTokens"] = 0] = "InvalidTokens";
    InvalidTransformDataErrorCode[InvalidTransformDataErrorCode["InvalidArrayLength"] = 1] = "InvalidArrayLength";
})(InvalidTransformDataErrorCode = exports.InvalidTransformDataErrorCode || (exports.InvalidTransformDataErrorCode = {}));
class InvalidTransformDataError extends revert_error_1.RevertError {
    constructor(errorCode, transformData) {
        super('InvalidTransformDataError', 'InvalidTransformDataError(uint8 errorCode, bytes transformData)', {
            errorCode,
            transformData,
        });
    }
}
exports.InvalidTransformDataError = InvalidTransformDataError;
class IncompleteFillSellQuoteError extends revert_error_1.RevertError {
    constructor(sellToken, soldAmount, sellAmount) {
        super('IncompleteFillSellQuoteError', 'IncompleteFillSellQuoteError(address sellToken, uint256 soldAmount, uint256 sellAmount)', {
            sellToken,
            soldAmount,
            sellAmount,
        });
    }
}
exports.IncompleteFillSellQuoteError = IncompleteFillSellQuoteError;
class IncompleteFillBuyQuoteError extends revert_error_1.RevertError {
    constructor(buyToken, boughtAmount, buyAmount) {
        super('IncompleteFillBuyQuoteError', 'IncompleteFillBuyQuoteError(address buyToken, uint256 boughtAmount, uint256 buyAmount)', {
            buyToken,
            boughtAmount,
            buyAmount,
        });
    }
}
exports.IncompleteFillBuyQuoteError = IncompleteFillBuyQuoteError;
class InsufficientTakerTokenError extends revert_error_1.RevertError {
    constructor(tokenBalance, tokensNeeded) {
        super('InsufficientTakerTokenError', 'InsufficientTakerTokenError(uint256 tokenBalance, uint256 tokensNeeded)', {
            tokenBalance,
            tokensNeeded,
        });
    }
}
exports.InsufficientTakerTokenError = InsufficientTakerTokenError;
class InsufficientProtocolFeeError extends revert_error_1.RevertError {
    constructor(ethBalance, ethNeeded) {
        super('InsufficientProtocolFeeError', 'InsufficientProtocolFeeError(uint256 ethBalance, uint256 ethNeeded)', {
            ethBalance,
            ethNeeded,
        });
    }
}
exports.InsufficientProtocolFeeError = InsufficientProtocolFeeError;
class InvalidERC20AssetDataError extends revert_error_1.RevertError {
    constructor(assetData) {
        super('InvalidERC20AssetDataError', 'InvalidERC20AssetDataError(bytes assetData)', {
            assetData,
        });
    }
}
exports.InvalidERC20AssetDataError = InvalidERC20AssetDataError;
class WrongNumberOfTokensReceivedError extends revert_error_1.RevertError {
    constructor(actual, expected) {
        super('WrongNumberOfTokensReceivedError', 'WrongNumberOfTokensReceivedError(uint256 actual, uint256 expected)', {
            actual,
            expected,
        });
    }
}
exports.WrongNumberOfTokensReceivedError = WrongNumberOfTokensReceivedError;
class InvalidTokenReceivedError extends revert_error_1.RevertError {
    constructor(token) {
        super('InvalidTokenReceivedError', 'InvalidTokenReceivedError(address token)', {
            token,
        });
    }
}
exports.InvalidTokenReceivedError = InvalidTokenReceivedError;
class InvalidTakerFeeTokenError extends revert_error_1.RevertError {
    constructor(token) {
        super('InvalidTakerFeeTokenError', 'InvalidTakerFeeTokenError(address token)', {
            token,
        });
    }
}
exports.InvalidTakerFeeTokenError = InvalidTakerFeeTokenError;
const types = [
    InsufficientEthAttachedError,
    IncompleteTransformERC20Error,
    NegativeTransformERC20OutputError,
    TransformerFailedError,
    IncompleteFillSellQuoteError,
    IncompleteFillBuyQuoteError,
    InsufficientTakerTokenError,
    InsufficientProtocolFeeError,
    InvalidERC20AssetDataError,
    WrongNumberOfTokensReceivedError,
    InvalidTokenReceivedError,
    InvalidTransformDataError,
    InvalidTakerFeeTokenError,
    OnlyCallableByDeployerError,
    InvalidExecutionContextError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=transform_erc20_revert_errors.js.map