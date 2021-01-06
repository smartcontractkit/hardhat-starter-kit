import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class SpenderERC20TransferFromFailedError extends RevertError {
    constructor(token?: string, owner?: string, to?: string, amount?: Numberish, errorData?: string);
}
//# sourceMappingURL=spender_revert_errors.d.ts.map