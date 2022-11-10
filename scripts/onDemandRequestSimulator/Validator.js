"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.SetupError = void 0;
const crypto_js_1 = require("crypto-js");
const timestampedRequestSigner_1 = require("./timestampedRequestSigner");
class SetupError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.SetupError = SetupError;
class Validator {
    constructor(sandboxPublicAuthKey, maxResponseBytes = 256, latencyTolerance = 5000) {
        this.maxResponseBytes = maxResponseBytes;
        this.latencyTolerance = latencyTolerance;
        this.isValidInput = (input) => {
            var _a;
            const validInput = input;
            this.checkRequestAuthorization(validInput);
            if (typeof validInput.source !== 'string') {
                throw Error('source parameter is missing');
            }
            if (validInput.args) {
                if (!Array.isArray(validInput.args)) {
                    throw Error('args parameter is not an array');
                }
                for (const arg of validInput.args) {
                    if (typeof arg !== 'string') {
                        throw Error(`arg is not a string`);
                    }
                }
            }
            if (validInput.secrets && typeof validInput.secrets !== 'object') {
                if (!Array.isArray(validInput.secrets)) {
                    throw Error('secrets parameter is not an object');
                }
            }
            if (validInput.numAllowedQueries) {
                if (typeof validInput.numAllowedQueries !== 'number') {
                    throw Error('numAllowedQueries parameter is not a number');
                }
            }
            else {
                validInput.numAllowedQueries = parseInt((_a = process.env['MAX_HTTP_QUERIES']) !== null && _a !== void 0 ? _a : '3');
            }
            return true;
        };
        this.isValidOutput = (result) => {
            if (Buffer.isBuffer(result)) {
                if (result.length <= this.maxResponseBytes) {
                    return true;
                }
                throw Error(`returned Buffer exceeds ${this.maxResponseBytes} bytes`);
            }
            throw Error('returned value must be a Buffer');
        };
        this.encodeResponse = (result) => {
            if (result.length === 0) {
                return '0x00';
            }
            return '0x' + result.toString('hex');
        };
        this.checkRequestAuthorization = (input) => {
            if (typeof input.signature !== 'string') {
                throw new SetupError('signature is missing or invalid');
            }
            if (typeof input.timestamp !== 'number') {
                throw new SetupError('timestamp is missing or invalid');
            }
            if (Math.abs(Date.now() - input.timestamp) > this.latencyTolerance) {
                throw new SetupError(`Timestamp out of sync. Current time: ${Date.now()} Received timestamp: ${input.timestamp}. Latency threshold is ${this.latencyTolerance}`);
            }
            const requestDataWithoutHashOrSignature = Object.assign({}, input);
            delete requestDataWithoutHashOrSignature.requestHash;
            delete requestDataWithoutHashOrSignature.signature;
            const requestHash = (0, crypto_js_1.SHA256)(JSON.stringify(requestDataWithoutHashOrSignature)).toString();
            if (requestHash !== input.requestHash) {
                throw new SetupError('hash of request is invalid');
            }
            if (!this.timestampedSignatureChecker.verifySignature(requestHash, input.signature)) {
                throw new SetupError('signature for request is invalid');
            }
        };
        this.timestampedSignatureChecker = new timestampedRequestSigner_1.TimestampedRequestSigner('', sandboxPublicAuthKey);
    }
}
exports.Validator = Validator;
