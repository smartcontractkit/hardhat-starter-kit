"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const configured_bignumber_1 = require("../../configured_bignumber");
const constants_1 = require("../utils/constants");
function sanityCheckBigNumberRange(value_, minValue, maxValue) {
    const value = new configured_bignumber_1.BigNumber(value_, 10);
    if (value.isGreaterThan(maxValue)) {
        throw new Error(`Tried to assign value of ${value}, which exceeds max value of ${maxValue}`);
    }
    else if (value.isLessThan(minValue)) {
        throw new Error(`Tried to assign value of ${value}, which exceeds min value of ${minValue}`);
    }
    else if (value.isNaN()) {
        throw new Error(`Tried to assign NaN value`);
    }
}
function bigNumberToPaddedBuffer(value) {
    const valueHex = `0x${value.toString(constants_1.constants.HEX_BASE)}`;
    const valueBuf = ethUtil.toBuffer(valueHex);
    const valueBufPadded = ethUtil.setLengthLeft(valueBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
    return valueBufPadded;
}
/**
 * Takes a numeric value and returns its ABI-encoded value
 * @param value_    The value to encode.
 * @return ABI Encoded value
 */
function encodeNumericValue(value_) {
    const value = new configured_bignumber_1.BigNumber(value_, 10);
    // Case 1/2: value is non-negative
    if (value.isGreaterThanOrEqualTo(0)) {
        const encodedPositiveValue = bigNumberToPaddedBuffer(value);
        return encodedPositiveValue;
    }
    // Case 2/2: Value is negative
    // Use two's-complement to encode the value
    // Step 1/3: Convert negative value to positive binary string
    const valueBin = value.times(-1).toString(constants_1.constants.BIN_BASE);
    // Step 2/3: Invert binary value
    let invertedValueBin = '1'.repeat(constants_1.constants.EVM_WORD_WIDTH_IN_BITS - valueBin.length);
    _.each(valueBin, (bit) => {
        invertedValueBin += bit === '1' ? '0' : '1';
    });
    const invertedValue = new configured_bignumber_1.BigNumber(invertedValueBin, constants_1.constants.BIN_BASE);
    // Step 3/3: Add 1 to inverted value
    const negativeValue = invertedValue.plus(1);
    const encodedValue = bigNumberToPaddedBuffer(negativeValue);
    return encodedValue;
}
exports.encodeNumericValue = encodeNumericValue;
/**
 * Takes a numeric value and returns its ABI-encoded value.
 * Performs an additional sanity check, given the min/max allowed value.
 * @param value_    The value to encode.
 * @return ABI Encoded value
 */
function safeEncodeNumericValue(value, minValue, maxValue) {
    sanityCheckBigNumberRange(value, minValue, maxValue);
    const encodedValue = encodeNumericValue(value);
    return encodedValue;
}
exports.safeEncodeNumericValue = safeEncodeNumericValue;
/**
 * Takes an ABI-encoded numeric value and returns its decoded value as a BigNumber.
 * @param encodedValue    The encoded numeric value.
 * @param minValue        The minimum possible decoded value.
 * @return ABI Decoded value
 */
function decodeNumericValue(encodedValue, minValue) {
    const valueHex = ethUtil.bufferToHex(encodedValue);
    // Case 1/3: value is definitely non-negative because of numeric boundaries
    const value = new configured_bignumber_1.BigNumber(valueHex, constants_1.constants.HEX_BASE);
    if (!minValue.isLessThan(0)) {
        return value;
    }
    // Case 2/3: value is non-negative because there is no leading 1 (encoded as two's-complement)
    const valueBin = value.toString(constants_1.constants.BIN_BASE);
    const isValueNegative = valueBin.length === constants_1.constants.EVM_WORD_WIDTH_IN_BITS && _.startsWith(valueBin[0], '1');
    if (!isValueNegative) {
        return value;
    }
    // Case 3/3: value is negative
    // Step 1/3: Invert b inary value
    let invertedValueBin = '';
    _.each(valueBin, (bit) => {
        invertedValueBin += bit === '1' ? '0' : '1';
    });
    const invertedValue = new configured_bignumber_1.BigNumber(invertedValueBin, constants_1.constants.BIN_BASE);
    // Step 2/3: Add 1 to inverted value
    // The result is the two's-complement representation of the input value.
    const positiveValue = invertedValue.plus(1);
    // Step 3/3: Invert positive value to get the negative value
    const negativeValue = positiveValue.times(-1);
    return negativeValue;
}
exports.decodeNumericValue = decodeNumericValue;
/**
 * Takes an ABI-encoded numeric value and returns its decoded value as a BigNumber.
 * Performs an additional sanity check, given the min/max allowed value.
 * @param encodedValue    The encoded numeric value.
 * @param minValue        The minimum possible decoded value.
 * @return ABI Decoded value
 */
function safeDecodeNumericValue(encodedValue, minValue, maxValue) {
    const value = decodeNumericValue(encodedValue, minValue);
    sanityCheckBigNumberRange(value, minValue, maxValue);
    return value;
}
exports.safeDecodeNumericValue = safeDecodeNumericValue;
//# sourceMappingURL=math.js.map