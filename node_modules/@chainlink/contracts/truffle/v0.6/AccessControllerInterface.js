'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const AccessControllerInterface = contract({
 "contractName": "AccessControllerInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "user",
     "type": "address"
    },
    {
     "internalType": "bytes",
     "name": "data",
     "type": "bytes"
    }
   ],
   "name": "hasAccess",
   "outputs": [
    {
     "internalType": "bool",
     "name": "",
     "type": "bool"
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
   "hasAccess(address,bytes)": "6b14daf8"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"hasAccess\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AccessControllerInterface.sol\":\"AccessControllerInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/AccessControllerInterface.sol\":{\"keccak256\":\"0x6b4b9fb4b950233793c557bf42c5381ce09efe9066d80af7391a38114b33b6ae\",\"urls\":[\"bzz-raw://e5b9e820134561e3c70b485a54484da5e0a72651f95df80d5dbeb8b52c005819\",\"dweb:/ipfs/QmREfxu1Xb3TTBtoF35o85gw4WZefdvpZn2FGE8Qjzfnyv\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('AccessControllerInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.AccessControllerInterface = AccessControllerInterface
