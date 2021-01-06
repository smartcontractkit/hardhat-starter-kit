"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatModule = void 0;
const t = __importStar(require("io-ts"));
const errors_1 = require("../errors");
const input_1 = require("../input");
// tslint:disable only-hardhat-error
class HardhatModule {
    constructor(_node, _resetCallback, _setLoggingEnabledCallback) {
        this._node = _node;
        this._resetCallback = _resetCallback;
        this._setLoggingEnabledCallback = _setLoggingEnabledCallback;
    }
    async processRequest(method, params = []) {
        switch (method) {
            case "hardhat_getStackTraceFailuresCount":
                return this._getStackTraceFailuresCountAction(...this._getStackTraceFailuresCountParams(params));
            case "hardhat_addCompilationResult":
                return this._addCompilationResultAction(...this._addCompilationResultParams(params));
            case "hardhat_impersonateAccount":
                return this._impersonateAction(...this._impersonateParams(params));
            case "hardhat_stopImpersonatingAccount":
                return this._stopImpersonatingAction(...this._stopImpersonatingParams(params));
            case "hardhat_reset":
                return this._resetAction(...this._resetParams(params));
            case "hardhat_setLoggingEnabled":
                return this._setLoggingEnabledAction(...this._setLoggingEnabledParams(params));
        }
        throw new errors_1.MethodNotFoundError(`Method ${method} not found`);
    }
    // hardhat_getStackTraceFailuresCount
    _getStackTraceFailuresCountParams(params) {
        return input_1.validateParams(params);
    }
    async _getStackTraceFailuresCountAction() {
        return this._node.getStackTraceFailuresCount();
    }
    // hardhat_addCompilationResult
    _addCompilationResultParams(params) {
        return input_1.validateParams(params, t.string, input_1.rpcCompilerInput, input_1.rpcCompilerOutput);
    }
    async _addCompilationResultAction(solcVersion, compilerInput, compilerOutput) {
        return this._node.addCompilationResult(solcVersion, compilerInput, compilerOutput);
    }
    // hardhat_impersonateAccount
    _impersonateParams(params) {
        return input_1.validateParams(params, input_1.rpcAddress);
    }
    _impersonateAction(address) {
        return this._node.addImpersonatedAccount(address);
    }
    // hardhat_stopImpersonatingAccount
    _stopImpersonatingParams(params) {
        return input_1.validateParams(params, input_1.rpcAddress);
    }
    _stopImpersonatingAction(address) {
        return this._node.removeImpersonatedAccount(address);
    }
    // hardhat_reset
    _resetParams(params) {
        return input_1.validateParams(params, input_1.optionalRpcHardhatNetworkConfig);
    }
    async _resetAction(networkConfig) {
        await this._resetCallback(networkConfig === null || networkConfig === void 0 ? void 0 : networkConfig.forking);
        return true;
    }
    // hardhat_setLoggingEnabled
    _setLoggingEnabledParams(params) {
        return input_1.validateParams(params, t.boolean);
    }
    async _setLoggingEnabledAction(loggingEnabled) {
        this._setLoggingEnabledCallback(loggingEnabled);
        return true;
    }
}
exports.HardhatModule = HardhatModule;
//# sourceMappingURL=hardhat.js.map