'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ENSInterface = contract({
 "contractName": "ENSInterface",
 "abi": [
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "label",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "internalType": "address",
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "NewOwner",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "internalType": "address",
     "name": "resolver",
     "type": "address"
    }
   ],
   "name": "NewResolver",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "internalType": "uint64",
     "name": "ttl",
     "type": "uint64"
    }
   ],
   "name": "NewTTL",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "internalType": "address",
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "Transfer",
   "type": "event"
  },
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    }
   ],
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
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "resolver",
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
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "internalType": "address",
     "name": "_owner",
     "type": "address"
    }
   ],
   "name": "setOwner",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "internalType": "address",
     "name": "_resolver",
     "type": "address"
    }
   ],
   "name": "setResolver",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "internalType": "bytes32",
     "name": "label",
     "type": "bytes32"
    },
    {
     "internalType": "address",
     "name": "_owner",
     "type": "address"
    }
   ],
   "name": "setSubnodeOwner",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    },
    {
     "internalType": "uint64",
     "name": "_ttl",
     "type": "uint64"
    }
   ],
   "name": "setTTL",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "bytes32",
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "ttl",
   "outputs": [
    {
     "internalType": "uint64",
     "name": "",
     "type": "uint64"
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
   "owner(bytes32)": "02571be3",
   "resolver(bytes32)": "0178b8bf",
   "setOwner(bytes32,address)": "5b0fc9c3",
   "setResolver(bytes32,address)": "1896f70a",
   "setSubnodeOwner(bytes32,bytes32,address)": "06ab5923",
   "setTTL(bytes32,uint64)": "14ab9038",
   "ttl(bytes32)": "16a25cbd"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"label\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"NewOwner\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"resolver\",\"type\":\"address\"}],\"name\":\"NewResolver\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"ttl\",\"type\":\"uint64\"}],\"name\":\"NewTTL\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"}],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"}],\"name\":\"resolver\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"_resolver\",\"type\":\"address\"}],\"name\":\"setResolver\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"label\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"setSubnodeOwner\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"_ttl\",\"type\":\"uint64\"}],\"name\":\"setTTL\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"node\",\"type\":\"bytes32\"}],\"name\":\"ttl\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ENSInterface.sol\":\"ENSInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ENSInterface.sol\":{\"keccak256\":\"0xf4998e886147b298eda28b4eacbdc90c58ba63ba475469651f2072e188dd5a64\",\"urls\":[\"bzz-raw://c1e2334294a816b7eda9de280e39b9463ebde2db8b242410eb991b2f623b47d4\",\"dweb:/ipfs/QmNY5bajahfFRmhBgcMVQ7712zHKxc6HkuN7LaiKtpjb7t\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ENSInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ENSInterface = ENSInterface
