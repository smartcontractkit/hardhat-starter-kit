import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class LiquidityProviderIncompleteSellError extends RevertError {
    constructor(providerAddress?: string, makerToken?: string, takerToken?: string, sellAmount?: Numberish, boughtAmount?: Numberish, minBuyAmount?: Numberish);
}
export declare class NoLiquidityProviderForMarketError extends RevertError {
    constructor(xAsset?: string, yAsset?: string);
}
//# sourceMappingURL=liquidity_provider_revert_errors.d.ts.map