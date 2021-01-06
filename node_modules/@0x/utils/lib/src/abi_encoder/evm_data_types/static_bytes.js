"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const blob_1 = require("../abstract_data_types/types/blob");
const constants_1 = require("../utils/constants");
class StaticBytesDataType extends blob_1.AbstractBlobDataType {
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory, StaticBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME);
        if (!StaticBytesDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Static Bytes with bad input: ${dataItem}`);
        }
        this._width = StaticBytesDataType._decodeWidthFromType(dataItem.type);
    }
    static matchType(type) {
        return StaticBytesDataType._MATCHER.test(type);
    }
    static _decodeWidthFromType(type) {
        const matches = StaticBytesDataType._MATCHER.exec(type);
        const width = matches !== null && matches.length === 3 && matches[2] !== undefined
            ? parseInt(matches[2], constants_1.constants.DEC_BASE)
            : StaticBytesDataType._DEFAULT_WIDTH;
        return width;
    }
    getSignatureType() {
        // Note that `byte` reduces to `bytes1`
        return `${ethereum_types_1.SolidityTypes.Bytes}${this._width}`;
    }
    encodeValue(value) {
        // 1/2 Convert value into a buffer and do bounds checking
        this._sanityCheckValue(value);
        const valueBuf = ethUtil.toBuffer(value);
        // 2/2 Store value as hex
        const valuePadded = ethUtil.setLengthRight(valueBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return valuePadded;
    }
    decodeValue(calldata) {
        const valueBufPadded = calldata.popWord();
        const valueBuf = valueBufPadded.slice(0, this._width);
        const value = ethUtil.bufferToHex(valueBuf);
        this._sanityCheckValue(value);
        return value;
    }
    getDefaultValue() {
        const valueBufPadded = constants_1.constants.EMPTY_EVM_WORD_BUFFER;
        const valueBuf = valueBufPadded.slice(0, this._width);
        const value = ethUtil.bufferToHex(valueBuf);
        return value;
    }
    _sanityCheckValue(value) {
        if (typeof value === 'string') {
            if (!_.startsWith(value, '0x')) {
                throw new Error(`Tried to encode non-hex value. Value must include '0x' prefix.`);
            }
            else if (value.length % 2 !== 0) {
                throw new Error(`Tried to assign ${value}, which is contains a half-byte. Use full bytes only.`);
            }
        }
        const valueBuf = ethUtil.toBuffer(value);
        if (valueBuf.byteLength > this._width) {
            throw new Error(`Tried to assign ${value} (${valueBuf.byteLength} bytes), which exceeds max bytes that can be stored in a ${this.getSignature()}`);
        }
    }
}
StaticBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
StaticBytesDataType._MATCHER = RegExp('^(byte|bytes(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32))$');
StaticBytesDataType._DEFAULT_WIDTH = 1;
exports.StaticBytesDataType = StaticBytesDataType;
//# sourceMappingURL=static_bytes.js.map