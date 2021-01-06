var base58 = require('bs58')
var createHash = require('create-hash')

function encode (payload, version) {
  if (Array.isArray(payload) || payload instanceof Uint8Array) {
    payload = new Buffer(payload)
  }

  var buf
  if (version != null) {
    if (typeof version === 'number') {
      version = new Buffer([version])
    }
    buf = Buffer.concat([version, payload])
  } else {
    buf = payload
  }

  var checksum = sha256x2(buf).slice(0, 4)
  var result = Buffer.concat([buf, checksum])
  return base58.encode(result)
}

function decode (base58str, version) {
  var arr = base58.decode(base58str)
  var buf = new Buffer(arr)
  var versionLength

  if (version == null) {
    versionLength = 0
  } else {
    if (typeof version === 'number') version = new Buffer([version])

    versionLength = version.length
    var versionCompare = buf.slice(0, versionLength)
    if (versionCompare.toString('hex') !== version.toString('hex')) {
      throw new Error('Invalid version')
    }
  }

  var checksum = buf.slice(-4)
  var endPos = buf.length - 4
  var bytes = buf.slice(0, endPos)

  var newChecksum = sha256x2(bytes).slice(0, 4)
  if (checksum.toString('hex') !== newChecksum.toString('hex')) {
    throw new Error('Invalid checksum')
  }

  return bytes.slice(versionLength)
}

function isValid (base58str, version) {
  try {
    decode(base58str, version)
  } catch (e) {
    return false
  }

  return true
}

function createEncoder (version) {
  return function (payload) {
    return encode(payload, version)
  }
}

function createDecoder (version) {
  return function (base58str) {
    return decode(base58str, version)
  }
}

function createValidator (version) {
  return function (base58str) {
    return isValid(base58str, version)
  }
}

function sha256x2 (buffer) {
  var sha = createHash('sha256').update(buffer).digest()
  return createHash('sha256').update(sha).digest()
}

module.exports = {
  encode: encode,
  decode: decode,
  isValid: isValid,
  createEncoder: createEncoder,
  createDecoder: createDecoder,
  createValidator: createValidator
}
