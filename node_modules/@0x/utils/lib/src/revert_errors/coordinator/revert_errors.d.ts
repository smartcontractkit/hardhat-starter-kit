import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare enum SignatureErrorCodes {
    InvalidLength = 0,
    Unsupported = 1,
    Illegal = 2,
    Invalid = 3
}
export declare class SignatureError extends RevertError {
    constructor(errorCode?: SignatureErrorCodes, hash?: string, signature?: string);
}
export declare class InvalidOriginError extends RevertError {
    constructor(expectedOrigin?: string);
}
export declare class ApprovalExpiredError extends RevertError {
    constructor(transactionHash?: string, approvalExpirationTime?: BigNumber | number | string);
}
export declare class InvalidApprovalSignatureError extends RevertError {
    constructor(transactionHash?: string, approverAddress?: string);
}
//# sourceMappingURL=revert_errors.d.ts.map