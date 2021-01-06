import './type-extensions';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import murmur128 from 'murmur-128';
import {
  HardhatRuntimeEnvironment,
  HardhatConfig,
  HardhatUserConfig,
  EthereumProvider,
  Artifact,
  BuildInfo,
} from 'hardhat/types';
import {Deployment, ExtendedArtifact} from '../types';
import {extendEnvironment, task, subtask, extendConfig} from 'hardhat/config';
import {HARDHAT_NETWORK_NAME} from 'hardhat/internal/constants';
import * as types from 'hardhat/internal/core/params/argumentTypes';
import {
  TASK_NODE,
  TASK_TEST,
  TASK_NODE_GET_PROVIDER,
  TASK_NODE_SERVER_READY,
} from 'hardhat/builtin-tasks/task-names';

import debug from 'debug';
const log = debug('hardhat:wighawag:hardhat-deploy');

import {DeploymentsManager} from './DeploymentsManager';
import chokidar from 'chokidar';
import {submitSources} from './etherscan';
import {submitSourcesToSourcify} from './sourcify';

export const TASK_DEPLOY = 'deploy';
export const TASK_DEPLOY_MAIN = 'deploy:main';
export const TASK_DEPLOY_RUN_DEPLOY = 'deploy:runDeploy';
export const TASK_EXPORT = 'export';
export const TASK_ETHERSCAN_VERIFY = 'etherscan-verify';
export const TASK_SOURCIFY = 'sourcify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nodeTaskArgs: Record<string, any> = {};

function isHardhatEVM(hre: HardhatRuntimeEnvironment): boolean {
  const {network} = hre;
  return network.name === HARDHAT_NETWORK_NAME;
}

function normalizePathArray(config: HardhatConfig, paths: string[]): string[] {
  const newArray: string[] = [];
  for (const value of paths) {
    if (value) {
      newArray.push(normalizePath(config, value, value));
    }
  }
  return newArray;
}

function normalizePath(
  config: HardhatConfig,
  userPath: string | undefined,
  defaultPath: string
): string {
  if (userPath === undefined) {
    userPath = path.join(config.paths.root, defaultPath);
  } else {
    if (!path.isAbsolute(userPath)) {
      userPath = path.normalize(path.join(config.paths.root, userPath));
    }
  }
  return userPath;
}

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    config.paths.deployments = normalizePath(
      config,
      userConfig.paths?.deployments,
      'deployments'
    );

    config.paths.imports = normalizePath(
      config,
      userConfig.paths?.imports,
      'imports'
    );

    config.paths.deploy = normalizePath(
      config,
      userConfig.paths?.deploy,
      TASK_DEPLOY
    );

    if (userConfig.namedAccounts) {
      config.namedAccounts = userConfig.namedAccounts;
    } else {
      config.namedAccounts = {};
    }

    if (userConfig.external) {
      if (!config.external) {
        config.external = {};
      }
      if (userConfig.external.contracts) {
        const externalContracts: {artifacts: string; deploy?: string}[] = [];
        config.external.contracts = externalContracts;
        for (const userDefinedExternalContracts of userConfig.external
          .contracts) {
          externalContracts.push({
            artifacts: normalizePath(
              config,
              userDefinedExternalContracts.artifacts,
              userDefinedExternalContracts.artifacts
            ),
            deploy: userDefinedExternalContracts.deploy
              ? normalizePath(
                  config,
                  userDefinedExternalContracts.deploy,
                  userDefinedExternalContracts.deploy
                )
              : undefined,
          });
        }
      }
      if (userConfig.external.deployments) {
        config.external.deployments = {};
        for (const key of Object.keys(userConfig.external.deployments)) {
          config.external.deployments[key] = normalizePathArray(
            config,
            userConfig.external.deployments[key]
          );
        }
      }
    }

    for (const compiler of config.solidity.compilers) {
      setupExtraSolcSettings(compiler.settings);
    }
  }
);

