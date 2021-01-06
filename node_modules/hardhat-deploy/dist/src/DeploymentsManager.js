"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentsManager = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const bignumber_1 = require("@ethersproject/bignumber");
const transactions_1 = require("@ethersproject/transactions");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('hardhat:wighawag:hardhat-deploy');
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
function recode(decoded) {
    return {
        from: decoded.from,
        gasPrice: bignumber_1.BigNumber.from(decoded.from),
        gasLimit: bignumber_1.BigNumber.from(decoded.gasLimit),
        to: decoded.to,
        value: bignumber_1.BigNumber.from(decoded.value),
        nonce: decoded.nonce,
        data: decoded.data,
        r: decoded.r,
        s: decoded.s,
        v: decoded.v,
        // creates: tx.creates, // TODO test
        chainId: decoded.chainId,
    };
}
class DeploymentsManager {
    constructor(env) {
        log('constructing DeploymentsManager');
        this.db = {
            accountsLoaded: false,
            namedAccounts: {},
            unnamedAccounts: [],
            deploymentsLoaded: false,
            deployments: {},
            migrations: {},
            writeDeploymentsToFiles: false,
            fixtureCounter: 0,
            snapshotCounter: 0,
            pastFixtures: {},
            logEnabled: false,
            pendingTransactions: {},
            savePendingTx: false,
            gasPrice: undefined,
            runAsNode: false,
        };
        this.env = env;
        this.deploymentsPath = env.config.paths.deployments;
        // TODO
        // this.env.artifacts = new HardhatDeployArtifacts(this.env.artifacts);
        this.env.getChainId = () => {
            return utils_1.getChainId(this.env);
        };
        const partialExtension = {
            save: async (name, deployment) => this.saveDeployment(name, deployment),
            get: async (name) => {
                await this.setup();
                const deployment = this.db.deployments[name];
                if (deployment === undefined) {
                    throw new Error(`No deployment found for: ${name}`);
                }
                return deployment;
            },
            getOrNull: async (name) => {
                await this.setup();
                return this.db.deployments[name];
            },
            getDeploymentsFromAddress: async (address) => {
                const deployments = [];
                for (const deployment of Object.values(this.db.deployments)) {
                    if (deployment.address === address) {
                        deployments.push(deployment);
                    }
                }
                return deployments;
            },
            all: async () => {
                await this.setup();
                return this.db.deployments; // TODO copy
            },
            getArtifact: async (contractName) => {
                if (this.db.onlyArtifacts) {
                    const artifactFromFolder = await utils_1.getArtifactFromFolder(contractName, this.db.onlyArtifacts);
                    if (!artifactFromFolder) {
                        throw new Error(`cannot find artifact "${contractName}" from folder ${this.db.onlyArtifacts}`);
                    }
                    return artifactFromFolder;
                }
                let artifact = await utils_1.getArtifactFromFolder(contractName, this.env.config.paths.artifacts);
                if (artifact) {
                    return artifact;
                }
                const importPaths = this.getImportPaths();
                for (const importPath of importPaths) {
                    artifact = await utils_1.getArtifactFromFolder(contractName, importPath);
                    if (artifact) {
                        return artifact;
                    }
                }
                if (!artifact) {
                    throw new Error(`cannot find artifact "${contractName}"`);
                }
                return artifact;
            },
            getExtendedArtifact: async (contractName) => {
                if (this.db.onlyArtifacts) {
                    const artifactFromFolder = await utils_1.getExtendedArtifactFromFolder(contractName, this.db.onlyArtifacts);
                    if (!artifactFromFolder) {
                        throw new Error(`cannot find artifact "${contractName}" from folder ${this.db.onlyArtifacts}`);
                    }
                    return artifactFromFolder;
                }
                let artifact = await utils_1.getExtendedArtifactFromFolder(contractName, this.env.config.paths.artifacts);
                if (artifact) {
                    return artifact;
                }
                const importPaths = this.getImportPaths();
                for (const importPath of importPaths) {
                    artifact = await utils_1.getExtendedArtifactFromFolder(contractName, importPath);
                    if (artifact) {
                        return artifact;
                    }
                }
                if (!artifact) {
                    throw new Error(`cannot find artifact "${contractName}"`);
                }
                return artifact;
            },
            run: (tags, options = {
                resetMemory: true,
                writeDeploymentsToFiles: false,
                deletePreviousDeployments: false,
            }) => {
                return this.runDeploy(tags, {
                    resetMemory: options.resetMemory === undefined ? true : options.resetMemory,
                    deletePreviousDeployments: options.deletePreviousDeployments === undefined
                        ? false
                        : options.deletePreviousDeployments,
                    writeDeploymentsToFiles: options.writeDeploymentsToFiles === undefined
                        ? false
                        : options.writeDeploymentsToFiles,
                    export: options.export,
                    exportAll: options.exportAll,
                    log: false,
                    savePendingTx: false,
                });
            },
            fixture: async (tags, options) => {
                await this.setup();
                options = Object.assign({ fallbackToGlobal: true }, options);
                if (typeof tags === 'string') {
                    tags = [tags];
                }
                const globalKey = '::global';
                const globalFixture = this.db.pastFixtures[globalKey];
                let fixtureKey = globalKey;
                if (tags !== undefined) {
                    fixtureKey = '::' + tags.join('.');
                }
                if (this.db.pastFixtures[fixtureKey]) {
                    const pastFixture = this.db.pastFixtures[fixtureKey];
                    const success = await this.revertSnapshot(pastFixture);
                    if (success) {
                        return this.db.deployments;
                    }
                    else {
                        delete this.db.pastFixtures[fixtureKey];
                    }
                }
                if (globalFixture && options.fallbackToGlobal) {
                    const success = await this.revertSnapshot(globalFixture);
                    if (success) {
                        return this.db.deployments;
                    }
                    else {
                        delete this.db.pastFixtures[globalKey];
                    }
                }
                await this.runDeploy(tags, {
                    resetMemory: true,
                    writeDeploymentsToFiles: false,
                    deletePreviousDeployments: false,
                    log: false,
                    savePendingTx: false,
                });
                await this.saveSnapshot(fixtureKey);
                return this.db.deployments;
            },
            createFixture: (func) => {
                const baseId = '' + ++this.db.fixtureCounter + '::';
                return async (options) => {
                    let id = baseId;
                    if (options !== undefined) {
                        id = id + JSON.stringify(options);
                    }
                    const saved = this.db.pastFixtures[id];
                    if (saved) {
                        const success = await this.revertSnapshot(saved);
                        if (success) {
                            return saved.data;
                        }
                    }
                    const data = await func(this.env, options);
                    await this.saveSnapshot(id, data);
                    return data;
                };
            },
            log: (...args) => {
                if (this.db.logEnabled) {
                    console.log(...args);
                }
            },
        };
        const print = (msg) => {
            if (this.db.logEnabled) {
                process.stdout.write(msg);
            }
        };
        log('adding helpers');
        this.deploymentsExtension = helpers_1.addHelpers(env, partialExtension, partialExtension.getArtifact, async (name, deployment, artifactName) => {
            if (artifactName &&
                this.db.writeDeploymentsToFiles &&
                this.env.network.saveDeployments) {
                // toSave (see deployments.save function)
                const extendedArtifact = await this.env.deployments.getExtendedArtifact(artifactName);
                deployment = Object.assign(Object.assign({}, deployment), extendedArtifact);
            }
            await this.env.deployments.save(name, deployment);
        }, () => {
            return (this.db.writeDeploymentsToFiles && this.env.network.saveDeployments);
        }, this.onPendingTx.bind(this), async () => {
            // TODO extraGasPrice ?
            if (this.db.gasPrice) {
                return bignumber_1.BigNumber.from(this.db.gasPrice);
            }
            else {
                return undefined;
            }
        }, partialExtension.log, print);
    }
    runAsNode(enabled) {
        this.db.runAsNode = enabled;
    }
    async dealWithPendingTransactions() {
        let pendingTxs = {};
        const pendingTxPath = path_1.default.join(this.deploymentsPath, this.deploymentFolder(), '.pendingTransactions');
        try {
            pendingTxs = JSON.parse(fs_extra_1.default.readFileSync(pendingTxPath).toString());
        }
        catch (e) { }
        const txHashes = Object.keys(pendingTxs);
        for (const txHash of txHashes) {
            const txData = pendingTxs[txHash];
            if (txData.rawTx || txData.decoded) {
                let tx;
                if (txData.rawTx) {
                    tx = transactions_1.parse(txData.rawTx);
                }
                else {
                    tx = recode(txData.decoded);
                }
                if (this.db.gasPrice) {
                    if (tx.gasPrice.lt(this.db.gasPrice)) {
                        // TODO
                        console.log('TODO : resubmit tx with higher gas price');
                        console.log(tx);
                    }
                }
                // alternative add options to deploy task to delete pending tx, combined with --gasprice this would work (except for timing edge case)
            }
            else {
                console.error(`no access to raw data for tx ${txHash}`);
            }
            if (this.db.logEnabled) {
                console.log(`waiting for tx ${txHash}` +
                    (txData.name ? ` for ${txData.name} Deployment` : ''));
            }
            const receipt = await helpers_1.waitForTx(this.env.network.provider, txHash, false);
            if (receipt.contractAddress && txData.name) {
                await this.saveDeployment(txData.name, Object.assign(Object.assign({}, txData.deployment), { receipt }));
            }
            delete pendingTxs[txHash];
            if (Object.keys(pendingTxs).length === 0) {
                fs_extra_1.default.removeSync(pendingTxPath);
            }
            else {
                fs_extra_1.default.writeFileSync(pendingTxPath, JSON.stringify(pendingTxs, null, '  '));
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async onPendingTx(tx, name, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deployment) {
        if (this.db.writeDeploymentsToFiles &&
            this.env.network.saveDeployments &&
            this.db.savePendingTx) {
            const deployFolderPath = path_1.default.join(this.deploymentsPath, this.deploymentFolder());
            // console.log("tx", tx.hash);
            const pendingTxPath = path_1.default.join(deployFolderPath, '.pendingTransactions');
            fs_extra_1.default.ensureDirSync(deployFolderPath);
            const rawTx = tx.raw;
            const decoded = tx.raw
                ? undefined
                : {
                    from: tx.from,
                    gasPrice: tx.gasPrice.toString(),
                    gasLimit: tx.gasLimit.toString(),
                    to: tx.to,
                    value: tx.value.toString(),
                    nonce: tx.nonce,
                    data: tx.data,
                    r: tx.r,
                    s: tx.s,
                    v: tx.v,
                    // creates: tx.creates, // TODO test
                    chainId: tx.chainId,
                };
            this.db.pendingTransactions[tx.hash] = name
                ? { name, deployment, rawTx, decoded }
                : { rawTx, decoded };
            fs_extra_1.default.writeFileSync(pendingTxPath, JSON.stringify(this.db.pendingTransactions, null, '  '));
            // await new Promise(r => setTimeout(r, 20000));
            const wait = tx.wait.bind(tx);
            tx.wait = async () => {
                const receipt = await wait();
                // console.log("checking pending tx...");
                delete this.db.pendingTransactions[tx.hash];
                if (Object.keys(this.db.pendingTransactions).length === 0) {
                    fs_extra_1.default.removeSync(pendingTxPath);
                }
                else {
                    fs_extra_1.default.writeFileSync(pendingTxPath, JSON.stringify(this.db.pendingTransactions, null, '  '));
                }
                return receipt;
            };
        }
        return tx;
    }
    async getNamedAccounts() {
        await this.setupAccounts();
        return this.db.namedAccounts;
    }
    async getUnnamedAccounts() {
        await this.setupAccounts();
        return this.db.unnamedAccounts;
    }
    async loadDeployments(chainIdExpected = true) {
        let chainId;
        if (chainIdExpected) {
            chainId = await utils_1.getChainId(this.env);
        }
        let migrations = {};
        try {
            log('loading migrations');
            migrations = JSON.parse(fs_extra_1.default
                .readFileSync(path_1.default.join(this.deploymentsPath, this.deploymentFolder(), '.migrations.json'))
                .toString());
        }
        catch (e) { }
        this.db.migrations = migrations;
        // console.log({ migrations: this.db.migrations });
        utils_1.addDeployments(this.db, this.deploymentsPath, this.deploymentFolder(), chainId);
        const networkName = this.env.network.name;
        const extraDeploymentPaths = this.env.config.external &&
            this.env.config.external.deployments &&
            this.env.config.external.deployments[networkName];
        if (extraDeploymentPaths) {
            for (const deploymentFolderPath of extraDeploymentPaths) {
                utils_1.addDeployments(this.db, deploymentFolderPath, '', undefined, chainId);
            }
        }
        this.db.deploymentsLoaded = true;
        return this.db.deployments;
    }
    async deletePreviousDeployments(folderPath) {
        folderPath = folderPath || this.deploymentFolder();
        utils_1.deleteDeployments(this.deploymentsPath, folderPath);
    }
    getSolcInputPath() {
        return path_1.default.join(this.deploymentsPath, this.deploymentFolder(), 'solcInputs');
    }
    async saveDeployment(name, deployment) {
        var _a, _b;
        if (typeof deployment.address === undefined &&
            !((_a = deployment.receipt) === null || _a === void 0 ? void 0 : _a.contractAddress)) {
            throw new Error('deployment need a receipt with contractAddress or an address');
        }
        if (typeof deployment.abi === undefined) {
            throw new Error('deployment need an ABI');
        }
        const chainId = await utils_1.getChainId(this.env);
        const toSave = this.db.writeDeploymentsToFiles && this.env.network.saveDeployments;
        const filepath = path_1.default.join(this.deploymentsPath, this.deploymentFolder(), name + '.json');
        // handle ethers receipt :
        const receipt = deployment.receipt;
        const actualReceipt = receipt
            ? {
                to: receipt.to,
                from: receipt.from,
                contractAddress: receipt.contractAddress,
                transactionIndex: receipt.transactionIndex,
                gasUsed: receipt.gasUsed && receipt.gasUsed._isBigNumber
                    ? receipt.gasUsed.toString()
                    : receipt.gasUsed,
                logsBloom: receipt.logsBloom,
                blockHash: receipt.blockHash,
                transactionHash: receipt.transactionHash,
                logs: receipt.logs,
                events: receipt.events,
                blockNumber: receipt.blockNumber,
                cumulativeGasUsed: receipt.cumulativeGasUsed &&
                    receipt.cumulativeGasUsed._isBigNumber
                    ? receipt.cumulativeGasUsed.toString()
                    : receipt.cumulativeGasUsed,
                status: receipt.status,
                byzantium: receipt.byzantium,
            }
            : undefined;
        // from : https://stackoverflow.com/a/14810722/1663971
        function objectMap(object, mapFn) {
            return Object.keys(object).reduce(function (result, key) {
                result[key] = mapFn(object[key]);
                return result;
            }, {});
        }
        // TODO can cause infinite loop
        function transform(v) {
            if (v._isBigNumber) {
                return v.toString();
            }
            if (Array.isArray(v)) {
                return v.map(transform);
            }
            if (typeof v === 'object') {
                return objectMap(v, transform);
            }
            return v;
        }
        const actualArgs = (_b = deployment.args) === null || _b === void 0 ? void 0 : _b.map(transform);
        const obj = JSON.parse(JSON.stringify({
            address: deployment.address || (actualReceipt === null || actualReceipt === void 0 ? void 0 : actualReceipt.contractAddress),
            abi: deployment.abi,
            transactionHash: deployment.transactionHash || (actualReceipt === null || actualReceipt === void 0 ? void 0 : actualReceipt.transactionHash),
            receipt: actualReceipt,
            args: actualArgs,
            linkedData: deployment.linkedData,
            solcInputHash: deployment.solcInputHash,
            metadata: deployment.metadata,
            bytecode: deployment.bytecode,
            deployedBytecode: deployment.deployedBytecode,
            libraries: deployment.libraries,
            facets: deployment.facets,
            diamondCut: deployment.diamondCut,
            execute: deployment.execute,
            history: deployment.history,
            devdoc: deployment.devdoc,
            userdoc: deployment.userdoc,
            storageLayout: deployment.storageLayout,
            methodIdentifiers: deployment.methodIdentifiers,
            gasEstimates: deployment.gasEstimates,
        }));
        this.db.deployments[name] = obj;
        if (obj.address === undefined && obj.transactionHash !== undefined) {
            let receiptFetched;
            try {
                receiptFetched = await helpers_1.waitForTx(this.env.network.provider, obj.transactionHash, true);
                // TODO add receipt ?
                obj.address = receiptFetched.contractAddress;
                if (!obj.address) {
                    throw new Error('no contractAddress in receipt');
                }
            }
            catch (e) {
                console.error(e);
                if (toSave) {
                    console.log('deleting ' + filepath);
                    fs_extra_1.default.unlinkSync(filepath);
                }
                delete this.db.deployments[name];
                return false; // TODO throw error ?
            }
        }
        this.db.deployments[name] = obj;
        // console.log({chainId, typeOfChainId: typeof chainId});
        if (toSave) {
            // console.log("writing " + filepath); // TODO remove
            try {
                fs_extra_1.default.mkdirSync(this.deploymentsPath);
            }
            catch (e) { }
            const deployFolderpath = path_1.default.join(this.deploymentsPath, this.deploymentFolder());
            try {
                fs_extra_1.default.mkdirSync(deployFolderpath);
            }
            catch (e) { }
            const chainIdFilepath = path_1.default.join(deployFolderpath, '.chainId');
            if (!fs_extra_1.default.existsSync(chainIdFilepath)) {
                fs_extra_1.default.writeFileSync(chainIdFilepath, chainId);
            }
            fs_extra_1.default.writeFileSync(filepath, JSON.stringify(obj, null, '  '));
            if (deployment.solcInputHash) {
                const solcInputsFolderpath = path_1.default.join(this.deploymentsPath, this.deploymentFolder(), 'solcInputs');
                const solcInputFilepath = path_1.default.join(solcInputsFolderpath, deployment.solcInputHash + '.json');
                if (!fs_extra_1.default.existsSync(solcInputFilepath)) {
                    try {
                        fs_extra_1.default.mkdirSync(solcInputsFolderpath);
                    }
                    catch (e) { }
                    fs_extra_1.default.writeFileSync(solcInputFilepath, deployment.solcInput);
                }
            }
        }
        // this.spreadEvents();
        return true;
    }
    async runDeploy(tags, options = {
        log: false,
        resetMemory: true,
        deletePreviousDeployments: false,
        writeDeploymentsToFiles: true,
        savePendingTx: false,
    }) {
        var _a;
        log('runDeploy');
        if (options.deletePreviousDeployments) {
            log('deleting previous deployments');
            this.db.deployments = {};
            this.db.migrations = {};
            await this.deletePreviousDeployments();
        }
        await this.loadDeployments();
        this.db.writeDeploymentsToFiles = options.writeDeploymentsToFiles;
        this.db.savePendingTx = options.savePendingTx;
        this.db.logEnabled = options.log;
        this.db.gasPrice = options.gasPrice;
        if (options.resetMemory) {
            log('reseting memory');
            this.db.deployments = {};
            this.db.migrations = {};
        }
        if (!options.deletePreviousDeployments && options.savePendingTx) {
            await this.dealWithPendingTransactions(); // TODO deal with reset ?
        }
        if ((_a = this.env.config.external) === null || _a === void 0 ? void 0 : _a.contracts) {
            for (const externalContracts of this.env.config.external.contracts) {
                if (externalContracts.deploy) {
                    this.db.onlyArtifacts = externalContracts.artifacts;
                    try {
                        await this.executeDeployScripts(externalContracts.deploy);
                    }
                    finally {
                        this.db.onlyArtifacts = undefined;
                    }
                }
            }
        }
        if (tags !== undefined && typeof tags === 'string') {
            tags = [tags];
        }
        const deployPath = this.env.config.paths.deploy;
        await this.executeDeployScripts(deployPath, tags);
        await this.export(options);
        return this.db.deployments;
    }
    async executeDeployScripts(deployScriptsPath, tags) {
        const wasWrittingToFiles = this.db.writeDeploymentsToFiles;
        let filesStats;
        try {
            filesStats = utils_1.traverse(deployScriptsPath);
        }
        catch (e) {
            return;
        }
        filesStats = filesStats.filter((v) => !v.directory);
        let fileNames = filesStats.map((a) => a.relativePath);
        fileNames = fileNames.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
        log('deploy script folder parsed');
        const funcByFilePath = {};
        const scriptPathBags = {};
        const scriptFilePaths = [];
        for (const filename of fileNames) {
            const scriptFilePath = path_1.default.join(deployScriptsPath, filename);
            let deployFunc;
            // console.log("fetching " + scriptFilePath);
            try {
                delete require.cache[path_1.default.resolve(scriptFilePath)]; // ensure we reload it every time, so changes are taken in consideration
                deployFunc = require(scriptFilePath);
                if (deployFunc.default) {
                    deployFunc = deployFunc.default;
                }
                funcByFilePath[scriptFilePath] = deployFunc;
            }
            catch (e) {
                // console.error("require failed", e);
                throw new Error('ERROR processing skip func of ' +
                    scriptFilePath +
                    ':\n' +
                    (e.stack || e));
            }
            // console.log("get tags if any for " + scriptFilePath);
            let scriptTags = deployFunc.tags;
            if (scriptTags !== undefined) {
                if (typeof scriptTags === 'string') {
                    scriptTags = [scriptTags];
                }
                for (const tag of scriptTags) {
                    if (tag.indexOf(',') >= 0) {
                        throw new Error('Tag cannot contains commas');
                    }
                    const bag = scriptPathBags[tag] || [];
                    scriptPathBags[tag] = bag;
                    bag.push(scriptFilePath);
                }
            }
            // console.log("tags found " + scriptFilePath, scriptTags);
            if (tags !== undefined) {
                let found = false;
                if (scriptTags !== undefined) {
                    for (const tagToFind of tags) {
                        for (const tag of scriptTags) {
                            if (tag === tagToFind) {
                                scriptFilePaths.push(scriptFilePath);
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            break;
                        }
                    }
                }
            }
            else {
                scriptFilePaths.push(scriptFilePath);
            }
        }
        log('tag collected');
        // console.log({ scriptFilePaths });
        const scriptsRegisteredToRun = {};
        const scriptsToRun = [];
        const scriptsToRunAtTheEnd = [];
        function recurseDependencies(scriptFilePath) {
            if (scriptsRegisteredToRun[scriptFilePath]) {
                return;
            }
            const deployFunc = funcByFilePath[scriptFilePath];
            if (deployFunc.dependencies) {
                for (const dependency of deployFunc.dependencies) {
                    const scriptFilePathsToAdd = scriptPathBags[dependency];
                    if (scriptFilePathsToAdd) {
                        for (const scriptFilenameToAdd of scriptFilePathsToAdd) {
                            recurseDependencies(scriptFilenameToAdd);
                        }
                    }
                }
            }
            if (!scriptsRegisteredToRun[scriptFilePath]) {
                if (deployFunc.runAtTheEnd) {
                    scriptsToRunAtTheEnd.push({
                        filePath: scriptFilePath,
                        func: deployFunc,
                    });
                }
                else {
                    scriptsToRun.push({
                        filePath: scriptFilePath,
                        func: deployFunc,
                    });
                }
                scriptsRegisteredToRun[scriptFilePath] = true;
            }
        }
        for (const scriptFilePath of scriptFilePaths) {
            recurseDependencies(scriptFilePath);
        }
        log('dependencies collected');
        try {
            for (const deployScript of scriptsToRun.concat(scriptsToRunAtTheEnd)) {
                const filename = path_1.default.basename(deployScript.filePath);
                if (deployScript.func.id && this.db.migrations[deployScript.func.id]) {
                    log(`skipping ${filename} as migrations already executed and complete`);
                    continue;
                }
                let skip = false;
                if (deployScript.func.skip) {
                    log(`should we skip  ${deployScript.filePath} ?`);
                    try {
                        skip = await deployScript.func.skip(this.env);
                    }
                    catch (e) {
                        // console.error("skip failed", e);
                        throw new Error('ERROR processing skip func of ' +
                            deployScript.filePath +
                            ':\n' +
                            (e.stack || e));
                    }
                    log(`checking skip for ${deployScript.filePath} complete`);
                }
                if (!skip) {
                    log(`executing  ${deployScript.filePath}`);
                    let result;
                    try {
                        result = await deployScript.func(this.env);
                    }
                    catch (e) {
                        // console.error("execution failed", e);
                        throw new Error('ERROR processing ' +
                            deployScript.filePath +
                            ':\n' +
                            (e.stack || e));
                    }
                    log(`executing ${deployScript.filePath} complete`);
                    if (result && typeof result === 'boolean') {
                        if (!deployScript.func.id) {
                            throw new Error(`${deployScript.filePath} return true to not be eecuted again, but does not provide an id. the script function need to have the field "id" to be set`);
                        }
                        this.db.migrations[deployScript.func.id] = Math.floor(Date.now() / 1000);
                        const deploymentFolderPath = this.deploymentFolder();
                        // TODO refactor to extract this whole path and folder existence stuff
                        const toSave = this.db.writeDeploymentsToFiles &&
                            this.env.network.saveDeployments;
                        if (toSave) {
                            try {
                                fs_extra_1.default.mkdirSync(this.deploymentsPath);
                            }
                            catch (e) { }
                            try {
                                fs_extra_1.default.mkdirSync(path_1.default.join(this.deploymentsPath, deploymentFolderPath));
                            }
                            catch (e) { }
                            fs_extra_1.default.writeFileSync(path_1.default.join(this.deploymentsPath, deploymentFolderPath, '.migrations.json'), JSON.stringify(this.db.migrations, null, '  '));
                        }
                    }
                }
            }
        }
        catch (e) {
            this.db.writeDeploymentsToFiles = wasWrittingToFiles;
            throw e;
        }
        this.db.writeDeploymentsToFiles = wasWrittingToFiles;
        log('deploy scripts complete');
    }
    async export(options) {
        let chainId;
        try {
            chainId = fs_extra_1.default
                .readFileSync(path_1.default.join(this.deploymentsPath, this.deploymentFolder(), '.chainId'))
                .toString();
        }
        catch (e) { }
        if (!chainId) {
            chainId = await utils_1.getChainId(this.env);
        }
        if (options.exportAll !== undefined) {
            log('load all deployments for export-all');
            const all = utils_1.loadAllDeployments(this.env, this.deploymentsPath, true, this.env.config.external && this.env.config.external.deployments);
            const currentNetworkDeployments = {};
            const currentDeployments = this.db.deployments;
            for (const contractName of Object.keys(currentDeployments)) {
                const deployment = currentDeployments[contractName];
                currentNetworkDeployments[contractName] = {
                    address: deployment.address,
                    abi: deployment.abi,
                    linkedData: deployment.linkedData,
                };
            }
            if (all[chainId] === undefined) {
                all[chainId] = {};
            }
            else {
                // Ensure no past deployments are recorded
                delete all[chainId][this.env.network.name];
            }
            all[chainId][this.env.network.name] = {
                name: this.env.network.name,
                chainId,
                contracts: currentNetworkDeployments,
            };
            fs_extra_1.default.writeFileSync(options.exportAll, JSON.stringify(all, null, '  ')); // TODO remove bytecode ?
            log('export-all complete');
        }
        if (options.export !== undefined) {
            log('single export...');
            const currentNetworkDeployments = {};
            if (chainId !== undefined) {
                const currentDeployments = this.db.deployments;
                for (const contractName of Object.keys(currentDeployments)) {
                    const deployment = currentDeployments[contractName];
                    currentNetworkDeployments[contractName] = {
                        address: deployment.address,
                        abi: deployment.abi,
                        linkedData: deployment.linkedData,
                    };
                }
            }
            else {
                throw new Error('chainId is undefined');
            }
            const singleExport = {
                name: this.env.network.name,
                chainId,
                contracts: currentNetworkDeployments,
            };
            fs_extra_1.default.writeFileSync(options.export, JSON.stringify(singleExport, null, '  ')); // TODO remove bytecode ?
            log('single export complete');
        }
    }
    getImportPaths() {
        const importPaths = [this.env.config.paths.imports];
        if (this.env.config.external && this.env.config.external.contracts) {
            for (const externalContracts of this.env.config.external.contracts) {
                importPaths.push(externalContracts.artifacts);
            }
        }
        return importPaths;
    }
    async setup() {
        if (!this.db.deploymentsLoaded) {
            if (process.env.HARDHAT_DEPLOY_FIXTURE) {
                if (process.env.HARDHAT_COMPILE) {
                    // console.log("compiling...");
                    await this.env.run('compile');
                }
                this.db.deploymentsLoaded = true;
                // console.log("running global fixture....");
                await this.env.deployments.fixture();
            }
            else {
                if (process.env.HARDHAT_COMPILE) {
                    // console.log("compiling...");
                    await this.env.run('compile');
                }
                await this.loadDeployments();
            }
        }
    }
    async saveSnapshot(key, data) {
        const latestBlock = await this.env.network.provider.send('eth_getBlockByNumber', ['latest', false]);
        const snapshot = await this.env.network.provider.send('evm_snapshot', []);
        this.db.pastFixtures[key] = {
            index: ++this.db.snapshotCounter,
            snapshot,
            data,
            blockHash: latestBlock.hash,
            deployments: Object.assign({}, this.db.deployments),
        };
    }
    async revertSnapshot(saved) {
        const snapshotToRevertIndex = saved.index;
        for (const fixtureKey of Object.keys(this.db.pastFixtures)) {
            const snapshotIndex = this.db.pastFixtures[fixtureKey].index;
            if (snapshotIndex > snapshotToRevertIndex) {
                delete this.db.pastFixtures[fixtureKey];
            }
        }
        const success = await this.env.network.provider.send('evm_revert', [
            saved.snapshot,
        ]);
        if (success) {
            const blockRetrieved = await this.env.network.provider.send('eth_getBlockByHash', [saved.blockHash, false]);
            if (blockRetrieved) {
                saved.snapshot = await this.env.network.provider.send('evm_snapshot', []); // it is necessary to re-snapshot it
                this.db.deployments = Object.assign({}, saved.deployments);
            }
            else {
                // TODO or should we throw ?
                return false;
            }
        }
        return success;
    }
    deploymentFolder() {
        if (this.db.runAsNode) {
            return 'localhost';
        }
        else {
            return this.env.network.name;
        }
    }
    async setupAccounts() {
        if (!this.db.accountsLoaded) {
            const chainId = await utils_1.getChainId(this.env);
            const accounts = await this.env.network.provider.send('eth_accounts');
            const { namedAccounts, unnamedAccounts } = utils_1.processNamedAccounts(this.env, accounts, chainId);
            this.db.namedAccounts = namedAccounts;
            this.db.unnamedAccounts = unnamedAccounts;
            this.db.accountsLoaded = true;
        }
        return {
            namedAccounts: this.db.namedAccounts,
            unnamedAccounts: this.db.unnamedAccounts,
        };
    }
}
exports.DeploymentsManager = DeploymentsManager;
//# sourceMappingURL=DeploymentsManager.js.map