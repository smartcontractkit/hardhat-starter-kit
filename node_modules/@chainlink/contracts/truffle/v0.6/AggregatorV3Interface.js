'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AggregatorV3Interface = contract({
 "contractName": "AggregatorV3Interface",
 "abi": [
  {
   "inputs": [],
   "name": "decimals",
   "outputs": [
    {
     "internalType": "uint8",
     "name": "",
     "type": "uint8"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "description",
   "outputs": [
    {
     "internalType": "string",
     "name": "",
     "type": "string"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "uint80",
     "name": "_roundId",
     "type": "uint80"
    }
   ],
   "name": "getRoundData",
   "outputs": [
    {
     "internalType": "uint80",
     "name": "roundId",
     "type": "uint80"
    },
    {
     "internalType": "int256",
     "name": "answer",
     "type": "int256"
    },
    {
     "internalType": "uint256",
     "name": "startedAt",
     "type": "uint256"
    },
    {
     "internalType": "uint256",
     "name": "updatedAt",
     "type": "uint256"
    },
    {
     "internalType": "uint80",
     "name": "answeredInRound",
     "type": "uint80"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "latestRoundData",
   "outputs": [
    {
     "internalType": "uint80",
     "name": "roundId",
     "type": "uint80"
    },
    {
     "internalType": "int256",
     "name": "answer",
     "type": "int256"
    },
    {
     "internalType": "uint256",
     "name": "startedAt",
     "type": "uint256"
    },
    {
     "internalType": "uint256",
     "name": "updatedAt",
     "type": "uint256"
    },
    {
     "internalType": "uint80",
     "name": "answeredInRound",
     "type": "uint80"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "version",
   "outputs": [
    {
     "internalType": "uint256",
     "name": "",
     "type": "uint256"
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
   "decimals()": "313ce567",
   "description()": "7284e416",
   "getRoundData(uint80)": "9a6fc8f5",
   "latestRoundData()": "feaf968c",
   "version()": "54fd4d50"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"description\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint80\",\"name\":\"_roundId\",\"type\":\"uint80\"}],\"name\":\"getRoundData\",\"outputs\":[{\"internalType\":\"uint80\",\"name\":\"roundId\",\"type\":\"uint80\"},{\"internalType\":\"int256\",\"name\":\"answer\",\"type\":\"int256\"},{\"internalType\":\"uint256\",\"name\":\"startedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"updatedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint80\",\"name\":\"answeredInRound\",\"type\":\"uint80\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestRoundData\",\"outputs\":[{\"internalType\":\"uint80\",\"name\":\"roundId\",\"type\":\"uint80\"},{\"internalType\":\"int256\",\"name\":\"answer\",\"type\":\"int256\"},{\"internalType\":\"uint256\",\"name\":\"startedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"updatedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint80\",\"name\":\"answeredInRound\",\"type\":\"uint80\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol\":\"AggregatorV3Interface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol\":{\"keccak256\":\"0x12f0e35e0320088f2110173226860e44309766c0f7022a2433efdebd5bf1a002\",\"urls\":[\"bzz-raw://44645044454c4013f5f3bc3fda54b507494fe95921bf75de9a329933cb32b19d\",\"dweb:/ipfs/QmfP8kZZw6zYKy6cVPxbatSDZHiwTSJ1iMGyiYKE25DHLw\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AggregatorV3Interface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AggregatorV3Interface = AggregatorV3Interface
