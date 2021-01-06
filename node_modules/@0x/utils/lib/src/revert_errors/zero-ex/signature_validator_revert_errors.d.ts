import { RevertError } from '../../revert_error';
export declare enum SignatureValidationErrorCodes {
    AlwaysInvalid = 0,
    InvalidLength = 1,
    Unsupported = 2,
    Illegal = 3,
    WrongSigner = 4
}
export declare class SignatureValidationError extends RevertError {
    constructor(code?: SignatureValidationErrorCodes, hash?: string, signerAddress?: string, signature?: string);
}
//# sourceMappingURL=signature_validator_revert_errors.d.ts.map