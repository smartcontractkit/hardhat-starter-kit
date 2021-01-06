const test = require('tape')
const sigUtil = require('../')
const ethUtil = require('ethereumjs-util')

test('normalize address lower cases', function (t) {
  t.plan(1)
  const initial = '0xA06599BD35921CfB5B71B4BE3869740385b0B306'
  const result = sigUtil.normalize(initial)
  t.equal(result, initial.toLowerCase())
})

test('normalize address adds hex prefix', function (t) {
  t.plan(1)
  const initial = 'A06599BD35921CfB5B71B4BE3869740385b0B306'
  const result = sigUtil.normalize(initial)
  t.equal(result, '0x' + initial.toLowerCase())
})

test('normalize an integer converts to byte-pair hex', function (t) {
  t.plan(1)
  const initial = 1
  const result = sigUtil.normalize(initial)
  t.equal(result, '0x01')
})

test('normalize an unsupported type throws', function (t) {
  t.plan(1)
  const initial = {}
  try {
    const result = sigUtil.normalize(initial)
    t.ok(false, 'did not throw')
  } catch (e) {
    t.ok(e, 'should throw')
  }
})

test('personalSign and recover', function (t) {
  t.plan(1)
  const address = '0x29c76e6ad8f28bb1004902578fb108c507be341b'
  console.log('for address ' + address)
  const privKeyHex = '4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0'
  const privKey = new Buffer(privKeyHex, 'hex')
  const message = 'Hello, world!'
  const msgParams = { data: message }

  const signed = sigUtil.personalSign(privKey, msgParams)
  msgParams.sig = signed
  const recovered = sigUtil.recoverPersonalSignature(msgParams)

  t.equal(recovered, address)
})

test('personalSign and extractPublicKey', function (t) {
  t.plan(1)
  const privKeyHex = '4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0'
  const pubKeyHex = '0x9e9e45b2ec5f070b4e26f57c7fedf647afa7a03e894789816fbd12fedc5acd79d0dfeea925688e177caccb8f5e09f0c289bbcfc7adb98d76f5f8c5259478903a'

  const privKey = new Buffer(privKeyHex, 'hex')
  const message = 'Hello, world!'
  const msgParams = { data: message }

  const signed = sigUtil.personalSign(privKey, msgParams)
  msgParams.sig = signed
  const publicKey = sigUtil.extractPublicKey(msgParams)

  t.equal(publicKey, pubKeyHex)
})

test('signTypedDataLegacy and recoverTypedSignatureLegacy - single message', function (t) {
  t.plan(1)
  const address = '0x29c76e6ad8f28bb1004902578fb108c507be341b'
  const privKeyHex = '4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0'

  const privKey = Buffer.from(privKeyHex, 'hex')

  const typedData = [
    {
      type: 'string',
      name: 'message',
      value: 'Hi, Alice!'
    }
  ]

  const msgParams = { data: typedData }

  const signature = sigUtil.signTypedDataLegacy(privKey, msgParams)
  const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams.data, sig: signature })

  t.equal(address, recovered)
})

test('signTypedDataLegacy and recoverTypedSignatureLegacy - multiple messages', function (t) {
  t.plan(1)
  const address = '0x29c76e6ad8f28bb1004902578fb108c507be341b'
  const privKeyHex = '4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0'

  const privKey = Buffer.from(privKeyHex, 'hex')

  const typedData = [
    {
      type: 'string',
      name: 'message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint8',
      name: 'value',
      value: 10
    },
  ]

  const msgParams = { data: typedData }

  const signature = sigUtil.signTypedDataLegacy(privKey, msgParams)
  const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams.data, sig: signature })

  t.equal(address, recovered)
})

test('typedSignatureHash - single value', function (t) {
  t.plan(1)
  const typedData = [
    {
      type: 'string',
      name: 'message',
      value: 'Hi, Alice!'
    }
  ]
  const hash = sigUtil.typedSignatureHash(typedData)
  t.equal(hash, '0x14b9f24872e28cc49e72dc104d7380d8e0ba84a3fe2e712704bcac66a5702bd5')
})

