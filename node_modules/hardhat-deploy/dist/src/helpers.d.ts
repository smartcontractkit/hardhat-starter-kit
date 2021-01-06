import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { DeploymentsExtension, Receipt, DeploymentSubmission } from '../types';
import { PartialExtension } from './internal/types';
import { Artifact, EthereumProvider, HardhatRuntimeEnvironment } from 'hardhat/types';
export declare function addHelpers(env: HardhatRuntimeEnvironment, partialExtension: PartialExtension, // TODO
getArtifact: (name: string) => Promise<Artifact>, saveDeployment: (name: string, deployment: DeploymentSubmission, artifactName?: string) => Promise<void>, willSaveToDisk: () => boolean, onPendingTx: (txResponse: TransactionResponse, name?: string, data?: any) => Promise<TransactionResponse>, getGasPrice: () => Promise<BigNumber | undefined>, log: (...args: any[]) => void, print: (msg: string) => void): DeploymentsExtension;
export declare function waitForTx(ethereum: EthereumProvider, txHash: string, isContract: boolean): Promise<Receipt>;
//# sourceMappingURL=helpers.d.ts.map