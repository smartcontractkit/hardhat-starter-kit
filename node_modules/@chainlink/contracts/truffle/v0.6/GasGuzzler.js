'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const GasGuzzler = contract({
 "contractName": "GasGuzzler",
 "abi": [
  {
   "stateMutability": "payable",
   "type": "fallback"
  }
 ],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe60806040525b600556fea26469706673582212200847f72f8225def71d6b14ecea530da624dd00605015c0236721e2b4fe31f99164736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x3F DUP1 PUSH1 0x1D PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE JUMPDEST PUSH1 0x5 JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 ADDMOD SELFBALANCE 0xF7 0x2F DUP3 0x25 0xDE 0xF7 SAR PUSH12 0x14ECEA530DA624DD00605015 0xC0 0x23 PUSH8 0x21E2B4FE31F99164 PUSH20 0x6F6C634300060600330000000000000000000000 ",
   "sourceMap": "24:84:48:-:0;;;;5:9:-1;2:2;;;27:1;24;17:12;2:2;24:84:48;;;;;;;"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x60806040525b600556fea26469706673582212200847f72f8225def71d6b14ecea530da624dd00605015c0236721e2b4fe31f99164736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE JUMPDEST PUSH1 0x5 JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 ADDMOD SELFBALANCE 0xF7 0x2F DUP3 0x25 0xDE 0xF7 SAR PUSH12 0x14ECEA530DA624DD00605015 0xC0 0x23 PUSH8 0x21E2B4FE31F99164 PUSH20 0x6F6C634300060600330000000000000000000000 ",
   "sourceMap": "24:84:48:-:0;;;82:20;;"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"stateMutability\":\"payable\",\"type\":\"fallback\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/tests/GasGuzzler.sol\":\"GasGuzzler\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/tests/GasGuzzler.sol\":{\"keccak256\":\"0x22ed2f244fa21341451c1d2f334e0d5d7fef0efae6992c5af0f5a05d0553caf5\",\"urls\":[\"bzz-raw://432dffaa0c5713ee549965c79344e57230111b1f0a9024cb1d439e6dbf18b859\",\"dweb:/ipfs/QmVKqdXUZW3HG111nUWLWJtPqJaeRKhDbRH1P99FtYiQdW\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('GasGuzzler.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.GasGuzzler = GasGuzzler
