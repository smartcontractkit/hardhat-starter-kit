"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const blob_1 = require("../abstract_data_types/types/blob");
const constants_1 = require("../utils/constants");
class AddressDataType extends blob_1.AbstractBlobDataType {
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory, AddressDataType._SIZE_KNOWN_AT_COMPILE_TIME);
        if (!AddressDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Address with bad input: ${dataItem}`);
        }
    }
    static matchType(type) {
        return type === ethereum_types_1.SolidityTypes.Address;
    }
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    encodeValue(value) {
        if (!ethUtil.isValidAddress(value)) {
            throw new Error(`Invalid address: '${value}'`);
        }
        const valueBuf = ethUtil.toBuffer(value);
        const encodedValueBuf = ethUtil.setLengthLeft(valueBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return encodedValueBuf;
    }
    decodeValue(calldata) {
        const valueBufPadded = calldata.popWord();
        const valueBuf = valueBufPadded.slice(AddressDataType._DECODED_ADDRESS_OFFSET_IN_BYTES);
        const value = ethUtil.bufferToHex(valueBuf);
        const valueLowercase = _.toLower(value);
        return valueLowercase;
    }
    getDefaultValue() {
        return AddressDataType._DEFAULT_VALUE;
    }
    getSignatureType() {
        return ethereum_types_1.SolidityTypes.Address;
    }
}
AddressDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
AddressDataType._ADDRESS_SIZE_IN_BYTES = 20;
AddressDataType._DECODED_ADDRESS_OFFSET_IN_BYTES = constants_1.constants.EVM_WORD_WIDTH_IN_BYTES - AddressDataType._ADDRESS_SIZE_IN_BYTES;
AddressDataType._DEFAULT_VALUE = '0x0000000000000000000000000000000000000000';
exports.AddressDataType = AddressDataType;
//# sourceMappingURL=address.js.map