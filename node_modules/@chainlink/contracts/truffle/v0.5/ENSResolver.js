'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ENSResolver = contract({
 "contractName": "ENSResolver",
 "abi": [
  {
   "constant": true,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "addr",
   "outputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "payable": false,
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
   "linkReferences": {},
   "object": "0x",
   "opcodes": "",
   "sourceMap": ""
  },
  "methodIdentifiers": {
   "addr(bytes32)": "3b3b57de"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ENSResolver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ENSResolver = ENSResolver
