'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const BlockHashStoreInterface = contract({
 "contractName": "BlockHashStoreInterface",
 "abi": [
  {
   "inputs": [
    {
     "internalType": "uint256",
     "name": "number",
     "type": "uint256"
    }
   ],
   "name": "getBlockhash",
   "outputs": [
    {
     "internalType": "bytes32",
     "name": "",
     "type": "bytes32"
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
   "getBlockhash(uint256)": "e9413d38"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"number\",\"type\":\"uint256\"}],\"name\":\"getBlockhash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/BlockHashStoreInterface.sol\":\"BlockHashStoreInterface\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/BlockHashStoreInterface.sol\":{\"keccak256\":\"0xfe58072ade2614a36a01cbf1e998ba40243d49a4a2343ef97b873bcbc658a355\",\"urls\":[\"bzz-raw://b175a2298d0a3795bd5950ac9c54325cbd91798bae215805334eafd64c0b6b87\",\"dweb:/ipfs/QmdKGVqrmyV9Q4A9qn5riZGW1RJvrLQXracczHiRBbp1v8\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('BlockHashStoreInterface.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.BlockHashStoreInterface = BlockHashStoreInterface
