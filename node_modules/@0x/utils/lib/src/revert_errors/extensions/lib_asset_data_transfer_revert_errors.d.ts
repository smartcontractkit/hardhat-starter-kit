import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class UnsupportedAssetProxyError extends RevertError {
    constructor(proxyId?: string);
}
export declare class Erc721AmountMustEqualOneError extends RevertError {
    constructor(amount?: BigNumber | number | string);
}
//# sourceMappingURL=lib_asset_data_transfer_revert_errors.d.ts.map