"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const _ = require("lodash");
const DEFAULT_TERMINAL_WIDTH = 80;
const TERMINAL_WIDTH = _.get(process, 'stdout.columns') || DEFAULT_TERMINAL_WIDTH;
exports.logUtils = {
    log(...args) {
        console.log(...args); // tslint:disable-line:no-console
    },
    header(text, padStr = '=') {
        const padLength = TERMINAL_WIDTH - text.length;
        const padLengthEnd = (padLength + 1) / 2;
        const leftPadded = text.padStart(TERMINAL_WIDTH - padLengthEnd, padStr);
        const padded = leftPadded.padEnd(TERMINAL_WIDTH, padStr);
        console.log(padded); // tslint:disable-line:no-console
    },
    warn(...args) {
        console.warn(...args); // tslint:disable-line:no-console
    },
    table(columnarData) {
        const formattedColumnarData = _.mapValues(columnarData, (columnOrColumns, _rowName) => _.isNumber(columnOrColumns) ? columnOrColumns.toLocaleString() : columnOrColumns);
        console.table(formattedColumnarData); // tslint:disable-line:no-console
    },
    logWithTime(arg) {
        exports.logUtils.log(`[${chalk_1.default.gray(new Date().toLocaleTimeString())}] ${arg}`);
    },
};
//# sourceMappingURL=log_utils.js.map