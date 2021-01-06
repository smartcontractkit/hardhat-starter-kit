import { RevertError } from '../../revert_error';
export declare class OnlyOwnerError extends RevertError {
    constructor(sender?: string, owner?: string);
}
export declare class TransferOwnerToZeroError extends RevertError {
    constructor();
}
//# sourceMappingURL=ownable_revert_errors.d.ts.map