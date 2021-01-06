import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare enum ValueErrorCodes {
    TooSmall = 0,
    TooLarge = 1
}
export declare enum BinOpErrorCodes {
    AdditionOverflow = 0,
    MultiplicationOverflow = 1,
    DivisionByZero = 2,
    DivisionOverflow = 3
}
export declare class SignedValueError extends RevertError {
    constructor(error?: ValueErrorCodes, n?: BigNumber | number | string);
}
export declare class UnsignedValueError extends RevertError {
    constructor(error?: ValueErrorCodes, n?: BigNumber | number | string);
}
export declare class BinOpError extends RevertError {
    constructor(error?: BinOpErrorCodes, a?: BigNumber | number | string, b?: BigNumber | number | string);
}
//# sourceMappingURL=fixed_math_revert_errors.d.ts.map