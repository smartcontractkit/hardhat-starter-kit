'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const FlagsInterface = contract({
 "contractName": "FlagsInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "",
     "type": "address"
    }
   ],
   "name": "getFlag",
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
     "internalType": "address[]",
     "name": "",
     "type": "address[]"
    }
   ],
   "name": "getFlags",
   "outputs": [
    {
     "internalType": "bool[]",
     "name": "",
     "type": "bool[]"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address[]",
     "name": "",
     "type": "address[]"
    }
   ],
   "name": "lowerFlags",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "",
     "type": "address"
    }
   ],
   "name": "raiseFlag",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address[]",
     "name": "",
     "type": "address[]"
    }
   ],
   "name": "raiseFlags",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "",
     "type": "address"
    }
   ],
   "name": "setRaisingAccessController",
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
   "getFlag(address)": "357e47fe",
   "getFlags(address[])": "7d723cac",
   "lowerFlags(address[])": "28286596",
   "raiseFlag(address)": "d74af263",
   "raiseFlags(address[])": "760bc82d",
   "setRaisingAccessController(address)": "517e89fe"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"getFlag\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"name\":\"getFlags\",\"outputs\":[{\"internalType\":\"bool[]\",\"name\":\"\",\"type\":\"bool[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"name\":\"lowerFlags\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"raiseFlag\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"name\":\"raiseFlags\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"setRaisingAccessController\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/FlagsInterface.sol\":\"FlagsInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/FlagsInterface.sol\":{\"keccak256\":\"0x03dc63c81aefb91a811a9631edad01e2ca17304c758a517d321c8e1e5ec79fc0\",\"urls\":[\"bzz-raw://6856578a3059cb65af5600b2e385f93c8ab4de2b60aef3699e7ae901dc583ddc\",\"dweb:/ipfs/QmdYmfr6tPtT4XonKHrW4UBoFju1JG65fPxmLCVYmaTsRQ\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('FlagsInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.FlagsInterface = FlagsInterface
