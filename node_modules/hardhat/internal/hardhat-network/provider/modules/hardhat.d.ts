import { HardhatNode } from "../node";
import { ForkConfig } from "../node-types";
export declare class HardhatModule {
    private readonly _node;
    private readonly _resetCallback;
    private readonly _setLoggingEnabledCallback;
    constructor(_node: HardhatNode, _resetCallback: (forkConfig?: ForkConfig) => Promise<void>, _setLoggingEnabledCallback: (loggingEnabled: boolean) => void);
    processRequest(method: string, params?: any[]): Promise<any>;
    private _getStackTraceFailuresCountParams;
    private _getStackTraceFailuresCountAction;
    private _addCompilationResultParams;
    private _addCompilationResultAction;
    private _impersonateParams;
    private _impersonateAction;
    private _stopImpersonatingParams;
    private _stopImpersonatingAction;
    private _resetParams;
    private _resetAction;
    private _setLoggingEnabledParams;
    private _setLoggingEnabledAction;
}
//# sourceMappingURL=hardhat.d.ts.map