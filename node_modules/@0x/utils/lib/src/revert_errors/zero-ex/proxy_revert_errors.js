"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class NotImplementedError extends revert_error_1.RevertError {
    constructor(selector) {
        super('NotImplementedError', 'NotImplementedError(bytes4 selector)', {
            selector,
        });
    }
}
exports.NotImplementedError = NotImplementedError;
class InvalidBootstrapCallerError extends revert_error_1.RevertError {
    constructor(caller, expectedCaller) {
        super('InvalidBootstrapCallerError', 'InvalidBootstrapCallerError(address caller, address expectedCaller)', {
            caller,
            expectedCaller,
        });
    }
}
exports.InvalidBootstrapCallerError = InvalidBootstrapCallerError;
class InvalidDieCallerError extends revert_error_1.RevertError {
    constructor(caller, expectedCaller) {
        super('InvalidDieCallerError', 'InvalidDieCallerError(address caller, address expectedCaller)', {
            caller,
            expectedCaller,
        });
    }
}
exports.InvalidDieCallerError = InvalidDieCallerError;
class BootstrapCallFailedError extends revert_error_1.RevertError {
    constructor(target, resultData) {
        super('BootstrapCallFailedError', 'BootstrapCallFailedError(address target, bytes resultData)', {
            target,
            resultData,
        });
    }
}
exports.BootstrapCallFailedError = BootstrapCallFailedError;
const types = [BootstrapCallFailedError, InvalidBootstrapCallerError, InvalidDieCallerError, NotImplementedError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=proxy_revert_errors.js.map