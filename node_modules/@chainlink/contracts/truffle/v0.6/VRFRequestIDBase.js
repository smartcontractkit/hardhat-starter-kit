'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const VRFRequestIDBase = contract({
 "contractName": "VRFRequestIDBase",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220caa42c02c3dc3e06037a0859702ecfd58a9f5367437e4ba1b9354bbff0f1f5eb64736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x3F DUP1 PUSH1 0x1D PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCA LOG4 0x2C MUL 0xC3 0xDC RETURNDATACOPY MOD SUB PUSH27 0x859702ECFD58A9F5367437E4BA1B9354BBFF0F1F5EB64736F6C63 NUMBER STOP MOD MOD STOP CALLER ",
   "sourceMap": "25:1524:24:-:0;;;;5:9:-1;2:2;;;27:1;24;17:12;2:2;25:1524:24;;;;;;;"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x6080604052600080fdfea2646970667358221220caa42c02c3dc3e06037a0859702ecfd58a9f5367437e4ba1b9354bbff0f1f5eb64736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCA LOG4 0x2C MUL 0xC3 0xDC RETURNDATACOPY MOD SUB PUSH27 0x859702ECFD58A9F5367437E4BA1B9354BBFF0F1F5EB64736F6C63 NUMBER STOP MOD MOD STOP CALLER ",
   "sourceMap": "25:1524:24:-:0;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/VRFRequestIDBase.sol\":\"VRFRequestIDBase\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/VRFRequestIDBase.sol\":{\"keccak256\":\"0x0b004386a2f5c662413598e3a2644bdc0ba8ec95c1bbb50a15f97e55c25e8bc1\",\"urls\":[\"bzz-raw://825b757416c08bdf36ebc9f477bcf1dff2979a37a04af8fa128a8b8da5195ed8\",\"dweb:/ipfs/QmWhGF2rLEKfCKLvN83VL3Zh19YvvoWqVaTH7ZkyJrcLvS\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('VRFRequestIDBase.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.VRFRequestIDBase = VRFRequestIDBase
