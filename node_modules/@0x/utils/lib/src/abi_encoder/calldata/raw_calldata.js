"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const constants_1 = require("../utils/constants");
const queue_1 = require("../utils/queue");
class RawCalldata {
    constructor(value, hasSelector = true) {
        // Sanity check
        if (typeof value === 'string' && !_.startsWith(value, '0x')) {
            throw new Error(`Expected raw calldata to start with '0x'`);
        }
        // Construct initial values
        this._value = ethUtil.toBuffer(value);
        this._selector = '0x';
        this._scopes = new queue_1.Queue();
        this._scopes.pushBack(RawCalldata._INITIAL_OFFSET);
        this._offset = RawCalldata._INITIAL_OFFSET;
        // If there's a selector then slice it
        if (hasSelector) {
            const selectorBuf = this._value.slice(constants_1.constants.HEX_SELECTOR_LENGTH_IN_BYTES);
            this._value = this._value.slice(constants_1.constants.HEX_SELECTOR_LENGTH_IN_BYTES);
            this._selector = ethUtil.bufferToHex(selectorBuf);
        }
    }
    popBytes(lengthInBytes) {
        const popBegin = this._offset;
        const popEnd = popBegin + lengthInBytes;
        if (popEnd > this._value.byteLength) {
            throw new Error(`Tried to decode beyond the end of calldata`);
        }
        const value = this._value.slice(popBegin, popEnd);
        this.setOffset(popEnd);
        return value;
    }
    popWord() {
        const wordInBytes = 32;
        return this.popBytes(wordInBytes);
    }
    popWords(length) {
        const wordInBytes = 32;
        return this.popBytes(length * wordInBytes);
    }
    readBytes(from, to) {
        const value = this._value.slice(from, to);
        return value;
    }
    setOffset(offsetInBytes) {
        this._offset = offsetInBytes;
    }
    startScope() {
        this._scopes.pushFront(this._offset);
    }
    endScope() {
        this._scopes.popFront();
    }
    getOffset() {
        return this._offset;
    }
    toAbsoluteOffset(relativeOffset) {
        const scopeOffset = this._scopes.peekFront();
        if (scopeOffset === undefined) {
            throw new Error(`Tried to access undefined scope.`);
        }
        const absoluteOffset = relativeOffset + scopeOffset;
        return absoluteOffset;
    }
    getSelector() {
        return this._selector;
    }
    getSizeInBytes() {
        const sizeInBytes = this._value.byteLength;
        return sizeInBytes;
    }
}
RawCalldata._INITIAL_OFFSET = 0;
exports.RawCalldata = RawCalldata;
//# sourceMappingURL=raw_calldata.js.map