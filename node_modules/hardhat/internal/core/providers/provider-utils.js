"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToRpcQuantity = exports.rpcQuantityToNumber = void 0;
const errors_1 = require("../errors");
const errors_list_1 = require("../errors-list");
function rpcQuantityToNumber(quantity) {
    if (quantity === undefined) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.NETWORK.INVALID_RPC_QUANTITY_VALUE, {
            value: quantity,
        });
    }
    if (typeof quantity !== "string" ||
        quantity.match(/^0x(?:0|(?:[1-9a-fA-F][0-9a-fA-F]*))$/) === null) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.NETWORK.INVALID_RPC_QUANTITY_VALUE, {
            value: quantity,
        });
    }
    return parseInt(quantity.substring(2), 16);
}
exports.rpcQuantityToNumber = rpcQuantityToNumber;
function numberToRpcQuantity(n) {
    const hex = n.toString(16);
    return `0x${hex}`;
}
exports.numberToRpcQuantity = numberToRpcQuantity;
//# sourceMappingURL=provider-utils.js.map