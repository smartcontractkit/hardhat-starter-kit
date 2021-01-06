'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const Pointer = contract({
 "contractName": "Pointer",
 "abi": [
  {
   "constant": true,
   "inputs": [],
   "name": "getAddress",
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
   "inputs": [
    {
     "name": "_addr",
     "type": "address"
    }
   ],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "constructor"
  }
 ],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x608060405234801561001057600080fd5b50604051602080610117833981016040525160008054600160a060020a03909216600160a060020a031990921691909117905560c6806100516000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166338cc483181146043575b600080fd5b348015604e57600080fd5b506055607e565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820b3df641519ffa06dac1dfa593325678bdc530879c5f358b56a2109a27396505e0029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH1 0x20 DUP1 PUSH2 0x117 DUP4 CODECOPY DUP2 ADD PUSH1 0x40 MSTORE MLOAD PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB SWAP1 SWAP3 AND PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB NOT SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE PUSH1 0xC6 DUP1 PUSH2 0x51 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH1 0x3E JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x38CC4831 DUP2 EQ PUSH1 0x43 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH1 0x4E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x55 PUSH1 0x7E JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH1 0x0 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0xb3 0xdf PUSH5 0x1519FFA06D 0xac SAR STATICCALL MSIZE CALLER 0x25 PUSH8 0x8BDC530879C5F358 0xb5 PUSH11 0x2109A27396505E00290000 ",
   "sourceMap": "25:116:8:-;;;76:63;8:9:-1;5:2;;;30:1;27;20:12;5:2;76:63:8;;;;;;;;;;;;;116:10;:18;;-1:-1:-1;;;;;116:18:8;;;-1:-1:-1;;;;;;116:18:8;;;;;;;;;25:116;;;;;;"
  },
  "deployedBytecode": {
   "linkReferences": {},
   "object": "0x608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166338cc483181146043575b600080fd5b348015604e57600080fd5b506055607e565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820b3df641519ffa06dac1dfa593325678bdc530879c5f358b56a2109a27396505e0029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH1 0x3E JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x38CC4831 DUP2 EQ PUSH1 0x43 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH1 0x4E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x55 PUSH1 0x7E JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH1 0x0 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0xb3 0xdf PUSH5 0x1519FFA06D 0xac SAR STATICCALL MSIZE CALLER 0x25 PUSH8 0x8BDC530879C5F358 0xb5 PUSH11 0x2109A27396505E00290000 ",
   "sourceMap": "25:116:8:-;;;;;;;;;;;;;;;;;;;;;;;46:25;;8:9:-1;5:2;;;30:1;27;20:12;5:2;46:25:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o"
  },
  "methodIdentifiers": {
   "getAddress()": "38cc4831"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.4.24+commit.e67f0147\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[],\"name\":\"getAddress\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/Pointer.sol\":\"Pointer\"},\"evmVersion\":\"byzantium\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/Pointer.sol\":{\"keccak256\":\"0x48064cc9a36d4470564bafe2b3b0fb7b0e0ccfadb9b91953b33e60ad40c316e2\",\"urls\":[\"bzzr://a149474defba76e66998ab91555abadb229975f766584b9f2e816e0dc79e7c24\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('Pointer.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.Pointer = Pointer
