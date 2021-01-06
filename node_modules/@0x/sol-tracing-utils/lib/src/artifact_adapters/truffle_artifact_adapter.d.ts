import { ContractData } from '../types';
import { AbstractArtifactAdapter } from './abstract_artifact_adapter';
export declare class TruffleArtifactAdapter extends AbstractArtifactAdapter {
    private readonly _solcVersion;
    private readonly _projectRoot;
    /**
     * Instantiates a TruffleArtifactAdapter
     * @param projectRoot Path to the truffle project's root directory
     * @param solcVersion Solidity version with which to compile all the contracts
     */
    constructor(projectRoot: string, solcVersion: string);
    collectContractsDataAsync(): Promise<ContractData[]>;
    private _getTruffleConfig;
    private _getTruffleSolcSettings;
    private _assertSolidityVersionIsCorrect;
}
//# sourceMappingURL=truffle_artifact_adapter.d.ts.map