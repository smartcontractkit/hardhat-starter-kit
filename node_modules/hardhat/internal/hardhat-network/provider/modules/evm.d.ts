import { HardhatNode } from "../node";
export declare class EvmModule {
    private readonly _node;
    constructor(_node: HardhatNode);
    processRequest(method: string, params?: any[]): Promise<any>;
    private _setNextBlockTimestampParams;
    private _setNextBlockTimestampAction;
    private _increaseTimeParams;
    private _increaseTimeAction;
    private _mineParams;
    private _mineAction;
    private _revertParams;
    private _revertAction;
    private _snapshotParams;
    private _snapshotAction;
}
//# sourceMappingURL=evm.d.ts.map