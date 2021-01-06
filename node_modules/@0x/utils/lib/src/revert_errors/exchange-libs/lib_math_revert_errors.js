"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class DivisionByZeroError extends revert_error_1.RevertError {
    constructor() {
        super('DivisionByZeroError', 'DivisionByZeroError()', {});
    }
}
exports.DivisionByZeroError = DivisionByZeroError;
class RoundingError extends revert_error_1.RevertError {
    constructor(numerator, denominator, target) {
        super('RoundingError', 'RoundingError(uint256 numerator, uint256 denominator, uint256 target)', {
            numerator,
            denominator,
            target,
        });
    }
}
exports.RoundingError = RoundingError;
const types = [DivisionByZeroError, RoundingError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=lib_math_revert_errors.js.map