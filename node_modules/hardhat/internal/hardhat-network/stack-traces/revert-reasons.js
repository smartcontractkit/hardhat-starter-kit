"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRevertReason = void 0;
const ethereumjs_abi_1 = require("ethereumjs-abi");
function decodeRevertReason(returnData) {
    if (returnData.length === 0) {
        return "";
    }
    // TODO: What should happen if the reason fails to be decoded?
    const decoded = ethereumjs_abi_1.rawDecode(["string"], returnData.slice(4));
    return decoded.toString("utf8");
}
exports.decodeRevertReason = decodeRevertReason;
//# sourceMappingURL=revert-reasons.js.map