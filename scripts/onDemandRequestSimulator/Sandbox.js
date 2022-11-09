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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaScriptRuntimeError = exports.JavaScriptSyntaxError = exports.JavaScriptError = exports.Sandbox = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const vm2_1 = require("vm2");
const Log_1 = require("./Log");
const OCR2DR_1 = require("./OCR2DR");
class Sandbox {
    constructor(disableTmpClearing, enableSandboxedLogging) {
        this.disableTmpClearing = disableTmpClearing;
        this.enableSandboxedLogging = enableSandboxedLogging;
    }
    evaluate(numAllowedQueries, javascriptString, args, secrets) {
        return __awaiter(this, void 0, void 0, function* () {
            const OCR2DR = (0, OCR2DR_1.buildOCR2DRmodule)(numAllowedQueries);
            // Clear the tmp directory before running the untrusted code to ensure
            // it does not have access to any cached data from the previously run script
            // in the case that the previous script exited prematurely.
            this.clearTmpDirectory();
            if (this.enableSandboxedLogging) {
                console.log('\n__Console log messages from sandboxed code__');
            }
            const vm = new vm2_1.NodeVM({
                sandbox: { args, secrets, OCR2DR },
                console: `${this.enableSandboxedLogging ? 'inherit' : 'off'}`,
                eval: false,
                wasm: false,
                require: false,
            });
            let functionScript;
            // Try to compile the provided JavaScript code.
            try {
                functionScript = new vm2_1.VMScript('module.exports = async function () {\n' + javascriptString + '\n}').compile();
            }
            catch (untypedError) {
                const error = untypedError;
                throw new JavaScriptSyntaxError({
                    name: error.name,
                    message: error.message,
                    details: error.stack,
                });
            }
            // Try to run the provided JavaScript code.
            let sandboxedFunction;
            let result;
            try {
                sandboxedFunction = yield vm.run(functionScript);
                result = yield sandboxedFunction();
            }
            catch (untypedError) {
                const error = untypedError;
                throw new JavaScriptRuntimeError({
                    name: error.name,
                    message: error.message,
                    details: error.stack,
                });
            }
            // Clear the tmp directory after running the code to ensure it does not
            // leave any cached data on the FaaS instance.
            this.clearTmpDirectory();
            return result;
        });
    }
    clearTmpDirectory() {
        if (this.disableTmpClearing) {
            return;
        }
        const dirents = fs_1.default.readdirSync(os_1.default.tmpdir());
        dirents.forEach((dirent) => {
            try {
                fs_1.default.rmSync(path_1.default.join(os_1.default.tmpdir(), dirent), { recursive: true });
            }
            catch (error) { }
        });
    }
}
exports.Sandbox = Sandbox;
class JavaScriptError {
    constructor({ name = 'JavaScript Error', message = 'An error occurred', details = '' }, errorName) {
        this.name = errorName !== null && errorName !== void 0 ? errorName : name;
        this.message = message;
        this.details = details;
    }
    response() {
        return {
            error: { name: this.name, message: this.message, details: this.details },
        };
    }
}
exports.JavaScriptError = JavaScriptError;
class JavaScriptSyntaxError extends JavaScriptError {
    constructor(errorParams) {
        super(errorParams, 'JavaScript Syntax Error');
    }
}
exports.JavaScriptSyntaxError = JavaScriptSyntaxError;
class JavaScriptRuntimeError extends JavaScriptError {
    constructor(errorParams) {
        super(errorParams, 'JavaScript Runtime Error');
    }
}
exports.JavaScriptRuntimeError = JavaScriptRuntimeError;
