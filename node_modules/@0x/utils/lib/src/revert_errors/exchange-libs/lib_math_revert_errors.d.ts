import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class DivisionByZeroError extends RevertError {
    constructor();
}
export declare class RoundingError extends RevertError {
    constructor(numerator?: BigNumber | number | string, denominator?: BigNumber | number | string, target?: BigNumber | number | string);
}
//# sourceMappingURL=lib_math_revert_errors.d.ts.map