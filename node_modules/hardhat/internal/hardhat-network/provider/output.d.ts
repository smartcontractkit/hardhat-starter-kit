/// <reference types="bn.js" />
/// <reference types="node" />
import { RunBlockResult } from "@nomiclabs/ethereumjs-vm/dist/runBlock";
import { Transaction } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
import { RpcLog, RpcTransactionReceipt } from "../jsonrpc/types";
import { Block } from "./types/Block";
export interface RpcBlockOutput {
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string | null;
    logsBloom: string | null;
    miner: string;
    mixHash: string | null;
    nonce: string | null;
    number: string | null;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: string[] | RpcTransactionOutput[];
    transactionsRoot: string;
    uncles: string[];
}
export interface RpcTransactionOutput {
    blockHash: string | null;
    blockNumber: string | null;
    from: string;
    gas: string;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: string;
    r: string;
    s: string;
    to: string | null;
    transactionIndex: string | null;
    v: string;
    value: string;
}
export interface RpcReceiptOutput {
    blockHash: string;
    blockNumber: string;
    contractAddress: string | null;
    cumulativeGasUsed: string;
    from: string;
    gasUsed: string;
    logs: RpcLogOutput[];
    logsBloom: string;
    status: string;
    to: string | null;
    transactionHash: string;
    transactionIndex: string;
}
export interface RpcLogOutput {
    address: string;
    blockHash: string | null;
    blockNumber: string | null;
    data: string;
    logIndex: string | null;
    removed: boolean;
    topics: string[];
    transactionHash: string | null;
    transactionIndex: string | null;
}
export declare function numberToRpcQuantity(n: number | BN): string;
export declare function bufferToRpcData(buffer: Buffer, pad?: number): string;
export declare function getRpcBlock(block: Block, totalDifficulty: BN, includeTransactions?: boolean): RpcBlockOutput;
export declare function getRpcTransaction(tx: Transaction, block?: Block, index?: number): RpcTransactionOutput;
export declare function getRpcTransaction(tx: Transaction, block?: Block, index?: number, txHashOnly?: boolean): string | RpcTransactionOutput;
export declare function getRpcReceipts(block: Block, runBlockResult: RunBlockResult): RpcReceiptOutput[];
export declare function toRpcReceiptOutput(receipt: RpcTransactionReceipt): RpcReceiptOutput;
export declare function toRpcLogOutput(log: RpcLog, index?: number): RpcLogOutput;
//# sourceMappingURL=output.d.ts.map