test('typedSignatureHash - multiple values', function (t) {
  t.plan(1)
  const typedData = [
    {
      type: 'string',
      name: 'message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint8',
      name: 'value',
      value: 10
    },
  ]
  const hash = sigUtil.typedSignatureHash(typedData)
  t.equal(hash, '0xf7ad23226db5c1c00ca0ca1468fd49c8f8bbc1489bc1c382de5adc557a69c229')
})

test('typedSignatureHash - bytes', function (t) {
    t.plan(1)
    const typedData = [
        {
            type: 'bytes',
            name: 'message',
            value: '0xdeadbeaf'
        }
    ]
    const hash = sigUtil.typedSignatureHash(typedData)
    t.equal(hash, '0x6c69d03412450b174def7d1e48b3bcbbbd8f51df2e76e2c5b3a5d951125be3a9')
})

typedSignatureHashThrowsTest({
    testLabel: 'empty array',
    argument: []
})

typedSignatureHashThrowsTest({
    testLabel: 'not array',
    argument: 42
})

typedSignatureHashThrowsTest({
    testLabel: 'null',
    argument: null
})

typedSignatureHashThrowsTest({
  testLabel: 'wrong type',
  argument: [
    {
      type: 'jocker',
      name: 'message',
      value: 'Hi, Alice!'
    }
  ]
})

typedSignatureHashThrowsTest({
  testLabel: 'no type',
  argument: [
    {
      name: 'message',
      value: 'Hi, Alice!'
    }
  ]
})

typedSignatureHashThrowsTest({
  testLabel: 'no name',
  argument: [
    {
      type: 'string',
      value: 'Hi, Alice!'
    }
  ]
})

// personal_sign was declared without an explicit set of test data
// so I made a script out of geth's internals to create this test data
// https://gist.github.com/kumavis/461d2c0e9a04ea0818e423bb77e3d260

signatureTest({
  testLabel: 'personalSign - kumavis fml manual test I',
  // "hello world"
  message: '0x68656c6c6f20776f726c64',
  signature: '0xce909e8ea6851bc36c007a0072d0524b07a3ff8d4e623aca4c71ca8e57250c4d0a3fc38fa8fbaaa81ead4b9f6bd03356b6f8bf18bccad167d78891636e1d69561b',
  addressHex: '0xbe93f9bacbcffc8ee6663f2647917ed7a20a57bb',
  privateKey: new Buffer('6969696969696969696969696969696969696969696969696969696969696969', 'hex'),
})

signatureTest({
  testLabel: 'personalSign - kumavis fml manual test II',
  // some random binary message from parity's test
  message: '0x0cc175b9c0f1b6a831c399e26977266192eb5ffee6ae2fec3ad71c777531578f',
  signature: '0x9ff8350cc7354b80740a3580d0e0fd4f1f02062040bc06b893d70906f8728bb5163837fd376bf77ce03b55e9bd092b32af60e86abce48f7b8d3539988ee5a9be1c',
  addressHex: '0xbe93f9bacbcffc8ee6663f2647917ed7a20a57bb',
  privateKey: new Buffer('6969696969696969696969696969696969696969696969696969696969696969', 'hex'),
})

signatureTest({
  testLabel: 'personalSign - kumavis fml manual test III',
  // random binary message data and pk from parity's test
  // https://github.com/ethcore/parity/blob/5369a129ae276d38f3490abb18c5093b338246e0/rpc/src/v1/tests/mocked/eth.rs#L301-L317
  // note: their signature result is incorrect (last byte moved to front) due to a parity bug
  message: '0x0cc175b9c0f1b6a831c399e26977266192eb5ffee6ae2fec3ad71c777531578f',
  signature: '0xa2870db1d0c26ef93c7b72d2a0830fa6b841e0593f7186bc6c7cc317af8cf3a42fda03bd589a49949aa05db83300cdb553116274518dbe9d90c65d0213f4af491b',
  addressHex: '0xe0da1edcea030875cd0f199d96eb70f6ab78faf2',
  privateKey: new Buffer('4545454545454545454545454545454545454545454545454545454545454545', 'hex'),
})

