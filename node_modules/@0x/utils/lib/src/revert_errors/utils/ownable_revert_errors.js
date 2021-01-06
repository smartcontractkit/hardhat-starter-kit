"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class OnlyOwnerError extends revert_error_1.RevertError {
    constructor(sender, owner) {
        super('OnlyOwnerError', 'OnlyOwnerError(address sender, address owner)', {
            sender,
            owner,
        });
    }
}
exports.OnlyOwnerError = OnlyOwnerError;
class TransferOwnerToZeroError extends revert_error_1.RevertError {
    constructor() {
        super('TransferOwnerToZeroError', 'TransferOwnerToZeroError()', {});
    }
}
exports.TransferOwnerToZeroError = TransferOwnerToZeroError;
const types = [OnlyOwnerError, TransferOwnerToZeroError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=ownable_revert_errors.js.map