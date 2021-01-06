"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BN = require("bn.js");
const evm_1 = require("../evm");
const assert = require('assert');
function default_1(opts) {
    assert(opts.data);
    const data = opts.data;
    const gasUsed = new BN(opts._common.param('gasPrices', 'identity'));
    gasUsed.iadd(new BN(opts._common.param('gasPrices', 'identityWord')).imuln(Math.ceil(data.length / 32)));
    if (opts.gasLimit.lt(gasUsed)) {
        return evm_1.OOGResult(opts.gasLimit);
    }
    return {
        gasUsed,
        returnValue: data,
    };
}
exports.default = default_1;
//# sourceMappingURL=04-identity.js.map