"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    constructor(defaultMaxResponseBytes, defaultMaxHttpQueries) {
        this.defaultMaxResponseBytes = defaultMaxResponseBytes;
        this.defaultMaxHttpQueries = defaultMaxHttpQueries;
        this.isValidInput = (input) => {
            const validInput = input;
            if (typeof validInput.source !== 'string') {
                throw Error('source param is missing');
            }
            if (validInput.requestId && typeof validInput.requestId !== 'string') {
                throw Error('requestId param not a string or number');
            }
            if (validInput.numAllowedQueries) {
                if (typeof validInput.numAllowedQueries !== 'number' ||
                    !Number.isInteger(validInput.numAllowedQueries)) {
                    throw Error('numAllowedQueries param not an integer');
                }
            }
            else {
                validInput.numAllowedQueries = this.defaultMaxHttpQueries;
            }
            if (validInput.args) {
                if (!Array.isArray(validInput.args)) {
                    throw Error('args param not an array');
                }
                for (const arg of validInput.args) {
                    if (typeof arg !== 'string') {
                        throw Error('args param not a string array');
                    }
                }
            }
            if (validInput.secrets && typeof validInput.secrets !== 'object') {
                if (!Array.isArray(validInput.secrets)) {
                    throw Error('secrets param not an object');
                }
            }
            this.maxResponseBytes = this.defaultMaxResponseBytes;
            if (validInput.maxResponseBytes) {
                if (typeof validInput.maxResponseBytes !== 'number' ||
                    !Number.isInteger(validInput.maxResponseBytes)) {
                    throw Error('maxResponseBytes param not an integer');
                }
                this.maxResponseBytes = validInput.maxResponseBytes;
            }
            return true;
        };
        this.getValidOutput = (sandboxOutput) => {
            if (Buffer.isBuffer(sandboxOutput.result)) {
                if (sandboxOutput.result.length <= this.maxResponseBytes) {
                    return sandboxOutput.result;
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
        this.maxResponseBytes = defaultMaxResponseBytes;
    }
}
exports.Validator = Validator;
