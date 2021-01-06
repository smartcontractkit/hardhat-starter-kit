coinstring
==========

[![build status](https://secure.travis-ci.org/cryptocoinjs/coinstring.png)](http://travis-ci.org/cryptocoinjs/coinstring)
[![Coverage Status](https://img.shields.io/coveralls/cryptocoinjs/coinstring.svg)](https://coveralls.io/r/cryptocoinjs/coinstring)
[![Version](http://img.shields.io/npm/v/coinstring.svg)](https://www.npmjs.org/package/coinstring)

JavaScript component that's used to generate relevant addresses, wallet import formats, BIP32 encodings, and base 58 check encoding
used by various crypto currencies. The difference between this and base58 check encoding is not much other than base 58 check encoding
specifies that the version should only have one byte. This means that base 58 check encoding technically would NOT work for BIP 32
addresses, but this module does work with BIP 32 addresses.

Works in Node.js and the browser.

### Official documentation:

http://cryptocoinjs.com/modules/currency/coinstring/
