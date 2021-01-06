import { ProviderRpcError } from "../../../types";
import { CustomError } from "../errors";
export declare class ProviderError extends CustomError implements ProviderRpcError {
    readonly parent?: Error | undefined;
    code: number;
    data?: unknown;
    constructor(message: string, code: number, parent?: Error | undefined);
}
//# sourceMappingURL=errors.d.ts.map