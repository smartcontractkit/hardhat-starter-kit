const { Buffer } = require('buffer');
const ethUtil = require('ethereumjs-util');
const ethAbi = require('ethereumjs-abi');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const TYPED_MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    types: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {type: 'string'},
            type: {type: 'string'},
          },
          required: ['name', 'type'],
        },
      },
    },
    primaryType: {type: 'string'},
    domain: {type: 'object'},
    message: {type: 'object'},
  },
  required: ['types', 'primaryType', 'domain', 'message'],
}

/**
 * A collection of utility functions used for signing typed data
 */
const TypedDataUtils = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */
  encodeData (primaryType, data, types, useV4 = true) {
    const encodedTypes = ['bytes32']
    const encodedValues = [this.hashType(primaryType, types)]

    if(useV4) {
      const encodeField = (name, type, value) => {
        if (types[type] !== undefined) {
          return ['bytes32', value == null ?
            '0x0000000000000000000000000000000000000000000000000000000000000000' :
            ethUtil.sha3(this.encodeData(type, value, types, useV4))]
        }

        if(value === undefined)
          throw new Error(`missing value for field ${name} of type ${type}`)

        if (type === 'bytes') {
          return ['bytes32', ethUtil.sha3(value)]
        }

        if (type === 'string') {
          // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
          if (typeof value === 'string') {
            value = Buffer.from(value, 'utf8')
          }
          return ['bytes32', ethUtil.sha3(value)]
        }

        if (type.lastIndexOf(']') === type.length - 1) {
          const parsedType = type.slice(0, type.lastIndexOf('['))
          const typeValuePairs = value.map(item =>
            encodeField(name, parsedType, item))
          return ['bytes32', ethUtil.sha3(ethAbi.rawEncode(
            typeValuePairs.map(([type]) => type),
            typeValuePairs.map(([, value]) => value),
          ))]
        }

        return [type, value]
      }

      for (const field of types[primaryType]) {
        const [type, value] = encodeField(field.name, field.type, data[field.name])
        encodedTypes.push(type)
        encodedValues.push(value)
      }
    } else {
      for (const field of types[primaryType]) {
        let value = data[field.name]
        if (value !== undefined) {
          if (field.type === 'bytes') {
            encodedTypes.push('bytes32')
            value = ethUtil.sha3(value)
            encodedValues.push(value)
          } else if (field.type === 'string') {
            encodedTypes.push('bytes32')
            // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
            if (typeof value === 'string') {
              value = Buffer.from(value, 'utf8')
            }
            value = ethUtil.sha3(value)
            encodedValues.push(value)
          } else if (types[field.type] !== undefined) {
            encodedTypes.push('bytes32')
            value = ethUtil.sha3(this.encodeData(field.type, value, types, useV4))
            encodedValues.push(value)
          } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw new Error('Arrays currently unimplemented in encodeData')
          } else {
            encodedTypes.push(field.type)
            encodedValues.push(value)
          }
        }
      }
    }

    return ethAbi.rawEncode(encodedTypes, encodedValues)
  },

  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType (primaryType, types) {
    let result = ''
    let deps = this.findTypeDependencies(primaryType, types).filter(dep => dep !== primaryType)
    deps = [primaryType].concat(deps.sort())
    for (const type of deps) {
      const children = types[type]
      if (!children) {
        throw new Error('No type definition specified: ' + type)
      }
      result += type + '(' + types[type].map(({ name, type }) => type + ' ' + name).join(',') + ')'
    }
    return result
  },

  /**
   * Finds all types within a type defintion object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies (primaryType, types, results = []) {
    primaryType = primaryType.match(/^\w*/)[0]
    if (results.includes(primaryType) || types[primaryType] === undefined) { return results }
    results.push(primaryType)
    for (const field of types[primaryType]) {
      for (const dep of this.findTypeDependencies(field.type, types, results)) {
        !results.includes(dep) && results.push(dep)
      }
    }
    return results
  },

  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashStruct (primaryType, data, types, useV4 = true) {
    return ethUtil.sha3(this.encodeData(primaryType, data, types, useV4))
  },

  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashType (primaryType, types) {
    return ethUtil.sha3(this.encodeType(primaryType, types))
  },

  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData (data) {
    const sanitizedData = {}
    for (const key in TYPED_MESSAGE_SCHEMA.properties) {
      data[key] && (sanitizedData[key] = data[key])
    }
    if (sanitizedData.types) {
      sanitizedData.types = Object.assign({ EIP712Domain: [] }, sanitizedData.types)
    }
    return sanitizedData
  },

  /**
   * Signs a typed message as per EIP-712 and returns its sha3 hash
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash of the resulting signed message
   */
  sign (typedData, useV4 = true) {
    const sanitizedData = this.sanitizeData(typedData)
    const parts = [Buffer.from('1901', 'hex')]
    parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4))
    if (sanitizedData.primaryType !== 'EIP712Domain') {
      parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4))
    }
    return ethUtil.sha3(Buffer.concat(parts))
  },
}

