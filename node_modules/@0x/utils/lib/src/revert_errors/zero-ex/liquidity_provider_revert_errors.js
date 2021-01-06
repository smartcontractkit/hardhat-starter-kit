"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class LiquidityProviderIncompleteSellError extends revert_error_1.RevertError {
    constructor(providerAddress, makerToken, takerToken, sellAmount, boughtAmount, minBuyAmount) {
        super('LiquidityProviderIncompleteSellError', 'LiquidityProviderIncompleteSellError(address providerAddress, address makerToken, address takerToken, uint256 sellAmount, uint256 boughtAmount, uint256 minBuyAmount)', {
            providerAddress,
            makerToken,
            takerToken,
            sellAmount,
            boughtAmount,
            minBuyAmount,
        });
    }
}
exports.LiquidityProviderIncompleteSellError = LiquidityProviderIncompleteSellError;
class NoLiquidityProviderForMarketError extends revert_error_1.RevertError {
    constructor(xAsset, yAsset) {
        super('NoLiquidityProviderForMarketError', 'NoLiquidityProviderForMarketError(address xAsset, address yAsset)', {
            xAsset,
            yAsset,
        });
    }
}
exports.NoLiquidityProviderForMarketError = NoLiquidityProviderForMarketError;
const types = [LiquidityProviderIncompleteSellError, NoLiquidityProviderForMarketError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=liquidity_provider_revert_errors.js.map