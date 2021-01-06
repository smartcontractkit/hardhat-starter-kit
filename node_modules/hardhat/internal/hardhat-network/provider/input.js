"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.optionalRpcHardhatNetworkConfig = exports.rpcHardhatNetworkConfig = exports.rpcForkConfig = exports.rpcCompilerOutput = exports.rpcCompilerInput = exports.rpcSubscribeRequest = exports.optionalRpcFilterRequest = exports.rpcFilterRequest = exports.rpcCallRequest = exports.rpcTransactionRequest = exports.optionalBlockTag = exports.blockTag = exports.blockTagObject = exports.logTopics = exports.logAddress = exports.rpcAddress = exports.rpcUnknown = exports.rpcHash = exports.rpcData = exports.rpcQuantity = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const t = __importStar(require("io-ts"));
const PathReporter_1 = require("io-ts/lib/PathReporter");
const errors_1 = require("./errors");
function optional(codec, name = `${codec.name} | undefined`) {
    return new t.Type(name, (u) => u === undefined || codec.is(u), (u, c) => (u === undefined ? t.success(u) : codec.validate(u, c)), (a) => (a === undefined ? undefined : codec.encode(a)));
}
const isRpcQuantityString = (u) => typeof u === "string" &&
    u.match(/^0x(?:0|(?:[1-9a-fA-F][0-9a-fA-F]*))$/) !== null;
const isRpcDataString = (u) => typeof u === "string" && u.match(/^0x(?:[0-9a-fA-F]{2})*$/) !== null;
const isRpcHashString = (u) => typeof u === "string" && u.length === 66 && isRpcDataString(u);
const isBlockTagObject = (u) => {
    if (typeof u === "object") {
        if ((u === null || u === void 0 ? void 0 : u.blockHash) !== undefined &&
            (u === null || u === void 0 ? void 0 : u.blockHash) !== null &&
            isRpcHashString(u.blockHash)) {
            return true;
        }
        if ((u === null || u === void 0 ? void 0 : u.blockNumber) !== undefined &&
            (u === null || u === void 0 ? void 0 : u.blockNumber) !== null &&
            isRpcQuantityString(u.blockNumber)) {
            return true;
        }
    }
    return false;
};
exports.rpcQuantity = new t.Type("QUANTITY", ethereumjs_util_1.BN.isBN, (u, c) => isRpcQuantityString(u) ? t.success(new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(u))) : t.failure(u, c), t.identity);
exports.rpcData = new t.Type("DATA", Buffer.isBuffer, (u, c) => (isRpcDataString(u) ? t.success(ethereumjs_util_1.toBuffer(u)) : t.failure(u, c)), t.identity);
exports.rpcHash = new t.Type("HASH", Buffer.isBuffer, (u, c) => (isRpcHashString(u) ? t.success(ethereumjs_util_1.toBuffer(u)) : t.failure(u, c)), t.identity);
exports.rpcUnknown = t.unknown;
exports.rpcAddress = new t.Type("ADDRESS", Buffer.isBuffer, (u, c) => typeof u === "string" && ethereumjs_util_1.isValidAddress(u)
    ? t.success(ethereumjs_util_1.toBuffer(u))
    : t.failure(u, c), t.identity);
