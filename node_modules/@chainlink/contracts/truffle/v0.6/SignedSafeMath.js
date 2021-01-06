'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const SignedSafeMath = contract({
 "contractName": "SignedSafeMath",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220cccbf5e80fa044080e615bfb042dc1414baeb5dfb9ae44c3b1245a9a3736da1b64736f6c63430006060033",
   "opcodes": "PUSH1 0x56 PUSH1 0x23 PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH1 0x0 BYTE PUSH1 0x73 EQ PUSH1 0x16 JUMPI INVALID JUMPDEST ADDRESS PUSH1 0x0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN INVALID PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCC 0xCB CREATE2 0xE8 0xF LOG0 DIFFICULTY ADDMOD 0xE PUSH2 0x5BFB DIV 0x2D 0xC1 COINBASE 0x4B 0xAE 0xB5 0xDF 0xB9 0xAE DIFFICULTY 0xC3 0xB1 0x24 GAS SWAP11 CALLDATACOPY CALLDATASIZE 0xDA SHL PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "25:2072:18:-:0;;132:2:-1;166:7;155:9;146:7;137:37;255:7;249:14;246:1;241:23;235:4;232:33;222:2;;269:9;222:2;293:9;290:1;283:20;323:4;314:7;306:22;347:7;338;331:24"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220cccbf5e80fa044080e615bfb042dc1414baeb5dfb9ae44c3b1245a9a3736da1b64736f6c63430006060033",
   "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCC 0xCB CREATE2 0xE8 0xF LOG0 DIFFICULTY ADDMOD 0xE PUSH2 0x5BFB DIV 0x2D 0xC1 COINBASE 0x4B 0xAE 0xB5 0xDF 0xB9 0xAE DIFFICULTY 0xC3 0xB1 0x24 GAS SWAP11 CALLDATACOPY CALLDATASIZE 0xDA SHL PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "25:2072:18:-:0;;;;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SignedSafeMath.sol\":\"SignedSafeMath\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SignedSafeMath.sol\":{\"keccak256\":\"0x83e027df9251983d079e85187b87362d4898bc3052fd72ca365c89504b7f52ff\",\"urls\":[\"bzz-raw://3d56e6e2396d11b77828a3c6e531b525eb9d8c8a18e21aacac7284f46a74d8c0\",\"dweb:/ipfs/QmXvbrYGJVmnstRFZr3axhVT5ZCiWZSyCUnMu4p8jmNUHg\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('SignedSafeMath.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.SignedSafeMath = SignedSafeMath
