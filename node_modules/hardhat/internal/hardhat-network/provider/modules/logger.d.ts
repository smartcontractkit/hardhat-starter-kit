export declare class ModulesLogger {
    enabled: boolean;
    private _logs;
    private _titleLength;
    enable(isEnabled: boolean): void;
    log(message: string): void;
    logWithTitle(title: string, message: string): void;
    debug(...args: any[]): void;
    clearLogs(): void;
    hasLogs(): boolean;
    getLogs(): string[];
}
//# sourceMappingURL=logger.d.ts.map