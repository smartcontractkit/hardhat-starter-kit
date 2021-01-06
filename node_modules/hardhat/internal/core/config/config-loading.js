"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeModuleNotFoundError = exports.loadConfigAndTasks = exports.resolveConfigPath = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const context_1 = require("../../context");
const packageInfo_1 = require("../../util/packageInfo");
const errors_1 = require("../errors");
const errors_list_1 = require("../errors-list");
const project_structure_1 = require("../project-structure");
const config_resolution_1 = require("./config-resolution");
const config_validation_1 = require("./config-validation");
const default_config_1 = require("./default-config");
function importCsjOrEsModule(filePath) {
    const imported = require(filePath);
    return imported.default !== undefined ? imported.default : imported;
}
function resolveConfigPath(configPath) {
    if (configPath === undefined) {
        configPath = project_structure_1.getUserConfigPath();
    }
    else {
        if (!path_1.default.isAbsolute(configPath)) {
            configPath = path_1.default.join(process.cwd(), configPath);
            configPath = path_1.default.normalize(configPath);
        }
    }
    return configPath;
}
exports.resolveConfigPath = resolveConfigPath;
function loadConfigAndTasks(hardhatArguments, { showWarningIfNoSolidityConfig } = { showWarningIfNoSolidityConfig: true }) {
    let configPath = hardhatArguments !== undefined ? hardhatArguments.config : undefined;
    configPath = resolveConfigPath(configPath);
    // Before loading the builtin tasks, the default and user's config we expose
    // the config env in the global object.
    const configEnv = require("./config-env");
    const globalAsAny = global;
    Object.entries(configEnv).forEach(([key, value]) => (globalAsAny[key] = value));
    const ctx = context_1.HardhatContext.getHardhatContext();
    ctx.setConfigLoadingAsStarted();
    let userConfig;
    try {
        require("../tasks/builtin-tasks");
        userConfig = importCsjOrEsModule(configPath);
    }
    catch (e) {
        analyzeModuleNotFoundError(e, configPath);
        // tslint:disable-next-line only-hardhat-error
        throw e;
    }
    finally {
        ctx.setConfigLoadingAsFinished();
    }
    config_validation_1.validateConfig(userConfig);
    if (userConfig.solidity === undefined && showWarningIfNoSolidityConfig) {
        console.warn(chalk_1.default.yellow(`Solidity compiler is not configured. Version ${default_config_1.DEFAULT_SOLC_VERSION} will be used by default. Add a 'solidity' entry to your configuration to supress this warning.

Learn more about compiler configuration at https://hardhat.org/config"
`));
    }
    // To avoid bad practices we remove the previously exported stuff
    Object.keys(configEnv).forEach((key) => (globalAsAny[key] = undefined));
    const frozenUserConfig = deepFreezeUserConfig(userConfig);
    const resolved = config_resolution_1.resolveConfig(configPath, userConfig);
    for (const extender of context_1.HardhatContext.getHardhatContext().configExtenders) {
        extender(resolved, frozenUserConfig);
    }
    return resolved;
}
exports.loadConfigAndTasks = loadConfigAndTasks;
function deepFreezeUserConfig(config, propertyPath = []) {
    if (typeof config !== "object" || config === null) {
        return config;
    }
    return new Proxy(config, {
        get(target, property, receiver) {
            return deepFreezeUserConfig(Reflect.get(target, property, receiver), [
                ...propertyPath,
                property,
            ]);
        },
        set(target, property, value, receiver) {
            throw new errors_1.HardhatError(errors_list_1.ERRORS.GENERAL.USER_CONFIG_MODIFIED, {
                path: [...propertyPath, property]
                    .map((pathPart) => pathPart.toString())
                    .join("."),
            });
        },
    });
}
/**
 * Receives an Error and checks if it's a MODULE_NOT_FOUND and the reason that
 * caused it.
 *
 * If it can infer the reason, it throws an appropiate error. Otherwise it does
 * nothing.
 */
function analyzeModuleNotFoundError(error, configPath) {
    var _a;
    const stackTraceParser = require("stacktrace-parser");
    if (error.code !== "MODULE_NOT_FOUND") {
        return;
    }
    const stackTrace = stackTraceParser.parse(error.stack);
    const throwingFile = stackTrace
        .filter((x) => x.file !== null)
        .map((x) => x.file)
        .find((x) => path_1.default.isAbsolute(x));
    if (throwingFile === null || throwingFile === undefined) {
        return;
    }
    // if the error comes from the config file, we ignore it because we know it's
    // a direct import that's missing
    if (throwingFile === configPath) {
        return;
    }
    const packageJsonPath = packageInfo_1.findClosestPackageJson(throwingFile);
    if (packageJsonPath === null) {
        return;
    }
    const packageJson = fs_extra_1.default.readJsonSync(packageJsonPath);
    const peerDependencies = (_a = packageJson.peerDependencies) !== null && _a !== void 0 ? _a : {};
    if (peerDependencies["@nomiclabs/buidler"] !== undefined) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.PLUGINS.BUIDLER_PLUGIN, {
            plugin: packageJson.name,
        });
    }
    // if the problem doesn't come from a hardhat plugin, we ignore it
    if (peerDependencies.hardhat === undefined) {
        return;
    }
    const missingPeerDependencies = {};
    for (const [peerDependency, version] of Object.entries(peerDependencies)) {
        const peerDependencyPackageJson = readPackageJson(peerDependency);
        if (peerDependencyPackageJson === undefined) {
            missingPeerDependencies[peerDependency] = version;
        }
    }
    const missingPeerDependenciesNames = Object.keys(missingPeerDependencies);
    if (missingPeerDependenciesNames.length > 0) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.PLUGINS.MISSING_DEPENDENCIES, {
            plugin: packageJson.name,
            missingDependencies: missingPeerDependenciesNames.join(", "),
            missingDependenciesVersions: Object.entries(missingPeerDependencies)
                .map(([name, version]) => `"${name}@${version}"`)
                .join(" "),
        });
    }
}
exports.analyzeModuleNotFoundError = analyzeModuleNotFoundError;
function readPackageJson(packageName) {
    try {
        const packageJsonPath = require.resolve(path_1.default.join(packageName, "package.json"));
        return require(packageJsonPath);
    }
    catch (error) {
        return undefined;
    }
}
//# sourceMappingURL=config-loading.js.map