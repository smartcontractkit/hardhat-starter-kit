"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configured_bignumber_1 = require("./configured_bignumber");
const MAX_DIGITS_IN_UNSIGNED_256_INT = 78;
/**
 * Generates a pseudo-random 256-bit number.
 * @return  A pseudo-random 256-bit number.
 */
function generatePseudoRandom256BitNumber() {
    // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of decimal places.
    // Source: https://mikemcl.github.io/bignumber.js/#random
    const randomNumber = configured_bignumber_1.BigNumber.random(MAX_DIGITS_IN_UNSIGNED_256_INT);
    const factor = new configured_bignumber_1.BigNumber(10).pow(MAX_DIGITS_IN_UNSIGNED_256_INT - 1);
    const randomNumberScaledTo256Bits = randomNumber.times(factor).integerValue();
    return randomNumberScaledTo256Bits;
}
exports.generatePseudoRandom256BitNumber = generatePseudoRandom256BitNumber;
//# sourceMappingURL=random.js.map