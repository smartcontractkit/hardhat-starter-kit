"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var ValueErrorCodes;
(function (ValueErrorCodes) {
    ValueErrorCodes[ValueErrorCodes["TooSmall"] = 0] = "TooSmall";
    ValueErrorCodes[ValueErrorCodes["TooLarge"] = 1] = "TooLarge";
})(ValueErrorCodes = exports.ValueErrorCodes || (exports.ValueErrorCodes = {}));
var BinOpErrorCodes;
(function (BinOpErrorCodes) {
    BinOpErrorCodes[BinOpErrorCodes["AdditionOverflow"] = 0] = "AdditionOverflow";
    BinOpErrorCodes[BinOpErrorCodes["MultiplicationOverflow"] = 1] = "MultiplicationOverflow";
    BinOpErrorCodes[BinOpErrorCodes["DivisionByZero"] = 2] = "DivisionByZero";
    BinOpErrorCodes[BinOpErrorCodes["DivisionOverflow"] = 3] = "DivisionOverflow";
})(BinOpErrorCodes = exports.BinOpErrorCodes || (exports.BinOpErrorCodes = {}));
class SignedValueError extends revert_error_1.RevertError {
    constructor(error, n) {
        super('SignedValueError', 'SignedValueError(uint8 error, int256 n)', {
            error,
            n,
        });
    }
}
exports.SignedValueError = SignedValueError;
class UnsignedValueError extends revert_error_1.RevertError {
    constructor(error, n) {
        super('UnsignedValueError', 'UnsignedValueError(uint8 error, uint256 n)', {
            error,
            n,
        });
    }
}
exports.UnsignedValueError = UnsignedValueError;
class BinOpError extends revert_error_1.RevertError {
    constructor(error, a, b) {
        super('BinOpError', 'BinOpError(uint8 error, int256 a, int256 b)', {
            error,
            a,
            b,
        });
    }
}
exports.BinOpError = BinOpError;
const types = [SignedValueError, UnsignedValueError, BinOpError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=fixed_math_revert_errors.js.map