'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ChainlinkRequestInterface = contract({
 "contractName": "ChainlinkRequestInterface",
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
     "internalType": "bytes4",
     "name": "callbackFunctionId",
     "type": "bytes4"
    },
    {
     "internalType": "uint256",
     "name": "expiration",
     "type": "uint256"
    }
   ],
   "name": "cancelOracleRequest",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "sender",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "requestPrice",
     "type": "uint256"
    },
    {
     "internalType": "bytes32",
     "name": "serviceAgreementID",
     "type": "bytes32"
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
     "name": "nonce",
     "type": "uint256"
    },
    {
     "internalType": "uint256",
     "name": "dataVersion",
     "type": "uint256"
    },
    {
     "internalType": "bytes",
     "name": "data",
     "type": "bytes"
    }
   ],
   "name": "oracleRequest",
   "outputs": [],
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
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x",
   "opcodes": "",
   "sourceMap": ""
  },
  "methodIdentifiers": {
   "cancelOracleRequest(bytes32,uint256,bytes4,uint256)": "6ee4d553",
   "oracleRequest(address,uint256,bytes32,address,bytes4,uint256,uint256,bytes)": "40429946"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"payment\",\"type\":\"uint256\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"expiration\",\"type\":\"uint256\"}],\"name\":\"cancelOracleRequest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"requestPrice\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"serviceAgreementID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"callbackAddress\",\"type\":\"address\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"nonce\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"dataVersion\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"oracleRequest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ChainlinkRequestInterface.sol\":\"ChainlinkRequestInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ChainlinkRequestInterface.sol\":{\"keccak256\":\"0x4b41b021bf58c429891ff291637de29be54741565105de82238dac9f6ecee374\",\"urls\":[\"bzz-raw://84681ff65b31b2e2c6977289661733c0f22409965b9057140f56f8a9ff185048\",\"dweb:/ipfs/QmS4TQJDSHQiKNwQ4LkSCVp7LjuRQwp6gem3271vtCwz9k\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ChainlinkRequestInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ChainlinkRequestInterface = ChainlinkRequestInterface
