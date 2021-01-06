"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
var InvalidByteOperationErrorCodes;
(function (InvalidByteOperationErrorCodes) {
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["FromLessThanOrEqualsToRequired"] = 0] = "FromLessThanOrEqualsToRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["ToLessThanOrEqualsLengthRequired"] = 1] = "ToLessThanOrEqualsLengthRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["LengthGreaterThanZeroRequired"] = 2] = "LengthGreaterThanZeroRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["LengthGreaterThanOrEqualsFourRequired"] = 3] = "LengthGreaterThanOrEqualsFourRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["LengthGreaterThanOrEqualsTwentyRequired"] = 4] = "LengthGreaterThanOrEqualsTwentyRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["LengthGreaterThanOrEqualsThirtyTwoRequired"] = 5] = "LengthGreaterThanOrEqualsThirtyTwoRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["LengthGreaterThanOrEqualsNestedBytesLengthRequired"] = 6] = "LengthGreaterThanOrEqualsNestedBytesLengthRequired";
    InvalidByteOperationErrorCodes[InvalidByteOperationErrorCodes["DestinationLengthGreaterThanOrEqualSourceLengthRequired"] = 7] = "DestinationLengthGreaterThanOrEqualSourceLengthRequired";
})(InvalidByteOperationErrorCodes = exports.InvalidByteOperationErrorCodes || (exports.InvalidByteOperationErrorCodes = {}));
class InvalidByteOperationError extends revert_error_1.RevertError {
    constructor(error, offset, required) {
        super('InvalidByteOperationError', 'InvalidByteOperationError(uint8 error, uint256 offset, uint256 required)', {
            error,
            offset,
            required,
        });
    }
}
exports.InvalidByteOperationError = InvalidByteOperationError;
// Register the InvalidByteOperationError type
revert_error_1.RevertError.registerType(InvalidByteOperationError);
//# sourceMappingURL=lib_bytes_revert_errors.js.map