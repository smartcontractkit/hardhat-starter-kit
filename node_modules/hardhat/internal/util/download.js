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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
async function download(url, filePath, timeoutMillis = 10000) {
    const { pipeline } = await Promise.resolve().then(() => __importStar(require("stream")));
    const { default: fetch } = await Promise.resolve().then(() => __importStar(require("node-fetch")));
    const streamPipeline = util_1.default.promisify(pipeline);
    const response = await fetch(url, { timeout: timeoutMillis });
    if (response.ok && response.body !== null) {
        await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
        return streamPipeline(response.body, fs_1.default.createWriteStream(filePath));
    }
    // Consume the response stream and discard its result
    // See: https://github.com/node-fetch/node-fetch/issues/83
    const _discarded = await response.arrayBuffer();
    // tslint:disable-next-line only-hardhat-error
    throw new Error(`Failed to download ${url} - ${response.statusText} received`);
}
exports.download = download;
//# sourceMappingURL=download.js.map