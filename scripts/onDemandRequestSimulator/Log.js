"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretsRedactorFactory = exports.Log = void 0;
class Log {
}
exports.Log = Log;
Log.error = (message, requestId) => console.log(JSON.stringify({
    logLevel: 'error',
    timestamp: Date.now(),
    message,
    requestId,
}));
Log.warn = (message, requestId) => console.log(JSON.stringify({
    logLevel: 'warn',
    timestamp: Date.now(),
    message,
    requestId,
}));
Log.info = (message, requestId) => {
    if (process.env['LOG_LEVEL'] &&
        process.env['LOG_LEVEL']?.toLowerCase() !== 'false') {
        console.log(JSON.stringify({
            logLevel: 'info',
            timestamp: Date.now(),
            message,
            requestId,
        }));
    }
};
Log.debug = (message, requestId) => {
    if (process.env['LOG_LEVEL']?.toLowerCase() === 'debug' ||
        process.env['LOG_LEVEL']?.toLowerCase() === 'trace') {
        console.log(JSON.stringify({
            logLevel: 'debug',
            timestamp: Date.now(),
            message,
            requestId,
        }));
    }
};
Log.trace = (message, requestId) => {
    if (process.env['LOG_LEVEL']?.toLowerCase() === 'trace') {
        console.log(JSON.stringify({
            logLevel: 'trace',
            timestamp: Date.now(),
            message,
            requestId,
        }));
    }
};
const secretsRedactorFactory = (secrets) => {
    const secretsToRedact = Array.from(new Set(getSecretsToRedact(secrets))).filter((s) => s !== '<REDACTED SECRET>');
    return function secretsRedactor(data) {
        if (typeof data === 'number') {
            for (const secret of secretsToRedact) {
                if (data.toString() === secret) {
                    return 0;
                }
            }
        }
        if (typeof data === 'string') {
            // Make a deep copy to avoid modifying the original string
            let newData = data.slice();
            for (const secret of secretsToRedact) {
                newData = newData.replaceAll(secret, '<REDACTED SECRET>');
            }
            return newData;
        }
        if (Array.isArray(data)) {
            // Make a copy to avoid modifying the original array
            const newData = Array.from(data);
            for (let i = 0; i < newData.length; i++) {
                // Make a recursive call
                newData[i] = secretsRedactor(newData[i]);
            }
            return newData;
        }
        if (typeof data === 'object') {
            // Make a copy to avoid modifying the original object
            const newData = { ...data };
            for (const key in newData) {
                ;
                newData[key] = secretsRedactor(newData[key]);
            }
            return newData;
        }
        return data;
    };
};
exports.secretsRedactorFactory = secretsRedactorFactory;
const getSecretsToRedact = (secrets) => {
    if (typeof secrets === 'string') {
        return [secrets];
    }
    if (typeof secrets === 'number') {
        return [secrets.toString()];
    }
    let secretsArray = [];
    if (Array.isArray(secrets)) {
        for (const secret of secrets) {
            secretsArray = secretsArray.concat(getSecretsToRedact(secret));
        }
        return secretsArray;
    }
    if (typeof secrets === 'object') {
        for (const key in secrets) {
            secretsArray = secretsArray.concat(getSecretsToRedact(secrets[key]));
        }
        return secretsArray;
    }
    return [];
};
