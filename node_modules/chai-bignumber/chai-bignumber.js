module.exports = function (BigNumber) {
  BigNumber = BigNumber || require('bignumber.js');
  var round = BigNumber.prototype.round || BigNumber.prototype.decimalPlaces;
  var isEqualTo = BigNumber.prototype.isEqualTo || BigNumber.prototype.equals;
  var isGreaterThan = BigNumber.prototype.isGreaterThan || BigNumber.prototype.greaterThan;
  var isGreaterThanOrEqualTo = BigNumber.prototype.isGreaterThanOrEqualTo || BigNumber.prototype.greaterThanOrEqualTo;
  var isLessThan = BigNumber.prototype.isLessThan || BigNumber.prototype.lessThan;
  var isLessThanOrEqualTo = BigNumber.prototype.isLessThanOrEqualTo || BigNumber.prototype.lessThanOrEqualTo;

  return function (chai, utils) {
    chai.Assertion.addProperty('bignumber', function () {
      utils.flag(this, 'bignumber', true);
    });

    var isBigNumber = function (object) {
      return object.isBigNumber ||
        object instanceof BigNumber ||
        (object.constructor && object.constructor.name === 'BigNumber');
    };

    var convert = function (value, dp, rm) {
      var number;

      if (typeof value === 'string' || typeof value === 'number') {
        number = new BigNumber(value);
      } else if (isBigNumber(value)) {
        number = value;
      } else {
        new chai.Assertion(value).assert(false,
          'expected #{act} to be an instance of string, number or BigNumber');
      }

      if (parseInt(dp) === dp) {
        if (rm === undefined) {
          rm = BigNumber.ROUND_HALF_UP;
        }
        number = round.bind(number)(dp, rm);
      }

      return number;
    };

    var overwriteMethods = function (names, fn) {
      function overwriteMethod(original) {
        return function (value, dp, rm) {
          if (utils.flag(this, 'bignumber')) {
            var expected = convert(value, dp, rm);
            var actual = convert(this._obj, dp, rm);
            fn.apply(this, [expected, actual]);
          } else {
            original.apply(this, arguments);
          }
        };
      }
      for (var i = 0; i < names.length; i++) {
        chai.Assertion.overwriteMethod(names[i], overwriteMethod);
      }
    };

    // BigNumber.isEqualTo
    overwriteMethods(['equal', 'equals', 'eq'], function (expected, actual) {
      this.assert(
        isEqualTo.bind(expected)(actual),
        'expected #{act} to equal #{exp}',
        'expected #{act} to be different from #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BigNumber.isGreaterThan
    overwriteMethods(['above', 'gt', 'greaterThan'], function (expected, actual) {
      this.assert(
        isGreaterThan.bind(actual)(expected),
        'expected #{act} to be greater than #{exp}',
        'expected #{act} to be less than or equal to #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BigNumber.isGreaterThanOrEqualTo
    overwriteMethods(['least', 'gte'], function (expected, actual) {
      this.assert(
        isGreaterThanOrEqualTo.bind(actual)(expected),
        'expected #{act} to be greater than or equal to #{exp}',
        'expected #{act} to be less than #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BigNumber.isLessThan
    overwriteMethods(['below', 'lt', 'lessThan'], function (expected, actual) {
      this.assert(
        isLessThan.bind(actual)(expected),
        'expected #{act} to be less than #{exp}',
        'expected #{act} to be greater than or equal to #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BigNumber.isLessThanOrEqualTo
    overwriteMethods(['most', 'lte'], function (expected, actual) {
      this.assert(
        isLessThanOrEqualTo.bind(actual)(expected),
        'expected #{act} to be less than or equal to #{exp}',
        'expected #{act} to be greater than #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BigNumber.isFinite
    chai.Assertion.addProperty('finite', function () {
      var value = convert(this._obj);
      this.assert(
        value.isFinite(),
        'expected #{this} to be finite',
        'expected #{this} to not be finite',
        value.toString()
      );
    });

    // BigNumber.isInteger
    chai.Assertion.addProperty('integer', function () {
      var value = convert(this._obj);
      this.assert(
        value.isInteger(),
        'expected #{this} to be an integer',
        'expected #{this} to not be an integer',
        value.toString()
      );
    });

    // BigNumber.isNegative
    chai.Assertion.addProperty('negative', function () {
      var value = convert(this._obj);
      this.assert(
        value.isNegative(),
        'expected #{this} to be negative',
        'expected #{this} to not be negative',
        value.toString()
      );
    });

    // BigNumber.isZero
    chai.Assertion.addProperty('zero', function () {
      var value = convert(this._obj);
      this.assert(
        value.isZero(),
        'expected #{this} to be zero',
        'expected #{this} to not be zero',
        value.toString()
      );
    });
  };
};
