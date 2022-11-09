"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRequest = exports.simulateRequest = void 0;
const Sandbox_1 = require("../Sandbox");
const Validator_1 = require("../Validator");
const ConfigValidator_1 = require("./ConfigValidator");
const RequestBuilder_1 = require("./RequestBuilder");
const simulateRequest = (pathToRequestConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const config = require(pathToRequestConfig);
    if ((0, ConfigValidator_1.validateConfig)(config)) {
        const { resultLog, error } = yield (0, exports.executeRequest)(config);
        console.log(resultLog);
        if (!error) {
            return yield (0, RequestBuilder_1.buildRequest)(config);
        }
    }
    return;
});
exports.simulateRequest = simulateRequest;
const executeRequest = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let output;
    const sandbox = new Sandbox_1.Sandbox(true, true);
    try {
        output = yield sandbox.evaluate((_a = input.numAllowedQueries) !== null && _a !== void 0 ? _a : 0, input.source, input.args, input.secrets);
    }
    catch (untypedError) {
        const javascriptError = untypedError;
        const resultLog = '⚠️ An error occurred while executing the provided source code\n' +
            `Error Name: ${javascriptError.name}\nError Message: ${javascriptError.name}\nStack Trace:${javascriptError.details}`;
        return {
            resultLog,
            error: true,
        };
    }
    const validator = new Validator_1.Validator('', input.maxResponseBytes);
    try {
        validator.isValidOutput(output);
    }
    catch (untypedError) {
        const error = untypedError;
        const resultLog = `⚠️ An error occurred while validating the value returned by the provided source code:\n${error.message}`;
        return {
            resultLog,
            error: true,
        };
    }
    const outputHexString = validator.encodeResponse(output);
    let resultLog = `\n__Output from sandboxed source code__\n💾 Output represented as a hex string: ${outputHexString}\n`;
    if (input.expectedReturnType && input.expectedReturnType !== 'Buffer') {
        let decodedOutput;
        switch (input.expectedReturnType) {
            case 'uint256':
                decodedOutput = BigInt('0x' + outputHexString.slice(2).slice(-64));
                break;
            case 'int256':
                decodedOutput = signedInt256toBigInt('0x' + outputHexString.slice(2).slice(-64));
                break;
            case 'string':
                decodedOutput = Buffer.from(outputHexString.slice(2), 'hex').toString();
                break;
            default:
                const end = input.expectedReturnType;
                throw new Error(`unused expectedReturnType ${end}`);
        }
        const decodedOutputLog = `📒 Output decoded as a ${input.expectedReturnType}: ${decodedOutput}\n`;
        resultLog += decodedOutputLog;
    }
    return { resultLog, error: false };
});
exports.executeRequest = executeRequest;
const signedInt256toBigInt = (hex) => {
    const binary = BigInt(hex).toString(2).padStart(256, '0');
    // if the first bit is 0, number is positive
    if (binary[0] === '0') {
        return BigInt(hex);
    }
    return -(BigInt(2) ** BigInt(255)) + BigInt(`0b${binary.slice(1)}`);
};
