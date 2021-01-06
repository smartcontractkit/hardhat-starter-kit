import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class UnregisteredAssetProxyError extends RevertError {
    constructor();
}
export declare class InsufficientEthForFeeError extends RevertError {
    constructor(ethFeeRequired?: BigNumber | number | string, ethAvailable?: BigNumber | number | string);
}
export declare class DefaultFunctionWethContractOnlyError extends RevertError {
    constructor(senderAddress?: string);
}
export declare class EthFeeLengthMismatchError extends RevertError {
    constructor(ethFeesLength?: BigNumber | number | string, feeRecipientsLength?: BigNumber | number | string);
}
//# sourceMappingURL=mixin_weth_utils_revert_errors.d.ts.map