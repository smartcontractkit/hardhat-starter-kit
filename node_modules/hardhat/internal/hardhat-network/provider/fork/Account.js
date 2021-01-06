"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAccountState = void 0;
const immutable_1 = require("immutable");
exports.makeAccountState = immutable_1.Record({
    nonce: undefined,
    balance: undefined,
    storage: immutable_1.Map(),
    code: undefined,
    storageCleared: false,
});
//# sourceMappingURL=Account.js.map