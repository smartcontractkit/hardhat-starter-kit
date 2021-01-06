import { BigNumber } from '../../configured_bignumber';
import { RevertError } from '../../revert_error';
export declare class MismanagedMemoryError extends RevertError {
    constructor(freeMemPtr?: BigNumber, addressArrayEndPtr?: BigNumber);
}
//# sourceMappingURL=lib_address_array_revert_errors.d.ts.map