exports.logAddress = t.union([
    exports.rpcAddress,
    t.array(exports.rpcAddress),
    t.undefined,
]);
exports.logTopics = t.union([
    t.array(t.union([t.null, exports.rpcHash, t.array(t.union([t.null, exports.rpcHash]))])),
    t.undefined,
]);
exports.blockTagObject = new t.Type("BLOCKTAGOBJECT", (u) => ethereumjs_util_1.BN.isBN(u) || Buffer.isBuffer(u), (u, c) => {
    if (isBlockTagObject(u)) {
        const hasBlockHash = (u === null || u === void 0 ? void 0 : u.blockHash) !== undefined && (u === null || u === void 0 ? void 0 : u.blockHash) !== null;
        const hasBlockNumber = (u === null || u === void 0 ? void 0 : u.blockNumber) !== undefined && (u === null || u === void 0 ? void 0 : u.blockNumber) !== null;
        if (hasBlockHash && hasBlockNumber) {
            return t.failure(u, c);
        }
        if (hasBlockHash) {
            return t.success(ethereumjs_util_1.toBuffer(u.blockHash));
        }
        if (hasBlockNumber) {
            return t.success(new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(u.blockNumber)));
        }
    }
    return t.failure(u, c);
}, t.identity);
exports.blockTag = t.union([
    exports.rpcQuantity,
    exports.blockTagObject,
    t.keyof({
        earliest: null,
        latest: null,
        pending: null,
    }),
]);
exports.optionalBlockTag = optional(exports.blockTag);
exports.rpcTransactionRequest = t.type({
    from: exports.rpcAddress,
    to: optional(exports.rpcAddress),
    gas: optional(exports.rpcQuantity),
    gasPrice: optional(exports.rpcQuantity),
    value: optional(exports.rpcQuantity),
    data: optional(exports.rpcData),
    nonce: optional(exports.rpcQuantity),
}, "RpcTransactionRequest");
exports.rpcCallRequest = t.type({
    from: optional(exports.rpcAddress),
    to: optional(exports.rpcAddress),
    gas: optional(exports.rpcQuantity),
    gasPrice: optional(exports.rpcQuantity),
    value: optional(exports.rpcQuantity),
    data: optional(exports.rpcData),
}, "RpcCallRequest");
exports.rpcFilterRequest = t.type({
    fromBlock: exports.optionalBlockTag,
    toBlock: exports.optionalBlockTag,
    address: exports.logAddress,
    topics: exports.logTopics,
    blockHash: optional(exports.rpcHash),
}, "RpcFilterRequest");
exports.optionalRpcFilterRequest = t.union([
    exports.rpcFilterRequest,
    t.undefined,
]);
exports.rpcSubscribeRequest = t.keyof({
    newHeads: null,
    newPendingTransactions: null,
    logs: null,
}, "RpcSubscribe");
exports.rpcCompilerInput = t.type({
    language: t.string,
    sources: t.any,
    settings: t.any,
}, "RpcCompilerInput");
exports.rpcCompilerOutput = t.type({
    sources: t.any,
    contracts: t.any,
}, "RpcCompilerOutput");
exports.rpcForkConfig = optional(t.type({
    jsonRpcUrl: t.string,
    blockNumber: optional(t.number),
}, "RpcForkConfig"));
exports.rpcHardhatNetworkConfig = t.type({
    forking: optional(exports.rpcForkConfig),
}, "HardhatNetworkConfig");
exports.optionalRpcHardhatNetworkConfig = optional(exports.rpcHardhatNetworkConfig);
// tslint:disable only-hardhat-error
function validateParams(params, ...types) {
    if (types === undefined && params.length > 0) {
        throw new errors_1.InvalidArgumentsError(`No argument was expected and got ${params.length}`);
    }
    let optionalParams = 0;
    for (let i = types.length - 1; i >= 0; i--) {
        if (types[i].is(undefined)) {
            optionalParams += 1;
        }
        else {
            break;
        }
    }
    if (optionalParams === 0) {
        if (params.length !== types.length) {
            throw new errors_1.InvalidArgumentsError(`Expected exactly ${types.length} arguments and got ${params.length}`);
        }
    }
    else {
        if (params.length > types.length ||
            params.length < types.length - optionalParams) {
            throw new errors_1.InvalidArgumentsError(`Expected between ${types.length - optionalParams} and ${types.length} arguments and got ${params.length}`);
        }
    }
    const decoded = [];
    for (let i = 0; i < types.length; i++) {
        const result = types[i].decode(params[i]);
        if (result.isLeft()) {
            throw new errors_1.InvalidArgumentsError(`Errors encountered in param ${i}: ${PathReporter_1.PathReporter.report(result).join(", ")}`);
        }
        decoded.push(result.value);
    }
    return decoded;
}
exports.validateParams = validateParams;
//# sourceMappingURL=input.js.map