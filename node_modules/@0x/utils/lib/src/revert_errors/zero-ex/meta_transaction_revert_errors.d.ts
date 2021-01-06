import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class InvalidMetaTransactionsArrayLengthsError extends RevertError {
    constructor(mtxCount?: Numberish, signatureCount?: Numberish);
}
export declare class MetaTransactionAlreadyExecutedError extends RevertError {
    constructor(mtxHash?: string, executedBlockNumber?: Numberish);
}
export declare class MetaTransactionUnsupportedFunctionError extends RevertError {
    constructor(mtxHash?: string, selector?: string);
}
export declare class MetaTransactionWrongSenderError extends RevertError {
    constructor(mtxHash?: string, sender?: string, expectedSender?: string);
}
export declare class MetaTransactionExpiredError extends RevertError {
    constructor(mtxHash?: string, time?: Numberish, expirationTime?: Numberish);
}
export declare class MetaTransactionGasPriceError extends RevertError {
    constructor(mtxHash?: string, gasPrice?: Numberish, minGasPrice?: Numberish, maxGasPrice?: Numberish);
}
export declare class MetaTransactionInsufficientEthError extends RevertError {
    constructor(mtxHash?: string, ethBalance?: Numberish, ethRequired?: Numberish);
}
export declare class MetaTransactionInvalidSignatureError extends RevertError {
    constructor(mtxHash?: string, signature?: string, errData?: string);
}
export declare class MetaTransactionCallFailedError extends RevertError {
    constructor(mtxHash?: string, callData?: string, returnData?: string);
}
//# sourceMappingURL=meta_transaction_revert_errors.d.ts.map