'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var fs = require('fs');
var path = require('path');

var TYPE_TOKENS = ['var', 'bool', 'address', 'string', 'Int', 'Uint', 'Byte', 'Fixed', 'UFixed'];

function rsplit(str, value) {
  var index = str.lastIndexOf(value);
  return [str.substring(0, index), str.substring(index + 1, str.length)];
}

function normalizeTokenType(value) {
  if (value.endsWith("'")) {
    value = value.substring(0, value.length - 1);
  }
  if (value.startsWith("'")) {
    value = value.substring(1, value.length);
  }
  return value;
}

function getTokenType(value) {
  if (value === 'Identifier' || value === 'from') {
    return 'Identifier';
  } else if (value === 'TrueLiteral' || value === 'FalseLiteral') {
    return 'Boolean';
  } else if (value === 'VersionLiteral') {
    return 'Version';
  } else if (value === 'StringLiteral') {
    return 'String';
  } else if (TYPE_TOKENS.includes(value)) {
    return 'Type';
  } else if (value === 'NumberUnit') {
    return 'Subdenomination';
  } else if (value === 'DecimalNumber') {
    return 'Numeric';
  } else if (value === 'HexLiteral') {
    return 'Hex';
  } else if (value === 'ReservedKeyword') {
    return 'Reserved';
  } else if (/^\W+$/.test(value)) {
    return 'Punctuator';
  } else {
    return 'Keyword';
  }
}

function getTokenTypeMap() {
  var filePath = path.join(__dirname, '../lib/Solidity.tokens');

  return fs.readFileSync(filePath).toString('utf-8').split('\n').map(function (line) {
    return rsplit(line, '=');
  }).reduce(function (acum, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[0],
        key = _ref2[1];

    acum[parseInt(key, 10)] = normalizeTokenType(value);
    return acum;
  }, {});
}

function buildTokenList(tokens, options) {
  var tokenTypes = getTokenTypeMap();

  return tokens.map(function (token) {
    var type = getTokenType(tokenTypes[token.type]);
    var node = { type: type, value: token.text };
    if (options.range) {
      node.range = [token.start, token.stop + 1];
    }
    if (options.loc) {
      node.loc = {
        start: { line: token.line, column: token.column },
        end: { line: token.line, column: token.column + token.text.length }
      };
    }
    return node;
  });
}

exports.buildTokenList = buildTokenList;