'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AggregatorInterface = contract({
 "contractName": "AggregatorInterface",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "latestAnswer",
   "outputs": [
    {
     "name": "",
     "type": "int256"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "latestRound",
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
   "inputs": [],
   "name": "latestTimestamp",
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
     "name": "roundId",
     "type": "uint256"
    }
   ],
   "name": "getAnswer",
   "outputs": [
    {
     "name": "",
     "type": "int256"
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
     "name": "roundId",
     "type": "uint256"
    }
   ],
   "name": "getTimestamp",
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
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "current",
     "type": "int256"
    },
    {
     "indexed": true,
     "name": "roundId",
     "type": "uint256"
    },
    {
     "indexed": false,
     "name": "timestamp",
     "type": "uint256"
    }
   ],
   "name": "AnswerUpdated",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "roundId",
     "type": "uint256"
    },
    {
     "indexed": true,
     "name": "startedBy",
     "type": "address"
    },
    {
     "indexed": false,
     "name": "startedAt",
     "type": "uint256"
    }
   ],
   "name": "NewRound",
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
   "getAnswer(uint256)": "b5ab58dc",
   "getTimestamp(uint256)": "b633620c",
   "latestAnswer()": "50d25bcd",
   "latestRound()": "668a0f02",
   "latestTimestamp()": "8205bf6a"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AggregatorInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AggregatorInterface = AggregatorInterface
