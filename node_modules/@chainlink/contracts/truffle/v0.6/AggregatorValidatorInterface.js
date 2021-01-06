'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AggregatorValidatorInterface = contract({
 "contractName": "AggregatorValidatorInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "uint256",
     "name": "previousRoundId",
     "type": "uint256"
    },
    {
     "internalType": "int256",
     "name": "previousAnswer",
     "type": "int256"
    },
    {
     "internalType": "uint256",
     "name": "currentRoundId",
     "type": "uint256"
    },
    {
     "internalType": "int256",
     "name": "currentAnswer",
     "type": "int256"
    }
   ],
   "name": "validate",
   "outputs": [
    {
     "internalType": "bool",
     "name": "",
     "type": "bool"
    }
   ],
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
   "validate(uint256,int256,uint256,int256)": "beed9b51"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"previousRoundId\",\"type\":\"uint256\"},{\"internalType\":\"int256\",\"name\":\"previousAnswer\",\"type\":\"int256\"},{\"internalType\":\"uint256\",\"name\":\"currentRoundId\",\"type\":\"uint256\"},{\"internalType\":\"int256\",\"name\":\"currentAnswer\",\"type\":\"int256\"}],\"name\":\"validate\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AggregatorValidatorInterface.sol\":\"AggregatorValidatorInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AggregatorValidatorInterface.sol\":{\"keccak256\":\"0x7b46614646c22ddf244bdc3cec8c2f8c2bbd519a6b08da07d4bcedf4f1d4a371\",\"urls\":[\"bzz-raw://87e293cb40066294af4734a2c9cf73a04831bc71f9d4ac121ceb8fd08eff6b4e\",\"dweb:/ipfs/QmeQt7bwCMJXF39VTGq8QSZSNyCEx4N2mSGRqSY3dfRQhQ\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AggregatorValidatorInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AggregatorValidatorInterface = AggregatorValidatorInterface
