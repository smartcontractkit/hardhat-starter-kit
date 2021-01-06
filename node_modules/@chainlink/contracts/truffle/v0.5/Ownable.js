'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const Ownable = contract({
 "contractName": "Ownable",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "owner",
   "outputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "isOwner",
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
     "name": "newOwner",
     "type": "address"
    }
   ],
   "name": "transferOwnership",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "constructor"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "previousOwner",
     "type": "address"
    },
    {
     "indexed": true,
     "name": "newOwner",
     "type": "address"
    }
   ],
   "name": "OwnershipTransferred",
   "type": "event"
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
   "isOwner()": "8f32d59b",
   "owner()": "8da5cb5b",
   "transferOwnership(address)": "f2fde38b"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('Ownable.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.Ownable = Ownable
