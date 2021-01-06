'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const OracleSignaturesDecoder = contract({
 "contractName": "OracleSignaturesDecoder",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3fe6080604052600080fdfea165627a7a723058201439f188a898df16ef41ca605985425063112cb63dbe6d0c298037f2cae54dcd0029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x35 DUP1 PUSH1 0x1D PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG1 PUSH6 0x627A7A723058 KECCAK256 EQ CODECOPY CALL DUP9 0xa8 SWAP9 0xdf AND 0xef COINBASE 0xca PUSH1 0x59 DUP6 TIMESTAMP POP PUSH4 0x112CB63D 0xbe PUSH14 0xC298037F2CAE54DCD0029000000 ",
   "sourceMap": "24:489:8:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;24:489:8;;;;;;;"
  },
  "deployedBytecode": {
   "linkReferences": {},
   "object": "0x6080604052600080fdfea165627a7a723058201439f188a898df16ef41ca605985425063112cb63dbe6d0c298037f2cae54dcd0029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG1 PUSH6 0x627A7A723058 KECCAK256 EQ CODECOPY CALL DUP9 0xa8 SWAP9 0xdf AND 0xef COINBASE 0xca PUSH1 0x59 DUP6 TIMESTAMP POP PUSH4 0x112CB63D 0xbe PUSH14 0xC298037F2CAE54DCD0029000000 ",
   "sourceMap": "24:489:8:-;;;;;"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.5.0+commit.1d4f565a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.5/dev/OracleSignaturesDecoder.sol\":\"OracleSignaturesDecoder\"},\"evmVersion\":\"byzantium\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.5/dev/OracleSignaturesDecoder.sol\":{\"keccak256\":\"0xbfadafdb8329e1022ad617e071ccfe330897bc044983998f1de8dae266affb63\",\"urls\":[\"bzzr://7260171bb3cc1ed67d2f5bf6a08ca3e9fe1fc97ffeb57c3a2255021f41d7609f\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('OracleSignaturesDecoder.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.OracleSignaturesDecoder = OracleSignaturesDecoder
