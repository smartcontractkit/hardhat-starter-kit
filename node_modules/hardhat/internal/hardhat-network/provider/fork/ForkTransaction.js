"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForkTransaction = void 0;
const ethereumjs_tx_1 = require("ethereumjs-tx");
const ethereumjs_util_1 = require("ethereumjs-util");
const errors_1 = require("../errors");
// tslint:disable only-hardhat-error
/**
 * Custom Transaction class to avoid EIP155 errors when hardhat is forked
 */
class ForkTransaction extends ethereumjs_tx_1.Transaction {
    constructor(chainId, data = {}, opts = {}) {
        super(data, opts);
        this._chainId = chainId;
        const msgHash = this.hash(false);
        const v = ethereumjs_util_1.bufferToInt(this.v);
        const senderPubKey = ethereumjs_util_1.ecrecover(msgHash, v, this.r, this.s, this._implementsEIP155() ? chainId : undefined);
        this._senderPubKey = senderPubKey;
    }
    verifySignature() {
        return true;
    }
    getChainId() {
        return this._chainId;
    }
    sign() {
        throw new errors_1.InternalError("`sign` is not implemented in ForkTransaction");
    }
    getDataFee() {
        throw new errors_1.InternalError("`getDataFee` is not implemented in ForkTransaction");
    }
    getBaseFee() {
        throw new errors_1.InternalError("`getBaseFee` is not implemented in ForkTransaction");
    }
    getUpfrontCost() {
        throw new errors_1.InternalError("`getUpfrontCost` is not implemented in ForkTransaction");
    }
    validate(_ = false) {
        throw new errors_1.InternalError("`validate` is not implemented in ForkTransaction");
    }
    toCreationAddress() {
        throw new errors_1.InternalError("`toCreationAddress` is not implemented in ForkTransaction");
    }
}
exports.ForkTransaction = ForkTransaction;
// override private methods
const ForkTransactionPrototype = ForkTransaction.prototype;
// make _validateV a noop
ForkTransactionPrototype._validateV = function () { };
ForkTransactionPrototype._implementsEIP155 = function () {
    const chainId = this.getChainId();
    const v = ethereumjs_util_1.bufferToInt(this.v);
    return v === chainId * 2 + 35 || v === chainId * 2 + 36;
};
//# sourceMappingURL=ForkTransaction.js.map