log('start...');
let deploymentsManager: DeploymentsManager;
extendEnvironment((env) => {
  let live = true;
  if (env.network.name === 'localhost' || env.network.name === 'hardhat') {
    // the 2 default network are not live network
    live = false;
  }
  if (env.network.config.live !== undefined) {
    live = env.network.config.live;
  }
  env.network.live = live;

  // associate tags to current network as object
  env.network.tags = {};
  const tags = env.network.config.tags || [];
  for (const tag of tags) {
    env.network.tags[tag] = true;
  }

  if (env.network.config.saveDeployments === undefined) {
    env.network.saveDeployments = true;
  } else {
    env.network.saveDeployments = env.network.config.saveDeployments;
  }

  if (deploymentsManager === undefined || env.deployments === undefined) {
    deploymentsManager = new DeploymentsManager(env);
    env.deployments = deploymentsManager.deploymentsExtension;
    env.getNamedAccounts = deploymentsManager.getNamedAccounts.bind(
      deploymentsManager
    );
    env.getUnnamedAccounts = deploymentsManager.getUnnamedAccounts.bind(
      deploymentsManager
    );
  }
  log('ready');
});

function addIfNotPresent(array: string[], value: string) {
  if (array.indexOf(value) === -1) {
    array.push(value);
  }
}

function setupExtraSolcSettings(settings: {
  metadata: {useLiteralContent: boolean};
  outputSelection: {'*': {'': string[]; '*': string[]}};
}): void {
  settings.metadata = settings.metadata || {};
  settings.metadata.useLiteralContent = true;

  if (settings.outputSelection === undefined) {
    settings.outputSelection = {
      '*': {
        '*': [],
        '': [],
      },
    };
  }
  if (settings.outputSelection['*'] === undefined) {
    settings.outputSelection['*'] = {
      '*': [],
      '': [],
    };
  }
  if (settings.outputSelection['*']['*'] === undefined) {
    settings.outputSelection['*']['*'] = [];
  }
  if (settings.outputSelection['*'][''] === undefined) {
    settings.outputSelection['*'][''] = [];
  }

  addIfNotPresent(settings.outputSelection['*']['*'], 'abi');
  addIfNotPresent(settings.outputSelection['*']['*'], 'evm.bytecode');
  addIfNotPresent(settings.outputSelection['*']['*'], 'evm.deployedBytecode');
  addIfNotPresent(settings.outputSelection['*']['*'], 'metadata');
  addIfNotPresent(settings.outputSelection['*']['*'], 'devdoc');
  addIfNotPresent(settings.outputSelection['*']['*'], 'userdoc');
  addIfNotPresent(settings.outputSelection['*']['*'], 'storageLayout');
  addIfNotPresent(settings.outputSelection['*']['*'], 'evm.methodIdentifiers');
  addIfNotPresent(settings.outputSelection['*']['*'], 'evm.gasEstimates');
  // addIfNotPresent(settings.outputSelection["*"][""], "ir");
  // addIfNotPresent(settings.outputSelection["*"][""], "irOptimized");
  // addIfNotPresent(settings.outputSelection["*"][""], "ast");
}

subtask(TASK_DEPLOY_RUN_DEPLOY, 'deploy run only')
  .addOptionalParam('export', 'export current network deployments')
  .addOptionalParam('exportAll', 'export all deployments into one file')
  .addOptionalParam(
    'tags',
    'specify which deploy script to execute via tags, separated by commas',
    undefined,
    types.string
  )
  .addOptionalParam(
    'write',
    'whether to write deployments to file',
    true,
    types.boolean
  )
  .addOptionalParam(
    'pendingtx',
    'whether to save pending tx',
    false,
    types.boolean
  )
  .addOptionalParam(
    'gasprice',
    'gas price to use for transactions',
    undefined,
    types.string
  )
  .addFlag('reset', 'whether to delete deployments files first')
  .addFlag('log', 'whether to output log')
  .setAction(async (args) => {
    let tags = args.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',');
    }
    return deploymentsManager.runDeploy(tags, {
      log: args.log,
      resetMemory: false,
      deletePreviousDeployments: args.reset,
      writeDeploymentsToFiles: args.write,
      export: args.export,
      exportAll: args.exportAll,
      savePendingTx: args.pendingtx,
      gasPrice: args.gasprice,
    });
  });

