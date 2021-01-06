#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const semver_1 = __importDefault(require("semver"));
require("source-map-support/register");
const task_names_1 = require("../../builtin-tasks/task-names");
const constants_1 = require("../constants");
const context_1 = require("../context");
const config_loading_1 = require("../core/config/config-loading");
const errors_1 = require("../core/errors");
const errors_list_1 = require("../core/errors-list");
const execution_mode_1 = require("../core/execution-mode");
const env_variables_1 = require("../core/params/env-variables");
const hardhat_params_1 = require("../core/params/hardhat-params");
const project_structure_1 = require("../core/project-structure");
const runtime_environment_1 = require("../core/runtime-environment");
const typescript_support_1 = require("../core/typescript-support");
const reporter_1 = require("../sentry/reporter");
const ci_detection_1 = require("../util/ci-detection");
const global_dir_1 = require("../util/global-dir");
const packageInfo_1 = require("../util/packageInfo");
const analytics_1 = require("./analytics");
const ArgumentsParser_1 = require("./ArgumentsParser");
const emoji_1 = require("./emoji");
const project_creation_1 = require("./project-creation");
const log = debug_1.default("hardhat:core:cli");
const ANALYTICS_SLOW_TASK_THRESHOLD = 300;
async function printVersionMessage(packageJson) {
    console.log(packageJson.version);
}
function ensureValidNodeVersion(packageJson) {
    const requirement = packageJson.engines.node;
    if (!semver_1.default.satisfies(process.version, requirement)) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.GENERAL.INVALID_NODE_VERSION, {
            requirement,
        });
    }
}
async function main() {
    // We first accept this argument anywhere, so we know if the user wants
    // stack traces before really parsing the arguments.
    let showStackTraces = process.argv.includes("--show-stack-traces");
    try {
        const packageJson = await packageInfo_1.getPackageJson();
        ensureValidNodeVersion(packageJson);
        const envVariableArguments = env_variables_1.getEnvHardhatArguments(hardhat_params_1.HARDHAT_PARAM_DEFINITIONS, process.env);
        const argumentsParser = new ArgumentsParser_1.ArgumentsParser();
        const { hardhatArguments, taskName: parsedTaskName, unparsedCLAs, } = argumentsParser.parseHardhatArguments(hardhat_params_1.HARDHAT_PARAM_DEFINITIONS, envVariableArguments, process.argv.slice(2));
        if (hardhatArguments.verbose) {
            reporter_1.Reporter.setVerbose(true);
            debug_1.default.enable("hardhat*");
        }
        if (hardhatArguments.emoji) {
            emoji_1.enableEmoji();
        }
        showStackTraces = hardhatArguments.showStackTraces;
        if (hardhatArguments.config === undefined &&
            !project_structure_1.isCwdInsideProject() &&
            process.stdout.isTTY === true) {
            await project_creation_1.createProject();
            return;
        }
        // --version is a special case
        if (hardhatArguments.version) {
            await printVersionMessage(packageJson);
            return;
        }
        if (!execution_mode_1.isHardhatInstalledLocallyOrLinked()) {
            throw new errors_1.HardhatError(errors_list_1.ERRORS.GENERAL.NON_LOCAL_INSTALLATION);
        }
        if (typescript_support_1.willRunWithTypescript(hardhatArguments.config)) {
            typescript_support_1.loadTsNode();
        }
        let taskName = parsedTaskName !== null && parsedTaskName !== void 0 ? parsedTaskName : task_names_1.TASK_HELP;
        const showWarningIfNoSolidityConfig = taskName === task_names_1.TASK_COMPILE;
        const ctx = context_1.HardhatContext.createHardhatContext();
        const config = config_loading_1.loadConfigAndTasks(hardhatArguments, {
            showWarningIfNoSolidityConfig,
        });
        let telemetryConsent = global_dir_1.hasConsentedTelemetry();
        const isHelpCommand = hardhatArguments.help || taskName === task_names_1.TASK_HELP;
        if (telemetryConsent === undefined &&
            !isHelpCommand &&
            !ci_detection_1.isRunningOnCiServer() &&
            process.stdout.isTTY === true) {
            telemetryConsent = await project_creation_1.confirmTelemetryConsent();
            if (telemetryConsent !== undefined) {
                global_dir_1.writeTelemetryConsent(telemetryConsent);
            }
        }
        const analytics = await analytics_1.Analytics.getInstance(telemetryConsent);
        reporter_1.Reporter.setConfigPath(config.paths.configFile);
        if (telemetryConsent === true) {
            reporter_1.Reporter.setEnabled(true);
        }
        const envExtenders = ctx.extendersManager.getExtenders();
        const taskDefinitions = ctx.tasksDSL.getTaskDefinitions();
        // tslint:disable-next-line: prefer-const
        let [abortAnalytics, hitPromise] = await analytics.sendTaskHit(taskName);
        let taskArguments;
        // --help is a also special case
        if (hardhatArguments.help && taskName !== task_names_1.TASK_HELP) {
            taskArguments = { task: taskName };
            taskName = task_names_1.TASK_HELP;
        }
        else {
            const taskDefinition = taskDefinitions[taskName];
            if (taskDefinition === undefined) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_TASK, {
                    task: taskName,
                });
            }
            if (taskDefinition.isSubtask) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.ARGUMENTS.RUNNING_SUBTASK_FROM_CLI, {
                    name: taskDefinition.name,
                });
            }
            taskArguments = argumentsParser.parseTaskArguments(taskDefinition, unparsedCLAs);
        }
        const env = new runtime_environment_1.Environment(config, hardhatArguments, taskDefinitions, envExtenders, ctx.experimentalHardhatNetworkMessageTraceHooks);
        ctx.setHardhatRuntimeEnvironment(env);
        const timestampBeforeRun = new Date().getTime();
        await env.run(taskName, taskArguments);
        const timestampAfterRun = new Date().getTime();
        if (timestampAfterRun - timestampBeforeRun >
            ANALYTICS_SLOW_TASK_THRESHOLD) {
            await hitPromise;
        }
        else {
            abortAnalytics();
        }
        log(`Killing Hardhat after successfully running task ${taskName}`);
    }
    catch (error) {
        let isHardhatError = false;
        if (errors_1.HardhatError.isHardhatError(error)) {
            isHardhatError = true;
            console.error(chalk_1.default.red(`Error ${error.message}`));
        }
        else if (errors_1.HardhatPluginError.isHardhatPluginError(error)) {
            isHardhatError = true;
            console.error(chalk_1.default.red(`Error in plugin ${error.pluginName}: ${error.message}`));
        }
        else if (error instanceof Error) {
            console.error(chalk_1.default.red("An unexpected error occurred:"));
            showStackTraces = true;
        }
        else {
            console.error(chalk_1.default.red("An unexpected error occurred."));
            showStackTraces = true;
        }
        console.log("");
        try {
            reporter_1.Reporter.reportError(error);
        }
        catch (error) {
            log("Couldn't report error to sentry: %O", error);
        }
        if (showStackTraces) {
            console.error(error);
        }
        else {
            if (!isHardhatError) {
                console.error(`If you think this is a bug in Hardhat, please report it here: https://hardhat.org/reportbug`);
            }
            if (errors_1.HardhatError.isHardhatError(error)) {
                const link = `https://hardhat.org/${errors_list_1.getErrorCode(error.errorDescriptor)}`;
                console.error(`For more info go to ${link} or run ${constants_1.HARDHAT_NAME} with --show-stack-traces`);
            }
            else {
                console.error(`For more info run ${constants_1.HARDHAT_NAME} with --show-stack-traces`);
            }
        }
        await reporter_1.Reporter.close(1000);
        process.exit(1);
    }
}
main()
    .then(() => process.exit(process.exitCode))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map