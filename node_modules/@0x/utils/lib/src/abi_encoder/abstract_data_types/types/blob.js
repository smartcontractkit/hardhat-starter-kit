"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blob_1 = require("../../calldata/blocks/blob");
const data_type_1 = require("../data_type");
class AbstractBlobDataType extends data_type_1.DataType {
    constructor(dataItem, factory, sizeKnownAtCompileTime) {
        super(dataItem, factory);
        this._sizeKnownAtCompileTime = sizeKnownAtCompileTime;
    }
    generateCalldataBlock(value, parentBlock) {
        const encodedValue = this.encodeValue(value);
        const name = this.getDataItem().name;
        const signature = this.getSignature();
        const parentName = parentBlock === undefined ? '' : parentBlock.getName();
        const block = new blob_1.BlobCalldataBlock(name, signature, parentName, encodedValue);
        return block;
    }
    generateValue(calldata, rules) {
        const value = this.decodeValue(calldata);
        return value;
    }
    isStatic() {
        return this._sizeKnownAtCompileTime;
    }
}
exports.AbstractBlobDataType = AbstractBlobDataType;
//# sourceMappingURL=blob.js.map