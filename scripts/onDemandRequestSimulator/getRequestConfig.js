"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestConfig = void 0;
var Location_;
(function (Location_) {
    Location_[Location_["Inline"] = 0] = "Inline";
})(Location_ || (Location_ = {}));
var CodeLanguage;
(function (CodeLanguage) {
    CodeLanguage[CodeLanguage["JavaScript"] = 0] = "JavaScript";
})(CodeLanguage || (CodeLanguage = {}));
const getRequestConfig = (configPath) => {
    const config = require(configPath);
    if (config.codeLocation !== Location_.Inline) {
        throw Error(`codeLocation is not correctly specified in ${configPath}`);
    }
    if (config.secretsLocation !== Location_.Inline) {
        throw Error(`secretsLocation is not correctly specified in ${configPath}`);
    }
    if (config.codeLanguage !== CodeLanguage.JavaScript) {
        throw Error(`codeLanguage is not correctly specified in ${configPath}`);
    }
    if (typeof config.source !== 'string') {
        throw Error(`source is not correctly specified in ${configPath}`);
    }
    if (config.numAllowedQueries) {
        if (typeof config.numAllowedQueries !== 'number' ||
            !Number.isInteger(config.numAllowedQueries)) {
            throw Error(`numAllowedQueries is not correctly specified in ${configPath}`);
        }
    }
    if (config.secrets) {
        if (typeof config.secrets !== 'object') {
            throw Error(`secrets object is not correctly specified in ${configPath}`);
        }
        if (typeof config.walletPrivateKey !== 'string') {
            throw Error(`walletPrivateKey is not correctly specified in ${configPath}`);
        }
        if (config.DONPublicKey && typeof config.DONPublicKey !== 'string') {
            throw Error(`DONPublicKey is not correctly specified in ${configPath}`);
        }
    }
    if (config.args) {
        if (!Array.isArray(config.args))
            throw Error(`args array is not correctly specified in ${configPath}`);
        for (const arg of config.args) {
            if (typeof arg !== 'string') {
                throw Error(`an element of the args array is not a string in ${configPath}`);
            }
        }
    }
    if (config.maxResponseBytes) {
        if (typeof config.maxResponseBytes !== 'number' ||
            !Number.isInteger(config.maxResponseBytes)) {
            throw Error(`maxResponseBytes is not correctly specified in ${configPath}`);
        }
    }
    if (config.expectedReturnType) {
        if (typeof config.expectedReturnType !== 'string') {
            throw Error(`expectedReturnType is not correctly specified in ${configPath}`);
        }
        switch (config.expectedReturnType) {
            case 'uint256':
            case 'int256':
            case 'string':
            case 'Buffer':
                break;
            default:
                throw Error(`expectedReturnType is not correctly specified in ${configPath}`);
        }
    }
    return config;
};
exports.getRequestConfig = getRequestConfig;
