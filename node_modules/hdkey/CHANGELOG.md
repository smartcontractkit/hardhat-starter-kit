0.7.1 / 2016-05-26
------------------
- fix bug when `privateKey` is `null`, `privateExtendedKey` should not throw, and return `null` [#7][#7]

0.7.0 / 2016-03-22
------------------
- upgrade from `ecurve` to `secp256k1`. [#5][#5]

0.6.0 / 2015-07-02
------------------
- **breaking** (same day though, haha). Changed `publicExtendedKey`/`privateExtendedKey` in `JSON` methods to `xpub`/`xpriv`
- export `HARDENED_OFFSET`

0.5.0 / 2015-07-02
------------------
- JavaScript Standard Style
- fix rare condition for BIP32 consistency: [#1][#1]
- added `toJSON()/fromJSON()`

0.4.0 / 2014-09-24
------------------
- dropped `sha512` dependency and upgraded to crypto-browserify that supports sha512

0.3.1 / 2014-07-11
------------------
- removed superfluous code `this._privateKeyBigInteger`

0.3.0 / 2014-06-29
------------------
- bugfix: if private key was less than 32 bytes, pad out to 32 bytes with leading zeros (this happens in derive)
- changed behavior of `privateExtendedKey()` and `publicExtendedKey()` to return base 58 encoded `string` instead of `Buffer`
- changed behavior of `fromExtendedKey()` from accepting a type of `Buffer` bytes to base58 `string`

0.2.0 / 2014-06-25
------------------
- upgraded `"ecurve": "^0.8.0"` to `"ecurve": "^1.0.0"`
- added functionality to derive public to public child keys

0.1.0 / 2014-06-16
------------------
- removed semicolons per http://cryptocoinjs.com/about/contributing/#semicolons
- removed `ECKey` dep
- added `ecurve` dep
- removed `terst` dev dep for `assert`
- added method `fromMasterSeed(seedBuffer, [versions])`
- changed constructor from `new HDKey(masterSeed, [versions])` to `new HDKey([versions])`
- added properties: `privateKey` and `publicKey`
- removed method `getIdentifier()`, added property `identifier`
- removed method `getFingerprint()`, added property `fingerprint`
- renamed `private` to `privateExtendedKey`
- renamed `public` to `publicExtendedKey`
- added method `fromExtendedKey()`

0.0.1 / 2014-05-29
------------------
- initial release

<!-- generated using jprichardson/issue-links -->
[#7]: https://github.com/cryptocoinjs/hdkey/issues/7    "privateExtendedKey error handling"
[#6]: https://github.com/cryptocoinjs/hdkey/pull/6      "hdkey: use bippath for BIP32 path parsing and validation"
[#5]: https://github.com/cryptocoinjs/hdkey/pull/5      "hdkey: use the secp256k1 package for crypto"
[#4]: https://github.com/cryptocoinjs/hdkey/issues/4    "Is this library still maintained?"
[#3]: https://github.com/cryptocoinjs/hdkey/pull/3      "Update hdkey.js"
[#2]: https://github.com/cryptocoinjs/hdkey/pull/2      "Update hdkey.js"
[#1]: https://github.com/cryptocoinjs/hdkey/issues/1    "rare condition needed for bip consistency"
