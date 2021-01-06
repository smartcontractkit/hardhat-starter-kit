'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ChainlinkRequestInterface = contract({
 "contractName": "ChainlinkRequestInterface",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "sender",
     "type": "address"
    },
    {
     "name": "requestPrice",
     "type": "uint256"
    },
    {
     "name": "serviceAgreementID",
     "type": "bytes32"
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
     "name": "nonce",
     "type": "uint256"
    },
    {
     "name": "dataVersion",
     "type": "uint256"
    },
    {
     "name": "data",
     "type": "bytes"
    }
   ],
   "name": "oracleRequest",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
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
     "name": "callbackFunctionId",
     "type": "bytes4"
    },
    {
     "name": "expiration",
     "type": "uint256"
    }
   ],
   "name": "cancelOracleRequest",
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
   "cancelOracleRequest(bytes32,uint256,bytes4,uint256)": "6ee4d553",
   "oracleRequest(address,uint256,bytes32,address,bytes4,uint256,uint256,bytes)": "40429946"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ChainlinkRequestInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ChainlinkRequestInterface = ChainlinkRequestInterface
