"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const blob_1 = require("../abstract_data_types/types/blob");
const constants_1 = require("../utils/constants");
class DynamicBytesDataType extends blob_1.AbstractBlobDataType {
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory, DynamicBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME);
        if (!DynamicBytesDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Dynamic Bytes with bad input: ${dataItem}`);
        }
    }
    static matchType(type) {
        return type === ethereum_types_1.SolidityTypes.Bytes;
    }
    static _sanityCheckValue(value) {
        if (typeof value !== 'string') {
            return;
        }
        if (!_.startsWith(value, '0x')) {
            throw new Error(`Tried to encode non-hex value. Value must include '0x' prefix.`);
        }
        else if (value.length % 2 !== 0) {
            throw new Error(`Tried to assign ${value}, which is contains a half-byte. Use full bytes only.`);
        }
    }
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    encodeValue(value) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/3 Construct the length
        const valueBuf = ethUtil.toBuffer(value);
        const wordsToStoreValuePadded = Math.ceil(valueBuf.byteLength / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        const bytesToStoreValuePadded = wordsToStoreValuePadded * constants_1.constants.EVM_WORD_WIDTH_IN_BYTES;
        const lengthBuf = ethUtil.toBuffer(valueBuf.byteLength);
        const lengthBufPadded = ethUtil.setLengthLeft(lengthBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        // 2/3 Construct the value
        DynamicBytesDataType._sanityCheckValue(value);
        const valueBufPadded = ethUtil.setLengthRight(valueBuf, bytesToStoreValuePadded);
        // 3/3 Combine length and value
        const encodedValue = Buffer.concat([lengthBufPadded, valueBufPadded]);
        return encodedValue;
    }
    decodeValue(calldata) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/2 Decode length
        const lengthBuf = calldata.popWord();
        const lengthHex = ethUtil.bufferToHex(lengthBuf);
        const length = parseInt(lengthHex, constants_1.constants.HEX_BASE);
        // 2/2 Decode value
        const wordsToStoreValuePadded = Math.ceil(length / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        const valueBufPadded = calldata.popWords(wordsToStoreValuePadded);
        const valueBuf = valueBufPadded.slice(0, length);
        const value = ethUtil.bufferToHex(valueBuf);
        DynamicBytesDataType._sanityCheckValue(value);
        return value;
    }
    getDefaultValue() {
        return DynamicBytesDataType._DEFAULT_VALUE;
    }
    getSignatureType() {
        return ethereum_types_1.SolidityTypes.Bytes;
    }
}
DynamicBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME = false;
DynamicBytesDataType._DEFAULT_VALUE = '0x';
exports.DynamicBytesDataType = DynamicBytesDataType;
//# sourceMappingURL=dynamic_bytes.js.map