function signatureTest(opts) {
  test(opts.testLabel, function (t) {
    t.plan(2)

    const address = opts.addressHex
    const privKey = opts.privateKey
    const message = opts.message
    const msgParams = { data: message }

    const signed = sigUtil.personalSign(privKey, msgParams)
    t.equal(signed, opts.signature)

    msgParams.sig = signed
    const recovered = sigUtil.recoverPersonalSignature(msgParams)

    t.equal(recovered, address)
  })
}

function typedSignatureHashThrowsTest(opts) {
  const label = `typedSignatureHash - malformed arguments - ${opts.testLabel}`
  test(label, function (t) {
    t.plan(1)

    const argument = opts.argument

    t.throws(() => {
      sigUtil.typedSignatureHash(argument)
    })
  })
}

const bob = { 
  ethereumPrivateKey: '7e5374ec2ef0d91761a6e72fdf8f6ac665519bfdf6da0a2329cf0d804514b816',
  encryptionPrivateKey: 'flN07C7w2Rdhpucv349qxmVRm/322gojKc8NgEUUuBY=',
  encryptionPublicKey: 'C5YMNdqE4kLgxQhJO1MfuQcHP5hjVSXzamzd/TxlR0U=' }

const secretMessage = {data:'My name is Satoshi Buterin'};

const encryptedData = { version: 'x25519-xsalsa20-poly1305',
nonce: '1dvWO7uOnBnO7iNDJ9kO9pTasLuKNlej',
ephemPublicKey: 'FBH1/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=',
ciphertext: 'f8kBcl/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy' };

test("Getting bob's encryptionPublicKey", async t => {
  t.plan(1);

  const result = await sigUtil.getEncryptionPublicKey(bob.ethereumPrivateKey)
  t.equal(result, bob.encryptionPublicKey);
});

//encryption test
test("Alice encrypts message with bob's encryptionPublicKey", async t => {


  t.plan(4);

  const result = await sigUtil.encrypt(
    bob.encryptionPublicKey,
    secretMessage,
    'x25519-xsalsa20-poly1305'
  );

  console.log("RESULT", result)

  t.ok(result.version);
  t.ok(result.nonce);
  t.ok(result.ephemPublicKey);
  t.ok(result.ciphertext);

});

// safe encryption test
test("Alice encryptsSafely message with bob's encryptionPublicKey", async t => {
  t.plan(5);
  const VERSION = 'x25519-xsalsa20-poly1305';
  const result = await sigUtil.encryptSafely(
     bob.encryptionPublicKey,
     secretMessage,
     VERSION
  );

  console.log("RESULT", result)

  t.equals(result.version,VERSION);
  t.ok(result.nonce);
  t.ok(result.ephemPublicKey);
  t.ok(result.ciphertext);
  t.ok(result.ciphertext.length > 1048)
});

// safe decryption test
test("Bob decryptSafely message that Alice encryptSafely for him", async t => {
  t.plan(1);
  const VERSION = 'x25519-xsalsa20-poly1305';
  const result = await sigUtil.encryptSafely(
     bob.encryptionPublicKey,
     secretMessage,
     VERSION
  );

  const plaintext = sigUtil.decryptSafely(result, bob.ethereumPrivateKey);
  t.equal(plaintext, secretMessage.data);
});

// decryption test
test("Bob decrypts message that Alice sent to him", t => {
  t.plan(1);

  const result = sigUtil.decrypt(encryptedData, bob.ethereumPrivateKey);
  t.equal(result, secretMessage.data);
});

test('Decryption failed because version is wrong or missing', t =>{
  t.plan(1)

  const badVersionData = { version: 'x256k1-aes256cbc',
  nonce: '1dvWO7uOnBnO7iNDJ9kO9pTasLuKNlej',
  ephemPublicKey: 'FBH1/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=',
  ciphertext: 'f8kBcl/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy' };

  t.throws( function() { sigUtil.decrypt(badVersionData, bob.ethereumPrivateKey)}, 'Encryption type/version not supported.')
});

