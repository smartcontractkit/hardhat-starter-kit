"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorUtils = {
    spawnSwitchErr(name, value) {
        return new Error(`Unexpected switch value: ${value} encountered for ${name}`);
    },
};
//# sourceMappingURL=error_utils.js.map