"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const ethUtil = require("ethereumjs-util");
const configured_bignumber_1 = require("./configured_bignumber");
// tslint:disable:custom-no-magic-numbers
const WORD_LENGTH = 32;
const WORD_CEIL = new configured_bignumber_1.BigNumber(2).pow(WORD_LENGTH * 8);
exports.hexUtils = {
    concat,
    random,
    leftPad,
    rightPad,
    invert,
    slice,
    hash,
    size,
    toHex,
    isHex,
};
/**
 * Concatenate all arguments as a hex string.
 */
function concat(...args) {
    return ethUtil.bufferToHex(Buffer.concat(args.map(h => ethUtil.toBuffer(h))));
}
/**
 * Generate a random hex string.
 */
function random(_size = WORD_LENGTH) {
    return ethUtil.bufferToHex(crypto.randomBytes(_size));
}
/**
 * Left-pad a hex number to a number of bytes.
 */
function leftPad(n, _size = WORD_LENGTH) {
    return ethUtil.bufferToHex(ethUtil.setLengthLeft(exports.hexUtils.toHex(n), _size));
}
/**
 * Right-pad a hex number to a number of bytes.
 */
function rightPad(n, _size = WORD_LENGTH) {
    return ethUtil.bufferToHex(ethUtil.setLengthRight(exports.hexUtils.toHex(n), _size));
}
/**
 * Inverts a hex word.
 */
function invert(n, _size = WORD_LENGTH) {
    const buf = ethUtil.setLengthLeft(exports.hexUtils.toHex(n), _size);
    // tslint:disable-next-line: no-bitwise
    return ethUtil.bufferToHex(Buffer.from(buf.map(b => ~b)));
}
/**
 * Slices a hex number.
 */
function slice(n, start, end) {
    const hex = exports.hexUtils.toHex(n).substr(2);
    const sliceStart = start >= 0 ? start * 2 : Math.max(0, hex.length + start * 2);
    let sliceEnd = hex.length;
    if (end !== undefined) {
        sliceEnd = end >= 0 ? end * 2 : Math.max(0, hex.length + end * 2);
    }
    return '0x'.concat(hex.substring(sliceStart, sliceEnd));
}
/**
 * Get the keccak hash of some data.
 */
function hash(n) {
    return ethUtil.bufferToHex(ethUtil.sha3(ethUtil.toBuffer(exports.hexUtils.toHex(n))));
}
/**
 * Get the length, in bytes, of a hex string.
 */
function size(hex) {
    return Math.ceil((hex.length - 2) / 2);
}
/**
 * Convert a string, a number, a Buffer, or a BigNumber into a hex string.
 * Works with negative numbers, as well.
 */
function toHex(n, _size = WORD_LENGTH) {
    if (Buffer.isBuffer(n)) {
        return `0x${n.toString('hex')}`;
    }
    if (typeof n === 'string' && /^0x[0-9a-f]+$/i.test(n)) {
        // Already a hex.
        return n;
    }
    let _n = new configured_bignumber_1.BigNumber(n);
    if (_n.isNegative()) {
        // Perform two's-complement.
        // prettier-ignore
        _n = new configured_bignumber_1.BigNumber(invert(toHex(_n.abs()), _size).substr(2), 16).plus(1).mod(WORD_CEIL);
    }
    return `0x${_n.toString(16)}`;
}
/**
 * Check if a string is a hex string.
 */
function isHex(s) {
    return /^0x[0-9a-f]+$/i.test(s);
}
//# sourceMappingURL=hex_utils.js.map