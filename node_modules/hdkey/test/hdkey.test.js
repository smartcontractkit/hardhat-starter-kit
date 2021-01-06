var assert = require('assert')
var BigInteger = require('bigi')
var ecurve = require('ecurve')
var secureRandom = require('secure-random')
var curve = ecurve.getCurveByName('secp256k1')
var HDKey = require('../')
var fixtures = require('./fixtures/hdkey')

// trinity: mocha
/* global describe it */

describe('hdkey', function () {
  describe('+ fromMasterSeed', function () {
    fixtures.valid.forEach(function (f) {
      it('should properly derive the chain path: ' + f.path, function () {
        var hdkey = HDKey.fromMasterSeed(new Buffer(f.seed, 'hex'))
        var childkey = hdkey.derive(f.path)

        assert.equal(childkey.privateExtendedKey, f.private)
        assert.equal(childkey.publicExtendedKey, f.public)
      })

      describe('> ' + f.path + ' toJSON() / fromJSON()', function () {
        it('should return an object read for JSON serialization', function () {
          var hdkey = HDKey.fromMasterSeed(new Buffer(f.seed, 'hex'))
          var childkey = hdkey.derive(f.path)

          var obj = {
            xpriv: f.private,
            xpub: f.public
          }

          assert.deepEqual(childkey.toJSON(), obj)

          var newKey = HDKey.fromJSON(obj)
          assert.strictEqual(newKey.privateExtendedKey, f.private)
          assert.strictEqual(newKey.publicExtendedKey, f.public)
        })
      })
    })
  })

  describe('- privateKey', function () {
    it('should throw an error if incorrect key size', function () {
      var hdkey = new HDKey()
      assert.throws(function () {
        hdkey.privateKey = new Buffer([1, 2, 3, 4])
      }, /key must be 32/)
    })
  })

  describe('- publicKey', function () {
    it('should throw an error if incorrect key size', function () {
      assert.throws(function () {
        var hdkey = new HDKey()
        hdkey.publicKey = new Buffer([1, 2, 3, 4])
      }, /key must be 33 or 65/)
    })

    it('should not throw if key is 33 bytes (compressed)', function () {
      var priv = secureRandom.randomBuffer(32)
      var pub = curve.G.multiply(BigInteger.fromBuffer(priv)).getEncoded(true)
      assert.equal(pub.length, 33)
      var hdkey = new HDKey()
      hdkey.publicKey = pub
    })

    it('should not throw if key is 65 bytes (not compressed)', function () {
      var priv = secureRandom.randomBuffer(32)
      var pub = curve.G.multiply(BigInteger.fromBuffer(priv)).getEncoded(false)
      assert.equal(pub.length, 65)
      var hdkey = new HDKey()
      hdkey.publicKey = pub
    })
  })

  describe('+ fromExtendedKey()', function () {
    describe('> when private', function () {
      it('should parse it', function () {
        // m/0/2147483647'/1/2147483646'/2
        var key = 'xprvA2nrNbFZABcdryreWet9Ea4LvTJcGsqrMzxHx98MMrotbir7yrKCEXw7nadnHM8Dq38EGfSh6dqA9QWTyefMLEcBYJUuekgW4BYPJcr9E7j'
        var hdkey = HDKey.fromExtendedKey(key)
        assert.equal(hdkey.versions.private, 0x0488ade4)
        assert.equal(hdkey.versions.public, 0x0488b21e)
        assert.equal(hdkey.depth, 5)
        assert.equal(hdkey.parentFingerprint, 0x31a507b8)
        assert.equal(hdkey.index, 2)
        assert.equal(hdkey.chainCode.toString('hex'), '9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271')
        assert.equal(hdkey.privateKey.toString('hex'), 'bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23')
        assert.equal(hdkey.publicKey.toString('hex'), '024d902e1a2fc7a8755ab5b694c575fce742c48d9ff192e63df5193e4c7afe1f9c')
        assert.equal(hdkey.identifier.toString('hex'), '26132fdbe7bf89cbc64cf8dafa3f9f88b8666220')
      })
    })

    describe('> when public', function () {
      it('should parse it', function () {
        // m/0/2147483647'/1/2147483646'/2
        var key = 'xpub6FnCn6nSzZAw5Tw7cgR9bi15UV96gLZhjDstkXXxvCLsUXBGXPdSnLFbdpq8p9HmGsApME5hQTZ3emM2rnY5agb9rXpVGyy3bdW6EEgAtqt'
        var hdkey = HDKey.fromExtendedKey(key)
        assert.equal(hdkey.versions.private, 0x0488ade4)
        assert.equal(hdkey.versions.public, 0x0488b21e)
        assert.equal(hdkey.depth, 5)
        assert.equal(hdkey.parentFingerprint, 0x31a507b8)
        assert.equal(hdkey.index, 2)
        assert.equal(hdkey.chainCode.toString('hex'), '9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271')
        assert.equal(hdkey.privateKey, null)
        assert.equal(hdkey.publicKey.toString('hex'), '024d902e1a2fc7a8755ab5b694c575fce742c48d9ff192e63df5193e4c7afe1f9c')
        assert.equal(hdkey.identifier.toString('hex'), '26132fdbe7bf89cbc64cf8dafa3f9f88b8666220')
      })
    })
  })

  describe('> when deriving public key', function () {
    it('should work', function () {
      var key = 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
      var hdkey = HDKey.fromExtendedKey(key)

      var path = 'm/3353535/2223/0/99424/4/33'
      var derivedHDKey = hdkey.derive(path)

      var expected = 'xpub6JdKdVJtdx6sC3nh87pDvnGhotXuU5Kz6Qy7Piy84vUAwWSYShsUGULE8u6gCivTHgz7cCKJHiXaaMeieB4YnoFVAsNgHHKXJ2mN6jCMbH1'
      assert.equal(derivedHDKey.publicExtendedKey, expected)
    })
  })

  describe('> when private key integer is less than 32 bytes', function () {
    it('should work', function () {
      var seed = '000102030405060708090a0b0c0d0e0f'
      var masterKey = HDKey.fromMasterSeed(new Buffer(seed, 'hex'))

      var newKey = masterKey.derive("m/44'/6'/4'")
      var expected = 'xprv9ymoag6W7cR6KBcJzhCM6qqTrb3rRVVwXKzwNqp1tDWcwierEv3BA9if3ARHMhMPh9u2jNoutcgpUBLMfq3kADDo7LzfoCnhhXMRGX3PXDx'
      assert.equal(newKey.privateExtendedKey, expected)
    })
  })

  describe('HARDENED_OFFSET', function () {
    it('should be set', function () {
      assert(HDKey.HARDENED_OFFSET)
    })
  })

  describe('> when private key is null', function () {
    it('privateExtendedKey should return null and not throw', function () {
      var seed = '000102030405060708090a0b0c0d0e0f'
      var masterKey = HDKey.fromMasterSeed(new Buffer(seed, 'hex'))

      assert.ok(masterKey.privateExtendedKey, 'xpriv is truthy')
      masterKey._privateKey = null

      assert.doesNotThrow(function () {
        masterKey.privateExtendedKey
      })

      assert.ok(!masterKey.privateExtendedKey, 'xpriv is falsy')
    })
  })
})
