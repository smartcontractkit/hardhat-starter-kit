'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const SafeMath32 = contract({
 "contractName": "SafeMath32",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220527af9bfe799f96c5f2e283c43169c26790035efe42e258ea2aa48883e63a25e64736f6c63430006060033",
   "opcodes": "PUSH1 0x56 PUSH1 0x23 PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH1 0x0 BYTE PUSH1 0x73 EQ PUSH1 0x16 JUMPI INVALID JUMPDEST ADDRESS PUSH1 0x0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN INVALID PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MSTORE PUSH27 0xF9BFE799F96C5F2E283C43169C26790035EFE42E258EA2AA48883E PUSH4 0xA25E6473 PUSH16 0x6C634300060600330000000000000000 ",
   "sourceMap": "699:2757:16:-:0;;132:2:-1;166:7;155:9;146:7;137:37;255:7;249:14;246:1;241:23;235:4;232:33;222:2;;269:9;222:2;293:9;290:1;283:20;323:4;314:7;306:22;347:7;338;331:24"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220527af9bfe799f96c5f2e283c43169c26790035efe42e258ea2aa48883e63a25e64736f6c63430006060033",
   "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MSTORE PUSH27 0xF9BFE799F96C5F2E283C43169C26790035EFE42E258EA2AA48883E PUSH4 0xA25E6473 PUSH16 0x6C634300060600330000000000000000 ",
   "sourceMap": "699:2757:16:-:0;;;;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"Wrappers over Solidity's arithmetic operations with added overflow checks. * Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. `SafeMath` restores this intuition by reverting the transaction when an operation overflows. * Using this library instead of the unchecked operations eliminates an entire class of bugs, so it's recommended to use it always. * This library is a version of Open Zeppelin's SafeMath, modified to support unsigned 32 bit integers.\",\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SafeMath32.sol\":\"SafeMath32\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SafeMath32.sol\":{\"keccak256\":\"0xdeb861fd382627ff8f614c942a98b96b701d719af81a1405caa41a1066272be7\",\"urls\":[\"bzz-raw://d8b977af733eda389474ea940fbdd8a989257100ed5341b85f56b271393eb161\",\"dweb:/ipfs/QmZGXnpsGNBpBt3NK24qeREkFiYZZfUN6L5mMfVfVoxM6y\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('SafeMath32.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.SafeMath32 = SafeMath32
