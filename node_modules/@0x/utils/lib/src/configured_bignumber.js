"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
exports.BigNumber = bignumber_js_1.BigNumber;
bignumber_js_1.BigNumber.config({
    // By default BigNumber's `toString` method converts to exponential notation if the value has
    // more then 20 digits. We want to avoid this behavior, so we set EXPONENTIAL_AT to a high number
    EXPONENTIAL_AT: 1000,
    // Note(albrow): This is the lowest value for which
    // `x.div(y).floor() === x.divToInt(y)`
    // for all values of x and y <= MAX_UINT256, where MAX_UINT256 is the
    // maximum number represented by the uint256 type in Solidity (2^256-1).
    DECIMAL_PLACES: 78,
});
// Set a debug print function for NodeJS
// Upstream issue: https://github.com/MikeMcl/bignumber.js/issues/188
const isNode = require("detect-node");
if (isNode) {
    // Dynamically load a NodeJS specific module.
    // TypeScript requires all imports to be global, so we need to use
    // `const` here and disable the tslint warning.
    // tslint:disable-next-line: no-var-requires
    const util = require('util');
    // Set a custom util.inspect function
    // HACK: We add a function to the BigNumber class by assigning to the
    //       prototype. The function name is a symbol provided by Node.
    bignumber_js_1.BigNumber.prototype[util.inspect.custom] = function () {
        // HACK: When executed, `this` will refer to the BigNumber instance.
        //       This is also why we need a function expression instead of an
        //       arrow function, as the latter does not have a `this`.
        // Return the readable string representation
        // tslint:disable-next-line: no-invalid-this
        return this.toString();
    };
}
// HACK: CLobber config and set to prevent imported packages from poisoning
// global BigNumber config
(orig => (bignumber_js_1.BigNumber.config = (..._args) => orig({})))(bignumber_js_1.BigNumber.config);
bignumber_js_1.BigNumber.set = bignumber_js_1.BigNumber.config;
//# sourceMappingURL=configured_bignumber.js.map