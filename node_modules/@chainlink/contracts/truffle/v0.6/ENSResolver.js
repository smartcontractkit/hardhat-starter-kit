'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ENSResolver = contract({
 "contractName": "ENSResolver",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "addr",
   "outputs": [
    {
     "internalType": "address",
     "name": "",
     "type": "address"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  }
 ],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x",
   "opcodes": "",
   "sourceMap": ""
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x",
   "opcodes": "",
   "sourceMap": ""
  },
  "methodIdentifiers": {
   "addr(bytes32)": "3b3b57de"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"}],\"name\":\"addr\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/ENSResolver.sol\":\"ENSResolver\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/ENSResolver.sol\":{\"keccak256\":\"0xdddea29d7407c1dbd1e130d885fc1a0934e98f0a7cc9f4d5bfd002bb2cfbcf82\",\"urls\":[\"bzz-raw://c4c764d69c47754d7b219fab558bf4be2a6444470ede7aa0ab1e446aea01dbda\",\"dweb:/ipfs/QmWp2CNUw9xt8ir2P3LhGHuydUsAXnyZ382U2BUjhoYPvy\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ENSResolver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ENSResolver = ENSResolver
