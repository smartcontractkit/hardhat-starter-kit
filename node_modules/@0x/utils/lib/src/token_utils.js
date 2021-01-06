"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configured_bignumber_1 = require("./configured_bignumber");
// tslint:disable:custom-no-magic-numbers
/**
 * Convert a token unit amount to weis. E.g., 10.1 ETH -> 10100000000000000000.
 */
function fromTokenUnitAmount(units, decimals = 18) {
    return new configured_bignumber_1.BigNumber(units).times(new configured_bignumber_1.BigNumber(10).pow(decimals)).integerValue();
}
exports.fromTokenUnitAmount = fromTokenUnitAmount;
/**
 * Convert a wei amount to token units. E.g., 10100000000000000000 -> 10.1 ETH.
 */
function toTokenUnitAmount(weis, decimals = 18) {
    return new configured_bignumber_1.BigNumber(weis).div(new configured_bignumber_1.BigNumber(10).pow(decimals));
}
exports.toTokenUnitAmount = toTokenUnitAmount;
//# sourceMappingURL=token_utils.js.map