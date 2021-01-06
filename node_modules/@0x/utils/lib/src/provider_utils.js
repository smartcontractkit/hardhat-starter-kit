"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
exports.providerUtils = {
    /**
     * Starts the Web3ProviderEngine without excess block polling
     * @param providerEngine The Web3ProviderEngine
     */
    startProviderEngine(providerEngine) {
        if (providerEngine.start === undefined) {
            throw new Error(`Invalid Web3ProviderEngine`);
        }
        // HACK: When calling start() Web3ProviderEngine starts a block polling service
        // this continuously pulls data from the network and can result in high data usage
        // for long running services. If used in a front end application this can cause
        // a high amount of load on a node (one request per user per block).
        providerEngine._ready.go();
        providerEngine._running = true;
    },
    /**
     * Standardize the supported provider types into our internal provider interface
     * or throw if unsupported provider supplied.
     * @param supportedProvider Potentially supported provider instance
     * @return Provider that conforms of our internal provider interface
     */
    standardizeOrThrow(supportedProvider) {
        if (supportedProvider === undefined) {
            throw new Error(`supportedProvider cannot be 'undefined'`);
        }
        const provider = {
            isStandardizedProvider: true,
            isMetaMask: supportedProvider.isMetaMask,
            isParity: supportedProvider.isParity,
            stop: supportedProvider.stop,
            enable: supportedProvider.enable,
            sendAsync: _.noop.bind(_),
        };
        if (provider.enable) {
            // Need to bind, metamask can lose reference to function without binding as of 7.7.0
            provider.enable.bind(supportedProvider);
        }
        // Case 1: We've already converted to our ZeroExProvider so noop.
        if (supportedProvider.isStandardizedProvider) {
            // tslint:disable-next-line:no-unnecessary-type-assertion
            return supportedProvider;
            // Case 2: It's a compliant EIP 1193 Provider
            // tslint:disable-next-line:no-unnecessary-type-assertion
        }
        else if (supportedProvider.isEIP1193) {
            provider.sendAsync = (payload, callback) => {
                const method = payload.method;
                const params = payload.params;
                supportedProvider
                    .send(method, params)
                    .then((result) => {
                    callback(null, result);
                })
                    .catch((err) => {
                    callback(err);
                });
            };
            return provider;
            // Case 3: The provider has a `sendAsync` method, so we use it.
        }
        else if (supportedProvider.sendAsync !== undefined) {
            provider.sendAsync = supportedProvider.sendAsync.bind(supportedProvider);
            return provider;
            // Case 4: The provider does not have a `sendAsync` method but does have a `send` method
        }
        else if (supportedProvider.send !== undefined) {
            // HACK(fabio): Detect if the `send` method has the old interface `send(payload, cb)` such
            // as in versions < Web3.js@1.0.0-beta.37. If so, do a simple re-mapping
            if (_.includes(supportedProvider.send.toString().replace(' ', ''), 'function(payload,callback)')) {
                provider.sendAsync = supportedProvider.send.bind(supportedProvider);
                return provider;
            }
            else {
                // If doesn't have old interface, we assume it has new interface `send(method, payload)`
                // such as in versions > Web3.js@1.0.0-beta.38 and convert it to `sendAsync`
                provider.sendAsync = (payload, callback) => {
                    const method = payload.method;
                    const params = payload.params;
                    supportedProvider
                        .send(method, params)
                        .then((result) => {
                        callback(null, result);
                    })
                        .catch((err) => {
                        callback(err);
                    });
                };
                return provider;
            }
        }
        throw new Error(`Unsupported provider found. Please make sure it conforms to one of the supported providers. See 'Provider' type in 'ethereum-types' package.`);
    },
    /**
     * Retrieve the chain ID from a supported provider.
     * @param supportedProvider A supported provider instance.
     * @return A promise that resolves to the chain ID of the network the provider
     * is connected to.
     */
    getChainIdAsync(supportedProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = exports.providerUtils.standardizeOrThrow(supportedProvider);
            // tslint:disable-next-line:custom-no-magic-numbers
            const RPC_ID_MAX = Math.pow(2, 64);
            return new Promise((accept, reject) => {
                provider.sendAsync({
                    jsonrpc: '2.0',
                    id: _.random(1, RPC_ID_MAX),
                    method: 'eth_chainId',
                    params: [],
                }, (err, result) => {
                    if (!_.isNil(err)) {
                        reject(err);
                    }
                    if (!result) {
                        throw new Error("Invalid 'eth_chainId' response");
                    }
                    accept(_.toNumber(result.result));
                });
            });
        });
    },
};
//# sourceMappingURL=provider_utils.js.map