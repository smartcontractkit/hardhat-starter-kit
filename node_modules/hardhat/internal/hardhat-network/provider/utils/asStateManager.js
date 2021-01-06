"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asStateManager = void 0;
const ForkStateManager_1 = require("../fork/ForkStateManager");
function asStateManager(stateManager) {
    return stateManager instanceof ForkStateManager_1.ForkStateManager
        ? stateManager.asStateManager()
        : stateManager;
}
exports.asStateManager = asStateManager;
//# sourceMappingURL=asStateManager.js.map