test('Decryption failed because nonce is wrong or missing', t => {
  t.plan(1);

    //encrypted data
  const badNonceData = { version: 'x25519-xsalsa20-poly1305',
  nonce: '',
  ephemPublicKey: 'FBH1/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=',
  ciphertext: 'f8kBcl/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy' };

  t.throws(function() { sigUtil.decrypt(badNonceData, bob.ethereumPrivateKey)}, 'Decryption failed.')

});

test('Decryption failed because ephemPublicKey is wrong or missing', t => {
  t.plan(1);

    //encrypted data
  const badEphemData = { version: 'x25519-xsalsa20-poly1305',
  nonce: '1dvWO7uOnBnO7iNDJ9kO9pTasLuKNlej',
  ephemPublicKey: 'FFFF/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=',
  ciphertext: 'f8kBcl/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy' };

  t.throws(function() { sigUtil.decrypt(badEphemData, bob.ethereumPrivateKey)}, 'Decryption failed.')
});

test('Decryption failed because cyphertext is wrong or missing', async t => {
  t.plan(1);

    //encrypted data
  const badCypherData = { version: 'x25519-xsalsa20-poly1305',
  nonce: '1dvWO7uOnBnO7iNDJ9kO9pTasLuKNlej',
  ephemPublicKey: 'FBH1/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=',
  ciphertext: 'ffffff/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy' };

  t.throws(function() { sigUtil.decrypt(badEphemData, bob.ethereumPrivateKey)}, 'Decryption failed.')
});

test("Decryption fails because you are not the recipient", t => {
  t.plan(1);

  t.throws(function() { sigUtil.decrypt(encryptedData, alice.ethereumPrivateKey)}, 'Decryption failed.')
});

test('signedTypeData', (t) => {
  t.plan(8)

  const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' }
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' }
        ],
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
    },
  }

  const utils = sigUtil.TypedDataUtils
  const privateKey = ethUtil.sha3('cow')
  const address = ethUtil.privateToAddress(privateKey)
  const sig = sigUtil.signTypedData(privateKey, { data: typedData })

  t.equal(utils.encodeType('Mail', typedData.types),
    'Mail(Person from,Person to,string contents)Person(string name,address wallet)')
  t.equal(ethUtil.bufferToHex(utils.hashType('Mail', typedData.types)),
    '0xa0cedeb2dc280ba39b857546d74f5549c3a1d7bdc2dd96bf881f76108e23dac2')
  t.equal(ethUtil.bufferToHex(utils.encodeData(typedData.primaryType, typedData.message, typedData.types)),
    '0xa0cedeb2dc280ba39b857546d74f5549c3a1d7bdc2dd96bf881f76108e23dac2fc71e5fa27ff56c350aa531bc129ebdf613b772b6604664f5d8dbe21b85eb0c8cd54f074a4af31b4411ff6a60c9719dbd559c221c8ac3492d9d872b041d703d1b5aadf3154a261abdd9086fc627b61efca26ae5702701d05cd2305f7c52a2fc8')
  t.equal(ethUtil.bufferToHex(utils.hashStruct(typedData.primaryType, typedData.message, typedData.types)),
    '0xc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e')
  t.equal(ethUtil.bufferToHex(utils.hashStruct('EIP712Domain', typedData.domain, typedData.types)),
    '0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f')
  t.equal(ethUtil.bufferToHex(utils.sign(typedData)),
    '0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2')
  t.equal(ethUtil.bufferToHex(address), '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826')
  t.equal(sig, '0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b915621c')
})

