"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
}
exports.Log = Log;
Log.warn = (item) => console.log('⚠️ Warning: ' + item.toString());
Log.error = (item) => console.log('🛑 Error: ' + item.toString());
Log.info = (item) => {
    var _a;
    if (process.env['LOG_LEVEL'] &&
        ((_a = process.env['LOG_LEVEL']) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'false') {
        console.log('💬 Info: ' + item.toString());
    }
};
Log.debug = (item) => {
    var _a;
    if (((_a = process.env['LOG_LEVEL']) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'debug') {
        console.log('🐞 Debug: ' + item.toString());
    }
};
