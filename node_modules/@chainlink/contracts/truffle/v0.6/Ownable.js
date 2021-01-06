'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const Ownable = contract({
 "contractName": "Ownable",
 "abi": [
  {
   "inputs": [],
   "stateMutability": "nonpayable",
   "type": "constructor"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "address",
     "name": "previousOwner",
     "type": "address"
    },
    {
     "indexed": true,
     "internalType": "address",
     "name": "newOwner",
     "type": "address"
    }
   ],
   "name": "OwnershipTransferred",
   "type": "event"
  },
  {
   "inputs": [],
   "name": "isOwner",
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
   "inputs": [],
   "name": "owner",
   "outputs": [
    {
     "internalType": "address",
     "name": "",
     "type": "address"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "newOwner",
     "type": "address"
    }
   ],
   "name": "transferOwnership",
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
   "isOwner()": "8f32d59b",
   "owner()": "8da5cb5b",
   "transferOwnership(address)": "f2fde38b"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"isOwner\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. * This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be aplied to your functions to restrict their use to the owner. * This contract has been modified to remove the revokeOwnership function\",\"methods\":{\"constructor\":{\"details\":\"Initializes the contract setting the deployer as the initial owner.\"},\"isOwner()\":{\"details\":\"Returns true if the caller is the current owner.\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/Ownable.sol\":\"Ownable\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/Ownable.sol\":{\"keccak256\":\"0x3dfd577392b1fde3e54f76a81358fd27c041f30257bb9438f0bb5952e351befa\",\"urls\":[\"bzz-raw://f21d5e72760d89f05ef0eb791eb952fe0688a83dc679b0cf457c556c738aa1ee\",\"dweb:/ipfs/QmVKpY8tKTqaDcaz7D5G9weH8oEKXmfTscZ3WknjBuTqid\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('Ownable.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.Ownable = Ownable