test('signedTypeData_v4', (t) => {
  t.plan(15)

  const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' },
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person[]' },
            { name: 'contents', type: 'string' },
        ],
        Group: [
            { name: 'name', type: 'string' },
            { name: 'members', type: 'Person[]' },
        ],
    },
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    primaryType: 'Mail',
    message: {
        from: {
            name: 'Cow',
            wallets: [
              '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
            ],
        },
        to: [{
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000'
            ]
        }],
        contents: 'Hello, Bob!',
    },
  }

  const utils = sigUtil.TypedDataUtils

  t.equal(utils.encodeType('Group', typedData.types),
    'Group(string name,Person[] members)Person(string name,address[] wallets)')

  t.equal(utils.encodeType('Person', typedData.types),
    'Person(string name,address[] wallets)')
  t.equal(ethUtil.bufferToHex(utils.hashType('Person', typedData.types)),
    '0xfabfe1ed996349fc6027709802be19d047da1aa5d6894ff5f6486d92db2e6860')

  t.equal(ethUtil.bufferToHex(utils.encodeData('Person', typedData.message.from, typedData.types)),
    '0x' + [
      'fabfe1ed996349fc6027709802be19d047da1aa5d6894ff5f6486d92db2e6860',
      '8c1d2bd5348394761719da11ec67eedae9502d137e8940fee8ecd6f641ee1648',
      '8a8bfe642b9fc19c25ada5dadfd37487461dc81dd4b0778f262c163ed81b5e2a',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct('Person', typedData.message.from, typedData.types)),
    '0x9b4846dd48b866f0ac54d61b9b21a9e746f921cefa4ee94c4c0a1c49c774f67f')

  t.equal(ethUtil.bufferToHex(utils.encodeData('Person', typedData.message.to[0], typedData.types)),
    '0x' + [
      'fabfe1ed996349fc6027709802be19d047da1aa5d6894ff5f6486d92db2e6860',
      '28cac318a86c8a0a6a9156c2dba2c8c2363677ba0514ef616592d81557e679b6',
      'd2734f4c86cc3bd9cabf04c3097589d3165d95e4648fc72d943ed161f651ec6d',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct('Person', typedData.message.to[0], typedData.types)),
    '0xefa62530c7ae3a290f8a13a5fc20450bdb3a6af19d9d9d2542b5a94e631a9168')

  t.equal(utils.encodeType('Mail', typedData.types),
    'Mail(Person from,Person[] to,string contents)Person(string name,address[] wallets)')
  t.equal(ethUtil.bufferToHex(utils.hashType('Mail', typedData.types)),
    '0x4bd8a9a2b93427bb184aca81e24beb30ffa3c747e2a33d4225ec08bf12e2e753')
  t.equal(ethUtil.bufferToHex(utils.encodeData(typedData.primaryType, typedData.message, typedData.types)),
    '0x' + [
      '4bd8a9a2b93427bb184aca81e24beb30ffa3c747e2a33d4225ec08bf12e2e753',
      '9b4846dd48b866f0ac54d61b9b21a9e746f921cefa4ee94c4c0a1c49c774f67f',
      'ca322beec85be24e374d18d582a6f2997f75c54e7993ab5bc07404ce176ca7cd',
      'b5aadf3154a261abdd9086fc627b61efca26ae5702701d05cd2305f7c52a2fc8',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct(typedData.primaryType, typedData.message, typedData.types)),
    '0xeb4221181ff3f1a83ea7313993ca9218496e424604ba9492bb4052c03d5c3df8')
  t.equal(ethUtil.bufferToHex(utils.hashStruct('EIP712Domain', typedData.domain, typedData.types)),
    '0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f')
  t.equal(ethUtil.bufferToHex(utils.sign(typedData)),
    '0xa85c2e2b118698e88db68a8105b794a8cc7cec074e89ef991cb4f5f533819cc2')

  const privateKey = ethUtil.sha3('cow')

  const address = ethUtil.privateToAddress(privateKey)
  t.equal(ethUtil.bufferToHex(address), '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826')

  const sig = sigUtil.signTypedData_v4(privateKey, { data: typedData })

  t.equal(sig, '0x65cbd956f2fae28a601bebc9b906cea0191744bd4c4247bcd27cd08f8eb6b71c78efdf7a31dc9abee78f492292721f362d296cf86b4538e07b51303b67f749061b')
})

