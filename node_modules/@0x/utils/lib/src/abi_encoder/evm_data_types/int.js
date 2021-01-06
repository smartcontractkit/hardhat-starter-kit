"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const configured_bignumber_1 = require("../../configured_bignumber");
const blob_1 = require("../abstract_data_types/types/blob");
const constants_1 = require("../utils/constants");
const EncoderMath = require("../utils/math");
class IntDataType extends blob_1.AbstractBlobDataType {
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory, IntDataType._SIZE_KNOWN_AT_COMPILE_TIME);
        if (!IntDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Int with bad input: ${dataItem}`);
        }
        this._width = IntDataType._decodeWidthFromType(dataItem.type);
        this._minValue = new configured_bignumber_1.BigNumber(2).exponentiatedBy(this._width - 1).times(-1);
        this._maxValue = new configured_bignumber_1.BigNumber(2).exponentiatedBy(this._width - 1).minus(1);
    }
    static matchType(type) {
        return IntDataType._MATCHER.test(type);
    }
    static _decodeWidthFromType(type) {
        const matches = IntDataType._MATCHER.exec(type);
        const width = matches !== null && matches.length === 2 && matches[1] !== undefined
            ? parseInt(matches[1], constants_1.constants.DEC_BASE)
            : IntDataType._DEFAULT_WIDTH;
        return width;
    }
    encodeValue(value) {
        const encodedValue = EncoderMath.safeEncodeNumericValue(value, this._minValue, this._maxValue);
        return encodedValue;
    }
    decodeValue(calldata) {
        const valueBuf = calldata.popWord();
        const value = EncoderMath.safeDecodeNumericValue(valueBuf, this._minValue, this._maxValue);
        if (this._width === constants_1.constants.NUMBER_OF_BYTES_IN_INT8) {
            return value.toNumber();
        }
        return value;
    }
    getDefaultValue() {
        const defaultValue = IntDataType._DEFAULT_VALUE;
        if (this._width === constants_1.constants.NUMBER_OF_BYTES_IN_INT8) {
            return defaultValue.toNumber();
        }
        return defaultValue;
    }
    getSignatureType() {
        return `${ethereum_types_1.SolidityTypes.Int}${this._width}`;
    }
}
IntDataType._MATCHER = RegExp('^int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256){0,1}$');
IntDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
IntDataType._MAX_WIDTH = 256;
IntDataType._DEFAULT_WIDTH = IntDataType._MAX_WIDTH;
IntDataType._DEFAULT_VALUE = new configured_bignumber_1.BigNumber(0);
exports.IntDataType = IntDataType;
//# sourceMappingURL=int.js.map