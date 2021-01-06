/* eslint-disable @typescript-eslint/no-explicit-any */
import 'hardhat/types/runtime';
import 'hardhat/types/config';
import {Address, DeploymentsExtension} from '../types';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    namedAccounts?: {
      [name: string]:
        | string
        | number
        | {[network: string]: null | number | string};
    };
    external?: {
      deployments?: {
        [networkName: string]: string[];
      };
      contracts?: {
        artifacts: string;
        deploy?: string;
      }[];
    };
  }

  interface HardhatConfig {
    namedAccounts: {
      [name: string]:
        | string
        | number
        | {[network: string]: null | number | string};
    };
    external?: {
      deployments?: {
        [networkName: string]: string[];
      };
      contracts?: {
        artifacts: string;
        deploy?: string;
      }[];
    };
  }

  interface HardhatNetworkUserConfig {
    live?: boolean;
    saveDeployments?: boolean;
    tags?: string[];
  }

  interface HttpNetworkUserConfig {
    live?: boolean;
    saveDeployments?: boolean;
    tags?: string[];
  }

  interface ProjectPathsUserConfig {
    deploy?: string;
    deployments?: string;
    imports?: string;
  }

  interface HardhatNetworkConfig {
    live: boolean;
    saveDeployments: boolean;
    tags: string[];
  }

  interface HttpNetworkConfig {
    live: boolean;
    saveDeployments: boolean;
    tags: string[];
  }

  interface ProjectPathsConfig {
    deploy: string;
    deployments: string;
    imports: string;
  }
}

declare module 'hardhat/types/runtime' {
  interface HardhatRuntimeEnvironment {
    deployments: DeploymentsExtension;
    getNamedAccounts: () => Promise<{
      [name: string]: Address;
    }>;
    getUnnamedAccounts: () => Promise<string[]>;
    getChainId(): Promise<string>;
  }

  interface Network {
    live: boolean;
    saveDeployments: boolean;
    tags: Record<string, boolean>;
  }
}
