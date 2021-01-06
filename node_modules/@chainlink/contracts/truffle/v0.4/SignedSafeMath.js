'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const SignedSafeMath = contract({
 "contractName": "SignedSafeMath",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820600fb68557069e1447a627141e53bc37e0c651528c056536b2d447e64d11cdf00029",
   "opcodes": "PUSH1 0x4C PUSH1 0x2C PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH1 0x0 BYTE PUSH1 0x73 EQ PUSH1 0x0 DUP2 EQ PUSH1 0x1C JUMPI PUSH1 0x1E JUMP JUMPDEST INVALID JUMPDEST POP ADDRESS PUSH1 0x0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN STOP PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 PUSH1 0xF 0xb6 DUP6 JUMPI MOD SWAP15 EQ 0x47 0xa6 0x27 EQ 0x1e MSTORE8 0xbc CALLDATACOPY 0xe0 0xc6 MLOAD MSTORE DUP13 SDIV PUSH6 0x36B2D447E64D GT 0xcd CREATE STOP 0x29 ",
   "sourceMap": "130:1576:41:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24"
  },
  "deployedBytecode": {
   "linkReferences": {},
   "object": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820600fb68557069e1447a627141e53bc37e0c651528c056536b2d447e64d11cdf00029",
   "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 PUSH1 0xF 0xb6 DUP6 JUMPI MOD SWAP15 EQ 0x47 0xa6 0x27 EQ 0x1e MSTORE8 0xbc CALLDATACOPY 0xe0 0xc6 MLOAD MSTORE DUP13 SDIV PUSH6 0x36B2D447E64D GT 0xcd CREATE STOP 0x29 ",
   "sourceMap": "130:1576:41:-;;;;;;;;"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.4.24+commit.e67f0147\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"methods\":{},\"title\":\"SignedSafeMath\"},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/vendor/SignedSafeMath.sol\":\"SignedSafeMath\"},\"evmVersion\":\"byzantium\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/vendor/SignedSafeMath.sol\":{\"keccak256\":\"0xc4d1131c258388162b46ce765e2ceeb68122dbf586447c47f99101d65d5f75af\",\"urls\":[\"bzzr://305e6947adba7e8d4eb6b8e4bc989d874780507df4a2c1fb5cc29d139f2f4efa\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('SignedSafeMath.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.SignedSafeMath = SignedSafeMath
