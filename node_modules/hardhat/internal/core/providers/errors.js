"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderError = void 0;
const errors_1 = require("../errors");
class ProviderError extends errors_1.CustomError {
    constructor(message, code, parent) {
        super(message, parent);
        this.parent = parent;
        this.code = code;
    }
}
exports.ProviderError = ProviderError;
//# sourceMappingURL=errors.js.map