"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
const pointer_1 = require("../../calldata/blocks/pointer");
const constants_1 = require("../../utils/constants");
const data_type_1 = require("../data_type");
class AbstractPointerDataType extends data_type_1.DataType {
    constructor(dataItem, factory, destination, parent) {
        super(dataItem, factory);
        this._destination = destination;
        this._parent = parent;
    }
    generateCalldataBlock(value, parentBlock) {
        if (parentBlock === undefined) {
            throw new Error(`DependentDataType requires a parent block to generate its block`);
        }
        const destinationBlock = this._destination.generateCalldataBlock(value, parentBlock);
        const name = this.getDataItem().name;
        const signature = this.getSignature();
        const parentName = parentBlock.getName();
        const block = new pointer_1.PointerCalldataBlock(name, signature, parentName, destinationBlock, parentBlock);
        return block;
    }
    generateValue(calldata, rules) {
        const destinationOffsetBuf = calldata.popWord();
        const destinationOffsetHex = ethUtil.bufferToHex(destinationOffsetBuf);
        const destinationOffsetRelative = parseInt(destinationOffsetHex, constants_1.constants.HEX_BASE);
        const destinationOffsetAbsolute = calldata.toAbsoluteOffset(destinationOffsetRelative);
        const currentOffset = calldata.getOffset();
        calldata.setOffset(destinationOffsetAbsolute);
        const value = this._destination.generateValue(calldata, rules);
        calldata.setOffset(currentOffset);
        return value;
    }
    // Disable prefer-function-over-method for inherited abstract method.
    /* tslint:disable prefer-function-over-method */
    isStatic() {
        return true;
    }
}
exports.AbstractPointerDataType = AbstractPointerDataType;
//# sourceMappingURL=pointer.js.map