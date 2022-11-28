"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequest = void 0;
const getRequestConfig_1 = require("./getRequestConfig");
const encryptSecrets_1 = require("./encryptSecrets");
const buildRequest = async (pathToRequestConfig) => {
    const config = (0, getRequestConfig_1.getRequestConfig)(pathToRequestConfig);
    const request = { source: config.source };
    if (config.secrets) {
        if (!config.DONPublicKey) {
            throw Error(`DONPublicKey is not correctly specified in ${pathToRequestConfig}`);
        }
        request.secrets =
            '0x' +
                (await (0, encryptSecrets_1.encrypt)(config.walletPrivateKey, config.DONPublicKey, JSON.stringify(config.secrets)));
    }
    if (config.args) {
        request.args = config.args;
    }
    return request;
};
exports.buildRequest = buildRequest;
