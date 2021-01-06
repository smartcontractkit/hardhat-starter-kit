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
 "metadata": "{\"compiler\":{\"version\":\"0.7.0+commit.9e61f92b\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"payment\",\"type\":\"uint256\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"expiration\",\"type\":\"uint256\"}],\"name\":\"cancelOracleRequest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"requestPrice\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"serviceAgreementID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"callbackAddress\",\"type\":\"address\"},{\"internalType\":\"bytes4\",\"name\":\"callbackFunctionId\",\"type\":\"bytes4\"},{\"internalType\":\"uint256\",\"name\":\"nonce\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"dataVersion\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"oracleRequest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/ChainlinkRequestInterface.sol\":\"ChainlinkRequestInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/ChainlinkRequestInterface.sol\":{\"keccak256\":\"0xaac59fb528688db73ce343fa6c1467e242139632d5471b07ca57783762b093cc\",\"urls\":[\"bzz-raw://3b6048f56a75fd8ebba30d86c2d4d04631058fdb9502a6ddf1d46a762ea16777\",\"dweb:/ipfs/QmQSoVzcfF2LJFLwtBiLxXaVmAXcbTUTLwzK8eyPzBS6C8\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ChainlinkRequestInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ChainlinkRequestInterface = ChainlinkRequestInterface
