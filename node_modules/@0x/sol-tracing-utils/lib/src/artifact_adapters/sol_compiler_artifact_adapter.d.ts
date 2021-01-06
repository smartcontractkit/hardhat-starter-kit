import { ContractData } from '../types';
import { AbstractArtifactAdapter } from './abstract_artifact_adapter';
export declare class SolCompilerArtifactAdapter extends AbstractArtifactAdapter {
    private readonly _artifactsPath;
    private readonly _sourcesPath;
    private readonly _resolver;
    /**
     * Instantiates a SolCompilerArtifactAdapter
     * @param artifactsPath Path to your artifacts directory
     * @param sourcesPath Path to your contract sources directory
     */
    constructor(artifactsPath?: string, sourcesPath?: string);
    collectContractsDataAsync(): Promise<ContractData[]>;
}
//# sourceMappingURL=sol_compiler_artifact_adapter.d.ts.map