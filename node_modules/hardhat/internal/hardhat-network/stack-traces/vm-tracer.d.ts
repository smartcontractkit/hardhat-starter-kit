/// <reference types="node" />
import VM from "@nomiclabs/ethereumjs-vm";
import { MessageTrace } from "./message-trace";
export declare class VMTracer {
    private readonly _vm;
    private readonly _getContractCode;
    private readonly _dontThrowErrors;
    private _messageTraces;
    private _enabled;
    private _lastError;
    constructor(_vm: VM, _getContractCode: (address: Buffer) => Promise<Buffer>, _dontThrowErrors?: boolean);
    enableTracing(): void;
    disableTracing(): void;
    get enabled(): boolean;
    getLastTopLevelMessageTrace(): MessageTrace | undefined;
    getLastError(): Error | undefined;
    clearLastError(): void;
    private _shouldKeepTracing;
    private _beforeMessageHandler;
    private _stepHandler;
    private _afterMessageHandler;
}
//# sourceMappingURL=vm-tracer.d.ts.map