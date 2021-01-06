'use strict';

var inherits = require('util').inherits;
var solc = require('solc');
var Subprovider = require('./subprovider.js');

module.exports = SolcSubprovider;

inherits(SolcSubprovider, Subprovider);

function SolcSubprovider(opts) {
  if (opts && opts.version) {
    this.solc = solc.useVersion(opts.version);
  } else {
    this.solc = solc;
  }
}

SolcSubprovider.prototype.handleRequest = function (payload, next, end) {
  switch (payload.method) {
    case 'eth_getCompilers':
      end(null, ["solidity"]);
      break;

    case 'eth_compileSolidity':
      this._compileSolidity(payload, end);
      break;

    default:
      next();
  }
};

// Conforms to https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_compilesolidity
SolcSubprovider.prototype._compileSolidity = function (payload, end) {
  // optimised
  var output = this.solc.compile(payload.params[0], 1);
  if (!output) {
    end('Compilation error');
  } else if (output.errors) {
    end(output.errors.join('\n'));
  } else {
    // Select first contract FIXME??
    var contract = output.contracts[Object.keys(output.contracts)[0]];

    var ret = {
      code: '0x' + contract.bytecode,
      info: {
        source: payload.params[0],
        language: 'Solidity',
        languageVersion: this.solc.version(),
        compilerVersion: this.solc.version(),
        abiDefinition: JSON.parse(contract.interface),
        userDoc: { methods: {} },
        developerDoc: { methods: {} }
      }
    };

    end(null, ret);
  }
};