/// <reference types="node" />
/// <reference types="bn.js" />
import { Transaction } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
import { FilterParams } from "./node-types";
import { RpcLogOutput, RpcReceiptOutput } from "./output";
import { Block } from "./types/Block";
import { Blockchain } from "./types/Blockchain";
import { PBlockchain } from "./types/PBlockchain";
export declare class HardhatBlockchain implements PBlockchain {
    private readonly _data;
    private _length;
    getLatestBlock(): Promise<Block>;
    getBlock(blockHashOrNumber: Buffer | BN | number): Promise<Block | undefined>;
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
    private _validateBlock;
    private _computeTotalDifficulty;
    private _delBlock;
}
//# sourceMappingURL=HardhatBlockchain.d.ts.map