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
class CompleteBuyFailedError extends revert_error_1.RevertError {
    constructor(expectedAssetBuyAmount, actualAssetBuyAmount) {
        super('CompleteBuyFailedError', 'CompleteBuyFailedError(uint256 expectedAssetBuyAmount, uint256 actualAssetBuyAmount)', { expectedAssetBuyAmount, actualAssetBuyAmount });
    }
}
exports.CompleteBuyFailedError = CompleteBuyFailedError;
class CompleteSellFailedError extends revert_error_1.RevertError {
    constructor(expectedAssetSellAmount, actualAssetSellAmount) {
        super('CompleteSellFailedError', 'CompleteSellFailedError(uint256 expectedAssetSellAmount, uint256 actualAssetSellAmount)', { expectedAssetSellAmount, actualAssetSellAmount });
    }
}
exports.CompleteSellFailedError = CompleteSellFailedError;
class UnsupportedFeeError extends revert_error_1.RevertError {
    constructor(takerFeeAssetData) {
        super('UnsupportedFeeError', 'UnsupportedFeeError(bytes takerFeeAssetData)', { takerFeeAssetData });
    }
}
exports.UnsupportedFeeError = UnsupportedFeeError;
class OverspentWethError extends revert_error_1.RevertError {
    constructor(wethSpent, msgValue) {
        super('OverspentWethError', 'OverspentWethError(uint256 wethSpent, uint256 msgValue)', {
            wethSpent,
            msgValue,
        });
    }
}
exports.OverspentWethError = OverspentWethError;
class MsgValueCannotEqualZeroError extends revert_error_1.RevertError {
    constructor() {
        super('MsgValueCannotEqualZeroError', 'MsgValueCannotEqualZeroError()', {});
    }
}
exports.MsgValueCannotEqualZeroError = MsgValueCannotEqualZeroError;
const types = [
    UnregisteredAssetProxyError,
    CompleteBuyFailedError,
    CompleteSellFailedError,
    UnsupportedFeeError,
    OverspentWethError,
    MsgValueCannotEqualZeroError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=revert_errors.js.map