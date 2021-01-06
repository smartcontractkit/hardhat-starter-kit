import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare enum BinOpErrorCodes {
    AdditionOverflow = 0,
    MultiplicationOverflow = 1,
    SubtractionUnderflow = 2,
    DivisionByZero = 3
}
export declare enum DowncastErrorCodes {
    ValueTooLargeToDowncastToUint32 = 0,
    ValueTooLargeToDowncastToUint64 = 1,
    ValueTooLargeToDowncastToUint96 = 2
}
export declare class Uint256BinOpError extends RevertError {
    constructor(error?: BinOpErrorCodes, a?: BigNumber, b?: BigNumber);
}
export declare class Uint96BinOpError extends RevertError {
    constructor(error?: BinOpErrorCodes, a?: BigNumber, b?: BigNumber);
}
export declare class Uint64BinOpError extends RevertError {
    constructor(error?: BinOpErrorCodes, a?: BigNumber, b?: BigNumber);
}
export declare class Uint256DowncastError extends RevertError {
    constructor(error?: DowncastErrorCodes, a?: BigNumber);
}
//# sourceMappingURL=safe_math_revert_errors.d.ts.map