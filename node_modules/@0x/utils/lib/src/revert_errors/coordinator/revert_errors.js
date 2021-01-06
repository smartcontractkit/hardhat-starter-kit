"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var SignatureErrorCodes;
(function (SignatureErrorCodes) {
    SignatureErrorCodes[SignatureErrorCodes["InvalidLength"] = 0] = "InvalidLength";
    SignatureErrorCodes[SignatureErrorCodes["Unsupported"] = 1] = "Unsupported";
    SignatureErrorCodes[SignatureErrorCodes["Illegal"] = 2] = "Illegal";
    SignatureErrorCodes[SignatureErrorCodes["Invalid"] = 3] = "Invalid";
})(SignatureErrorCodes = exports.SignatureErrorCodes || (exports.SignatureErrorCodes = {}));
class SignatureError extends revert_error_1.RevertError {
    constructor(errorCode, hash, signature) {
        super('SignatureError', 'SignatureError(uint8 errorCode, bytes32 hash, bytes signature)', {
            errorCode,
            hash,
            signature,
        });
    }
}
exports.SignatureError = SignatureError;
class InvalidOriginError extends revert_error_1.RevertError {
    constructor(expectedOrigin) {
        super('InvalidOriginError', 'InvalidOriginError(address expectedOrigin)', { expectedOrigin });
    }
}
exports.InvalidOriginError = InvalidOriginError;
class ApprovalExpiredError extends revert_error_1.RevertError {
    constructor(transactionHash, approvalExpirationTime) {
        super('ApprovalExpiredError', 'ApprovalExpiredError(bytes32 transactionHash, uint256 approvalExpirationTime)', {
            transactionHash,
            approvalExpirationTime,
        });
    }
}
exports.ApprovalExpiredError = ApprovalExpiredError;
class InvalidApprovalSignatureError extends revert_error_1.RevertError {
    constructor(transactionHash, approverAddress) {
        super('InvalidApprovalSignatureError', 'InvalidApprovalSignatureError(bytes32 transactionHash, address approverAddress)', { transactionHash, approverAddress });
    }
}
exports.InvalidApprovalSignatureError = InvalidApprovalSignatureError;
const types = [SignatureError, InvalidOriginError, ApprovalExpiredError, InvalidApprovalSignatureError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=revert_errors.js.map