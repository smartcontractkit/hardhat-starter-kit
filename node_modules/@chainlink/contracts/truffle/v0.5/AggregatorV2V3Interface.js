'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AggregatorV2V3Interface = contract({
 "contractName": "AggregatorV2V3Interface",
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
   "decimals()": "313ce567",
   "description()": "7284e416",
   "getAnswer(uint256)": "b5ab58dc",
   "getRoundData(uint80)": "9a6fc8f5",
   "getTimestamp(uint256)": "b633620c",
   "latestAnswer()": "50d25bcd",
   "latestRound()": "668a0f02",
   "latestRoundData()": "feaf968c",
   "latestTimestamp()": "8205bf6a",
   "version()": "54fd4d50"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AggregatorV2V3Interface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AggregatorV2V3Interface = AggregatorV2V3Interface
