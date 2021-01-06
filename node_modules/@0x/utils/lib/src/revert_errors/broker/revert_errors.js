"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class InvalidFromAddressError extends revert_error_1.RevertError {
    constructor(from) {
        super('InvalidFromAddressError', 'InvalidFromAddressError(address from)', { from });
    }
}
exports.InvalidFromAddressError = InvalidFromAddressError;
class AmountsLengthMustEqualOneError extends revert_error_1.RevertError {
    constructor(amountsLength) {
        super('AmountsLengthMustEqualOneError', 'AmountsLengthMustEqualOneError(uint256 amountsLength)', {
            amountsLength,
        });
    }
}
exports.AmountsLengthMustEqualOneError = AmountsLengthMustEqualOneError;
class TooFewBrokerAssetsProvidedError extends revert_error_1.RevertError {
    constructor(numBrokeredAssets) {
        super('TooFewBrokerAssetsProvidedError', 'TooFewBrokerAssetsProvidedError(uint256 numBrokeredAssets)', {
            numBrokeredAssets,
        });
    }
}
exports.TooFewBrokerAssetsProvidedError = TooFewBrokerAssetsProvidedError;
class InvalidFunctionSelectorError extends revert_error_1.RevertError {
    constructor(selector) {
        super('InvalidFunctionSelectorError', 'InvalidFunctionSelectorError(bytes4 selector)', { selector });
    }
}
exports.InvalidFunctionSelectorError = InvalidFunctionSelectorError;
class OnlyERC1155ProxyError extends revert_error_1.RevertError {
    constructor(sender) {
        super('OnlyERC1155ProxyError', 'OnlyERC1155ProxyError(address sender)', { sender });
    }
}
exports.OnlyERC1155ProxyError = OnlyERC1155ProxyError;
const types = [
    InvalidFromAddressError,
    AmountsLengthMustEqualOneError,
    TooFewBrokerAssetsProvidedError,
    InvalidFunctionSelectorError,
    OnlyERC1155ProxyError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=revert_errors.js.map