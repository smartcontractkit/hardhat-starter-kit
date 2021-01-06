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
 "metadata": "{\"compiler\":{\"version\":\"0.7.0+commit.9e61f92b\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"getChainlinkToken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"onTokenTransfer\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"onTokenTransfer(address,uint256,bytes)\":{\"details\":\"The data payload's first 2 words will be overwritten by the `_sender` and `_amount` values to ensure correctness. Calls oracleRequest.\",\"params\":{\"_amount\":\"Amount of LINK sent (specified in wei)\",\"_data\":\"Payload of the transaction\",\"_sender\":\"Address of the sender\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"onTokenTransfer(address,uint256,bytes)\":{\"notice\":\"Called when LINK is sent to the contract via `transferAndCall`\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/dev/LinkTokenReceiver.sol\":\"LinkTokenReceiver\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.7/dev/LinkTokenReceiver.sol\":{\"keccak256\":\"0x5c8714f2a301d96283a7d92e3cfe4d5714260defb577aceb66c6bafa9ffe52d8\",\"urls\":[\"bzz-raw://a34b6ae22b46f297c09523dd85a0bcbd209fdd7eb1440f7249116224d98e673a\",\"dweb:/ipfs/Qmf9UmzsXosYqwaHWPhHufvCYctHuVLN2uwbz68fwabTfN\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('LinkTokenReceiver.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.LinkTokenReceiver = LinkTokenReceiver
