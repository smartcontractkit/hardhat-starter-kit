"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Module = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const packageInfo_1 = require("../../../util/packageInfo");
const errors_1 = require("../errors");
const input_1 = require("../input");
const output_1 = require("../output");
// tslint:disable only-hardhat-error
class Web3Module {
    async processRequest(method, params = []) {
        switch (method) {
            case "web3_clientVersion":
                return this._clientVersionAction(...this._clientVersionParams(params));
            case "web3_sha3":
                return this._sha3Action(...this._sha3Params(params));
        }
        throw new errors_1.MethodNotFoundError(`Method ${method} not found`);
    }
    // web3_clientVersion
    _clientVersionParams(params) {
        return input_1.validateParams(params);
    }
    async _clientVersionAction() {
        const hardhatPackage = await packageInfo_1.getPackageJson();
        const ethereumjsVMPackage = require("@nomiclabs/ethereumjs-vm/package.json");
        return `HardhatNetwork/${hardhatPackage.version}/ethereumjs-vm/${ethereumjsVMPackage.version}`;
    }
    // web3_sha3
    _sha3Params(params) {
        return input_1.validateParams(params, input_1.rpcData);
    }
    async _sha3Action(buffer) {
        return output_1.bufferToRpcData(ethereumjs_util_1.keccak256(buffer));
    }
}
exports.Web3Module = Web3Module;
//# sourceMappingURL=web3.js.map