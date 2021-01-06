import { RevertError } from '../../revert_error';
export declare class NotImplementedError extends RevertError {
    constructor(selector?: string);
}
export declare class InvalidBootstrapCallerError extends RevertError {
    constructor(caller?: string, expectedCaller?: string);
}
export declare class InvalidDieCallerError extends RevertError {
    constructor(caller?: string, expectedCaller?: string);
}
export declare class BootstrapCallFailedError extends RevertError {
    constructor(target?: string, resultData?: string);
}
//# sourceMappingURL=proxy_revert_errors.d.ts.map