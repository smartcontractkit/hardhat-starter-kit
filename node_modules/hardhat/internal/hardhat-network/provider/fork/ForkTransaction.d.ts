/// <reference types="node" />
/// <reference types="bn.js" />
import { BufferLike, PrefixedHexString, Transaction, TransactionOptions, TxData } from "ethereumjs-tx";
import { BN } from "ethereumjs-util";
/**
 * Custom Transaction class to avoid EIP155 errors when hardhat is forked
 */
export declare class ForkTransaction extends Transaction {
    private readonly _chainId;
    constructor(chainId: number, data?: Buffer | PrefixedHexString | BufferLike[] | TxData, opts?: TransactionOptions);
    verifySignature(): boolean;
    getChainId(): number;
    sign(): void;
    getDataFee(): BN;
    getBaseFee(): BN;
    getUpfrontCost(): BN;
    validate(_?: false): boolean;
    validate(_: true): string;
    toCreationAddress(): boolean;
}
//# sourceMappingURL=ForkTransaction.d.ts.map