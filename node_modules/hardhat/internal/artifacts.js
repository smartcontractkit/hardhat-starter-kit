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
exports.getArtifactFromContractOutput = exports.Artifacts = void 0;
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const contract_names_1 = require("../utils/contract-names");
const source_names_1 = require("../utils/source-names");
const constants_1 = require("./constants");
const errors_1 = require("./core/errors");
const errors_list_1 = require("./core/errors-list");
const glob_1 = require("./util/glob");
const hash_1 = require("./util/hash");
const log = debug_1.default("hardhat:core:artifacts");
class Artifacts {
    constructor(_artifactsPath) {
        this._artifactsPath = _artifactsPath;
        this._buildInfosGlob = path.join(this._artifactsPath, constants_1.BUILD_INFO_DIR_NAME, "**/*.json");
        this._dbgsGlob = path.join(this._artifactsPath, "**/*.dbg.json");
    }
    async readArtifact(name) {
        const { trueCasePath } = await Promise.resolve().then(() => __importStar(require("true-case-path")));
        const artifactPath = await this._getArtifactPath(name);
        try {
            const trueCaseArtifactPath = await trueCasePath(path.relative(this._artifactsPath, artifactPath), this._artifactsPath);
            if (artifactPath !== trueCaseArtifactPath) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.ARTIFACTS.WRONG_CASING, {
                    correct: trueCaseArtifactPath,
                    incorrect: artifactPath,
                });
            }
            return fs_extra_1.default.readJson(trueCaseArtifactPath);
        }
        catch (error) {
            if (typeof error.message === "string" &&
                error.message.includes("no matching file exists")) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.INTERNAL.WRONG_ARTIFACT_PATH, {
                    contractName: name,
                    artifactPath,
                });
            }
            // tslint:disable-next-line only-hardhat-error
            throw error;
        }
    }
    readArtifactSync(name) {
        const { trueCasePathSync } = require("true-case-path");
        const artifactPath = this._getArtifactPathSync(name);
        try {
            const trueCaseArtifactPath = trueCasePathSync(path.relative(this._artifactsPath, artifactPath), this._artifactsPath);
            if (artifactPath !== trueCaseArtifactPath) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.ARTIFACTS.WRONG_CASING, {
                    correct: trueCaseArtifactPath,
                    incorrect: artifactPath,
                });
            }
            return fs_extra_1.default.readJsonSync(trueCaseArtifactPath);
        }
        catch (error) {
            if (typeof error.message === "string" &&
                error.message.includes("no matching file exists")) {
                throw new errors_1.HardhatError(errors_list_1.ERRORS.INTERNAL.WRONG_ARTIFACT_PATH, {
                    contractName: name,
                    artifactPath,
                });
            }
            // tslint:disable-next-line only-hardhat-error
            throw error;
        }
    }
    async artifactExists(name) {
        try {
            await this.readArtifact(name);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async getAllFullyQualifiedNames() {
        const paths = await this.getArtifactPaths();
        return paths.map((p) => this._getFullyQualifiedNameFromPath(p)).sort();
    }
    async getBuildInfo(fullyQualifiedName) {
        const artifactPath = this._getArtifactPathFromFullyQualifiedName(fullyQualifiedName);
        const debugFilePath = this._getDebugFilePath(artifactPath);
        const buildInfoPath = await this._getBuildInfoFromDebugFile(debugFilePath);
        if (buildInfoPath === undefined) {
            return undefined;
        }
        return fs_extra_1.default.readJSON(buildInfoPath);
    }
    async getArtifactPaths() {
        const paths = await glob_1.glob(path.join(this._artifactsPath, "**/*.json"), {
            ignore: [this._buildInfosGlob, this._dbgsGlob],
        });
        return paths.sort();
    }
    async getBuildInfoPaths() {
        const paths = await glob_1.glob(this._buildInfosGlob);
        return paths.sort();
    }
    async getDebugFilePaths() {
        const paths = await glob_1.glob(this._dbgsGlob);
        return paths.sort();
    }
    async saveArtifactAndDebugFile(artifact, pathToBuildInfo) {
        // artifact
        const fullyQualifiedName = contract_names_1.getFullyQualifiedName(artifact.sourceName, artifact.contractName);
        const artifactPath = this._getArtifactPathFromFullyQualifiedName(fullyQualifiedName);
        await fs_extra_1.default.ensureDir(path.dirname(artifactPath));
        // write artifact
        await fs_extra_1.default.writeJSON(artifactPath, artifact, {
            spaces: 2,
        });
        if (pathToBuildInfo === undefined) {
            return;
        }
        // save debug file
        const debugFilePath = this._getDebugFilePath(artifactPath);
        const debugFile = this._createDebugFile(artifactPath, pathToBuildInfo);
        await fs_extra_1.default.writeJSON(debugFilePath, debugFile, {
            spaces: 2,
        });
    }
    async saveBuildInfo(solcVersion, solcLongVersion, input, output) {
        const buildInfoDir = path.join(this._artifactsPath, constants_1.BUILD_INFO_DIR_NAME);
        await fs_extra_1.default.ensureDir(buildInfoDir);
        const buildInfoName = this._getBuildInfoName(solcVersion, solcLongVersion, input);
        const buildInfo = this._createBuildInfo(buildInfoName, solcVersion, solcLongVersion, input, output);
        const buildInfoPath = path.join(buildInfoDir, `${buildInfoName}.json`);
        await fs_extra_1.default.writeJson(buildInfoPath, buildInfo, { spaces: 2 });
        return buildInfoPath;
    }
    /**
     * Remove all artifacts that don't correspond to the current solidity files
     */
    async removeObsoleteArtifacts(artifactsEmittedPerFile) {
        const validArtifactsPaths = new Set();
        for (const { sourceName, artifacts } of artifactsEmittedPerFile) {
            for (const artifactName of artifacts) {
                validArtifactsPaths.add(this._getArtifactPathSync(contract_names_1.getFullyQualifiedName(sourceName, artifactName)));
            }
        }
        const existingArtifactsPaths = await this.getArtifactPaths();
        for (const artifactPath of existingArtifactsPaths) {
            if (!validArtifactsPaths.has(artifactPath)) {
                await this._removeArtifactFiles(artifactPath);
            }
        }
    }
    /**
     * Remove all build infos that aren't used by any debug file
     */
    async removeObsoleteBuildInfos() {
        const debugFiles = await this.getDebugFilePaths();
        const validBuildInfos = new Set();
        for (const debugFile of debugFiles) {
            const buildInfoFile = await this._getBuildInfoFromDebugFile(debugFile);
            if (buildInfoFile !== undefined) {
                validBuildInfos.add(path.resolve(path.dirname(debugFile), buildInfoFile));
            }
        }
        const buildInfoFiles = await this.getBuildInfoPaths();
        for (const buildInfoFile of buildInfoFiles) {
            if (!validBuildInfos.has(buildInfoFile)) {
                log(`Removing buildInfo '${buildInfoFile}'`);
                await fs_extra_1.default.unlink(buildInfoFile);
            }
        }
    }
    _getBuildInfoName(solcVersion, solcLongVersion, input) {
        const json = JSON.stringify({
            _format: constants_1.BUILD_INFO_FORMAT_VERSION,
            solcVersion,
            solcLongVersion,
            input,
        });
        return hash_1.createNonCryptographicHashBasedIdentifier(Buffer.from(json)).toString("hex");
    }
    /**
     * Returns the absolute path to the artifact that corresponds to the given
     * name.
     *
     * If the name is fully qualified, the path is computed from it.  If not, an
     * artifact that matches the given name is searched in the existing artifacts.
     * If there is an ambiguity, an error is thrown.
     */
    async _getArtifactPath(name) {
        if (contract_names_1.isFullyQualifiedName(name)) {
            return this._getArtifactPathFromFullyQualifiedName(name);
        }
        const files = await this.getArtifactPaths();
        return this._getArtifactPathFromFiles(name, files);
    }
    _createBuildInfo(id, solcVersion, solcLongVersion, input, output) {
        return {
            id,
            _format: constants_1.BUILD_INFO_FORMAT_VERSION,
            solcVersion,
            solcLongVersion,
            input,
            output,
        };
    }
    _createDebugFile(artifactPath, pathToBuildInfo) {
        const relativePathToBuildInfo = path.relative(path.dirname(artifactPath), pathToBuildInfo);
        const debugFile = {
            _format: constants_1.DEBUG_FILE_FORMAT_VERSION,
            buildInfo: relativePathToBuildInfo,
        };
        return debugFile;
    }
    _getArtifactPathsSync() {
        return glob_1.globSync(path.join(this._artifactsPath, "**/*.json"), {
            ignore: [this._buildInfosGlob, this._dbgsGlob],
        });
    }
    /**
     * Sync version of _getArtifactPath
     */
    _getArtifactPathSync(name) {
        if (contract_names_1.isFullyQualifiedName(name)) {
            return this._getArtifactPathFromFullyQualifiedName(name);
        }
        const files = this._getArtifactPathsSync();
        return this._getArtifactPathFromFiles(name, files);
    }
    _getArtifactPathFromFullyQualifiedName(fullyQualifiedName) {
        const { sourceName, contractName } = contract_names_1.parseFullyQualifiedName(fullyQualifiedName);
        return path.join(this._artifactsPath, sourceName, `${contractName}.json`);
    }
    _getDebugFilePath(artifactPath) {
        return artifactPath.replace(/\.json$/, ".dbg.json");
    }
    _getArtifactPathFromFiles(contractName, files) {
        const matchingFiles = files.filter((file) => {
            return path.basename(file) === `${contractName}.json`;
        });
        if (matchingFiles.length === 0) {
            throw new errors_1.HardhatError(errors_list_1.ERRORS.ARTIFACTS.NOT_FOUND, {
                contractName,
            });
        }
        if (matchingFiles.length > 1) {
            const candidates = matchingFiles
                .map((file) => this._getFullyQualifiedNameFromPath(file))
                .map(path.normalize);
            throw new errors_1.HardhatError(errors_list_1.ERRORS.ARTIFACTS.MULTIPLE_FOUND, {
                contractName,
                candidates: candidates.join(os.EOL),
            });
        }
        return matchingFiles[0];
    }
    /**
     * Returns the FQN of a contract giving the absolute path to its artifact.
     *
     * For example, given a path like
     * `/path/to/project/artifacts/contracts/Foo.sol/Bar.json`, it'll return the
     * FQN `contracts/Foo.sol:Bar`
     */
    _getFullyQualifiedNameFromPath(absolutePath) {
        const sourceName = source_names_1.replaceBackslashes(path.relative(this._artifactsPath, path.dirname(absolutePath)));
        const contractName = path.basename(absolutePath).replace(".json", "");
        return contract_names_1.getFullyQualifiedName(sourceName, contractName);
    }
    /**
     * Remove the artifact file, its debug file and, if it exists, its build
     * info file.
     */
    async _removeArtifactFiles(artifactPath) {
        await fs_extra_1.default.remove(artifactPath);
        const debugFilePath = this._getDebugFilePath(artifactPath);
        const buildInfoPath = await this._getBuildInfoFromDebugFile(debugFilePath);
        await fs_extra_1.default.remove(debugFilePath);
        if (buildInfoPath !== undefined) {
            await fs_extra_1.default.remove(buildInfoPath);
        }
    }
    /**
     * Given the path to a debug file, returns the absolute path to its
     * corresponding build info file if it exists, or undefined otherwise.
     */
    async _getBuildInfoFromDebugFile(debugFilePath) {
        if (await fs_extra_1.default.pathExists(debugFilePath)) {
            const { buildInfo } = await fs_extra_1.default.readJson(debugFilePath);
            return path.resolve(path.dirname(debugFilePath), buildInfo);
        }
        return undefined;
    }
}
exports.Artifacts = Artifacts;
/**
 * Retrieves an artifact for the given `contractName` from the compilation output.
 *
 * @param sourceName The contract's source name.
 * @param contractName the contract's name.
 * @param contractOutput the contract's compilation output as emitted by `solc`.
 */
function getArtifactFromContractOutput(sourceName, contractName, contractOutput) {
    const evmBytecode = contractOutput.evm && contractOutput.evm.bytecode;
    let bytecode = evmBytecode && evmBytecode.object ? evmBytecode.object : "";
    if (bytecode.slice(0, 2).toLowerCase() !== "0x") {
        bytecode = `0x${bytecode}`;
    }
    const evmDeployedBytecode = contractOutput.evm && contractOutput.evm.deployedBytecode;
    let deployedBytecode = evmDeployedBytecode && evmDeployedBytecode.object
        ? evmDeployedBytecode.object
        : "";
    if (deployedBytecode.slice(0, 2).toLowerCase() !== "0x") {
        deployedBytecode = `0x${deployedBytecode}`;
    }
    const linkReferences = evmBytecode && evmBytecode.linkReferences ? evmBytecode.linkReferences : {};
    const deployedLinkReferences = evmDeployedBytecode && evmDeployedBytecode.linkReferences
        ? evmDeployedBytecode.linkReferences
        : {};
    return {
        _format: constants_1.ARTIFACT_FORMAT_VERSION,
        contractName,
        sourceName,
        abi: contractOutput.abi,
        bytecode,
        deployedBytecode,
        linkReferences,
        deployedLinkReferences,
    };
}
exports.getArtifactFromContractOutput = getArtifactFromContractOutput;
//# sourceMappingURL=artifacts.js.map