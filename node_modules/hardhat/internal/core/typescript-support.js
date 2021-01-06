"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTsNode = exports.isTypescriptSupported = exports.isRunningWithTypescript = exports.willRunWithTypescript = void 0;
const config_loading_1 = require("./config/config-loading");
const errors_1 = require("./errors");
const errors_list_1 = require("./errors-list");
const execution_mode_1 = require("./execution-mode");
let cachedIsTypescriptSupported;
/**
 * Returns true if Hardhat will run in using typescript mode.
 * @param configPath The config path if provider by the user.
 */
function willRunWithTypescript(configPath) {
    const config = config_loading_1.resolveConfigPath(configPath);
    return isTypescriptFile(config);
}
exports.willRunWithTypescript = willRunWithTypescript;
/**
 * Returns true if an Hardhat is already running with typescript.
 */
function isRunningWithTypescript(config) {
    return isTypescriptFile(config.paths.configFile);
}
exports.isRunningWithTypescript = isRunningWithTypescript;
function isTypescriptSupported() {
    if (cachedIsTypescriptSupported === undefined) {
        try {
            // We resolve these from Hardhat's installation.
            require.resolve("typescript");
            require.resolve("ts-node");
            cachedIsTypescriptSupported = true;
        }
        catch (_a) {
            cachedIsTypescriptSupported = false;
        }
    }
    return cachedIsTypescriptSupported;
}
exports.isTypescriptSupported = isTypescriptSupported;
function loadTsNode() {
    try {
        require.resolve("typescript");
    }
    catch (error) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.GENERAL.TYPESCRIPT_NOT_INSTALLED);
    }
    try {
        require.resolve("ts-node");
    }
    catch (error) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.GENERAL.TS_NODE_NOT_INSTALLED);
    }
    // If we are running tests we just want to transpile
    if (execution_mode_1.isRunningHardhatCoreTests()) {
        // tslint:disable-next-line no-implicit-dependencies
        require("ts-node/register/transpile-only");
        return;
    }
    // See: https://github.com/nomiclabs/hardhat/issues/265
    if (process.env.TS_NODE_FILES === undefined) {
        process.env.TS_NODE_FILES = "true";
    }
    // tslint:disable-next-line no-implicit-dependencies
    require("ts-node/register");
}
exports.loadTsNode = loadTsNode;
function isTypescriptFile(path) {
    return path.endsWith(".ts");
}
//# sourceMappingURL=typescript-support.js.map