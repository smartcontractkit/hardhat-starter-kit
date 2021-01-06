"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStandard = (data) => typeof data.evm === 'object' &&
    data.evm !== null &&
    typeof data.evm.bytecode === 'object' &&
    data.evm.bytecode !== null;
function hasByteCode(bytecode) {
    if (typeof bytecode === 'object') {
        return Object.entries(bytecode.object).length !== 0;
    }
    return Object.entries(bytecode).length !== 0;
}
exports.hasByteCode = hasByteCode;
