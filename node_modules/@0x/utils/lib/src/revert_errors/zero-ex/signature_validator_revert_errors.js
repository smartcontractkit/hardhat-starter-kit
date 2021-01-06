"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var SignatureValidationErrorCodes;
(function (SignatureValidationErrorCodes) {
    SignatureValidationErrorCodes[SignatureValidationErrorCodes["AlwaysInvalid"] = 0] = "AlwaysInvalid";
    SignatureValidationErrorCodes[SignatureValidationErrorCodes["InvalidLength"] = 1] = "InvalidLength";
    SignatureValidationErrorCodes[SignatureValidationErrorCodes["Unsupported"] = 2] = "Unsupported";
    SignatureValidationErrorCodes[SignatureValidationErrorCodes["Illegal"] = 3] = "Illegal";
    SignatureValidationErrorCodes[SignatureValidationErrorCodes["WrongSigner"] = 4] = "WrongSigner";
})(SignatureValidationErrorCodes = exports.SignatureValidationErrorCodes || (exports.SignatureValidationErrorCodes = {}));
class SignatureValidationError extends revert_error_1.RevertError {
    constructor(code, hash, signerAddress, signature) {
        super('SignatureValidationError', 'SignatureValidationError(uint8 code, bytes32 hash, address signerAddress, bytes signature)', {
            code,
            hash,
            signerAddress,
            signature,
        });
    }
}
exports.SignatureValidationError = SignatureValidationError;
const types = [SignatureValidationError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=signature_validator_revert_errors.js.map