export declare const intervalUtils: {
    setAsyncExcludingInterval(fn: () => Promise<void>, intervalMs: number, onError: (err: Error) => void): NodeJS.Timer;
    clearAsyncExcludingInterval(intervalId: NodeJS.Timer): void;
    setInterval(fn: () => void, intervalMs: number, onError: (err: Error) => void): NodeJS.Timer;
    clearInterval(intervalId: NodeJS.Timer): void;
};
//# sourceMappingURL=interval_utils.d.ts.map