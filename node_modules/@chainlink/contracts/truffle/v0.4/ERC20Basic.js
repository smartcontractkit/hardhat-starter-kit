'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ERC20Basic = contract({
 "contractName": "ERC20Basic",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "totalSupply",
   "outputs": [
    {
     "name": "",
     "type": "uint256"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "who",
     "type": "address"
    }
   ],
   "name": "balanceOf",
   "outputs": [
    {
     "name": "",
     "type": "uint256"
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
     "name": "to",
     "type": "address"
    },
    {
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "transfer",
   "outputs": [
    {
     "name": "",
     "type": "bool"
    }
   ],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "from",
     "type": "address"
    },
    {
     "indexed": true,
     "name": "to",
     "type": "address"
    },
    {
     "indexed": false,
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "Transfer",
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
   "balanceOf(address)": "70a08231",
   "totalSupply()": "18160ddd",
   "transfer(address,uint256)": "a9059cbb"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ERC20Basic.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ERC20Basic = ERC20Basic
