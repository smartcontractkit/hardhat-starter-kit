'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const LinkTokenReceiver = contract({
 "contractName": "LinkTokenReceiver",
 "abi": [
  {
   "inputs": [],
   "name": "getChainlinkToken",
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
     "name": "_sender",
     "type": "address"
    },
    {
     "internalType": "uint256",
     "name": "_amount",
     "type": "uint256"
    },
    {
     "internalType": "bytes",
     "name": "_data",
     "type": "bytes"
    }
   ],
   "name": "onTokenTransfer",
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
   "getChainlinkToken()": "165d35e1",
   "onTokenTransfer(address,uint256,bytes)": "a4c0ed36"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"getChainlinkToken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"onTokenTransfer\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{\"onTokenTransfer(address,uint256,bytes)\":{\"details\":\"The data payload's first 2 words will be overwritten by the `_sender` and `_amount` values to ensure correctness. Calls oracleRequest.\",\"params\":{\"_amount\":\"Amount of LINK sent (specified in wei)\",\"_data\":\"Payload of the transaction\",\"_sender\":\"Address of the sender\"}}}},\"userdoc\":{\"methods\":{\"onTokenTransfer(address,uint256,bytes)\":{\"notice\":\"Called when LINK is sent to the contract via `transferAndCall`\"}}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/LinkTokenReceiver.sol\":\"LinkTokenReceiver\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/LinkTokenReceiver.sol\":{\"keccak256\":\"0xa856c0d069254b46ec90528fe9440485f7dd7efbf13b2b4c80a0e28910d25a95\",\"urls\":[\"bzz-raw://c50eb949083eaadd1139ebef6377dab2ace7625d4a9af55ff935938ec8bb4c7f\",\"dweb:/ipfs/QmQL981UKm6XW82RMbRejQVf5z6KC3cKeNvCMrT9Bff22w\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('LinkTokenReceiver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.LinkTokenReceiver = LinkTokenReceiver
