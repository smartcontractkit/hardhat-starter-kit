import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class UnregisteredAssetProxyError extends RevertError {
    constructor();
}
export declare class CompleteBuyFailedError extends RevertError {
    constructor(expectedAssetBuyAmount?: BigNumber | number | string, actualAssetBuyAmount?: BigNumber | number | string);
}
export declare class CompleteSellFailedError extends RevertError {
    constructor(expectedAssetSellAmount?: BigNumber | number | string, actualAssetSellAmount?: BigNumber | number | string);
}
export declare class UnsupportedFeeError extends RevertError {
    constructor(takerFeeAssetData?: string);
}
export declare class OverspentWethError extends RevertError {
    constructor(wethSpent?: BigNumber | number | string, msgValue?: BigNumber | number | string);
}
export declare class MsgValueCannotEqualZeroError extends RevertError {
    constructor();
}
//# sourceMappingURL=revert_errors.d.ts.map