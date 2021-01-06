"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class UnsupportedAssetProxyError extends revert_error_1.RevertError {
    constructor(proxyId) {
        super('UnsupportedAssetProxyError', 'UnsupportedAssetProxyError(bytes4 proxyId)', { proxyId });
    }
}
exports.UnsupportedAssetProxyError = UnsupportedAssetProxyError;
class Erc721AmountMustEqualOneError extends revert_error_1.RevertError {
    constructor(amount) {
        super('Erc721AmountMustEqualOneError', 'Erc721AmountMustEqualOneError(uint256 amount)', {
            amount,
        });
    }
}
exports.Erc721AmountMustEqualOneError = Erc721AmountMustEqualOneError;
const types = [UnsupportedAssetProxyError, Erc721AmountMustEqualOneError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=lib_asset_data_transfer_revert_errors.js.map