import { RevertError } from '../../revert_error';
export declare class MigrateCallFailedError extends RevertError {
    constructor(target?: string, resultData?: string);
}
export declare class OnlyOwnerError extends RevertError {
    constructor(sender?: string, owner?: string);
}
//# sourceMappingURL=ownable_revert_errors.d.ts.map