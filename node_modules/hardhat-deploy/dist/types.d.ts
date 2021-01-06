import 'hardhat/types/runtime';
import 'hardhat/types/config';
import { LinkReferences, Artifact, HardhatRuntimeEnvironment } from 'hardhat/types';
import type { BigNumber } from '@ethersproject/bignumber';
export declare type ExtendedArtifact = {
    abi: any[];
    bytecode: string;
    deployedBytecode?: string;
    metadata?: string;
    linkReferences?: LinkReferences;
    deployedLinkReferences?: LinkReferences;
    solcInput?: string;
    solcInputHash?: string;
    userdoc?: any;
    devdoc?: any;
    methodIdentifiers?: any;
    storageLayout?: any;
    evm?: any;
};
export interface DeployFunction {
    (env: HardhatRuntimeEnvironment): Promise<void | boolean>;
    skip?: (env: HardhatRuntimeEnvironment) => Promise<boolean>;
    tags?: string[];
    dependencies?: string[];
    runAtTheEnd?: boolean;
    id?: string;
}
export declare type Address = string;
export declare type ABI = any[];
export declare type Log = {
    blockNumber: number;
    blockHash: string;
    transactionHash: string;
    transactionIndex: number;
    logIndex: number;
    removed: boolean;
    address: string;
    topics: string[];
    data: string;
};
export declare type Receipt = {
    from: Address;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    cumulativeGasUsed: BigNumber | string | number;
    gasUsed: BigNumber | string | number;
    contractAddress?: string;
    to?: Address;
    logs?: Log[];
    events?: any[];
    logsBloom?: string;
    byzantium?: boolean;
    status?: number;
    confirmations?: number;
};
export declare type DiamondFacets = Array<string>;
export interface DiamondOptions extends TxOptions {
    owner?: Address;
    facets: DiamondFacets;
    log?: boolean;
    libraries?: Libraries;
    linkedData?: any;
    upgradeIndex?: number;
    execute?: {
        methodName: string;
        args: any[];
    };
    deterministicSalt?: string;
}
export interface ProxyOptions {
    owner?: Address;
    upgradeIndex?: number;
    methodName?: string;
    proxyContract?: string;
}
export interface DeployOptionsBase extends TxOptions {
    contract?: string | {
        abi: ABI;
        bytecode: string;
        deployedBytecode?: string;
        metadata?: string;
        methodIdentifiers?: any;
        storageLayout?: any;
        userdoc?: any;
        devdoc?: any;
        gasEstimates?: any;
    };
    args?: any[];
    fieldsToCompare?: string | string[];
    skipIfAlreadyDeployed?: boolean;
    linkedData?: any;
    libraries?: Libraries;
    proxy?: boolean | string | ProxyOptions;
}
export interface DeployOptions extends DeployOptionsBase {
    deterministicDeployment?: boolean | string;
}
export interface Create2DeployOptions extends DeployOptionsBase {
    salt?: string;
}
export interface CallOptions {
    from?: string;
    gasLimit?: string | number | BigNumber;
    gasPrice?: string | BigNumber;
    value?: string | BigNumber;
    nonce?: string | number | BigNumber;
    to?: string;
    data?: string;
}
export interface TxOptions extends CallOptions {
    from: string;
    log?: boolean;
    autoMine?: boolean;
    estimatedGasLimit?: string | number | BigNumber;
    estimateGasExtra?: string | number | BigNumber;
}
export interface Execute extends TxOptions {
    name: string;
    methodName: string;
    args?: any[];
}
export interface SimpleTx extends TxOptions {
    to: string;
}
export interface DeployedContract {
    address: Address;
    abi: ABI;
}
export interface DeployResult extends Deployment {
    newlyDeployed: boolean;
}
export declare type FixtureFunc<T, O> = (env: HardhatRuntimeEnvironment, options?: O) => Promise<T>;
export interface DeploymentsExtension {
    deploy(name: string, options: DeployOptions): Promise<DeployResult>;
    diamond: {
        deploy(name: string, options: DiamondOptions): Promise<DeployResult>;
    };
    deterministic(name: string, options: Create2DeployOptions): Promise<{
        address: Address;
        deploy(): Promise<DeployResult>;
    }>;
    fetchIfDifferent(name: string, options: DeployOptions): Promise<{
        differences: boolean;
        address?: string;
    }>;
    save(name: string, deployment: DeploymentSubmission): Promise<void>;
    get(name: string): Promise<Deployment>;
    getOrNull(name: string): Promise<Deployment | null>;
    getDeploymentsFromAddress(address: string): Promise<Deployment[]>;
    all(): Promise<{
        [name: string]: Deployment;
    }>;
    getExtendedArtifact(name: string): Promise<ExtendedArtifact>;
    getArtifact(name: string): Promise<Artifact>;
    run(tags?: string | string[], options?: {
        resetMemory?: boolean;
        deletePreviousDeployments?: boolean;
        writeDeploymentsToFiles?: boolean;
        export?: string;
        exportAll?: string;
    }): Promise<{
        [name: string]: Deployment;
    }>;
    fixture(tags?: string | string[], options?: {
        fallbackToGlobal: boolean;
    }): Promise<{
        [name: string]: Deployment;
    }>;
    createFixture<T, O>(func: FixtureFunc<T, O>, id?: string): (options?: O) => Promise<T>;
    log(...args: any[]): void;
    execute(name: string, options: TxOptions, methodName: string, ...args: any[]): Promise<Receipt>;
    rawTx(tx: SimpleTx): Promise<Receipt>;
    catchUnknownSigner(action: Promise<any> | (() => Promise<any>)): Promise<void>;
    read(name: string, options: CallOptions, methodName: string, ...args: any[]): Promise<any>;
    read(name: string, methodName: string, ...args: any[]): Promise<any>;
}
export interface ContractExport {
    address: string;
    abi: any[];
    linkedData?: any;
}
export interface Export {
    chainId: string;
    name: string;
    contracts: {
        [name: string]: ContractExport;
    };
}
export declare type MultiExport = {
    [chainId: string]: {
        [name: string]: Export;
    };
};
export declare type Libraries = {
    [libraryName: string]: Address;
};
export interface FacetCut {
    facetAddress: string;
    functionSelectors: string[];
}
export interface DeploymentSubmission {
    abi: ABI;
    address: Address;
    receipt?: Receipt;
    transactionHash?: string;
    history?: Deployment[];
    args?: any[];
    linkedData?: any;
    solcInput?: string;
    solcInputHash?: string;
    metadata?: string;
    bytecode?: string;
    deployedBytecode?: string;
    userdoc?: any;
    devdoc?: any;
    methodIdentifiers?: any;
    diamondCut?: FacetCut[];
    facets?: FacetCut[];
    execute?: {
        methodName: string;
        args: any[];
    };
    storageLayout?: any;
    libraries?: Libraries;
    gasEstimates?: any;
}
export interface Deployment {
    abi: ABI;
    address: Address;
    receipt?: Receipt;
    transactionHash?: string;
    history?: Deployment[];
    args?: any[];
    linkedData?: any;
    solcInputHash?: string;
    metadata?: string;
    bytecode?: string;
    deployedBytecode?: string;
    libraries?: Libraries;
    userdoc?: any;
    devdoc?: any;
    methodIdentifiers?: any;
    diamondCut?: FacetCut[];
    facets?: FacetCut[];
    storageLayout?: any;
    gasEstimates?: any;
}
//# sourceMappingURL=types.d.ts.map