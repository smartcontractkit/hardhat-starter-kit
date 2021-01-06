"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class OnlyCallableBySelfError extends revert_error_1.RevertError {
    constructor(sender) {
        super('OnlyCallableBySelfError', 'OnlyCallableBySelfError(address sender)', {
            sender,
        });
    }
}
exports.OnlyCallableBySelfError = OnlyCallableBySelfError;
class IllegalReentrancyError extends revert_error_1.RevertError {
    constructor(selector, reentrancyFlags) {
        super('IllegalReentrancyError', 'IllegalReentrancyError(bytes4 selector, uint256 reentrancyFlags)', {
            selector,
            reentrancyFlags,
        });
    }
}
exports.IllegalReentrancyError = IllegalReentrancyError;
const types = [OnlyCallableBySelfError, IllegalReentrancyError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=common_revert_errors.js.map