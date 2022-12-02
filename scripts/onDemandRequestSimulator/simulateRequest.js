"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedResultLog = exports.simulateRequest = void 0;
const getRequestConfig_1 = require("./getRequestConfig");
const handler_1 = require("./handler");
const simulateRequest = async (pathToRequestConfig) => {
    const config = (0, getRequestConfig_1.getRequestConfig)(pathToRequestConfig);
    const savedEnv = {
        DISABLE_TMP_CLEAR_FOR_TESTING: process.env['DISABLE_TMP_CLEAR_FOR_TESTING'],
        ENABLE_CONSOLE_LOG_FROM_SANDBOX: process.env['ENABLE_CONSOLE_LOG_FROM_SANDBOX'],
    };
    process.env['DISABLE_TMP_CLEAR_FOR_TESTING'] = 'true';
    process.env['ENABLE_CONSOLE_LOG_FROM_SANDBOX'] = 'true';
    const timeout = setTimeout(() => {
        throw Error('Runtime of 15 seconds for sandboxed source code has been exceeded');
    }, 15000);
    const resultString = (await (0, handler_1.handler)({
        source: config.source,
        numAllowedQueries: config.numAllowedQueries,
        args: config.args,
        secrets: config.secrets,
        maxResponseBytes: config.maxResponseBytes,
    })).body;
    clearTimeout(timeout);
    for (const envVar in savedEnv) {
        process.env[envVar] = savedEnv[envVar];
    }
    const result = JSON.parse(resultString);
    if (result.success) {
        return {
            success: true,
            resultLog: `__Output from sandboxed source code__\nOutput represented as a hex string: ${result.success}\n${(0, exports.getDecodedResultLog)(config, result.success)}`,
        };
    }
    const { name, message, details } = result.error;
    return {
        success: false,
        resultLog: `__Error thrown in sandboxed source code__\n${name}\n${message}\n${details ? `${details}\n` : ''}`,
    };
};
exports.simulateRequest = simulateRequest;
const getDecodedResultLog = (config, successResult) => {
    let resultLog = '';
    if (config.expectedReturnType && config.expectedReturnType !== 'Buffer') {
        let decodedOutput;
        switch (config.expectedReturnType) {
            case 'uint256':
                decodedOutput = BigInt('0x' + successResult.slice(2).slice(-64));
                break;
            case 'int256':
                decodedOutput = signedInt256toBigInt('0x' + successResult.slice(2).slice(-64));
                break;
            case 'string':
                decodedOutput = Buffer.from(successResult.slice(2), 'hex').toString();
                break;
            default:
                const end = config.expectedReturnType;
                throw new Error(`unused expectedReturnType ${end}`);
        }
        const decodedOutputLog = `Decoded as a ${config.expectedReturnType}: ${decodedOutput}`;
        resultLog += decodedOutputLog;
    }
    return resultLog;
};
exports.getDecodedResultLog = getDecodedResultLog;
const signedInt256toBigInt = (hex) => {
    const binary = BigInt(hex).toString(2).padStart(256, '0');
    // if the first bit is 0, number is positive
    if (binary[0] === '0') {
        return BigInt(hex);
    }
    return -(BigInt(2) ** BigInt(255)) + BigInt(`0b${binary.slice(1)}`);
};
