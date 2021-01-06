'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const LinkTokenInterface = contract({
 "contractName": "LinkTokenInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "owner",
     "type": "address"
    },
    {
     "internalType": "address",
     "name": "spender",
     "type": "address"
    }
   ],
   "name": "allowance",
   "outputs": [
    {
     "internalType": "uint256",
     "name": "remaining",
     "type": "uint256"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "spender",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "approve",
   "outputs": [
    {
     "internalType": "bool",
     "name": "success",
     "type": "bool"
    }
   ],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "owner",
     "type": "address"
    }
   ],
   "name": "balanceOf",
   "outputs": [
    {
     "internalType": "uint256",
     "name": "balance",
     "type": "uint256"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "decimals",
   "outputs": [
    {
     "internalType": "uint8",
     "name": "decimalPlaces",
     "type": "uint8"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "spender",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "addedValue",
     "type": "uint256"
    }
   ],
   "name": "decreaseApproval",
   "outputs": [
    {
     "internalType": "bool",
     "name": "success",
     "type": "bool"
    }
   ],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "spender",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "subtractedValue",
     "type": "uint256"
    }
   ],
   "name": "increaseApproval",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "name",
   "outputs": [
    {
     "internalType": "string",
     "name": "tokenName",
     "type": "string"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "symbol",
   "outputs": [
    {
     "internalType": "string",
     "name": "tokenSymbol",
     "type": "string"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "totalSupply",
   "outputs": [
    {
     "internalType": "uint256",
     "name": "totalTokensIssued",
     "type": "uint256"
    }
   ],
   "stateMutability": "view",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "to",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "transfer",
   "outputs": [
    {
     "internalType": "bool",
     "name": "success",
     "type": "bool"
    }
   ],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "to",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "value",
     "type": "uint256"
    },
    {
     "internalType": "bytes",
     "name": "data",
     "type": "bytes"
    }
   ],
   "name": "transferAndCall",
   "outputs": [
    {
     "internalType": "bool",
     "name": "success",
     "type": "bool"
    }
   ],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "from",
     "type": "address"
    },
    {
     "internalType": "address",
     "name": "to",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "value",
     "type": "uint256"
    }
   ],
   "name": "transferFrom",
   "outputs": [
    {
     "internalType": "bool",
     "name": "success",
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
 "metadata": "{\"compiler\":{\"version\":\"0.7.0+commit.9e61f92b\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"remaining\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"decimalPlaces\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"addedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"subtractedValue\",\"type\":\"uint256\"}],\"name\":\"increaseApproval\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"tokenSymbol\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"totalTokensIssued\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"transferAndCall\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/LinkTokenInterface.sol\":\"LinkTokenInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/LinkTokenInterface.sol\":{\"keccak256\":\"0x54a9439f3f39533dfcb90cd1c494f63e70b4a3e5dcb32389aa3365c1475800e9\",\"urls\":[\"bzz-raw://07603544ad7fe88253b5253dd92d981e9cde503abf99b0416f24b2abd36ed6ec\",\"dweb:/ipfs/QmPgeSFmSALoQw9XBxK9Jm3CW5TQs59u5vNafyW1yX9r2A\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('LinkTokenInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.LinkTokenInterface = LinkTokenInterface
