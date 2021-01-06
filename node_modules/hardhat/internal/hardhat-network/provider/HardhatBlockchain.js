"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatBlockchain = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const BlockchainData_1 = require("./BlockchainData");
const PBlockchain_1 = require("./types/PBlockchain");
/* tslint:disable only-hardhat-error */
class HardhatBlockchain {
    constructor() {
        this._data = new BlockchainData_1.BlockchainData();
        this._length = 0;
    }
    async getLatestBlock() {
        const block = this._data.getBlockByNumber(new ethereumjs_util_1.BN(this._length - 1));
        if (block === undefined) {
            throw new Error("No block available");
        }
        return block;
    }
    async getBlock(blockHashOrNumber) {
        if (typeof blockHashOrNumber === "number") {
            return this._data.getBlockByNumber(new ethereumjs_util_1.BN(blockHashOrNumber));
        }
        if (ethereumjs_util_1.BN.isBN(blockHashOrNumber)) {
            return this._data.getBlockByNumber(blockHashOrNumber);
        }
        return this._data.getBlockByHash(blockHashOrNumber);
    }
    async addBlock(block) {
        this._validateBlock(block);
        const totalDifficulty = this._computeTotalDifficulty(block);
        this._data.addBlock(block, totalDifficulty);
        this._length += 1;
        return block;
    }
    deleteBlock(blockHash) {
        const block = this._data.getBlockByHash(blockHash);
        if (block === undefined) {
            throw new Error("Block not found");
        }
        this._delBlock(block);
    }
    deleteLaterBlocks(block) {
        const actual = this._data.getBlockByHash(block.hash());
        if (actual === undefined) {
            throw new Error("Invalid block");
        }
        const nextBlock = this._data.getBlockByNumber(new ethereumjs_util_1.BN(actual.header.number).addn(1));
        if (nextBlock !== undefined) {
            this._delBlock(nextBlock);
        }
    }
    async getTotalDifficulty(blockHash) {
        const totalDifficulty = this._data.getTotalDifficulty(blockHash);
        if (totalDifficulty === undefined) {
            throw new Error("Block not found");
        }
        return totalDifficulty;
    }
    async getTransaction(transactionHash) {
        return this.getLocalTransaction(transactionHash);
    }
    getLocalTransaction(transactionHash) {
        return this._data.getTransaction(transactionHash);
    }
    async getBlockByTransactionHash(transactionHash) {
        return this._data.getBlockByTransactionHash(transactionHash);
    }
    async getTransactionReceipt(transactionHash) {
        return this._data.getTransactionReceipt(transactionHash);
    }
    addTransactionReceipts(receipts) {
        for (const receipt of receipts) {
            this._data.addTransactionReceipt(receipt);
        }
    }
    async getLogs(filterParams) {
        return this._data.getLogs(filterParams);
    }
    asBlockchain() {
        return PBlockchain_1.toBlockchain(this);
    }
    _validateBlock(block) {
        const blockNumber = ethereumjs_util_1.bufferToInt(block.header.number);
        const parentHash = block.header.parentHash;
        const parent = this._data.getBlockByNumber(new ethereumjs_util_1.BN(blockNumber - 1));
        if (this._length !== blockNumber) {
            throw new Error("Invalid block number");
        }
        if ((blockNumber === 0 && !parentHash.equals(ethereumjs_util_1.zeros(32))) ||
            (blockNumber > 0 &&
                parent !== undefined &&
                !parentHash.equals(parent.hash()))) {
            throw new Error("Invalid parent hash");
        }
    }
    _computeTotalDifficulty(block) {
        const difficulty = new ethereumjs_util_1.BN(block.header.difficulty);
        if (block.header.parentHash.equals(ethereumjs_util_1.zeros(32))) {
            return difficulty;
        }
        const parentTD = this._data.getTotalDifficulty(block.header.parentHash);
        if (parentTD === undefined) {
            throw new Error("This should never happen");
        }
        return parentTD.add(difficulty);
    }
    _delBlock(block) {
        const blockNumber = ethereumjs_util_1.bufferToInt(block.header.number);
        for (let i = blockNumber; i < this._length; i++) {
            const current = this._data.getBlockByNumber(new ethereumjs_util_1.BN(i));
            if (current !== undefined) {
                this._data.removeBlock(current);
            }
        }
        this._length = blockNumber;
    }
}
exports.HardhatBlockchain = HardhatBlockchain;
//# sourceMappingURL=HardhatBlockchain.js.map