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
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"payment\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"callbackAddress\",\"type\":\"address\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"expiration\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"data\",\"type\":\"bytes32\"}],\"name\":\"fulfillOracleRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"node\",\"type\":\"address\"}],\"name\":\"getAuthorizationStatus\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"node\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"allowed\",\"type\":\"bool\"}],\"name\":\"setFulfillmentPermission\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawable\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/OracleInterface.sol\":\"OracleInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/OracleInterface.sol\":{\"keccak256\":\"0x325ca1599835f823a92e3e03eb900caae683e873937adb2924e435fa10d6e30a\",\"urls\":[\"bzz-raw://49b8d1583ba5364b840efe4415145139351edeb4428e23ff4f0265204dd0713b\",\"dweb:/ipfs/QmdQBuSy6g1yaCzNoGqMZ53vEZVdKKkkuJJzT2JPx9sPyM\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('OracleInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.OracleInterface = OracleInterface
