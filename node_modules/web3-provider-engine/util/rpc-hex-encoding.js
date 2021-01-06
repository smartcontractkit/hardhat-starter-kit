const ethUtil = require('ethereumjs-util')
const assert = require('./assert.js')

module.exports = {
  intToQuantityHex: intToQuantityHex,
  quantityHexToInt: quantityHexToInt,
}

/*
 * As per https://github.com/ethereum/wiki/wiki/JSON-RPC#hex-value-encoding
 * Quanities should be represented by the most compact hex representation possible
 * This means that no leading zeroes are allowed. There helpers make it easy
 * to convert to and from integers and their compact hex representation
 */

function intToQuantityHex(n){
    assert(typeof n === 'number' && n === Math.floor(n), 'intToQuantityHex arg must be an integer')
    var nHex = ethUtil.toBuffer(n).toString('hex')
    if (nHex[0] === '0') {
        nHex = nHex.substring(1)
    }
    return ethUtil.addHexPrefix(nHex)
}

function quantityHexToInt(prefixedQuantityHex) {
    assert(typeof prefixedQuantityHex === 'string', 'arg to quantityHexToInt must be a string')
    var quantityHex = ethUtil.stripHexPrefix(prefixedQuantityHex)
    var isEven = quantityHex.length % 2 === 0
    if (!isEven) {
        quantityHex = '0' + quantityHex
    }
    var buf = new Buffer(quantityHex, 'hex')
    return ethUtil.bufferToInt(buf)
}
