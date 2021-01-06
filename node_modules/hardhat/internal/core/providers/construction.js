"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyProviderWrappers = exports.createProvider = exports.isHDAccountsConfig = void 0;
const constants_1 = require("../../constants");
const disk_cache_1 = require("../../hardhat-network/provider/utils/disk-cache");
const date_1 = require("../../util/date");
const util_1 = require("./util");
function isHDAccountsConfig(accounts) {
    return accounts !== undefined && Object.keys(accounts).includes("mnemonic");
}
exports.isHDAccountsConfig = isHDAccountsConfig;
function isResolvedHttpNetworkConfig(netConfig) {
    return "url" in netConfig;
}
// This function is let's you import a provider dynamically in a pretty
// type-safe way.
// `ProviderNameT` and `name` must be the same literal string. TS enforces it.
// `ModuleT` and `filePath` must also be the same, but this is not enforced.
function importProvider(filePath, name) {
    const mod = require(filePath);
    return mod[name];
}
function createProvider(networkName, networkConfig, paths, artifacts, experimentalHardhatNetworkMessageTraceHooks = []) {
    var _a, _b, _c, _d;
    let eip1193Provider;
    if (networkName === constants_1.HARDHAT_NETWORK_NAME) {
        const hardhatNetConfig = networkConfig;
        const HardhatNetworkProvider = importProvider("../../hardhat-network/provider/provider", "HardhatNetworkProvider");
        let forkConfig;
        if (((_a = hardhatNetConfig.forking) === null || _a === void 0 ? void 0 : _a.enabled) === true &&
            ((_b = hardhatNetConfig.forking) === null || _b === void 0 ? void 0 : _b.url) !== undefined) {
            forkConfig = {
                jsonRpcUrl: (_c = hardhatNetConfig.forking) === null || _c === void 0 ? void 0 : _c.url,
                blockNumber: (_d = hardhatNetConfig.forking) === null || _d === void 0 ? void 0 : _d.blockNumber,
            };
        }
        const accounts = util_1.normalizeHardhatNetworkAccountsConfig(hardhatNetConfig.accounts);
        eip1193Provider = new HardhatNetworkProvider(hardhatNetConfig.hardfork, constants_1.HARDHAT_NETWORK_NAME, hardhatNetConfig.chainId, hardhatNetConfig.chainId, hardhatNetConfig.blockGasLimit, hardhatNetConfig.throwOnTransactionFailures, hardhatNetConfig.throwOnCallFailures, accounts, artifacts, hardhatNetConfig.loggingEnabled, hardhatNetConfig.allowUnlimitedContractSize, hardhatNetConfig.initialDate !== undefined
            ? date_1.parseDateString(hardhatNetConfig.initialDate)
            : undefined, experimentalHardhatNetworkMessageTraceHooks, forkConfig, paths !== undefined ? disk_cache_1.getForkCacheDirPath(paths) : undefined);
    }
    else {
        const HttpProvider = importProvider("./http", "HttpProvider");
        const httpNetConfig = networkConfig;
        eip1193Provider = new HttpProvider(httpNetConfig.url, networkName, httpNetConfig.httpHeaders, httpNetConfig.timeout);
    }
    const wrappedProvider = applyProviderWrappers(eip1193Provider, networkConfig);
    const BackwardsCompatibilityProviderAdapter = importProvider("./backwards-compatibility", "BackwardsCompatibilityProviderAdapter");
    return new BackwardsCompatibilityProviderAdapter(wrappedProvider);
}
exports.createProvider = createProvider;
function applyProviderWrappers(provider, netConfig) {
    // These dependencies are lazy-loaded because they are really big.
    const LocalAccountsProvider = importProvider("./accounts", "LocalAccountsProvider");
    const HDWalletProvider = importProvider("./accounts", "HDWalletProvider");
    const FixedSenderProvider = importProvider("./accounts", "FixedSenderProvider");
    const AutomaticSenderProvider = importProvider("./accounts", "AutomaticSenderProvider");
    const AutomaticGasProvider = importProvider("./gas-providers", "AutomaticGasProvider");
    const FixedGasProvider = importProvider("./gas-providers", "FixedGasProvider");
    const AutomaticGasPriceProvider = importProvider("./gas-providers", "AutomaticGasPriceProvider");
    const FixedGasPriceProvider = importProvider("./gas-providers", "FixedGasPriceProvider");
    const GanacheGasMultiplierProvider = importProvider("./gas-providers", "GanacheGasMultiplierProvider");
    const ChainIdValidatorProvider = importProvider("./chainId", "ChainIdValidatorProvider");
    if (isResolvedHttpNetworkConfig(netConfig)) {
        const accounts = netConfig.accounts;
        if (Array.isArray(accounts)) {
            provider = new LocalAccountsProvider(provider, accounts);
        }
        else if (isHDAccountsConfig(accounts)) {
            provider = new HDWalletProvider(provider, accounts.mnemonic, accounts.path, accounts.initialIndex, accounts.count);
        }
        // TODO: Add some extension mechanism for account plugins here
        if (typeof netConfig.gas !== "number") {
            provider = new GanacheGasMultiplierProvider(provider);
        }
    }
    if (netConfig.from !== undefined) {
        provider = new FixedSenderProvider(provider, netConfig.from);
    }
    else {
        provider = new AutomaticSenderProvider(provider);
    }
    if (netConfig.gas === undefined || netConfig.gas === "auto") {
        provider = new AutomaticGasProvider(provider, netConfig.gasMultiplier);
    }
    else {
        provider = new FixedGasProvider(provider, netConfig.gas);
    }
    if (netConfig.gasPrice === undefined || netConfig.gasPrice === "auto") {
        provider = new AutomaticGasPriceProvider(provider);
    }
    else {
        provider = new FixedGasPriceProvider(provider, netConfig.gasPrice);
    }
    if (isResolvedHttpNetworkConfig(netConfig) &&
        netConfig.chainId !== undefined) {
        provider = new ChainIdValidatorProvider(provider, netConfig.chainId);
    }
    return provider;
}
exports.applyProviderWrappers = applyProviderWrappers;
//# sourceMappingURL=construction.js.map