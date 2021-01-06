import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class AuthorizedAddressMismatchError extends RevertError {
    constructor(authorized?: string, target?: string);
}
export declare class IndexOutOfBoundsError extends RevertError {
    constructor(index?: BigNumber, len?: BigNumber);
}
export declare class SenderNotAuthorizedError extends RevertError {
    constructor(sender?: string);
}
export declare class TargetAlreadyAuthorizedError extends RevertError {
    constructor(target?: string);
}
export declare class TargetNotAuthorizedError extends RevertError {
    constructor(target?: string);
}
export declare class ZeroCantBeAuthorizedError extends RevertError {
    constructor();
}
//# sourceMappingURL=authorizable_revert_errors.d.ts.map