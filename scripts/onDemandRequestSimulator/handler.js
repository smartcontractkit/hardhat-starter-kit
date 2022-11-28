"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const process_1 = __importDefault(require("process"));
const Log_1 = require("./Log");
const Validator_1 = require("./Validator");
const Sandbox_1 = require("./Sandbox");
const validator = new Validator_1.Validator(parseInt(process_1.default.env['DEFAULT_MAX_RESPONSE_BYTES'] ?? '256'), parseInt(process_1.default.env['DEFAULT_MAX_HTTP_QUERIES'] ?? '5'));
const handler = async (event, _) => {
    // Validate the request
    try {
        // This is wrapped in an `if` statement for TypeScript's type checking system
        if (!validator.isValidInput(event)) {
            throw Error('isValidInput should never return false.');
        }
    }
    catch (untypedError) {
        const error = untypedError;
        Log_1.Log.debug(error.toString());
        return buildResult({
            error: {
                name: 'Invalid Input',
                message: `${error.message}`,
            },
        });
    }
    Log_1.Log.trace('Valid Event Initiated', event.requestId);
    const sandbox = new Sandbox_1.Sandbox(process_1.default.env['DISABLE_TMP_CLEAR_FOR_TESTING'] === 'true', process_1.default.env['ENABLE_CONSOLE_LOG_FROM_SANDBOX'] === 'true');
    // Execute the user-provided code in the sandbox
    let output;
    try {
        output = await sandbox.evaluate(event.numAllowedQueries, event.source, event.args, event.secrets);
    }
    catch (untypedError) {
        const sandboxError = untypedError;
        Log_1.Log.trace(JSON.stringify(sandboxError), event.requestId);
        return buildResult({
            error: { ...sandboxError },
        });
    }
    // Place in a try-catch in case of a cyclic reference in the returned object (or some other error)
    try {
        Log_1.Log.trace(`Sandbox Output: ${JSON.stringify(output)}`, event.requestId);
    }
    catch {
        Log_1.Log.debug('Sandbox output cannot be stringified (likely due to a circular reference in returned value)', event.requestId);
        return buildResult({
            error: {
                name: 'Output Validation Error',
                message: `returned type ${typeof output} is not supported`,
                userHttpQueries: output.userHttpQueries,
            },
        });
    }
    let result;
    try {
        result = validator.getValidOutput(output);
    }
    catch (untypedError) {
        const error = untypedError;
        Log_1.Log.trace(`Invalid Output: ${JSON.stringify(output)}`, event.requestId);
        return buildResult({
            error: {
                name: 'Output Validation Error',
                message: error.message,
            },
        });
    }
    const success = validator.encodeResponse(result);
    Log_1.Log.trace(`Success: ${success}`);
    return buildResult({
        success,
        userHttpQueries: output.userHttpQueries,
    });
};
exports.handler = handler;
const buildResult = (result) => {
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};
