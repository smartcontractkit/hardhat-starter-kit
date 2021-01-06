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
exports.confirmTelemetryConsent = exports.createProject = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const default_config_1 = require("../core/config/default-config");
const project_structure_1 = require("../core/project-structure");
const global_dir_1 = require("../util/global-dir");
const lang_1 = require("../util/lang");
const packageInfo_1 = require("../util/packageInfo");
const emoji_1 = require("./emoji");
const CREATE_SAMPLE_PROJECT_ACTION = "Create a sample project";
const CREATE_EMPTY_HARDHAT_CONFIG_ACTION = "Create an empty hardhat.config.js";
const QUIT_ACTION = "Quit";
const HARDHAT_PACKAGE_NAME = "hardhat";
const SAMPLE_PROJECT_DEPENDENCIES = {
    "@nomiclabs/hardhat-waffle": "^2.0.0",
    "ethereum-waffle": "^3.0.0",
    chai: "^4.2.0",
    "@nomiclabs/hardhat-ethers": "^2.0.0",
    ethers: "^5.0.0",
};
const TELEMETRY_CONSENT_TIMEOUT = 10000;
async function removeProjectDirIfPresent(projectRoot, dirName) {
    const dirPath = path_1.default.join(projectRoot, dirName);
    if (await fs_extra_1.default.pathExists(dirPath)) {
        await fs_extra_1.default.remove(dirPath);
    }
}
async function removeTempFilesIfPresent(projectRoot) {
    await removeProjectDirIfPresent(projectRoot, "cache");
    await removeProjectDirIfPresent(projectRoot, "artifacts");
}
// generated with the "colossal" font
function printAsciiLogo() {
    console.log(chalk_1.default.blue("888    888                      888 888               888"));
    console.log(chalk_1.default.blue("888    888                      888 888               888"));
    console.log(chalk_1.default.blue("888    888                      888 888               888"));
    console.log(chalk_1.default.blue("8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888"));
    console.log(chalk_1.default.blue('888    888     "88b 888P"  d88" 888 888 "88b     "88b 888'));
    console.log(chalk_1.default.blue("888    888 .d888888 888    888  888 888  888 .d888888 888"));
    console.log(chalk_1.default.blue("888    888 888  888 888    Y88b 888 888  888 888  888 Y88b."));
    console.log(chalk_1.default.blue('888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888'));
    console.log("");
}
async function printWelcomeMessage() {
    const packageJson = await packageInfo_1.getPackageJson();
    console.log(chalk_1.default.cyan(`${emoji_1.emoji("👷 ")}Welcome to ${constants_1.HARDHAT_NAME} v${packageJson.version}${emoji_1.emoji(" 👷‍")}\n`));
}
async function copySampleProject(projectRoot) {
    const packageRoot = packageInfo_1.getPackageRoot();
    await fs_extra_1.default.ensureDir(projectRoot);
    await fs_extra_1.default.copy(path_1.default.join(packageRoot, "sample-project"), projectRoot);
    // This is just in case we have been using the sample project for dev/testing
    await removeTempFilesIfPresent(projectRoot);
    await fs_extra_1.default.remove(path_1.default.join(projectRoot, "LICENSE.md"));
}
async function addGitIgnore(projectRoot) {
    const gitIgnorePath = path_1.default.join(projectRoot, ".gitignore");
    let content = await project_structure_1.getRecommendedGitIgnore();
    if (await fs_extra_1.default.pathExists(gitIgnorePath)) {
        const existingContent = await fs_extra_1.default.readFile(gitIgnorePath, "utf-8");
        content = `${existingContent}
${content}`;
    }
    await fs_extra_1.default.writeFile(gitIgnorePath, content);
}
function printSuggestedCommands() {
    console.log(`Try running some of the following tasks:`);
    console.log(`  npx hardhat accounts`);
    console.log(`  npx hardhat compile`);
    console.log(`  npx hardhat test`);
    console.log(`  npx hardhat node`);
    console.log(`  node scripts/sample-script.js`);
    console.log(`  npx hardhat help`);
}
async function printRecommendedDepsInstallationInstructions() {
    console.log(`You need to install these dependencies to run the sample project:`);
    const cmd = await getRecommendedDependenciesInstallationCommand(await getDependencies());
    console.log(`  ${cmd.join(" ")}`);
}
async function writeEmptyHardhatConfig() {
    return fs_extra_1.default.writeFile("hardhat.config.js", `/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "${default_config_1.DEFAULT_SOLC_VERSION}",
};
`, "utf-8");
}
async function getAction() {
    const { default: enquirer } = await Promise.resolve().then(() => __importStar(require("enquirer")));
    try {
        const actionResponse = await enquirer.prompt([
            {
                name: "action",
                type: "select",
                message: "What do you want to do?",
                initial: 0,
                choices: [
                    {
                        name: CREATE_SAMPLE_PROJECT_ACTION,
                        message: CREATE_SAMPLE_PROJECT_ACTION,
                        value: CREATE_SAMPLE_PROJECT_ACTION,
                    },
                    {
                        name: CREATE_EMPTY_HARDHAT_CONFIG_ACTION,
                        message: CREATE_EMPTY_HARDHAT_CONFIG_ACTION,
                        value: CREATE_EMPTY_HARDHAT_CONFIG_ACTION,
                    },
                    { name: QUIT_ACTION, message: QUIT_ACTION, value: QUIT_ACTION },
                ],
            },
        ]);
        return actionResponse.action;
    }
    catch (e) {
        if (e === "") {
            return QUIT_ACTION;
        }
        // tslint:disable-next-line only-hardhat-error
        throw e;
    }
}
async function createPackageJson() {
    await fs_extra_1.default.writeJson("package.json", {
        name: "hardhat-project",
    }, { spaces: 2 });
}
async function createProject() {
    const { default: enquirer } = await Promise.resolve().then(() => __importStar(require("enquirer")));
    printAsciiLogo();
    await printWelcomeMessage();
    const action = await getAction();
    if (action === QUIT_ACTION) {
        return;
    }
    if (!(await fs_extra_1.default.pathExists("package.json"))) {
        await createPackageJson();
    }
    if (action === CREATE_EMPTY_HARDHAT_CONFIG_ACTION) {
        await writeEmptyHardhatConfig();
        console.log(`${emoji_1.emoji("✨ ")}${chalk_1.default.cyan(`Config file created`)}${emoji_1.emoji(" ✨")}`);
        if (!isInstalled(HARDHAT_PACKAGE_NAME)) {
            console.log("");
            console.log(`You need to install hardhat locally to use it. Please run:`);
            const cmd = await getRecommendedDependenciesInstallationCommand({
                [HARDHAT_PACKAGE_NAME]: `^${(await packageInfo_1.getPackageJson()).version}`,
            });
            console.log("");
            console.log(cmd.join(" "));
            console.log("");
        }
        return;
    }
    let responses;
    try {
        responses = await enquirer.prompt([
            {
                name: "projectRoot",
                type: "input",
                initial: process.cwd(),
                message: "Hardhat project root:",
            },
            createConfirmationPrompt("shouldAddGitIgnore", "Do you want to add a .gitignore?"),
        ]);
    }
    catch (e) {
        if (e === "") {
            return;
        }
        // tslint:disable-next-line only-hardhat-error
        throw e;
    }
    const { projectRoot, shouldAddGitIgnore } = responses;
    await copySampleProject(projectRoot);
    if (shouldAddGitIgnore) {
        await addGitIgnore(projectRoot);
    }
    if (global_dir_1.hasConsentedTelemetry() === undefined) {
        const telemetryConsent = await confirmTelemetryConsent();
        if (telemetryConsent !== undefined) {
            global_dir_1.writeTelemetryConsent(telemetryConsent);
        }
    }
    let shouldShowInstallationInstructions = true;
    if (await canInstallRecommendedDeps()) {
        const dependencies = await getDependencies();
        const recommendedDeps = Object.keys(dependencies);
        const dependenciesToInstall = lang_1.fromEntries(Object.entries(dependencies).filter(([name]) => !isInstalled(name)));
        const installedRecommendedDeps = recommendedDeps.filter(isInstalled);
        const installedExceptHardhat = installedRecommendedDeps.filter((name) => name !== HARDHAT_PACKAGE_NAME);
        if (installedRecommendedDeps.length === recommendedDeps.length) {
            shouldShowInstallationInstructions = false;
        }
        else if (installedExceptHardhat.length === 0) {
            const shouldInstall = await confirmRecommendedDepsInstallation(dependenciesToInstall);
            if (shouldInstall) {
                const installed = await installRecommendedDependencies(dependenciesToInstall);
                if (!installed) {
                    console.warn(chalk_1.default.red("Failed to install the sample project's dependencies"));
                }
                shouldShowInstallationInstructions = !installed;
            }
        }
    }
    if (shouldShowInstallationInstructions) {
        console.log(``);
        await printRecommendedDepsInstallationInstructions();
    }
    console.log(`\n${emoji_1.emoji("✨ ")}${chalk_1.default.cyan("Project created")}${emoji_1.emoji(" ✨")}`);
    console.log(``);
    printSuggestedCommands();
}
exports.createProject = createProject;
function createConfirmationPrompt(name, message) {
    return {
        type: "confirm",
        name,
        message,
        initial: "y",
        default: "(Y/n)",
        isTrue(input) {
            if (typeof input === "string") {
                return input.toLowerCase() === "y";
            }
            return input;
        },
        isFalse(input) {
            if (typeof input === "string") {
                return input.toLowerCase() === "n";
            }
            return input;
        },
        format() {
            const that = this;
            const value = that.value === true ? "y" : "n";
            if (that.state.submitted === true) {
                return that.styles.submitted(value);
            }
            return value;
        },
    };
}
async function canInstallRecommendedDeps() {
    return ((await fs_extra_1.default.pathExists("package.json")) &&
        // TODO: Figure out why this doesn't work on Win
        os_1.default.type() !== "Windows_NT");
}
function isInstalled(dep) {
    const packageJson = fs_extra_1.default.readJSONSync("package.json");
    const allDependencies = Object.assign(Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies), packageJson.optionalDependencies);
    return dep in allDependencies;
}
async function isYarnProject() {
    return fs_extra_1.default.pathExists("yarn.lock");
}
async function installRecommendedDependencies(dependencies) {
    console.log("");
    // The reason we don't quote the dependencies here is because they are going
    // to be used in child_process.sapwn, which doesn't require escaping string,
    // and can actually fail if you do.
    const installCmd = await getRecommendedDependenciesInstallationCommand(dependencies, false);
    return installDependencies(installCmd[0], installCmd.slice(1));
}
async function confirmRecommendedDepsInstallation(depsToInstall) {
    const { default: enquirer } = await Promise.resolve().then(() => __importStar(require("enquirer")));
    let responses;
    const packageManager = (await isYarnProject()) ? "yarn" : "npm";
    try {
        responses = await enquirer.prompt([
            createConfirmationPrompt("shouldInstallPlugin", `Do you want to install the sample project's dependencies with ${packageManager} (${Object.keys(depsToInstall).join(" ")})?`),
        ]);
    }
    catch (e) {
        if (e === "") {
            return false;
        }
        // tslint:disable-next-line only-hardhat-error
        throw e;
    }
    return responses.shouldInstallPlugin;
}
async function confirmTelemetryConsent() {
    const enquirer = require("enquirer");
    const prompt = new enquirer.prompts.Confirm({
        name: "telemetryConsent",
        type: "confirm",
        initial: true,
        message: "Help us improve Hardhat with anonymous crash reports & basic usage data?",
    });
    let timeout;
    const timeoutPromise = new Promise((resolve) => {
        timeout = setTimeout(resolve, TELEMETRY_CONSENT_TIMEOUT);
    });
    const result = await Promise.race([prompt.run(), timeoutPromise]);
    clearTimeout(timeout);
    if (result === undefined) {
        await prompt.cancel();
    }
    return result;
}
exports.confirmTelemetryConsent = confirmTelemetryConsent;
async function installDependencies(packageManager, args) {
    const { spawn } = await Promise.resolve().then(() => __importStar(require("child_process")));
    console.log(`${packageManager} ${args.join(" ")}`);
    const childProcess = spawn(packageManager, args, {
        stdio: "inherit",
    });
    return new Promise((resolve, reject) => {
        childProcess.once("close", (status) => {
            childProcess.removeAllListeners("error");
            if (status === 0) {
                resolve(true);
                return;
            }
            reject(false);
        });
        childProcess.once("error", (status) => {
            childProcess.removeAllListeners("close");
            reject(false);
        });
    });
}
async function getRecommendedDependenciesInstallationCommand(dependencies, quoteDependencies = true) {
    const deps = Object.entries(dependencies).map(([name, version]) => quoteDependencies ? `"${name}@${version}"` : `${name}@${version}`);
    if (await isYarnProject()) {
        return ["yarn", "add", "--dev", ...deps];
    }
    return ["npm", "install", "--save-dev", ...deps];
}
async function getDependencies() {
    return Object.assign({ [HARDHAT_PACKAGE_NAME]: `^${(await packageInfo_1.getPackageJson()).version}` }, SAMPLE_PROJECT_DEPENDENCIES);
}
//# sourceMappingURL=project-creation.js.map