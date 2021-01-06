"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatNetworkProvider = void 0;
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const events_1 = require("events");
const fs_extra_1 = __importDefault(require("fs-extra"));
const semver_1 = __importDefault(require("semver"));
const util_1 = __importDefault(require("util"));
const constants_1 = require("../../constants");
const solidity_errors_1 = require("../stack-traces/solidity-errors");
const solidityTracer_1 = require("../stack-traces/solidityTracer");
const await_semaphore_1 = require("../vendor/await-semaphore");
const errors_1 = require("./errors");
const eth_1 = require("./modules/eth");
const evm_1 = require("./modules/evm");
const hardhat_1 = require("./modules/hardhat");
const logger_1 = require("./modules/logger");
const net_1 = require("./modules/net");
const web3_1 = require("./modules/web3");
const node_1 = require("./node");
const log = debug_1.default("hardhat:core:hardhat-network:provider");
// Set of methods that are never logged
const PRIVATE_RPC_METHODS = new Set([
    "hardhat_getStackTraceFailuresCount",
    "hardhat_setLoggingEnabled",
]);
// tslint:disable only-hardhat-error
class HardhatNetworkProvider extends events_1.EventEmitter {
    constructor(_hardfork, _networkName, _chainId, _networkId, _blockGasLimit, _throwOnTransactionFailures, _throwOnCallFailures, _genesisAccounts = [], _artifacts, _loggingEnabled = false, _allowUnlimitedContractSize = false, _initialDate, _experimentalHardhatNetworkMessageTraceHooks = [], _forkConfig, _forkCachePath) {
        super();
        this._hardfork = _hardfork;
        this._networkName = _networkName;
        this._chainId = _chainId;
        this._networkId = _networkId;
        this._blockGasLimit = _blockGasLimit;
        this._throwOnTransactionFailures = _throwOnTransactionFailures;
        this._throwOnCallFailures = _throwOnCallFailures;
        this._genesisAccounts = _genesisAccounts;
        this._artifacts = _artifacts;
        this._loggingEnabled = _loggingEnabled;
        this._allowUnlimitedContractSize = _allowUnlimitedContractSize;
        this._initialDate = _initialDate;
        this._experimentalHardhatNetworkMessageTraceHooks = _experimentalHardhatNetworkMessageTraceHooks;
        this._forkConfig = _forkConfig;
        this._forkCachePath = _forkCachePath;
        this._mutex = new await_semaphore_1.Mutex();
        this._logger = new logger_1.ModulesLogger();
        this._methodCollapsedCount = 0;
        this._ethEventListener = (payload) => {
            const subscription = `0x${payload.filterId.toString(16)}`;
            const result = payload.result;
            this._emitLegacySubscriptionEvent(subscription, result);
            this._emitEip1193SubscriptionEvent(subscription, result);
        };
    }
    async request(args) {
        const release = await this._mutex.acquire();
        if (args.params !== undefined && !Array.isArray(args.params)) {
            throw new errors_1.InvalidInputError("Hardhat Network doesn't support JSON-RPC params sent as an object");
        }
        try {
            let result;
            if (this._loggingEnabled && !PRIVATE_RPC_METHODS.has(args.method)) {
                result = await this._sendWithLogging(args.method, args.params);
            }
            else {
                result = await this._send(args.method, args.params);
            }
            if (args.method === "hardhat_reset") {
                this.emit(constants_1.HARDHAT_NETWORK_RESET_EVENT);
            }
            return result;
        }
        finally {
            release();
        }
    }
    async _sendWithLogging(method, params = []) {
        this._logger.clearLogs();
        try {
            const result = await this._send(method, params);
            // We log after running the method, because we want to use different
            // colors depending on whether it failed or not
            // TODO: If an eth_call, eth_sendTransaction, or eth_sendRawTransaction
            //  fails without throwing, this will be displayed in green. It's unclear
            //  if this is correct. See Eth module's TODOs for more info.
            if (this._shouldCollapseMethod(method)) {
                this._logCollapsedMethod(method);
            }
            else {
                this._startCollapsingMethod(method);
                this._log(method, false, chalk_1.default.green);
            }
            const loggedSomething = this._logModuleMessages();
            if (loggedSomething) {
                this._stopCollapsingMethod();
                this._log("");
            }
            return result;
        }
        catch (err) {
            this._stopCollapsingMethod();
            if (err instanceof errors_1.MethodNotFoundError ||
                err instanceof errors_1.MethodNotSupportedError) {
                this._log(`${method} - Method not supported`, false, chalk_1.default.red);
                throw err;
            }
            this._log(method, false, chalk_1.default.red);
            const loggedSomething = this._logModuleMessages();
            if (loggedSomething) {
                this._log("");
            }
            if (err instanceof solidity_errors_1.SolidityError) {
                this._logError(err);
            }
            else if (err instanceof errors_1.HardhatNetworkProviderError) {
                this._log(err.message, true);
                const isEIP155Error = err instanceof errors_1.InvalidInputError && err.message.includes("EIP155");
                if (isEIP155Error) {
                    this._logMetaMaskWarning();
                }
            }
            else {
                this._logError(err, true);
                this._log("");
                this._log("If you think this is a bug in Hardhat, please report it here: https://hardhat.org/reportbug", true);
            }
            this._log("");
            throw err;
        }
    }
    _logCollapsedMethod(method) {
        this._methodCollapsedCount += 1;
        process.stdout.write(
        // tslint:disable-next-line:prefer-template
        ansi_escapes_1.default.cursorHide +
            ansi_escapes_1.default.cursorPrevLine +
            chalk_1.default.green(`${method} (${this._methodCollapsedCount})`) +
            "\n" +
            ansi_escapes_1.default.eraseEndLine +
            ansi_escapes_1.default.cursorShow);
    }
    _startCollapsingMethod(method) {
        this._methodBeingCollapsed = method;
        this._methodCollapsedCount = 1;
    }
    _stopCollapsingMethod() {
        this._methodBeingCollapsed = undefined;
        this._methodCollapsedCount = 0;
    }
    _shouldCollapseMethod(method) {
        return (method === this._methodBeingCollapsed &&
            !this._logger.hasLogs() &&
            this._methodCollapsedCount > 0);
    }
    async _send(method, params = []) {
        await this._init();
        if (method.startsWith("eth_")) {
            return this._ethModule.processRequest(method, params);
        }
        if (method.startsWith("net_")) {
            return this._netModule.processRequest(method, params);
        }
        if (method.startsWith("web3_")) {
            return this._web3Module.processRequest(method, params);
        }
        if (method.startsWith("evm_")) {
            return this._evmModule.processRequest(method, params);
        }
        if (method.startsWith("hardhat_")) {
            return this._hardhatModule.processRequest(method, params);
        }
        throw new errors_1.MethodNotFoundError(`Method ${method} not found`);
    }
    async _init() {
        if (this._node !== undefined) {
            return;
        }
        const commonConfig = {
            blockGasLimit: this._blockGasLimit,
            genesisAccounts: this._genesisAccounts,
            allowUnlimitedContractSize: this._allowUnlimitedContractSize,
            tracingConfig: await this._makeTracingConfig(),
        };
        let config = Object.assign({ hardfork: this._hardfork, networkName: this._networkName, chainId: this._chainId, networkId: this._networkId, initialDate: this._initialDate }, commonConfig);
        if (this._forkConfig !== undefined) {
            config = Object.assign({ forkConfig: this._forkConfig, forkCachePath: this._forkCachePath }, config);
        }
        const [common, node] = await node_1.HardhatNode.create(config);
        this._common = common;
        this._node = node;
        this._ethModule = new eth_1.EthModule(common, node, this._throwOnTransactionFailures, this._throwOnCallFailures, this._logger, this._experimentalHardhatNetworkMessageTraceHooks);
        this._netModule = new net_1.NetModule(common);
        this._web3Module = new web3_1.Web3Module();
        this._evmModule = new evm_1.EvmModule(node);
        this._hardhatModule = new hardhat_1.HardhatModule(node, this._reset.bind(this), (loggingEnabled) => {
            this._loggingEnabled = loggingEnabled;
            this._logger.enable(loggingEnabled);
        });
        this._logger.enable(this._loggingEnabled);
        this._forwardNodeEvents(node);
    }
    async _makeTracingConfig() {
        if (this._artifacts !== undefined) {
            const buildInfos = [];
            const buildInfoFiles = await this._artifacts.getBuildInfoPaths();
            try {
                for (const buildInfoFile of buildInfoFiles) {
                    const buildInfo = await fs_extra_1.default.readJson(buildInfoFile);
                    if (semver_1.default.gte(buildInfo.solcVersion, solidityTracer_1.FIRST_SOLC_VERSION_SUPPORTED)) {
                        buildInfos.push(buildInfo);
                    }
                }
                return {
                    buildInfos,
                };
            }
            catch (error) {
                console.warn(chalk_1.default.yellow("Stack traces engine could not be initialized. Run Hardhat with --verbose to learn more."));
                log("Solidity stack traces disabled: Failed to read solc's input and output files. Please report this to help us improve Hardhat.\n", error);
            }
        }
    }
    async _reset(forkConfig) {
        this._forkConfig = forkConfig;
        if (this._node !== undefined) {
            this._stopForwardingNodeEvents(this._node);
        }
        this._node = undefined;
        await this._init();
    }
    _forwardNodeEvents(node) {
        node.addListener("ethEvent", this._ethEventListener);
    }
    _stopForwardingNodeEvents(node) {
        node.removeListener("ethEvent", this._ethEventListener);
    }
    _emitLegacySubscriptionEvent(subscription, result) {
        this.emit("notifications", {
            subscription,
            result,
        });
    }
    _emitEip1193SubscriptionEvent(subscription, result) {
        const message = {
            type: "eth_subscription",
            data: {
                subscription,
                result,
            },
        };
        this.emit("message", message);
    }
    _logModuleMessages() {
        const logs = this._logger.getLogs();
        if (logs.length === 0) {
            return false;
        }
        for (const msg of logs) {
            this._log(msg, true);
        }
        return true;
    }
    _logError(err, logInRed = false) {
        this._log(util_1.default.inspect(err), true, logInRed ? chalk_1.default.red : undefined);
    }
    _log(msg, indent = false, color) {
        if (indent) {
            msg = msg
                .split("\n")
                .map((line) => `  ${line}`)
                .join("\n");
        }
        if (color !== undefined) {
            console.log(color(msg));
            return;
        }
        console.log(msg);
    }
    _logMetaMaskWarning() {
        const message = "If you are using MetaMask, you can learn how to fix this error here: https://hardhat.org/metamask-issue";
        this._log(message, true, chalk_1.default.yellow);
    }
}
exports.HardhatNetworkProvider = HardhatNetworkProvider;
//# sourceMappingURL=provider.js.map