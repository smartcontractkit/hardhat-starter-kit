'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const SafeMath128 = contract({
 "contractName": "SafeMath128",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212204b2707d72b9e950537d6621cb28b2bb07b9d433ea88ed92c2971bb441b2c599264736f6c63430006060033",
   "opcodes": "PUSH1 0x56 PUSH1 0x23 PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH1 0x0 BYTE PUSH1 0x73 EQ PUSH1 0x16 JUMPI INVALID JUMPDEST ADDRESS PUSH1 0x0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN INVALID PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x4B 0x27 SMOD 0xD7 0x2B SWAP15 SWAP6 SDIV CALLDATACOPY 0xD6 PUSH3 0x1CB28B 0x2B 0xB0 PUSH28 0x9D433EA88ED92C2971BB441B2C599264736F6C634300060600330000 ",
   "sourceMap": "700:2777:15:-:0;;132:2:-1;166:7;155:9;146:7;137:37;255:7;249:14;246:1;241:23;235:4;232:33;222:2;;269:9;222:2;293:9;290:1;283:20;323:4;314:7;306:22;347:7;338;331:24"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212204b2707d72b9e950537d6621cb28b2bb07b9d433ea88ed92c2971bb441b2c599264736f6c63430006060033",
   "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x4B 0x27 SMOD 0xD7 0x2B SWAP15 SWAP6 SDIV CALLDATACOPY 0xD6 PUSH3 0x1CB28B 0x2B 0xB0 PUSH28 0x9D433EA88ED92C2971BB441B2C599264736F6C634300060600330000 ",
   "sourceMap": "700:2777:15:-:0;;;;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"Wrappers over Solidity's arithmetic operations with added overflow checks. * Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. `SafeMath` restores this intuition by reverting the transaction when an operation overflows. * Using this library instead of the unchecked operations eliminates an entire class of bugs, so it's recommended to use it always. * This library is a version of Open Zeppelin's SafeMath, modified to support unsigned 128 bit integers.\",\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SafeMath128.sol\":\"SafeMath128\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/SafeMath128.sol\":{\"keccak256\":\"0xf9f8d939c849cdb5e6d07ec317d01083b6e2554310633831ffe8a219a43be9e3\",\"urls\":[\"bzz-raw://ccf0f38e67d5df926bc9c9d9b916add6e1520a421e9215772b6d4eacfa53e21f\",\"dweb:/ipfs/QmVc1JVzseDtC38m9RH1voG4D1HvxKZ2RaYTquNjvEJJJ7\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('SafeMath128.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.SafeMath128 = SafeMath128
