"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const context_1 = require("./internal/context");
const config_loading_1 = require("./internal/core/config/config-loading");
const env_variables_1 = require("./internal/core/params/env-variables");
const hardhat_params_1 = require("./internal/core/params/hardhat-params");
const runtime_environment_1 = require("./internal/core/runtime-environment");
const typescript_support_1 = require("./internal/core/typescript-support");
const console_1 = require("./internal/util/console");
if (!context_1.HardhatContext.isCreated()) {
    // tslint:disable-next-line no-var-requires
    require("source-map-support/register");
    const ctx = context_1.HardhatContext.createHardhatContext();
    if (console_1.isNodeCalledWithoutAScript()) {
        console_1.disableReplWriterShowProxy();
    }
    const hardhatArguments = env_variables_1.getEnvHardhatArguments(hardhat_params_1.HARDHAT_PARAM_DEFINITIONS, process.env);
    if (hardhatArguments.verbose) {
        debug_1.default.enable("hardhat*");
    }
    if (typescript_support_1.willRunWithTypescript(hardhatArguments.config)) {
        typescript_support_1.loadTsNode();
    }
    const config = config_loading_1.loadConfigAndTasks(hardhatArguments);
    const env = new runtime_environment_1.Environment(config, hardhatArguments, ctx.tasksDSL.getTaskDefinitions(), ctx.extendersManager.getExtenders(), ctx.experimentalHardhatNetworkMessageTraceHooks);
    ctx.setHardhatRuntimeEnvironment(env);
    env.injectToGlobal();
}
//# sourceMappingURL=register.js.map