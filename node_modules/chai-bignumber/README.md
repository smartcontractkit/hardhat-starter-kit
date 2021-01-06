# chai-bignumber
[![Build Status](https://travis-ci.org/asmarques/chai-bignumber.svg)](https://travis-ci.org/asmarques/chai-bignumber)

Chai assertions for comparing arbitrary-precision decimals using the [bignumber.js](https://github.com/MikeMcl/bignumber.js) library.

## Installation

```bash
npm install --save-dev chai-bignumber
```

## Usage

```javascript
var chai = require('chai');

//use default BigNumber
chai.use(require('chai-bignumber')());

//use custom BigNumber
chai.use(require('chai-bignumber')(BigNumber));
```

## Assertions

The following assertion methods are provided and will override the existing
builtin assertions if the `bignumber` property is explicitly set as part of
the assertion chain:
- equal/equals/eq
- above/gt/greaterThan
- least/gte
- below/lt/lessThan
- most/lte

The above methods have the following signature: `(value, dp, rm)`.
Where `dp` is an optional argument which specifies the number of decimal places
to round each side of the comparison to (values are not rounded by default),
while `rm` is an optional argument which specifies the
[rounding mode](https://mikemcl.github.io/bignumber.js/#constructor-properties)
as supported by `bignumber.js` (defaults to `BigNumber.ROUND_HALF_UP`).

A set of additional assertion properties is also provided:
- finite
- integer
- negative
- zero

Values can be instances of `number`, `BigNumber` or `string` which can be
converted into a valid number. Only BDD style (`expect` or `should`) assertions
are supported.

## Examples

Methods:

```javascript
var result = new BigNumber('100000000000000000').plus(1);
var expected = '100000000000000001';
result.should.be.bignumber.equal(expected);
expect(result).to.be.bignumber.at.most(expected);
'1000'.should.be.bignumber.lessThan(2000);
```

Methods with rounding:

```javascript
var BigNumber = require('bignumber.js');
(100.343).should.be.bignumber.equal(100.341, 2);
(100.349).should.be.bignumber.equal(100.341, 2, BigNumber.ROUND_DOWN);
```

Properties:

```javascript
(100 / 0).should.not.be.finite;
expect(10).to.be.integer;
(-100).should.be.negative;
expect(1 - 1).to.be.zero;
```

## License

[MIT](LICENSE)
