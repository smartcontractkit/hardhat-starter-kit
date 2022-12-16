const fs = require('fs')

// Loads environment variables from .env file (if it exists)
require('dotenv').config()

const Location = {
  Inline: 0
}

const CodeLanguage = {
  JavaScript: 0
}

const ReturnType = {
  uint: 'uint256',
  uint256: 'uint256',
  int: 'int256',
  int256: 'int256',
  string: 'string',
  bytes: 'Buffer',
  Buffer: 'Buffer',
}

// Configure the request by setting the fields below
const requestConfig = {
  // location of source code (only Inline is curently supported)
  codeLocation: Location.Inline,
  // location of secrets (only Inline is currently supported)
  secretsLocation: Location.Inline,
  // code language (only JavaScript is currently supported)
  codeLanguage: CodeLanguage.JavaScript,
  // string containing the source code to be executed
  source: fs.readFileSync('./on-demand-request-source.js').toString(),
  // number of HTTP queries the source code is allowed to make
  numAllowedQueries: 4,
  // secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey)
  secrets: { apiKey: "<API_KEY_GOES_HERE>" },
  // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
  walletPrivateKey: process.env['PRIVATE_KEY'],
  // DON public key used to encrypt secrets so they are not exposed on-chain
  DONPublicKey: '971f006163a12ee3383a00d7743334480d6b1c83fdf60497e0c520b16d1a4ee421cc61375679b63466156fee6f2f1da5a7e630ba0b1cddb2704ef907ead223db',
  // args can be accessed within the source code with `args[index]` (ie: args[0])
  args: [ '1', 'bitcoin', 'btc-bitcoin', 'btc' ],
  // maximum size of a response in bytes
  maxResponseBytes: 256,
  // expected type of the returned value
  expectedReturnType: ReturnType.uint256,
}

if (requestConfig.secrets && !requestConfig.walletPrivateKey) {
  throw Error('Set private EVM wallet key using the PRIVATE_KEY environment variable or within on-demand-request-config.js')
}

module.exports = requestConfig