test('signedTypeData_v4 with recursive types', (t) => {
  t.plan(12)

  const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'mother', type: 'Person' },
            { name: 'father', type: 'Person' },
        ]
    },
    domain: {
        name: 'Family Tree',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    primaryType: 'Person',
    message: {
        name: 'Jon',
        mother: {
          name: 'Lyanna',
          father: {
            name: 'Rickard',
          },
        },
        father: {
          name: 'Rhaegar',
          father: {
            name: 'Aeris II',
          }
        },
    },
  }

  const utils = sigUtil.TypedDataUtils

  t.equal(utils.encodeType('Person', typedData.types),
    'Person(string name,Person mother,Person father)')

  t.equal(ethUtil.bufferToHex(utils.hashType('Person', typedData.types)),
    '0x7c5c8e90cb92c8da53b893b24962513be98afcf1b57b00327ae4cc14e3a64116')

  t.equal(ethUtil.bufferToHex(utils.encodeData('Person', typedData.message.mother, typedData.types)),
    '0x' + [
      '7c5c8e90cb92c8da53b893b24962513be98afcf1b57b00327ae4cc14e3a64116',
      'afe4142a2b3e7b0503b44951e6030e0e2c5000ef83c61857e2e6003e7aef8570',
      '0000000000000000000000000000000000000000000000000000000000000000',
      '88f14be0dd46a8ec608ccbff6d3923a8b4e95cdfc9648f0db6d92a99a264cb36',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct('Person', typedData.message.mother, typedData.types)),
    '0x9ebcfbf94f349de50bcb1e3aa4f1eb38824457c99914fefda27dcf9f99f6178b')

  t.equal(ethUtil.bufferToHex(utils.encodeData('Person', typedData.message.father, typedData.types)),
    '0x' + [
      '7c5c8e90cb92c8da53b893b24962513be98afcf1b57b00327ae4cc14e3a64116',
      'b2a7c7faba769181e578a391a6a6811a3e84080c6a3770a0bf8a856dfa79d333',
      '0000000000000000000000000000000000000000000000000000000000000000',
      '02cc7460f2c9ff107904cff671ec6fee57ba3dd7decf999fe9fe056f3fd4d56e',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct('Person', typedData.message.father, typedData.types)),
    '0xb852e5abfeff916a30cb940c4e24c43cfb5aeb0fa8318bdb10dd2ed15c8c70d8')

  t.equal(ethUtil.bufferToHex(utils.encodeData(typedData.primaryType, typedData.message, typedData.types)),
    '0x' + [
      '7c5c8e90cb92c8da53b893b24962513be98afcf1b57b00327ae4cc14e3a64116',
      'e8d55aa98b6b411f04dbcf9b23f29247bb0e335a6bc5368220032fdcb9e5927f',
      '9ebcfbf94f349de50bcb1e3aa4f1eb38824457c99914fefda27dcf9f99f6178b',
      'b852e5abfeff916a30cb940c4e24c43cfb5aeb0fa8318bdb10dd2ed15c8c70d8',
    ].join('')
  )
  t.equal(ethUtil.bufferToHex(utils.hashStruct(typedData.primaryType, typedData.message, typedData.types)),
    '0xfdc7b6d35bbd81f7fa78708604f57569a10edff2ca329c8011373f0667821a45')
  t.equal(ethUtil.bufferToHex(utils.hashStruct('EIP712Domain', typedData.domain, typedData.types)),
    '0xfacb2c1888f63a780c84c216bd9a81b516fc501a19bae1fc81d82df590bbdc60')
  t.equal(ethUtil.bufferToHex(utils.sign(typedData)),
    '0x807773b9faa9879d4971b43856c4d60c2da15c6f8c062bd9d33afefb756de19c')

  const privateKey = ethUtil.sha3('dragon')

  const address = ethUtil.privateToAddress(privateKey)
  t.equal(ethUtil.bufferToHex(address), '0x065a687103c9f6467380bee800ecd70b17f6b72f')

  const sig = sigUtil.signTypedData_v4(privateKey, { data: typedData })

  t.equal(sig, '0xf2ec61e636ff7bb3ac8bc2a4cc2c8b8f635dd1b2ec8094c963128b358e79c85c5ca6dd637ed7e80f0436fe8fce39c0e5f2082c9517fe677cc2917dcd6c84ba881c')
})
