'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const LinkTokenReceiver = contract({
 "contractName": "LinkTokenReceiver",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "getChainlinkToken",
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
   "constant": false,
   "inputs": [
    {
     "name": "_sender",
     "type": "address"
    },
    {
     "name": "_amount",
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
   "getChainlinkToken()": "165d35e1",
   "onTokenTransfer(address,uint256,bytes)": "a4c0ed36"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('LinkTokenReceiver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.LinkTokenReceiver = LinkTokenReceiver
