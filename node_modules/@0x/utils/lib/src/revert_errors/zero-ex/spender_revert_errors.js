"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class SpenderERC20TransferFromFailedError extends revert_error_1.RevertError {
    constructor(token, owner, to, amount, errorData) {
        super('SpenderERC20TransferFromFailedError', 'SpenderERC20TransferFromFailedError(address token, address owner, address to, uint256 amount, bytes errorData)', {
            token,
            owner,
            to,
            amount,
            errorData,
        });
    }
}
exports.SpenderERC20TransferFromFailedError = SpenderERC20TransferFromFailedError;
const types = [SpenderERC20TransferFromFailedError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=spender_revert_errors.js.map