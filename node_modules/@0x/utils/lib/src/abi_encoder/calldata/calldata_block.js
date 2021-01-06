"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
class CalldataBlock {
    constructor(name, signature, parentName, headerSizeInBytes, bodySizeInBytes) {
        this._name = name;
        this._signature = signature;
        this._parentName = parentName;
        this._offsetInBytes = 0;
        this._headerSizeInBytes = headerSizeInBytes;
        this._bodySizeInBytes = bodySizeInBytes;
    }
    _setHeaderSize(headerSizeInBytes) {
        this._headerSizeInBytes = headerSizeInBytes;
    }
    _setBodySize(bodySizeInBytes) {
        this._bodySizeInBytes = bodySizeInBytes;
    }
    _setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    getParentName() {
        return this._parentName;
    }
    getSignature() {
        return this._signature;
    }
    getHeaderSizeInBytes() {
        return this._headerSizeInBytes;
    }
    getBodySizeInBytes() {
        return this._bodySizeInBytes;
    }
    getSizeInBytes() {
        return this.getHeaderSizeInBytes() + this.getBodySizeInBytes();
    }
    getOffsetInBytes() {
        return this._offsetInBytes;
    }
    setOffset(offsetInBytes) {
        this._offsetInBytes = offsetInBytes;
    }
    computeHash() {
        const rawData = this.getRawData();
        const hash = ethUtil.sha3(rawData);
        return hash;
    }
}
exports.CalldataBlock = CalldataBlock;
//# sourceMappingURL=calldata_block.js.map