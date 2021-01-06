import { HardhatRuntimeEnvironment } from 'hardhat/types';
export declare function submitSources(hre: HardhatRuntimeEnvironment, solcInputsPath: string, config?: {
    etherscanApiKey?: string;
    license?: string;
    fallbackOnSolcInput?: boolean;
    forceLicense?: boolean;
}): Promise<void>;
//# sourceMappingURL=etherscan.d.ts.map