'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const WithdrawalInterface = contract({
 "contractName": "WithdrawalInterface",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "withdrawable",
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
     "name": "recipient",
     "type": "address"
    },
    {
     "name": "amount",
     "type": "uint256"
    }
   ],
   "name": "withdraw",
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
   "withdraw(address,uint256)": "f3fef3a3",
   "withdrawable()": "50188301"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('WithdrawalInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.WithdrawalInterface = WithdrawalInterface
