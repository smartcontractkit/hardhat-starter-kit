'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const OracleInterface = contract({
 "contractName": "OracleInterface",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "requestId",
     "type": "bytes32"
    },
    {
     "name": "payment",
     "type": "uint256"
    },
    {
     "name": "callbackAddress",
     "type": "address"
    },
    {
     "name": "callbackFunctionId",
     "type": "bytes4"
    },
    {
     "name": "expiration",
     "type": "uint256"
    },
    {
     "name": "data",
     "type": "bytes32"
    }
   ],
   "name": "fulfillOracleRequest",
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
     "name": "node",
     "type": "address"
    },
    {
     "name": "allowed",
     "type": "bool"
    }
   ],
   "name": "setFulfillmentPermission",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "node",
     "type": "address"
    }
   ],
   "name": "getAuthorizationStatus",
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
   "fulfillOracleRequest(bytes32,uint256,address,bytes4,uint256,bytes32)": "4ab0d190",
   "getAuthorizationStatus(address)": "d3e9c314",
   "setFulfillmentPermission(address,bool)": "7fcd56db",
   "withdraw(address,uint256)": "f3fef3a3",
   "withdrawable()": "50188301"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('OracleInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.OracleInterface = OracleInterface
