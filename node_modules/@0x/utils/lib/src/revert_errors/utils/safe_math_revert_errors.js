"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
var BinOpErrorCodes;
(function (BinOpErrorCodes) {
    BinOpErrorCodes[BinOpErrorCodes["AdditionOverflow"] = 0] = "AdditionOverflow";
    BinOpErrorCodes[BinOpErrorCodes["MultiplicationOverflow"] = 1] = "MultiplicationOverflow";
    BinOpErrorCodes[BinOpErrorCodes["SubtractionUnderflow"] = 2] = "SubtractionUnderflow";
    BinOpErrorCodes[BinOpErrorCodes["DivisionByZero"] = 3] = "DivisionByZero";
})(BinOpErrorCodes = exports.BinOpErrorCodes || (exports.BinOpErrorCodes = {}));
var DowncastErrorCodes;
(function (DowncastErrorCodes) {
    DowncastErrorCodes[DowncastErrorCodes["ValueTooLargeToDowncastToUint32"] = 0] = "ValueTooLargeToDowncastToUint32";
    DowncastErrorCodes[DowncastErrorCodes["ValueTooLargeToDowncastToUint64"] = 1] = "ValueTooLargeToDowncastToUint64";
    DowncastErrorCodes[DowncastErrorCodes["ValueTooLargeToDowncastToUint96"] = 2] = "ValueTooLargeToDowncastToUint96";
})(DowncastErrorCodes = exports.DowncastErrorCodes || (exports.DowncastErrorCodes = {}));
class Uint256BinOpError extends revert_error_1.RevertError {
    constructor(error, a, b) {
        super('Uint256BinOpError', 'Uint256BinOpError(uint8 error, uint256 a, uint256 b)', {
            error,
            a,
            b,
        });
    }
}
exports.Uint256BinOpError = Uint256BinOpError;
class Uint96BinOpError extends revert_error_1.RevertError {
    constructor(error, a, b) {
        super('Uint96BinOpError', 'Uint96BinOpError(uint8 error, uint96 a, uint96 b)', {
            error,
            a,
            b,
        });
    }
}
exports.Uint96BinOpError = Uint96BinOpError;
class Uint64BinOpError extends revert_error_1.RevertError {
    constructor(error, a, b) {
        super('Uint64BinOpError', 'Uint64BinOpError(uint8 error, uint64 a, uint64 b)', {
            error,
            a,
            b,
        });
    }
}
exports.Uint64BinOpError = Uint64BinOpError;
class Uint256DowncastError extends revert_error_1.RevertError {
    constructor(error, a) {
        super('Uint256DowncastError', 'Uint256DowncastError(uint8 error, uint256 a)', {
            error,
            a,
        });
    }
}
exports.Uint256DowncastError = Uint256DowncastError;
const types = [Uint256BinOpError, Uint96BinOpError, Uint64BinOpError, Uint256DowncastError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=safe_math_revert_errors.js.map