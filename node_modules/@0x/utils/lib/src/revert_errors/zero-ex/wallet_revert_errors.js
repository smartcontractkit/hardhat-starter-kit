"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class WalletExecuteCallFailedError extends revert_error_1.RevertError {
    constructor(wallet, callTarget, callData, callValue, errorData) {
        super('WalletExecuteCallFailedError', 'WalletExecuteCallFailedError(address wallet, address callTarget, bytes callData, uint256 callValue, bytes errorData)', {
            wallet,
            callTarget,
            callData,
            callValue,
            errorData,
        });
    }
}
exports.WalletExecuteCallFailedError = WalletExecuteCallFailedError;
class WalletExecuteDelegateCallFailedError extends revert_error_1.RevertError {
    constructor(wallet, callTarget, callData, errorData) {
        super('WalletExecuteDelegateCallFailedError', 'WalletExecuteDelegateCallFailedError(address wallet, address callTarget, bytes callData, bytes errorData)', {
            wallet,
            callTarget,
            callData,
            errorData,
        });
    }
}
exports.WalletExecuteDelegateCallFailedError = WalletExecuteDelegateCallFailedError;
const types = [WalletExecuteCallFailedError, WalletExecuteDelegateCallFailedError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=wallet_revert_errors.js.map