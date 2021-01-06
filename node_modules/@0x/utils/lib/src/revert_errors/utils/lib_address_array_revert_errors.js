"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
class MismanagedMemoryError extends revert_error_1.RevertError {
    constructor(freeMemPtr, addressArrayEndPtr) {
        super('MismanagedMemoryError', 'MismanagedMemoryError(uint256 freeMemPtr, uint256 addressArrayEndPtr)', {
            freeMemPtr,
            addressArrayEndPtr,
        });
    }
}
exports.MismanagedMemoryError = MismanagedMemoryError;
// Register the MismanagedMemoryError type
revert_error_1.RevertError.registerType(MismanagedMemoryError);
//# sourceMappingURL=lib_address_array_revert_errors.js.map