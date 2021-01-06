'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AggregatorV3Interface = contract({
 "contractName": "AggregatorV3Interface",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "decimals",
   "outputs": [
    {
     "name": "",
     "type": "uint8"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "version",
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
   "name": "description",
   "outputs": [
    {
     "name": "",
     "type": "string"
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
     "name": "_roundId",
     "type": "uint80"
    }
   ],
   "name": "getRoundData",
   "outputs": [
    {
     "name": "roundId",
     "type": "uint80"
    },
    {
     "name": "answer",
     "type": "int256"
    },
    {
     "name": "startedAt",
     "type": "uint256"
    },
    {
     "name": "updatedAt",
     "type": "uint256"
    },
    {
     "name": "answeredInRound",
     "type": "uint80"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "latestRoundData",
   "outputs": [
    {
     "name": "roundId",
     "type": "uint80"
    },
    {
     "name": "answer",
     "type": "int256"
    },
    {
     "name": "startedAt",
     "type": "uint256"
    },
    {
     "name": "updatedAt",
     "type": "uint256"
    },
    {
     "name": "answeredInRound",
     "type": "uint80"
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
   "decimals()": "313ce567",
   "description()": "7284e416",
   "getRoundData(uint80)": "9a6fc8f5",
   "latestRoundData()": "feaf968c",
   "version()": "54fd4d50"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AggregatorV3Interface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AggregatorV3Interface = AggregatorV3Interface
