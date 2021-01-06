"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAddressBuffer = exports.randomAddress = exports.randomHashBuffer = exports.randomHash = void 0;
exports.randomHash = () => {
    const { bufferToHex } = require("ethereumjs-util");
    return bufferToHex(exports.randomHashBuffer());
};
let next;
exports.randomHashBuffer = () => {
    const { keccak256 } = require("ethereumjs-util");
    if (next === undefined) {
        next = keccak256("seed");
    }
    const result = next;
    next = keccak256(next);
    return result;
};
exports.randomAddress = () => {
    const { bufferToHex } = require("ethereumjs-util");
    return bufferToHex(exports.randomAddressBuffer());
};
exports.randomAddressBuffer = () => exports.randomHashBuffer().slice(0, 20);
//# sourceMappingURL=random.js.map