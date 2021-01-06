"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asPStateManager = void 0;
const promisified_1 = __importDefault(require("@nomiclabs/ethereumjs-vm/dist/state/promisified"));
const ForkStateManager_1 = require("../fork/ForkStateManager");
function asPStateManager(stateManager) {
    return stateManager instanceof ForkStateManager_1.ForkStateManager
        ? stateManager
        : new promisified_1.default(stateManager);
}
exports.asPStateManager = asPStateManager;
//# sourceMappingURL=asPStateManager.js.map