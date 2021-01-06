"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcToTxData = void 0;
function rpcToTxData(rpcTransaction) {
    var _a;
    return {
        gasLimit: rpcTransaction.gas,
        gasPrice: rpcTransaction.gasPrice,
        to: (_a = rpcTransaction.to) !== null && _a !== void 0 ? _a : undefined,
        nonce: rpcTransaction.nonce,
        data: rpcTransaction.input,
        v: rpcTransaction.v,
        r: rpcTransaction.r,
        s: rpcTransaction.s,
        value: rpcTransaction.value,
    };
}
exports.rpcToTxData = rpcToTxData;
//# sourceMappingURL=rpcToTxData.js.map