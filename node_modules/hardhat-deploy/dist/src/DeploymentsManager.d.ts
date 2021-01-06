import { Deployment, DeploymentsExtension, DeploymentSubmission } from '../types';
import { TransactionResponse } from '@ethersproject/providers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
export declare class DeploymentsManager {
    deploymentsExtension: DeploymentsExtension;
    private db;
    private env;
    private deploymentsPath;
    constructor(env: HardhatRuntimeEnvironment);
    runAsNode(enabled: boolean): void;
    dealWithPendingTransactions(): Promise<void>;
    onPendingTx(tx: TransactionResponse, name?: string, deployment?: any): Promise<TransactionResponse>;
    getNamedAccounts(): Promise<{
        [name: string]: string;
    }>;
    getUnnamedAccounts(): Promise<string[]>;
    loadDeployments(chainIdExpected?: boolean): Promise<{
        [name: string]: Deployment;
    }>;
    deletePreviousDeployments(folderPath?: string): Promise<void>;
    getSolcInputPath(): string;
    saveDeployment(name: string, deployment: DeploymentSubmission): Promise<boolean>;
    runDeploy(tags?: string | string[], options?: {
        deletePreviousDeployments: boolean;
        log: boolean;
        resetMemory: boolean;
        writeDeploymentsToFiles: boolean;
        savePendingTx: boolean;
        export?: string;
        exportAll?: string;
        gasPrice?: string;
    }): Promise<{
        [name: string]: Deployment;
    }>;
    executeDeployScripts(deployScriptsPath: string, tags?: string[]): Promise<void>;
    export(options: {
        exportAll?: string;
        export?: string;
    }): Promise<void>;
    private getImportPaths;
    private setup;
    private saveSnapshot;
    private revertSnapshot;
    private deploymentFolder;
    private setupAccounts;
}
//# sourceMappingURL=DeploymentsManager.d.ts.map