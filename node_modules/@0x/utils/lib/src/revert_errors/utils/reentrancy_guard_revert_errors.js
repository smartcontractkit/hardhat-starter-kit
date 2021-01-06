"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
class IllegalReentrancyError extends revert_error_1.RevertError {
    constructor() {
        super('IllegalReentrancyError', 'IllegalReentrancyError()', {});
    }
}
exports.IllegalReentrancyError = IllegalReentrancyError;
// Register the IllegalReentrancyError type
revert_error_1.RevertError.registerType(IllegalReentrancyError);
//# sourceMappingURL=reentrancy_guard_revert_errors.js.map