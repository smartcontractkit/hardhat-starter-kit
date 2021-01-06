import { ProviderRpcError } from "../../../types";
import { CustomError } from "../../core/errors";
export declare class HardhatNetworkProviderError extends CustomError implements ProviderRpcError {
    readonly code: number;
    static isHardhatNetworkProviderError(other: any): other is HardhatNetworkProviderError;
    private readonly _isHardhatNetworkProviderError;
    constructor(message: string, code: number);
}
export declare class InvalidJsonInputError extends HardhatNetworkProviderError {
    static readonly CODE = -32700;
    constructor(message: string);
}
export declare class InvalidRequestError extends HardhatNetworkProviderError {
    static readonly CODE = -32600;
    constructor(message: string);
}
export declare class MethodNotFoundError extends HardhatNetworkProviderError {
    static readonly CODE = -32601;
    constructor(message: string);
}
export declare class InvalidArgumentsError extends HardhatNetworkProviderError {
    static readonly CODE = -32602;
    constructor(message: string);
}
export declare class InternalError extends HardhatNetworkProviderError {
    static readonly CODE = -32603;
    constructor(message: string);
}
export declare class InvalidInputError extends HardhatNetworkProviderError {
    static readonly CODE = -32000;
    constructor(message: string);
}
export declare class TransactionExecutionError extends HardhatNetworkProviderError {
    static readonly CODE = -32003;
    parent: Error;
    constructor(parent: Error | string);
}
export declare class MethodNotSupportedError extends HardhatNetworkProviderError {
    static readonly CODE = -32004;
    constructor(method: string);
}
//# sourceMappingURL=errors.d.ts.map