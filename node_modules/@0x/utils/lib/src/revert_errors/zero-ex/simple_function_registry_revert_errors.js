"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revert_error_1 = require("../../revert_error");
// tslint:disable:max-classes-per-file
class NotInRollbackHistoryError extends revert_error_1.RevertError {
    constructor(selector, targetImpl) {
        super('NotInRollbackHistoryError', 'NotInRollbackHistoryError(bytes4 selector, address targetImpl)', {
            selector,
            targetImpl,
        });
    }
}
exports.NotInRollbackHistoryError = NotInRollbackHistoryError;
const types = [NotInRollbackHistoryError];
// Register the types we've defined.
for (const type of types) {
    revert_error_1.RevertError.registerType(type);
}
//# sourceMappingURL=simple_function_registry_revert_errors.js.map