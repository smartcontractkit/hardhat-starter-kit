'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const OracleInterface = contract({
 "contractName": "OracleInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "requestId",
     "type": "bytes32"
    },
    {
     "internalType": "uint256",
     "name": "payment",
     "type": "uint256"
    },
    {
     "internalType": "address",
     "name": "callbackAddress",
     "type": "address"
    },
    {
     "internalType": "bytes4",
     "name": "callbackFunctionId",
     "type": "bytes4"
    },
    {
     "internalType": "uint256",
     "name": "expiration",
     "type": "uint256"
    },
    {
     "internalType": "bytes32",
     "name": "data",
     "type": "bytes32"
    }
   ],
   "name": "fulfillOracleRequest",
   "outputs": [
    {
     "internalType": "bool",
     "name": "",
     "type": "bool"
    }
   ],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "node",
     "type": "address"
    }
   ],
   "name": "getAuthorizationStatus",
   "outputs": [
    {
     "internalType": "bool",
     "name": "",
     "type": "bool"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "node",
     "type": "address"
    },
    {
     "internalType": "bool",
     "name": "allowed",
     "type": "bool"
    }
   ],
   "name": "setFulfillmentPermission",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "recipient",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "amount",
     "type": "uint256"
    }
   ],
   "name": "withdraw",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "withdrawable",
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
   "fulfillOracleRequest(bytes32,uint256,address,bytes4,uint256,bytes32)": "4ab0d190",
   "getAuthorizationStatus(address)": "d3e9c314",
   "setFulfillmentPermission(address,bool)": "7fcd56db",
   "withdraw(address,uint256)": "f3fef3a3",
   "withdrawable()": "50188301"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.7.0+commit.9e61f92b\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"payment\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"callbackAddress\",\"type\":\"address\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"expiration\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"data\",\"type\":\"bytes32\"}],\"name\":\"fulfillOracleRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"node\",\"type\":\"address\"}],\"name\":\"getAuthorizationStatus\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"node\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"allowed\",\"type\":\"bool\"}],\"name\":\"setFulfillmentPermission\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawable\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/OracleInterface.sol\":\"OracleInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/OracleInterface.sol\":{\"keccak256\":\"0x2c19acd3f40ac160461abda804792e67bf2defd7628fe3ba3b2d8505c2cb8228\",\"urls\":[\"bzz-raw://f08ce031b5b4c6f079654edc40684684bbadb3dc3df0f37c3ea7f1da3a1720fc\",\"dweb:/ipfs/QmR9m6bfqCRvg6cZqq6twfKQvFqY2Xaq1EQwhBYZS4iwZm\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('OracleInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.OracleInterface = OracleInterface
