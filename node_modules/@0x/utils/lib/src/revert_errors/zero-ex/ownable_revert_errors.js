"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class MigrateCallFailedError extends revert_error_1.RevertError {
    constructor(target, resultData) {
        super('MigrateCallFailedError', 'MigrateCallFailedError(address target, bytes resultData)', {
            target,
            resultData,
        });
    }
}
exports.MigrateCallFailedError = MigrateCallFailedError;
class OnlyOwnerError extends revert_error_1.RevertError {
    constructor(sender, owner) {
        super('OnlyOwnerError', 'OnlyOwnerError(address sender, bytes owner)', {
            sender,
            owner,
        });
    }
}
exports.OnlyOwnerError = OnlyOwnerError;
// This is identical to the one in utils.
// export class TransferOwnerToZeroError extends RevertError {
//     constructor() {
//         super('TransferOwnerToZeroError', 'TransferOwnerToZeroError()', {});
//     }
// }
const types = [MigrateCallFailedError, OnlyOwnerError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=ownable_revert_errors.js.map