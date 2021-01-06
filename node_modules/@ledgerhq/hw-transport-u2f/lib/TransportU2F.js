"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _u2fApi = require("u2f-api");

var _hwTransport = require("@ledgerhq/hw-transport");

var _hwTransport2 = _interopRequireDefault(_hwTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapU2FTransportError(originalError, message, id) {
  var err = new _hwTransport.TransportError(message, id);
  // $FlowFixMe
  err.originalError = originalError;
  return err;
}

function wrapApdu(apdu, key) {
  var result = Buffer.alloc(apdu.length);
  for (var i = 0; i < apdu.length; i++) {
    result[i] = apdu[i] ^ key[i % key.length];
  }
  return result;
}

// Convert from normal to web-safe, strip trailing "="s
var webSafe64 = function webSafe64(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Convert from web-safe to normal, add trailing "="s
var normal64 = function normal64(base64) {
  return base64.replace(/-/g, "+").replace(/_/g, "/") + "==".substring(0, 3 * base64.length % 4);
};

function attemptExchange(apdu, timeoutMillis, debug, scrambleKey) {
  var keyHandle = wrapApdu(apdu, scrambleKey);
  var challenge = Buffer.from("0000000000000000000000000000000000000000000000000000000000000000", "hex");
  var signRequest = {
    version: "U2F_V2",
    keyHandle: webSafe64(keyHandle.toString("base64")),
    challenge: webSafe64(challenge.toString("base64")),
    appId: location.origin
  };
  if (debug) {
    debug("=> " + apdu.toString("hex"));
  }
  return (0, _u2fApi.sign)(signRequest, timeoutMillis / 1000).then(function (response) {
    var signatureData = response.signatureData;

    if (typeof signatureData === "string") {
      var data = Buffer.from(normal64(signatureData), "base64");
      var result = data.slice(5);
      if (debug) {
        debug("<= " + result.toString("hex"));
      }
      return result;
    } else {
      throw response;
    }
  });
}

var transportInstances = [];

function emitDisconnect() {
  transportInstances.forEach(function (t) {
    return t.emit("disconnect");
  });
  transportInstances = [];
}

function isTimeoutU2FError(u2fError) {
  return u2fError.metaData.code === 5;
}

/**
 * U2F web Transport implementation
 * @example
 * import TransportU2F from "@ledgerhq/hw-transport-u2f";
 * ...
 * TransportU2F.create().then(transport => ...)
 */

var TransportU2F = function (_Transport) {
  (0, _inherits3.default)(TransportU2F, _Transport);
  (0, _createClass3.default)(TransportU2F, null, [{
    key: "open",


    /**
     * static function to create a new Transport from a connected Ledger device discoverable via U2F (browser support)
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_) {
        var _openTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new TransportU2F());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open(_x) {
        return _ref.apply(this, arguments);
      }

      return open;
    }()

    // this transport is not discoverable but we are going to guess if it is here with isSupported()

  }]);

  function TransportU2F() {
    (0, _classCallCheck3.default)(this, TransportU2F);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TransportU2F.__proto__ || (0, _getPrototypeOf2.default)(TransportU2F)).call(this));

    transportInstances.push(_this);
    return _this;
  }

  (0, _createClass3.default)(TransportU2F, [{
    key: "exchange",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(apdu) {
        var isU2FError;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return attemptExchange(apdu, this.exchangeTimeout, this.debug, this.scrambleKey);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                isU2FError = (0, _typeof3.default)(_context2.t0.metaData) === "object";

                if (!isU2FError) {
                  _context2.next = 14;
                  break;
                }

                if (isTimeoutU2FError(_context2.t0)) {
                  emitDisconnect();
                }
                // the wrapping make error more usable and "printable" to the end user.
                throw wrapU2FTransportError(_context2.t0, "Failed to sign with Ledger device: U2F " + _context2.t0.metaData.type, "U2F_" + _context2.t0.metaData.code);

              case 14:
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function exchange(_x3) {
        return _ref2.apply(this, arguments);
      }

      return exchange;
    }()
  }, {
    key: "setScrambleKey",
    value: function setScrambleKey(scrambleKey) {
      this.scrambleKey = Buffer.from(scrambleKey, "ascii");
    }
  }, {
    key: "close",
    value: function close() {
      var i = transportInstances.indexOf(this);
      if (i === -1) {
        throw new Error("invalid transport instance");
      }
      transportInstances.splice(i, 1);
      return _promise2.default.resolve();
    }
  }]);
  return TransportU2F;
}(_hwTransport2.default);

TransportU2F.isSupported = _u2fApi.isSupported;

TransportU2F.list = function () {
  return (0, _u2fApi.isSupported)().then(function (supported) {
    return supported ? [null] : [];
  });
};

TransportU2F.listen = function (observer) {
  var unsubscribed = false;
  (0, _u2fApi.isSupported)().then(function (supported) {
    if (unsubscribed) return;
    if (supported) {
      observer.next({ type: "add", descriptor: null });
      observer.complete();
    } else {
      observer.error(new _hwTransport.TransportError("U2F browser support is needed for Ledger. " + "Please use Chrome, Opera or Firefox with a U2F extension. " + "Also make sure you're on an HTTPS connection", "U2FNotSupported"));
    }
  });
  return {
    unsubscribe: function unsubscribe() {
      unsubscribed = true;
    }
  };
};

exports.default = TransportU2F;
//# sourceMappingURL=TransportU2F.js.map