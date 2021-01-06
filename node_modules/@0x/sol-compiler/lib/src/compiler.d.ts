import { CompilerOptions, StandardOutput } from 'ethereum-types';
export declare type TYPE_ALL_FILES_IDENTIFIER = '*';
export declare const ALL_CONTRACTS_IDENTIFIER = "*";
export declare const ALL_FILES_IDENTIFIER = "*";
/**
 * The Compiler facilitates compiling Solidity smart contracts and saves the results
 * to artifact files.
 */
export declare class Compiler {
    private readonly _opts;
    private readonly _resolver;
    private readonly _nameResolver;
    private readonly _contractsDir;
    private readonly _artifactsDir;
    private readonly _solcVersionIfExists;
    private readonly _specifiedContracts;
    private readonly _isOfflineMode;
    private readonly _shouldSaveStandardInput;
    private readonly _shouldCompileIndependently;
    private readonly _solcWrappersByVersion;
    static getCompilerOptionsAsync(overrides?: Partial<CompilerOptions>, file?: string): Promise<CompilerOptions>;
    private static _createDefaultResolver;
    /**
     * Instantiates a new instance of the Compiler class.
     * @param opts Optional compiler options
     * @return An instance of the Compiler class.
     */
    constructor(opts?: CompilerOptions);
    /**
     * Compiles selected Solidity files found in `contractsDir` and writes JSON artifacts to `artifactsDir`.
     */
    compileAsync(): Promise<void>;
    /**
     * Compiles Solidity files specified during instantiation, and returns the
     * compiler output given by solc.  Return value is an array of outputs:
     * Solidity modules are batched together by version required, and each
     * element of the returned array corresponds to a compiler version, and
     * each element contains the output for all of the modules compiled with
     * that version.
     */
    getCompilerOutputsAsync(): Promise<StandardOutput[]>;
    /**
     * Watch contracts in the current project directory and recompile on changes.
     */
    watchAsync(): Promise<void>;
    /**
     * Gets a list of contracts to compile.
     */
    getContractNamesToCompile(): string[];
    private _getPathsToWatch;
    /**
     * Compiles contracts, and, if `shouldPersist` is true, saves artifacts to artifactsDir.
     * @param fileName Name of contract with '.sol' extension.
     * @return an array of compiler outputs, where each element corresponds to a different version of solc-js.
     */
    private _compileContractsAsync;
    private _shouldCompile;
    private _getSolcWrapperForVersion;
    private _createSolcInstance;
    private _persistCompiledContractAsync;
}
//# sourceMappingURL=compiler.d.ts.map