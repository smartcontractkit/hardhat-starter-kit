"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class UnregisteredAssetProxyError extends revert_error_1.RevertError {
    constructor() {
        super('UnregisteredAssetProxyError', 'UnregisteredAssetProxyError()', {});
    }
}
exports.UnregisteredAssetProxyError = UnregisteredAssetProxyError;
class InsufficientEthForFeeError extends revert_error_1.RevertError {
    constructor(ethFeeRequired, ethAvailable) {
        super('InsufficientEthForFeeError', 'InsufficientEthForFeeError(uint256 ethFeeRequired, uint256 ethAvailable)', { ethFeeRequired, ethAvailable });
    }
}
exports.InsufficientEthForFeeError = InsufficientEthForFeeError;
class DefaultFunctionWethContractOnlyError extends revert_error_1.RevertError {
    constructor(senderAddress) {
        super('DefaultFunctionWethContractOnlyError', 'DefaultFunctionWethContractOnlyError(address senderAddress)', {
            senderAddress,
        });
    }
}
exports.DefaultFunctionWethContractOnlyError = DefaultFunctionWethContractOnlyError;
class EthFeeLengthMismatchError extends revert_error_1.RevertError {
    constructor(ethFeesLength, feeRecipientsLength) {
        super('EthFeeLengthMismatchError', 'EthFeeLengthMismatchError(uint256 ethFeesLength, uint256 feeRecipientsLength)', {
            ethFeesLength,
            feeRecipientsLength,
        });
    }
}
exports.EthFeeLengthMismatchError = EthFeeLengthMismatchError;
const types = [InsufficientEthForFeeError, DefaultFunctionWethContractOnlyError, EthFeeLengthMismatchError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=mixin_weth_utils_revert_errors.js.map