module.exports = {
  TYPED_MESSAGE_SCHEMA,
  TypedDataUtils,

  concatSig: function (v, r, s) {
    const rSig = ethUtil.fromSigned(r)
    const sSig = ethUtil.fromSigned(s)
    const vSig = ethUtil.bufferToInt(v)
    const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64)
    const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64)
    const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig))
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex')
  },

  normalize: function (input) {
    if (!input) return

    if (typeof input === 'number') {
      const buffer = ethUtil.toBuffer(input)
      input = ethUtil.bufferToHex(buffer)
    }

    if (typeof input !== 'string') {
      var msg = 'eth-sig-util.normalize() requires hex string or integer input.'
      msg += ' received ' + (typeof input) + ': ' + input
      throw new Error(msg)
    }

    return ethUtil.addHexPrefix(input.toLowerCase())
  },

  personalSign: function (privateKey, msgParams) {
    var message = ethUtil.toBuffer(msgParams.data)
    var msgHash = ethUtil.hashPersonalMessage(message)
    var sig = ethUtil.ecsign(msgHash, privateKey)
    var serialized = ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
    return serialized
  },

  recoverPersonalSignature: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams)
    const sender = ethUtil.publicToAddress(publicKey)
    const senderHex = ethUtil.bufferToHex(sender)
    return senderHex
  },

  extractPublicKey: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams)
    return '0x' + publicKey.toString('hex')
  },

  typedSignatureHash: function (typedData) {
    const hashBuffer = typedSignatureHash(typedData)
    return ethUtil.bufferToHex(hashBuffer)
  },

  signTypedDataLegacy: function (privateKey, msgParams) {
    const msgHash = typedSignatureHash(msgParams.data)
    const sig = ethUtil.ecsign(msgHash, privateKey)
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
  },

  recoverTypedSignatureLegacy: function (msgParams) {
    const msgHash = typedSignatureHash(msgParams.data)
    const publicKey = recoverPublicKey(msgHash, msgParams.sig)
    const sender = ethUtil.publicToAddress(publicKey)
    return ethUtil.bufferToHex(sender)
  },

  encrypt: function(receiverPublicKey, msgParams, version) {

    switch(version) {
      case 'x25519-xsalsa20-poly1305':
        if( typeof msgParams.data == 'undefined'){
          throw new Error('Cannot detect secret message, message params should be of the form {data: "secret message"} ')
        }
        //generate ephemeral keypair
        var ephemeralKeyPair = nacl.box.keyPair()

        // assemble encryption parameters - from string to UInt8
        try {
          var pubKeyUInt8Array = nacl.util.decodeBase64(receiverPublicKey);
        } catch (err){
          throw new Error('Bad public key')
        }

        var msgParamsUInt8Array = nacl.util.decodeUTF8(msgParams.data);
        var nonce = nacl.randomBytes(nacl.box.nonceLength);

        // encrypt
        var encryptedMessage = nacl.box(msgParamsUInt8Array, nonce, pubKeyUInt8Array, ephemeralKeyPair.secretKey);

        // handle encrypted data
        var output = {
          version: 'x25519-xsalsa20-poly1305',
          nonce: nacl.util.encodeBase64(nonce),
          ephemPublicKey: nacl.util.encodeBase64(ephemeralKeyPair.publicKey),
          ciphertext: nacl.util.encodeBase64(encryptedMessage)
        };
        // return encrypted msg data
        return output;

      default:
        throw new Error('Encryption type/version not supported')

    }
  },

  encryptSafely: function(receiverPublicKey, msgParams, version) {

    const DEFAULT_PADDING_LENGTH = (2 ** 11);
    const NACL_EXTRA_BYTES = 16;

    let data = msgParams.data;
    if (!data) {
      throw new Error('Cannot encrypt empty msg.data');
    }

    if (typeof data === 'object' && data.toJSON) {
      // remove toJSON attack vector
      // TODO, check all possible children
      throw new Error('Cannot encrypt with toJSON property.  Please remove toJSON property');
    }

    // add padding
    const dataWithPadding = {
      data,
      padding: '',
    };

    // calculate padding
    const dataLength = Buffer.byteLength(JSON.stringify(dataWithPadding), 'utf-8');
    const modVal = (dataLength % DEFAULT_PADDING_LENGTH);
    let padLength = 0;
    // Only pad if necessary
    if (modVal > 0) {
      padLength = (DEFAULT_PADDING_LENGTH - modVal) - NACL_EXTRA_BYTES; // nacl extra bytes
    }
    dataWithPadding.padding = '0'.repeat(padLength);

    const paddedMsgParams = {data:JSON.stringify(dataWithPadding)};
    return this.encrypt(receiverPublicKey, paddedMsgParams, version);
  },

  decrypt: function(encryptedData, receiverPrivateKey) {

    switch(encryptedData.version) {
      case 'x25519-xsalsa20-poly1305':
        //string to buffer to UInt8Array
        var recieverPrivateKeyUint8Array = nacl_decodeHex(receiverPrivateKey)
        var recieverEncryptionPrivateKey = nacl.box.keyPair.fromSecretKey(recieverPrivateKeyUint8Array).secretKey

        // assemble decryption parameters
        var nonce = nacl.util.decodeBase64(encryptedData.nonce);
        var ciphertext = nacl.util.decodeBase64(encryptedData.ciphertext);
        var ephemPublicKey = nacl.util.decodeBase64(encryptedData.ephemPublicKey);

        // decrypt
        var decryptedMessage = nacl.box.open(ciphertext, nonce, ephemPublicKey, recieverEncryptionPrivateKey);

        // return decrypted msg data
        try {
          var output = nacl.util.encodeUTF8(decryptedMessage);
        }catch(err) {
          throw new Error('Decryption failed.')
        }

        if (output){
          return output;
        }else{
          throw new Error('Decryption failed.')
        }


      default:
        throw new Error('Encryption type/version not supported.')
    }
  },

  decryptSafely: function(encryptedData, receiverPrivateKey) {
    const dataWithPadding = JSON.parse(this.decrypt(encryptedData, receiverPrivateKey));
    return dataWithPadding.data;
  },


  getEncryptionPublicKey: function(privateKey){
    var privateKeyUint8Array = nacl_decodeHex(privateKey)
    var encryptionPublicKey = nacl.box.keyPair.fromSecretKey(privateKeyUint8Array).publicKey
    return nacl.util.encodeBase64(encryptionPublicKey)
  },

  signTypedData: function (privateKey, msgParams) {
    const message = TypedDataUtils.sign(msgParams.data, false)
    const sig = ethUtil.ecsign(message, privateKey)
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
  },

  signTypedData_v4: function (privateKey, msgParams) {
    const message = TypedDataUtils.sign(msgParams.data)
    const sig = ethUtil.ecsign(message, privateKey)
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
  },

  recoverTypedSignature: function (msgParams) {
    const message = TypedDataUtils.sign(msgParams.data, false)
    const publicKey = recoverPublicKey(message, msgParams.sig)
    const sender = ethUtil.publicToAddress(publicKey)
    return ethUtil.bufferToHex(sender)
  },

  recoverTypedSignature_v4: function (msgParams) {
    const message = TypedDataUtils.sign(msgParams.data)
    const publicKey = recoverPublicKey(message, msgParams.sig)
    const sender = ethUtil.publicToAddress(publicKey)
    return ethUtil.bufferToHex(sender)
  },

}

