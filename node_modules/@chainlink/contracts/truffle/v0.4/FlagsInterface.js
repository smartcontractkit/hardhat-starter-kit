'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const FlagsInterface = contract({
 "contractName": "FlagsInterface",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "calldata",
     "type": "address[]"
    }
   ],
   "name": "lowerFlags",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "name": "getFlag",
   "outputs": [
    {
     "name": "",
     "type": "bool"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "name": "setRaisingAccessController",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "calldata",
     "type": "address[]"
    }
   ],
   "name": "raiseFlags",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "calldata",
     "type": "address[]"
    }
   ],
   "name": "getFlags",
   "outputs": [
    {
     "name": "",
     "type": "bool[]"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "name": "raiseFlag",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
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
   "getFlag(address)": "357e47fe",
   "getFlags(address[])": "7d723cac",
   "lowerFlags(address[])": "28286596",
   "raiseFlag(address)": "d74af263",
   "raiseFlags(address[])": "760bc82d",
   "setRaisingAccessController(address)": "517e89fe"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('FlagsInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.FlagsInterface = FlagsInterface
