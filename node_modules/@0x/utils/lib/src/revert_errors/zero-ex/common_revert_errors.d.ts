import { RevertError } from '../../revert_error';
import { Numberish } from '../../types';
export declare class OnlyCallableBySelfError extends RevertError {
    constructor(sender?: string);
}
export declare class IllegalReentrancyError extends RevertError {
    constructor(selector?: string, reentrancyFlags?: Numberish);
}
//# sourceMappingURL=common_revert_errors.d.ts.map