/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */
function typedSignatureHash(typedData) {
  const error = new Error('Expect argument to be non-empty array')
  if (typeof typedData !== 'object' || !typedData.length) throw error

  const data = typedData.map(function (e) {
    return e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value
  })
  const types = typedData.map(function (e) { return e.type })
  const schema = typedData.map(function (e) {
    if (!e.name) throw error
    return e.type + ' ' + e.name
  })

  return ethAbi.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
      ethAbi.soliditySHA3(types, data)
    ]
  )
}

function recoverPublicKey(hash, sig) {
  const signature = ethUtil.toBuffer(sig)
  const sigParams = ethUtil.fromRpcSig(signature)
  return ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s)
}

function getPublicKeyFor (msgParams) {
  const message = ethUtil.toBuffer(msgParams.data)
  const msgHash = ethUtil.hashPersonalMessage(message)
  return recoverPublicKey(msgHash, msgParams.sig)
}


function padWithZeroes (number, length) {
  var myString = '' + number
  while (myString.length < length) {
    myString = '0' + myString
  }
  return myString
}

//converts hex strings to the Uint8Array format used by nacl
function nacl_decodeHex(msgHex) {
  var msgBase64 = (new Buffer(msgHex, 'hex')).toString('base64');
  return nacl.util.decodeBase64(msgBase64);
}



