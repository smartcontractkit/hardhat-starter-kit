"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAccount = void 0;
const ethereumjs_account_1 = __importDefault(require("ethereumjs-account"));
const ethereumjs_util_1 = require("ethereumjs-util");
const isHexPrefixed_1 = require("./isHexPrefixed");
function makeAccount(ga) {
    let balance;
    if (typeof ga.balance === "string" && isHexPrefixed_1.isHexPrefixed(ga.balance)) {
        balance = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(ga.balance));
    }
    else {
        balance = new ethereumjs_util_1.BN(ga.balance);
    }
    const account = new ethereumjs_account_1.default({ balance });
    const pk = ethereumjs_util_1.toBuffer(ga.privateKey);
    const address = ethereumjs_util_1.privateToAddress(pk);
    return { account, address };
}
exports.makeAccount = makeAccount;
//# sourceMappingURL=makeAccount.js.map