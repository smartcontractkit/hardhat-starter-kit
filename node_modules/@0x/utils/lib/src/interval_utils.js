"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalUtils = {
    setAsyncExcludingInterval(fn, intervalMs, onError) {
        let isLocked = false;
        const intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if (isLocked) {
                return;
            }
            else {
                isLocked = true;
                try {
                    yield fn();
                }
                catch (err) {
                    onError(err);
                }
                isLocked = false;
            }
        }), intervalMs);
        return intervalId;
    },
    clearAsyncExcludingInterval(intervalId) {
        clearInterval(intervalId);
    },
    setInterval(fn, intervalMs, onError) {
        const intervalId = setInterval(() => {
            try {
                fn();
            }
            catch (err) {
                onError(err);
            }
        }, intervalMs);
        return intervalId;
    },
    clearInterval(intervalId) {
        clearInterval(intervalId);
    },
};
//# sourceMappingURL=interval_utils.js.map