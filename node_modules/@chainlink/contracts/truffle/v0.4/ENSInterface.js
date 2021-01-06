'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ENSInterface = contract({
 "contractName": "ENSInterface",
 "abi": [
  {
   "constant": true,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "resolver",
   "outputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "owner",
   "outputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    },
    {
     "name": "label",
     "type": "bytes32"
    },
    {
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "setSubnodeOwner",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    },
    {
     "name": "ttl",
     "type": "uint64"
    }
   ],
   "name": "setTTL",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    }
   ],
   "name": "ttl",
   "outputs": [
    {
     "name": "",
     "type": "uint64"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    },
    {
     "name": "resolver",
     "type": "address"
    }
   ],
   "name": "setResolver",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "node",
     "type": "bytes32"
    },
    {
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "setOwner",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": true,
     "name": "label",
     "type": "bytes32"
    },
    {
     "indexed": false,
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
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "Transfer",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
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
     "name": "node",
     "type": "bytes32"
    },
    {
     "indexed": false,
     "name": "ttl",
     "type": "uint64"
    }
   ],
   "name": "NewTTL",
   "type": "event"
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
   "owner(bytes32)": "02571be3",
   "resolver(bytes32)": "0178b8bf",
   "setOwner(bytes32,address)": "5b0fc9c3",
   "setResolver(bytes32,address)": "1896f70a",
   "setSubnodeOwner(bytes32,bytes32,address)": "06ab5923",
   "setTTL(bytes32,uint64)": "14ab9038",
   "ttl(bytes32)": "16a25cbd"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ENSInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ENSInterface = ENSInterface
