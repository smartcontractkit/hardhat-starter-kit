/// <reference types="node" />
/// <reference types="bn.js" />
import { Transaction } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
import { FilterParams } from "../node-types";
import { RpcLogOutput, RpcReceiptOutput } from "../output";
import { Block } from "./Block";
import { Blockchain } from "./Blockchain";
export interface PBlockchain {
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
}
export declare function toBlockchain(pb: PBlockchain): Blockchain;
//# sourceMappingURL=PBlockchain.d.ts.map