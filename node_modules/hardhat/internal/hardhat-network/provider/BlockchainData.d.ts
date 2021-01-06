/// <reference types="bn.js" />
/// <reference types="node" />
import { Transaction } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
import { FilterParams } from "./node-types";
import { RpcLogOutput, RpcReceiptOutput } from "./output";
import { Block } from "./types/Block";
export declare class BlockchainData {
    private _blocksByNumber;
    private _blocksByHash;
    private _blocksByTransactions;
    private _transactions;
    private _transactionReceipts;
    private _totalDifficulty;
    getBlockByNumber(blockNumber: BN): Block | undefined;
    getBlockByHash(blockHash: Buffer): Block | undefined;
    getBlockByTransactionHash(transactionHash: Buffer): Block | undefined;
    getTransaction(transactionHash: Buffer): Transaction | undefined;
    getTransactionReceipt(transactionHash: Buffer): RpcReceiptOutput | undefined;
    getTotalDifficulty(blockHash: Buffer): BN | undefined;
    getLogs(filterParams: FilterParams): RpcLogOutput[];
    addBlock(block: Block, totalDifficulty: BN): void;
    removeBlock(block: Block): void;
    addTransaction(transaction: Transaction): void;
    addTransactionReceipt(receipt: RpcReceiptOutput): void;
}
//# sourceMappingURL=BlockchainData.d.ts.map