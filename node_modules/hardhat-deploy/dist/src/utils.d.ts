import * as path from 'path';
import { Artifact, HardhatRuntimeEnvironment } from 'hardhat/types';
import { ExtendedArtifact, MultiExport } from '../types';
export declare function getChainId(hre: HardhatRuntimeEnvironment): Promise<string>;
export declare function getArtifactFromFolder(name: string, folderPath: string): Promise<Artifact | ExtendedArtifact | undefined>;
export declare function getExtendedArtifactFromFolder(name: string, folderPath: string): Promise<ExtendedArtifact | undefined>;
export declare function loadAllDeployments(hre: HardhatRuntimeEnvironment, deploymentsPath: string, onlyABIAndAddress?: boolean, externalDeployments?: {
    [networkName: string]: string[];
}): MultiExport;
export declare function deleteDeployments(deploymentsPath: string, subPath: string): void;
export declare function addDeployments(db: any, deploymentsPath: string, subPath: string, expectedChainId?: string, truffleChainId?: string): void;
export declare function processNamedAccounts(hre: HardhatRuntimeEnvironment, accounts: string[], chainIdGiven: string): {
    namedAccounts: {
        [name: string]: string;
    };
    unnamedAccounts: string[];
};
export declare const traverse: (dir: string, result?: any[], topDir?: string | undefined, filter?: ((name: string, stats: any) => boolean) | undefined) => Array<{
    name: string;
    path: string;
    relativePath: string;
    mtimeMs: number;
    directory: boolean;
}>;
export declare function mergeABIs(abis: any[][], options: {
    check: boolean;
    skipSupportsInterface: boolean;
}): any[];
//# sourceMappingURL=utils.d.ts.map