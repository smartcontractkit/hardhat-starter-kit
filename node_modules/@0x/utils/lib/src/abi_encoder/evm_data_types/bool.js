"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const ethUtil = require("ethereumjs-util");
const configured_bignumber_1 = require("../../configured_bignumber");
const blob_1 = require("../abstract_data_types/types/blob");
const constants_1 = require("../utils/constants");
class BoolDataType extends blob_1.AbstractBlobDataType {
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory, BoolDataType._SIZE_KNOWN_AT_COMPILE_TIME);
        if (!BoolDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Bool with bad input: ${dataItem}`);
        }
    }
    static matchType(type) {
        return type === ethereum_types_1.SolidityTypes.Bool;
    }
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    encodeValue(value) {
        const encodedValue = value ? '0x1' : '0x0';
        const encodedValueBuf = ethUtil.setLengthLeft(ethUtil.toBuffer(encodedValue), constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return encodedValueBuf;
    }
    decodeValue(calldata) {
        const valueBuf = calldata.popWord();
        const valueHex = ethUtil.bufferToHex(valueBuf);
        // Hack @hysz: there are some cases where `false` is encoded as 0x instead of 0x0.
        const valueNumber = valueHex === '0x' ? new configured_bignumber_1.BigNumber(0) : new configured_bignumber_1.BigNumber(valueHex, constants_1.constants.HEX_BASE);
        if (!(valueNumber.isEqualTo(0) || valueNumber.isEqualTo(1))) {
            throw new Error(`Failed to decode boolean. Expected 0x0 or 0x1, got ${valueHex}`);
        }
        /* tslint:disable boolean-naming */
        const value = !valueNumber.isEqualTo(0);
        /* tslint:enable boolean-naming */
        return value;
    }
    getDefaultValue() {
        return BoolDataType._DEFAULT_VALUE;
    }
    getSignatureType() {
        return ethereum_types_1.SolidityTypes.Bool;
    }
}
BoolDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
BoolDataType._DEFAULT_VALUE = false;
exports.BoolDataType = BoolDataType;
//# sourceMappingURL=bool.js.map