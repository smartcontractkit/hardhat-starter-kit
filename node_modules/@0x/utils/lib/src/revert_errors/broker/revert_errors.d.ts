import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class InvalidFromAddressError extends RevertError {
    constructor(from?: string);
}
export declare class AmountsLengthMustEqualOneError extends RevertError {
    constructor(amountsLength?: BigNumber | number | string);
}
export declare class TooFewBrokerAssetsProvidedError extends RevertError {
    constructor(numBrokeredAssets?: BigNumber | number | string);
}
export declare class InvalidFunctionSelectorError extends RevertError {
    constructor(selector?: string);
}
export declare class OnlyERC1155ProxyError extends RevertError {
    constructor(sender?: string);
}
//# sourceMappingURL=revert_errors.d.ts.map