subtask(TASK_DEPLOY_MAIN, 'deploy ')
  .addOptionalParam('export', 'export current network deployments')
  .addOptionalParam('exportAll', 'export all deployments into one file')
  .addOptionalParam(
    'tags',
    'specify which deploy script to execute via tags, separated by commas',
    undefined,
    types.string
  )
  .addOptionalParam(
    'write',
    'whether to write deployments to file',
    true,
    types.boolean
  )
  .addOptionalParam(
    'pendingtx',
    'whether to save pending tx',
    false,
    types.boolean
  )
  .addOptionalParam(
    'gasprice',
    'gas price to use for transactions',
    undefined,
    types.string
  )
  .addFlag('noCompile', 'disable pre compilation')
  .addFlag('reset', 'whether to delete deployments files first')
  .addFlag('log', 'whether to output log')
  .addFlag('watch', 'redeploy on every change of contract or deploy script')
  .addFlag(
    'watchOnly',
    'do not actually deploy, just watch and deploy if changes occurs'
  )
  .setAction(async (args, hre) => {
    if (args.reset) {
      await deploymentsManager.deletePreviousDeployments(
        args.runAsNode ? 'localhost' : undefined
      );
    }

    if (
      nodeTaskArgs.forkDeployments &&
      nodeTaskArgs.forkDeployments !== 'localhost'
    ) {
      // copy existing deployment from specified netwotk into localhost deployment folder
      fs.copy(
        path.join(hre.config.paths.deployments, nodeTaskArgs.forkDeployments),
        path.join(hre.config.paths.deployments, 'localhost')
      );
    }

    async function compileAndDeploy() {
      if (!args.noCompile) {
        await hre.run('compile');
      }
      return hre.run(TASK_DEPLOY_RUN_DEPLOY, {...args, reset: false});
    }

    let currentPromise: Promise<{
      [name: string]: Deployment;
    }> | null = args.watchOnly ? null : compileAndDeploy();
    if (args.watch || args.watchOnly) {
      const watcher = chokidar.watch(
        [hre.config.paths.sources, hre.config.paths.deploy],
        {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true,
        }
      );

      watcher.on('ready', () =>
        console.log('Initial scan complete. Ready for changes')
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let rejectPending: any = null;
      // eslint-disable-next-line no-inner-declarations,@typescript-eslint/no-explicit-any
      function pending(): Promise<any> {
        return new Promise((resolve, reject) => {
          rejectPending = reject;
          if (currentPromise) {
            currentPromise
              .then(() => {
                rejectPending = null;
                resolve();
              })
              .catch((error) => {
                rejectPending = null;
                currentPromise = null;
                console.error(error);
              });
          } else {
            rejectPending = null;
            resolve();
          }
        });
      }
      watcher.on('change', async () => {
        console.log('change detected');
        if (currentPromise) {
          console.log('deployment in progress, please wait ...');
          if (rejectPending) {
            // console.log("disabling previously pending redeployments...");
            rejectPending();
          }
          try {
            // console.log("waiting for current redeployment...");
            await pending();
            // console.log("pending finished");
          } catch (e) {
            return;
          }
        }
        currentPromise = compileAndDeploy();
        try {
          await currentPromise;
        } catch (e) {
          console.error(e);
        }
        currentPromise = null;
      });
      try {
        await currentPromise;
      } catch (e) {
        console.error(e);
      }
      currentPromise = null;
      await new Promise((resolve) => setTimeout(resolve, 2000000000)); // TODO better way ?
    } else {
      const firstDeployments = await currentPromise;
      return firstDeployments;
    }
  });

task(TASK_TEST, 'Runs mocha tests')
  .addFlag('deployFixture', 'run the global fixture before tests')
  .setAction(async (args, hre, runSuper) => {
    if (args.deployFixture || process.env.HARDHAT_DEPLOY_FIXTURE) {
      if (!args.noCompile) {
        await hre.run('compile');
      }
      await hre.deployments.fixture();
      return runSuper({...args, noCompile: true});
    } else {
      return runSuper(args);
    }
  });

task(TASK_DEPLOY, 'Deploy contracts')
  .addOptionalParam('export', 'export current network deployments')
  .addOptionalParam('exportAll', 'export all deployments into one file')
  .addOptionalParam(
    'tags',
    'specify which deploy script to execute via tags, separated by commas',
    undefined,
    types.string
  )
  .addOptionalParam(
    'write',
    'whether to write deployments to file',
    undefined,
    types.boolean
  )
  // TODO pendingtx
  .addOptionalParam(
    'gasprice',
    'gas price to use for transactions',
    undefined,
    types.string
  )
  .addOptionalParam(
    'deployScripts',
    'override deploy script folder path',
    undefined,
    types.string
  )
  .addFlag('noCompile', 'disable pre compilation')
  .addFlag('reset', 'whether to delete deployments files first')
  .addFlag('silent', 'whether to remove log')
  .addFlag('watch', 'redeploy on every change of contract or deploy script')
  .setAction(async (args, hre) => {
    if (args.deployScripts) {
      hre.config.paths.deploy = normalizePath(
        hre.config,
        args.deployScripts,
        args.deployScripts
      );
    }
    args.log = !args.silent;
    delete args.silent;
    if (args.write === undefined) {
      args.write = !isHardhatEVM(hre);
    }
    args.pendingtx = !isHardhatEVM(hre);
    await hre.run(TASK_DEPLOY_MAIN, args);
  });

task(
  TASK_EXPORT,
  'export contract deployment of the specified network into one file'
)
  .addOptionalParam('export', 'export current network deployments')
  .addOptionalParam('exportAll', 'export all deployments into one file')
  .setAction(async (args) => {
    await deploymentsManager.loadDeployments(false);
    await deploymentsManager.export(args);
  });

async function enableProviderLogging(
  provider: EthereumProvider,
  enabled: boolean
) {
  await provider.request({
    method: 'hardhat_setLoggingEnabled',
    params: [enabled],
  });
}

task(TASK_NODE, 'Starts a JSON-RPC server on top of Hardhat EVM')
  .addOptionalParam('export', 'export current network deployments')
  .addOptionalParam('exportAll', 'export all deployments into one file')
  .addOptionalParam(
    'tags',
    'specify which deploy script to execute via tags, separated by commas',
    undefined,
    types.string
  )
  .addOptionalParam(
    'write',
    'whether to write deployments to file',
    true,
    types.boolean
  )
  .addOptionalParam(
    'gasprice',
    'gas price to use for transactions',
    undefined,
    types.string
  )
  .addOptionalParam(
    'forkDeployments',
    'this will use deployment from the named network, default to "localhost"',
    'localhost',
    types.string
  )
  .addOptionalParam(
    'asNetwork',
    'network name to be used, default to "localhost" (or to `--fork-deployments` value)',
    undefined,
    types.string
  )
  // TODO --unlock-accounts
  .addFlag('noReset', 'do not delete deployments files already present')
  .addFlag('silent', 'whether to renove log')
  .addFlag('noDeploy', 'do not deploy')
  .addFlag('showAccounts', 'display account addresses and private keys')
  .addFlag('watch', 'redeploy on every change of contract or deploy script')
  .setAction(async (args, _, runSuper) => {
    nodeTaskArgs = args;
    deploymentsManager.runAsNode(true);
    // console.log('node', args);
    await runSuper(args);
  });

subtask(TASK_NODE_GET_PROVIDER).setAction(
  async (args, hre, runSuper): Promise<EthereumProvider> => {
    const provider = await runSuper(args);
    if (nodeTaskArgs.noDeploy) {
      // console.log('skip');
      return provider;
    }
    // console.log('enabling logging');
    await enableProviderLogging(provider, false);

    // TODO add another optional param that can change the network name : `--as-network` ?
    if (
      isHardhatEVM(hre) ||
      nodeTaskArgs.forkDeployments ||
      nodeTaskArgs.asNetwork
    ) {
      // TODO what about accounts and other config.networks[name] ?
      hre.network.name =
        nodeTaskArgs.asNetwork || nodeTaskArgs.forkDeployments || 'localhost'; // Ensure it use same config as network
    }
    nodeTaskArgs.log = !nodeTaskArgs.silent;
    delete nodeTaskArgs.silent;
    nodeTaskArgs.pendingtx = false;
    await hre.run(TASK_DEPLOY_MAIN, {
      ...nodeTaskArgs,
      watch: false,
      reset: !nodeTaskArgs.noReset,
    });

    await enableProviderLogging(provider, true);

    return provider;
  }
);

subtask(TASK_NODE_SERVER_READY).setAction(async (args, hre, runSuper) => {
  if (nodeTaskArgs.showAccounts) {
    await runSuper(args);
  } else {
    console.log(
      chalk.green(
        `Started HTTP and WebSocket JSON-RPC server at http://${args.address}:${args.port}/`
      )
    );
    console.log();
  }

  if (nodeTaskArgs.watch) {
    await hre.run(TASK_DEPLOY_MAIN, {
      ...nodeTaskArgs,
      watchOnly: true,
      reset: false,
    });
  }
});

task(TASK_ETHERSCAN_VERIFY, 'submit contract source code to etherscan')
  .addOptionalParam('apiKey', 'etherscan api key', undefined, types.string)
  .addOptionalParam(
    'license',
    'SPDX license (useful if SPDX is not listed in the sources), need to be supported by etherscan: https://etherscan.io/contract-license-types',
    undefined,
    types.string
  )
  .addFlag(
    'forceLicense',
    'force the use of the license specified by --license option'
  )
  .addFlag(
    'solcInput',
    'fallback on solc-input (useful when etherscan fails on the minimum sources, see https://github.com/ethereum/solidity/issues/9573)'
  )
  .setAction(async (args, hre) => {
    const etherscanApiKey = args.apiKey || process.env.ETHERSCAN_API_KEY;
    if (!etherscanApiKey) {
      throw new Error(
        `No Etherscan API KEY provided. Set it through comand line option or by setting the "ETHERSCAN_API_KEY" env variable`
      );
    }
    const solcInputsPath = await deploymentsManager.getSolcInputPath();
    await submitSources(hre, solcInputsPath, {
      etherscanApiKey,
      license: args.license,
      fallbackOnSolcInput: args.solcInput,
      forceLicense: args.forceLicense,
    });
  });

task(TASK_SOURCIFY, 'submit contract source code to sourcify.eth')
  .addOptionalParam(
    'endpoint',
    'endpoint url for sourcify',
    undefined,
    types.string
  )
  .addFlag(
    'writeFailingMetadata',
    'write to disk failing metadata for easy debugging'
  )
  .setAction(async (args, hre) => {
    await submitSourcesToSourcify(hre, args);
  });

task('export-artifacts')
  .addPositionalParam(
    'dest',
    'destination folder where the extended artifacts files will be written to',
    undefined,
    types.string
  )
  .addFlag(
    'solcInput',
    'if set, artifacts will have an associated solcInput files (required for old version of solidity to ensure verifiability'
  )
  .addOptionalParam(
    'exclude',
    'list of contract names separated by commas to exclude',
    undefined,
    types.string
  )
  .addOptionalParam(
    'include',
    'list of contract names separated by commas to include. If specified, only these will be considered',
    undefined,
    types.string
  )
  .setAction(async (args, hre) => {
    await hre.run('compile');
    const argsInclude: string[] = args.include ? args.include.split(',') : [];
    const checkInclude = argsInclude.length > 0;
    const include = argsInclude.reduce(
      (result: Record<string, boolean>, item: string) => {
        result[item] = true;
        return result;
      },
      {}
    );
    const argsExclude: string[] = args.exclude ? args.exclude.split(',') : [];
    const exclude = argsExclude.reduce(
      (result: Record<string, boolean>, item: string) => {
        result[item] = true;
        return result;
      },
      {}
    );
    const extendedArtifactFolderpath = args.dest;
    fs.emptyDirSync(extendedArtifactFolderpath);
    const artifactPaths = await hre.artifacts.getArtifactPaths();
    for (const artifactPath of artifactPaths) {
      const artifact: Artifact = await fs.readJSON(artifactPath);
      const artifactName = path.basename(artifactPath, '.json');
      if (exclude[artifactName]) {
        continue;
      }
      if (checkInclude && !include[artifactName]) {
        continue;
      }
      const artifactDBGPath = path.join(
        path.dirname(artifactPath),
        artifactName + '.dbg.json'
      );
      const artifactDBG = await fs.readJSON(artifactDBGPath);
      const buildinfoPath = path.join(
        path.dirname(artifactDBGPath),
        artifactDBG.buildInfo
      );
      const buildInfo: BuildInfo = await fs.readJSON(buildinfoPath);
      const output =
        buildInfo.output.contracts[artifact.sourceName][artifactName];

      // TODO decide on ExtendedArtifact vs Artifact vs Deployment type
      // save space by not duplicating bytecodes
      if (output.evm?.bytecode?.object) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (output.evm.bytecode.object as any) = undefined;
      }
      if (output.evm?.deployedBytecode?.object) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (output.evm.deployedBytecode.object as any) = undefined;
      }
      // -----------------------------------------

      const extendedArtifact: ExtendedArtifact = {
        ...artifact,
        ...output,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (extendedArtifact as any)._format = undefined;

      if (args.solcInput) {
        const solcInput = JSON.stringify(buildInfo.input, null, '  ');
        const solcInputHash = Buffer.from(murmur128(solcInput)).toString('hex');
        extendedArtifact.solcInput = solcInput;
        extendedArtifact.solcInputHash = solcInputHash;
      }

      fs.writeFileSync(
        path.join(extendedArtifactFolderpath, artifactName + '.json'),
        JSON.stringify(extendedArtifact, null, '  ')
      );
    }
  });
