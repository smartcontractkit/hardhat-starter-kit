'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const LinkTokenInterface = contract({
 "contractName": "LinkTokenInterface",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "name",
   "outputs": [
    {
     "name": "tokenName",
     "type": "string"
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
     "name": "spender",
     "type": "address"
    },
    {
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "approve",
   "outputs": [
    {
     "name": "success",
     "type": "bool"
    }
   ],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "totalSupply",
   "outputs": [
    {
     "name": "totalTokensIssued",
     "type": "uint256"
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
     "name": "from",
     "type": "address"
    },
    {
     "name": "to",
     "type": "address"
    },
    {
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "transferFrom",
   "outputs": [
    {
     "name": "success",
     "type": "bool"
    }
   ],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "decimals",
   "outputs": [
    {
     "name": "decimalPlaces",
     "type": "uint8"
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
     "name": "to",
     "type": "address"
    },
    {
     "name": "value",
     "type": "uint256"
    },
    {
     "name": "data",
     "type": "bytes"
    }
   ],
   "name": "transferAndCall",
   "outputs": [
    {
     "name": "success",
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
     "name": "spender",
     "type": "address"
    },
    {
     "name": "addedValue",
     "type": "uint256"
    }
   ],
   "name": "decreaseApproval",
   "outputs": [
    {
     "name": "success",
     "type": "bool"
    }
   ],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "balanceOf",
   "outputs": [
    {
     "name": "balance",
     "type": "uint256"
    }
   ],
   "payable": false,
   "stateMutability": "view",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [],
   "name": "symbol",
   "outputs": [
    {
     "name": "tokenSymbol",
     "type": "string"
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
     "name": "to",
     "type": "address"
    },
    {
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "transfer",
   "outputs": [
    {
     "name": "success",
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
     "name": "spender",
     "type": "address"
    },
    {
     "name": "subtractedValue",
     "type": "uint256"
    }
   ],
   "name": "increaseApproval",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "owner",
     "type": "address"
    },
    {
     "name": "spender",
     "type": "address"
    }
   ],
   "name": "allowance",
   "outputs": [
    {
     "name": "remaining",
     "type": "uint256"
    }
   ],
   "payable": false,
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
   "linkReferences": {},
   "object": "0x",
   "opcodes": "",
   "sourceMap": ""
  },
  "methodIdentifiers": {
   "allowance(address,address)": "dd62ed3e",
   "approve(address,uint256)": "095ea7b3",
   "balanceOf(address)": "70a08231",
   "decimals()": "313ce567",
   "decreaseApproval(address,uint256)": "66188463",
   "increaseApproval(address,uint256)": "d73dd623",
   "name()": "06fdde03",
   "symbol()": "95d89b41",
   "totalSupply()": "18160ddd",
   "transfer(address,uint256)": "a9059cbb",
   "transferAndCall(address,uint256,bytes)": "4000aea0",
   "transferFrom(address,address,uint256)": "23b872dd"
  }
 },
 "metadata": ""
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('LinkTokenInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.LinkTokenInterface = LinkTokenInterface
