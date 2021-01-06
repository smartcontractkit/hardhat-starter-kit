'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ERC677Receiver = contract({
 "contractName": "ERC677Receiver",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "_sender",
     "type": "address"
    },
    {
     "name": "_value",
     "type": "uint256"
    },
    {
     "name": "_data",
     "type": "bytes"
    }
   ],
   "name": "onTokenTransfer",
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
   "onTokenTransfer(address,uint256,bytes)": "a4c0ed36"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ERC677Receiver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ERC677Receiver = ERC677Receiver
