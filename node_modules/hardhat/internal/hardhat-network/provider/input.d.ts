/// <reference types="bn.js" />
/// <reference types="node" />
import { BN } from "ethereumjs-util";
import * as t from "io-ts";
import { CompilerInput, CompilerOutput } from "../../../types";
export declare const rpcQuantity: t.Type<BN, BN, unknown>;
export declare const rpcData: t.Type<Buffer, Buffer, unknown>;
export declare const rpcHash: t.Type<Buffer, Buffer, unknown>;
export declare const rpcUnknown: t.UnknownC;
export declare const rpcAddress: t.Type<Buffer, Buffer, unknown>;
export declare const logAddress: t.UnionC<[t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.Type<Buffer, Buffer, unknown>>, t.UndefinedC]>;
export declare type LogAddress = t.TypeOf<typeof logAddress>;
export declare const logTopics: t.UnionC<[t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>]>>]>>, t.UndefinedC]>;
export declare type LogTopics = t.TypeOf<typeof logTopics>;
export declare const blockTagObject: t.Type<Buffer | BN, Buffer | BN, unknown>;
export declare const blockTag: t.UnionC<[t.Type<BN, BN, unknown>, t.Type<Buffer | BN, Buffer | BN, unknown>, t.KeyofC<{
    earliest: null;
    latest: null;
    pending: null;
}>]>;
export declare type BlockTag = t.TypeOf<typeof blockTag>;
export declare const optionalBlockTag: t.Type<Buffer | BN | "earliest" | "latest" | "pending" | undefined, Buffer | BN | "earliest" | "latest" | "pending" | undefined, unknown>;
export declare type OptionalBlockTag = t.TypeOf<typeof optionalBlockTag>;
export declare const rpcTransactionRequest: t.TypeC<{
    from: t.Type<Buffer, Buffer, unknown>;
    to: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
    gas: t.Type<BN | undefined, BN | undefined, unknown>;
    gasPrice: t.Type<BN | undefined, BN | undefined, unknown>;
    value: t.Type<BN | undefined, BN | undefined, unknown>;
    data: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
    nonce: t.Type<BN | undefined, BN | undefined, unknown>;
}>;
export interface RpcTransactionRequestInput {
    from: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
    nonce?: string;
}
export declare type RpcTransactionRequest = t.TypeOf<typeof rpcTransactionRequest>;
export declare const rpcCallRequest: t.TypeC<{
    from: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
    to: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
    gas: t.Type<BN | undefined, BN | undefined, unknown>;
    gasPrice: t.Type<BN | undefined, BN | undefined, unknown>;
    value: t.Type<BN | undefined, BN | undefined, unknown>;
    data: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
}>;
export interface RpcCallRequestInput {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
}
export declare type RpcCallRequest = t.TypeOf<typeof rpcCallRequest>;
export declare const rpcFilterRequest: t.TypeC<{
    fromBlock: t.Type<Buffer | BN | "earliest" | "latest" | "pending" | undefined, Buffer | BN | "earliest" | "latest" | "pending" | undefined, unknown>;
    toBlock: t.Type<Buffer | BN | "earliest" | "latest" | "pending" | undefined, Buffer | BN | "earliest" | "latest" | "pending" | undefined, unknown>;
    address: t.UnionC<[t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.Type<Buffer, Buffer, unknown>>, t.UndefinedC]>;
    topics: t.UnionC<[t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>]>>]>>, t.UndefinedC]>;
    blockHash: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
}>;
export interface RpcSubscribe {
    request: RpcFilterRequest;
}
export declare type OptionalRpcFilterRequest = t.TypeOf<typeof optionalRpcFilterRequest>;
export declare const optionalRpcFilterRequest: t.UnionC<[t.TypeC<{
    fromBlock: t.Type<Buffer | BN | "earliest" | "latest" | "pending" | undefined, Buffer | BN | "earliest" | "latest" | "pending" | undefined, unknown>;
    toBlock: t.Type<Buffer | BN | "earliest" | "latest" | "pending" | undefined, Buffer | BN | "earliest" | "latest" | "pending" | undefined, unknown>;
    address: t.UnionC<[t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.Type<Buffer, Buffer, unknown>>, t.UndefinedC]>;
    topics: t.UnionC<[t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>, t.ArrayC<t.UnionC<[t.NullC, t.Type<Buffer, Buffer, unknown>]>>]>>, t.UndefinedC]>;
    blockHash: t.Type<Buffer | undefined, Buffer | undefined, unknown>;
}>, t.UndefinedC]>;
export declare type RpcSubscribeRequest = t.TypeOf<typeof rpcSubscribeRequest>;
export declare const rpcSubscribeRequest: t.KeyofC<{
    newHeads: null;
    newPendingTransactions: null;
    logs: null;
}>;
export declare type RpcFilterRequest = t.TypeOf<typeof rpcFilterRequest>;
export declare const rpcCompilerInput: t.TypeC<{
    language: t.StringC;
    sources: t.AnyC;
    settings: t.AnyC;
}>;
export declare type RpcCompilerInput = t.TypeOf<typeof rpcCompilerInput>;
export declare const rpcCompilerOutput: t.TypeC<{
    sources: t.AnyC;
    contracts: t.AnyC;
}>;
export declare type RpcCompilerOutput = t.TypeOf<typeof rpcCompilerOutput>;
export declare const rpcForkConfig: t.Type<{
    jsonRpcUrl: string;
    blockNumber: number | undefined;
} | undefined, {
    jsonRpcUrl: string;
    blockNumber: number | undefined;
} | undefined, unknown>;
export declare type RpcForkConfig = t.TypeOf<typeof rpcForkConfig>;
export declare const rpcHardhatNetworkConfig: t.TypeC<{
    forking: t.Type<{
        jsonRpcUrl: string;
        blockNumber: number | undefined;
    } | undefined, {
        jsonRpcUrl: string;
        blockNumber: number | undefined;
    } | undefined, unknown>;
}>;
export declare type RpcHardhatNetworkConfig = t.TypeOf<typeof rpcHardhatNetworkConfig>;
export declare const optionalRpcHardhatNetworkConfig: t.Type<{
    forking: {
        jsonRpcUrl: string;
        blockNumber: number | undefined;
    } | undefined;
} | undefined, {
    forking: {
        jsonRpcUrl: string;
        blockNumber: number | undefined;
    } | undefined;
} | undefined, unknown>;
export declare function validateParams(params: any[]): [];
export declare function validateParams(params: any[], addr: typeof rpcAddress, data: typeof rpcData): [Buffer, Buffer];
export declare function validateParams(params: any[], addr: typeof rpcAddress, block: typeof optionalBlockTag): [Buffer, OptionalBlockTag];
export declare function validateParams(params: any[], addr: typeof rpcAddress, slot: typeof rpcQuantity, block: typeof optionalBlockTag): [Buffer, BN, OptionalBlockTag];
export declare function validateParams(params: any[], data: typeof rpcData | typeof rpcData): [Buffer];
export declare function validateParams(params: any[], tx: typeof rpcTransactionRequest): [RpcTransactionRequest];
export declare function validateParams(params: any[], call: typeof rpcCallRequest, block: typeof optionalBlockTag): [RpcCallRequest, OptionalBlockTag];
export declare function validateParams(params: any[], call: typeof rpcTransactionRequest, block: typeof optionalBlockTag): [RpcTransactionRequest, OptionalBlockTag];
export declare function validateParams(params: any[], num: typeof t.number): [number];
export declare function validateParams(params: any[], hash: typeof rpcHash, bool: typeof t.boolean): [Buffer, boolean];
export declare function validateParams(params: any[], tag: typeof blockTag, bool: typeof t.boolean): [BlockTag, boolean];
export declare function validateParams(params: any[], tag: typeof optionalBlockTag, bool: typeof t.boolean): [OptionalBlockTag, boolean];
export declare function validateParams(params: any[], num: typeof rpcQuantity, bool: typeof t.boolean): [BN, boolean];
export declare function validateParams(params: any[], num: typeof rpcQuantity): [BN];
export declare function validateParams(params: any[], hash: typeof rpcHash, num: typeof rpcQuantity): [Buffer, BN];
export declare function validateParams(params: any[], num1: typeof rpcQuantity, num2: typeof rpcQuantity): [BN, BN];
export declare function validateParams(params: any[], addr: typeof rpcAddress, data: typeof rpcUnknown): [Buffer, any];
export declare function validateParams(params: any[], filterRequest: typeof rpcFilterRequest): [RpcFilterRequest];
export declare function validateParams(params: any[], subscribeRequest: typeof rpcSubscribeRequest, optionalFilterRequest: typeof optionalRpcFilterRequest): [RpcSubscribeRequest, OptionalRpcFilterRequest];
export declare function validateParams(params: any[], number: typeof rpcQuantity): [BN];
export declare function validateParams(params: any[], compilerVersion: typeof t.string, compilerInput: typeof rpcCompilerInput, compilerOutput: typeof rpcCompilerOutput): [string, CompilerInput, CompilerOutput];
export declare function validateParams(params: any[], forkConfig: typeof optionalRpcHardhatNetworkConfig): [RpcHardhatNetworkConfig | undefined];
export declare function validateParams(params: any[], loggingEnabled: typeof t.boolean): [boolean];
//# sourceMappingURL=input.d.ts.map