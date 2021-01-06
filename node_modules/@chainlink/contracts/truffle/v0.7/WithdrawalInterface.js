'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const WithdrawalInterface = contract({
 "contractName": "WithdrawalInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "address",
     "name": "recipient",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "amount",
     "type": "uint256"
    }
   ],
   "name": "withdraw",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "inputs": [],
   "name": "withdrawable",
   "outputs": [
    {
     "internalType": "uint256",
     "name": "",
     "type": "uint256"
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
   "withdraw(address,uint256)": "f3fef3a3",
   "withdrawable()": "50188301"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.7.0+commit.9e61f92b\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawable\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"withdraw(address,uint256)\":{\"params\":{\"amount\":\"is the amount of LINK to send\",\"recipient\":\"is the address to send the LINK to\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"withdraw(address,uint256)\":{\"notice\":\"transfer LINK held by the contract belonging to msg.sender to another address\"},\"withdrawable()\":{\"notice\":\"query the available amount of LINK to withdraw by msg.sender\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/WithdrawalInterface.sol\":\"WithdrawalInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/interfaces/WithdrawalInterface.sol\":{\"keccak256\":\"0x3db82a471a7330013f7322b26ac7e25712bf91044b18a1066a1661ac55b2fb50\",\"urls\":[\"bzz-raw://f9085507e9b88108a73edd7e0c6061392379b43520543dcd2016a8b67d2ec14f\",\"dweb:/ipfs/QmZCxm2xQfuXcd4zJsNNddvpr7Hx15eieHsDin4RT7G7yg\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('WithdrawalInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.WithdrawalInterface = WithdrawalInterface
