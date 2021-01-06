"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesLogger = void 0;
const util_1 = __importDefault(require("util"));
class ModulesLogger {
    constructor() {
        this.enabled = false;
        this._logs = [];
        this._titleLength = 0;
    }
    enable(isEnabled) {
        this.enabled = isEnabled;
    }
    log(message) {
        if (!this.enabled) {
            return;
        }
        this._logs.push(message);
    }
    logWithTitle(title, message) {
        // We always use the max title length we've seen. Otherwise the value move
        // a lot with each tx/call.
        if (title.length > this._titleLength) {
            this._titleLength = title.length;
        }
        this._logs.push([title, message]);
    }
    debug(...args) {
        this.log(util_1.default.format(args[0], ...args.splice(1)));
    }
    clearLogs() {
        this._logs = [];
    }
    hasLogs() {
        return this._logs.length > 0;
    }
    getLogs() {
        return this._logs.map((l) => {
            if (typeof l === "string") {
                return l;
            }
            const title = `${l[0]}:`;
            return `${title.padEnd(this._titleLength + 1)} ${l[1]}`;
        });
    }
}
exports.ModulesLogger = ModulesLogger;
//# sourceMappingURL=logger.js.map