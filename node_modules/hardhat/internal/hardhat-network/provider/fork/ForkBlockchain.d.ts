/// <reference types="bn.js" />
/// <reference types="node" />
import Common from "ethereumjs-common";
import { Transaction } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
import { JsonRpcClient } from "../../jsonrpc/client";
import { FilterParams } from "../node-types";
import { RpcLogOutput, RpcReceiptOutput } from "../output";
import { Block } from "../types/Block";
import { Blockchain } from "../types/Blockchain";
import { PBlockchain } from "../types/PBlockchain";
export declare class ForkBlockchain implements PBlockchain {
    private _jsonRpcClient;
    private _forkBlockNumber;
    private _common;
    private _data;
    private _latestBlockNumber;
    constructor(_jsonRpcClient: JsonRpcClient, _forkBlockNumber: BN, _common: Common);
    getLatestBlock(): Promise<Block>;
    getBlock(blockHashOrNumber: Buffer | number | BN): Promise<Block | undefined>;
    addBlock(block: Block): Promise<Block>;
    deleteBlock(blockHash: Buffer): void;
    deleteLaterBlocks(block: Block): void;
    getTotalDifficulty(blockHash: Buffer): Promise<BN>;
    getTransaction(transactionHash: Buffer): Promise<Transaction | undefined>;
    getLocalTransaction(transactionHash: Buffer): Transaction | undefined;
    getBlockByTransactionHash(transactionHash: Buffer): Promise<Block | undefined>;
    getTransactionReceipt(transactionHash: Buffer): Promise<RpcReceiptOutput | undefined>;
    addTransactionReceipts(receipts: RpcReceiptOutput[]): void;
    getLogs(filterParams: FilterParams): Promise<RpcLogOutput[]>;
    asBlockchain(): Blockchain;
    private _getBlockByHash;
    private _getBlockByNumber;
    private _processRemoteBlock;
    private _computeTotalDifficulty;
    private _delBlock;
    private _processRemoteTransaction;
    private _processRemoteReceipt;
}
//# sourceMappingURL=ForkBlockchain.d.ts.map