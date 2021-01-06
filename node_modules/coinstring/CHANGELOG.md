2.3.0 / 2015-06-04
------------------
- use `createHash` directly https://github.com/cryptocoinjs/coinstring/pull/5
- JavaScript Standard Style

2.2.0 / 2014-12-23
------------------
- `bs58` from `1.x` to `2.x` (decode returns `Array` instead of `Buffer`)

2.1.0 / 2014-12-16
------------------
- remove `browser` field, and `crypto-browserify` devDep
- removed Makefile; replaced with npm scripts

2.0.0 / 2014-06-25
------------------
* changed `encode(payload, version)` to `encode(payload, [version])`
* changed how `decode` works (**broke compatibility** hence major version bump)

old version returned `{payload: ..., version: ...}`, this version now returns
just `payload`, if `version` is passed into `decode`, it's trimmed off of `payload`

1.0.1 / 2014-06-06
------------------
* throw error if `version` is not present for `encode()`

1.0.0 / 2014-06-06
------------------
* upgraded `mochify` for dev deps
* removed semicolons per http://cryptocoinjs.com/about/contributing/#semicolons
* removed `terst` per http://cryptocoinjs.com/about/contributing/#testing
* removed `binstring` from dev deps
* added travis ci
* added coveralls
* upgraded `bs58` from `0.3.x` to `^1.0.0`
* removed `crypto-hashing` dep
* `coinstring()` renamed to `cs.encode()`
* added methods `createEncoder()` and `createDecoder()`
* changed method signature of `encode(version, payload)` to `encode(payload,version)`
* changed method signature of `decode(version, base58str)` to `decode(base58str, version)`
* added method `createValidator()`
* changed method signature of `validate(version, base58str)` to `validate(base58str, version)`
* renamed method `validate()` to `isValid()`
* renamed return from `decode()` object field `bytes` to `payload`
* added `Buffer` support for version input => BIP32 support

0.2.0 / 2014-03-10
------------------
* changed input to decode, made `version` optional
* changed output to decode, returns an object with the properties `version` and `bytes`

0.1.0 / 2014-03-10
------------------
* added browser tests
* added support for `coinstring()` method to input a type `Array` or `Uint8Array`
* export `crypto-hashing`, non-standard practice... thoughts?
* upgraded `crypto-hashing` to `0.3.0`, `ripemd160` now works in the browser

0.0.1 / 2014-03-07
------------------
* initial release