"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStateTrie = void 0;
const ethereumjs_account_1 = __importDefault(require("ethereumjs-account"));
const ethereumjs_util_1 = require("ethereumjs-util");
const secure_1 = __importDefault(require("merkle-patricia-tree/secure"));
const util_1 = require("util");
const makeAccount_1 = require("./makeAccount");
async function makeStateTrie(genesisAccounts) {
    const stateTrie = new secure_1.default();
    const putIntoStateTrie = util_1.promisify(stateTrie.put.bind(stateTrie));
    for (const acc of genesisAccounts) {
        const { address, account } = makeAccount_1.makeAccount(acc);
        await putIntoStateTrie(address, account.serialize());
    }
    // Mimic precompiles activation
    for (let i = 1; i <= 8; i++) {
        await putIntoStateTrie(new ethereumjs_util_1.BN(i).toArrayLike(Buffer, "be", 20), new ethereumjs_account_1.default().serialize());
    }
    return stateTrie;
}
exports.makeStateTrie = makeStateTrie;
//# sourceMappingURL=makeStateTrie.js.map