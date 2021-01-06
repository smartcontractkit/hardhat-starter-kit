import { Artifact, Artifacts as IArtifacts, BuildInfo, CompilerInput, CompilerOutput } from "../types";
export declare class Artifacts implements IArtifacts {
    private _artifactsPath;
    private _buildInfosGlob;
    private _dbgsGlob;
    constructor(_artifactsPath: string);
    readArtifact(name: string): Promise<Artifact>;
    readArtifactSync(name: string): Artifact;
    artifactExists(name: string): Promise<boolean>;
    getAllFullyQualifiedNames(): Promise<string[]>;
    getBuildInfo(fullyQualifiedName: string): Promise<BuildInfo | undefined>;
    getArtifactPaths(): Promise<string[]>;
    getBuildInfoPaths(): Promise<string[]>;
    getDebugFilePaths(): Promise<string[]>;
    saveArtifactAndDebugFile(artifact: Artifact, pathToBuildInfo?: string): Promise<void>;
    saveBuildInfo(solcVersion: string, solcLongVersion: string, input: CompilerInput, output: CompilerOutput): Promise<string>;
    /**
     * Remove all artifacts that don't correspond to the current solidity files
     */
    removeObsoleteArtifacts(artifactsEmittedPerFile: Array<{
        sourceName: string;
        artifacts: string[];
    }>): Promise<void>;
    /**
     * Remove all build infos that aren't used by any debug file
     */
    removeObsoleteBuildInfos(): Promise<void>;
    private _getBuildInfoName;
    /**
     * Returns the absolute path to the artifact that corresponds to the given
     * name.
     *
     * If the name is fully qualified, the path is computed from it.  If not, an
     * artifact that matches the given name is searched in the existing artifacts.
     * If there is an ambiguity, an error is thrown.
     */
    private _getArtifactPath;
    private _createBuildInfo;
    private _createDebugFile;
    private _getArtifactPathsSync;
    /**
     * Sync version of _getArtifactPath
     */
    private _getArtifactPathSync;
    private _getArtifactPathFromFullyQualifiedName;
    private _getDebugFilePath;
    private _getArtifactPathFromFiles;
    /**
     * Returns the FQN of a contract giving the absolute path to its artifact.
     *
     * For example, given a path like
     * `/path/to/project/artifacts/contracts/Foo.sol/Bar.json`, it'll return the
     * FQN `contracts/Foo.sol:Bar`
     */
    private _getFullyQualifiedNameFromPath;
    /**
     * Remove the artifact file, its debug file and, if it exists, its build
     * info file.
     */
    private _removeArtifactFiles;
    /**
     * Given the path to a debug file, returns the absolute path to its
     * corresponding build info file if it exists, or undefined otherwise.
     */
    private _getBuildInfoFromDebugFile;
}
/**
 * Retrieves an artifact for the given `contractName` from the compilation output.
 *
 * @param sourceName The contract's source name.
 * @param contractName the contract's name.
 * @param contractOutput the contract's compilation output as emitted by `solc`.
 */
export declare function getArtifactFromContractOutput(sourceName: string, contractName: string, contractOutput: any): Artifact;
//# sourceMappingURL=artifacts.d.ts.map