"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class AuthorizedAddressMismatchError extends revert_error_1.RevertError {
    constructor(authorized, target) {
        super('AuthorizedAddressMismatchError', 'AuthorizedAddressMismatchError(address authorized, address target)', {
            authorized,
            target,
        });
    }
}
exports.AuthorizedAddressMismatchError = AuthorizedAddressMismatchError;
class IndexOutOfBoundsError extends revert_error_1.RevertError {
    constructor(index, len) {
        super('IndexOutOfBoundsError', 'IndexOutOfBoundsError(uint256 index, uint256 len)', { index, len });
    }
}
exports.IndexOutOfBoundsError = IndexOutOfBoundsError;
class SenderNotAuthorizedError extends revert_error_1.RevertError {
    constructor(sender) {
        super('SenderNotAuthorizedError', 'SenderNotAuthorizedError(address sender)', { sender });
    }
}
exports.SenderNotAuthorizedError = SenderNotAuthorizedError;
class TargetAlreadyAuthorizedError extends revert_error_1.RevertError {
    constructor(target) {
        super('TargetAlreadyAuthorizedError', 'TargetAlreadyAuthorizedError(address target)', { target });
    }
}
exports.TargetAlreadyAuthorizedError = TargetAlreadyAuthorizedError;
class TargetNotAuthorizedError extends revert_error_1.RevertError {
    constructor(target) {
        super('TargetNotAuthorizedError', 'TargetNotAuthorizedError(address target)', { target });
    }
}
exports.TargetNotAuthorizedError = TargetNotAuthorizedError;
class ZeroCantBeAuthorizedError extends revert_error_1.RevertError {
    constructor() {
        super('ZeroCantBeAuthorizedError', 'ZeroCantBeAuthorizedError()', {});
    }
}
exports.ZeroCantBeAuthorizedError = ZeroCantBeAuthorizedError;
const types = [
    AuthorizedAddressMismatchError,
    IndexOutOfBoundsError,
    SenderNotAuthorizedError,
    TargetAlreadyAuthorizedError,
    TargetNotAuthorizedError,
    ZeroCantBeAuthorizedError,
];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=authorizable_revert_errors.js.map