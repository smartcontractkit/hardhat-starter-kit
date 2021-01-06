'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const CoordinatorInterface = contract({
 "contractName": "CoordinatorInterface",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "_requestId",
     "type": "bytes32"
    },
    {
     "name": "_aggregatorArgs",
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
   "constant": false,
   "inputs": [
    {
     "name": "_serviceAgreementData",
     "type": "bytes"
    },
    {
     "name": "_oracleSignaturesData",
     "type": "bytes"
    }
   ],
   "name": "initiateServiceAgreement",
   "outputs": [
    {
     "name": "",
     "type": "bytes32"
    }
   ],
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
   "fulfillOracleRequest(bytes32,bytes32)": "1f8f238c",
   "initiateServiceAgreement(bytes,bytes)": "b972d7f8"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('CoordinatorInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.CoordinatorInterface = CoordinatorInterface
