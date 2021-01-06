import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class WalletExecuteCallFailedError extends RevertError {
    constructor(wallet?: string, callTarget?: string, callData?: string, callValue?: Numberish, errorData?: string);
}
export declare class WalletExecuteDelegateCallFailedError extends RevertError {
    constructor(wallet?: string, callTarget?: string, callData?: string, errorData?: string);
}
//# sourceMappingURL=wallet_revert_errors.d.ts.map