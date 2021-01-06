'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const EmptyOracle = contract({
 "contractName": "EmptyOracle",
 "abi": [
  {
   "constant": false,
   "inputs": [
    {
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "bytes32"
    },
    {
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "bytes4"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "bytes"
    }
   ],
   "name": "oracleRequest",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "",
     "type": "bytes32"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "bytes4"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "bytes32"
    }
   ],
   "name": "fulfillOracleRequest",
   "outputs": [
    {
     "name": "",
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
   "name": "withdrawable",
   "outputs": [
    {
     "name": "",
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
     "name": "",
     "type": "bytes32"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "bytes4"
    },
    {
     "name": "",
     "type": "uint256"
    }
   ],
   "name": "cancelOracleRequest",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": false,
   "inputs": [
    {
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "bool"
    }
   ],
   "name": "setFulfillmentPermission",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "uint256"
    },
    {
     "name": "",
     "type": "bytes"
    }
   ],
   "name": "onTokenTransfer",
   "outputs": [],
   "payable": false,
   "stateMutability": "pure",
   "type": "function"
  },
  {
   "constant": true,
   "inputs": [
    {
     "name": "",
     "type": "address"
    }
   ],
   "name": "getAuthorizationStatus",
   "outputs": [
    {
     "name": "",
     "type": "bool"
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
     "name": "",
     "type": "address"
    },
    {
     "name": "",
     "type": "uint256"
    }
   ],
   "name": "withdraw",
   "outputs": [],
   "payable": false,
   "stateMutability": "nonpayable",
   "type": "function"
  }
 ],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x608060405234801561001057600080fd5b5061030f806100206000396000f30060806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416634042994681146100925780634ab0d1901461010a578063501883011461017d5780636ee4d553146101a45780637fcd56db146101e7578063a4c0ed361461021a578063d3e9c31414610258578063f3fef3a314610286575b600080fd5b34801561009e57600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff6004803582169160248035926044359260643516917fffffffff00000000000000000000000000000000000000000000000000000000608435169160a4359160c4359160e4359182019101356102b7565b005b34801561011657600080fd5b5061016960043560243573ffffffffffffffffffffffffffffffffffffffff604435167fffffffff000000000000000000000000000000000000000000000000000000006064351660843560a4356102c2565b604080519115158252519081900360200190f35b34801561018957600080fd5b506101926102ce565b60408051918252519081900360200190f35b3480156101b057600080fd5b506101086004356024357fffffffff00000000000000000000000000000000000000000000000000000000604435166064356102d3565b3480156101f357600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff6004351660243515156102d9565b34801561022657600080fd5b506101086004803573ffffffffffffffffffffffffffffffffffffffff169060248035916044359182019101356102d3565b34801561026457600080fd5b5061016973ffffffffffffffffffffffffffffffffffffffff600435166102dd565b34801561029257600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff600435166024356102d9565b505050505050505050565b60009695505050505050565b600090565b50505050565b5050565b506000905600a165627a7a723058205939509df4737f2c20ab76d2234e8ebf0339991ea5a8041c563a7952c49beba60029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x30F DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x8D JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x40429946 DUP2 EQ PUSH2 0x92 JUMPI DUP1 PUSH4 0x4AB0D190 EQ PUSH2 0x10A JUMPI DUP1 PUSH4 0x50188301 EQ PUSH2 0x17D JUMPI DUP1 PUSH4 0x6EE4D553 EQ PUSH2 0x1A4 JUMPI DUP1 PUSH4 0x7FCD56DB EQ PUSH2 0x1E7 JUMPI DUP1 PUSH4 0xA4C0ED36 EQ PUSH2 0x21A JUMPI DUP1 PUSH4 0xD3E9C314 EQ PUSH2 0x258 JUMPI DUP1 PUSH4 0xF3FEF3A3 EQ PUSH2 0x286 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x9E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 DUP1 CALLDATALOAD DUP3 AND SWAP2 PUSH1 0x24 DUP1 CALLDATALOAD SWAP3 PUSH1 0x44 CALLDATALOAD SWAP3 PUSH1 0x64 CALLDATALOAD AND SWAP2 PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x84 CALLDATALOAD AND SWAP2 PUSH1 0xA4 CALLDATALOAD SWAP2 PUSH1 0xC4 CALLDATALOAD SWAP2 PUSH1 0xE4 CALLDATALOAD SWAP2 DUP3 ADD SWAP2 ADD CALLDATALOAD PUSH2 0x2B7 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x116 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x169 PUSH1 0x4 CALLDATALOAD PUSH1 0x24 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x44 CALLDATALOAD AND PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x64 CALLDATALOAD AND PUSH1 0x84 CALLDATALOAD PUSH1 0xA4 CALLDATALOAD PUSH2 0x2C2 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 ISZERO ISZERO DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x189 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x192 PUSH2 0x2CE JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH1 0x4 CALLDATALOAD PUSH1 0x24 CALLDATALOAD PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x44 CALLDATALOAD AND PUSH1 0x64 CALLDATALOAD PUSH2 0x2D3 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD ISZERO ISZERO PUSH2 0x2D9 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x226 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH1 0x4 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x24 DUP1 CALLDATALOAD SWAP2 PUSH1 0x44 CALLDATALOAD SWAP2 DUP3 ADD SWAP2 ADD CALLDATALOAD PUSH2 0x2D3 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x264 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x169 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH2 0x2DD JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x292 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD PUSH2 0x2D9 JUMP JUMPDEST POP POP POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 SWAP1 JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST POP POP JUMP JUMPDEST POP PUSH1 0x0 SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 MSIZE CODECOPY POP SWAP14 DELEGATECALL PUSH20 0x7F2C20AB76D2234E8EBF0339991EA5A8041C563A PUSH26 0x52C49BEBA6002900000000000000000000000000000000000000 ",
   "sourceMap": "163:701:25:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;163:701:25;;;;;;;"
  },
  "deployedBytecode": {
   "linkReferences": {},
   "object": "0x60806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416634042994681146100925780634ab0d1901461010a578063501883011461017d5780636ee4d553146101a45780637fcd56db146101e7578063a4c0ed361461021a578063d3e9c31414610258578063f3fef3a314610286575b600080fd5b34801561009e57600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff6004803582169160248035926044359260643516917fffffffff00000000000000000000000000000000000000000000000000000000608435169160a4359160c4359160e4359182019101356102b7565b005b34801561011657600080fd5b5061016960043560243573ffffffffffffffffffffffffffffffffffffffff604435167fffffffff000000000000000000000000000000000000000000000000000000006064351660843560a4356102c2565b604080519115158252519081900360200190f35b34801561018957600080fd5b506101926102ce565b60408051918252519081900360200190f35b3480156101b057600080fd5b506101086004356024357fffffffff00000000000000000000000000000000000000000000000000000000604435166064356102d3565b3480156101f357600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff6004351660243515156102d9565b34801561022657600080fd5b506101086004803573ffffffffffffffffffffffffffffffffffffffff169060248035916044359182019101356102d3565b34801561026457600080fd5b5061016973ffffffffffffffffffffffffffffffffffffffff600435166102dd565b34801561029257600080fd5b5061010873ffffffffffffffffffffffffffffffffffffffff600435166024356102d9565b505050505050505050565b60009695505050505050565b600090565b50505050565b5050565b506000905600a165627a7a723058205939509df4737f2c20ab76d2234e8ebf0339991ea5a8041c563a7952c49beba60029",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x8D JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x40429946 DUP2 EQ PUSH2 0x92 JUMPI DUP1 PUSH4 0x4AB0D190 EQ PUSH2 0x10A JUMPI DUP1 PUSH4 0x50188301 EQ PUSH2 0x17D JUMPI DUP1 PUSH4 0x6EE4D553 EQ PUSH2 0x1A4 JUMPI DUP1 PUSH4 0x7FCD56DB EQ PUSH2 0x1E7 JUMPI DUP1 PUSH4 0xA4C0ED36 EQ PUSH2 0x21A JUMPI DUP1 PUSH4 0xD3E9C314 EQ PUSH2 0x258 JUMPI DUP1 PUSH4 0xF3FEF3A3 EQ PUSH2 0x286 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x9E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 DUP1 CALLDATALOAD DUP3 AND SWAP2 PUSH1 0x24 DUP1 CALLDATALOAD SWAP3 PUSH1 0x44 CALLDATALOAD SWAP3 PUSH1 0x64 CALLDATALOAD AND SWAP2 PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x84 CALLDATALOAD AND SWAP2 PUSH1 0xA4 CALLDATALOAD SWAP2 PUSH1 0xC4 CALLDATALOAD SWAP2 PUSH1 0xE4 CALLDATALOAD SWAP2 DUP3 ADD SWAP2 ADD CALLDATALOAD PUSH2 0x2B7 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x116 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x169 PUSH1 0x4 CALLDATALOAD PUSH1 0x24 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x44 CALLDATALOAD AND PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x64 CALLDATALOAD AND PUSH1 0x84 CALLDATALOAD PUSH1 0xA4 CALLDATALOAD PUSH2 0x2C2 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 ISZERO ISZERO DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x189 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x192 PUSH2 0x2CE JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH1 0x4 CALLDATALOAD PUSH1 0x24 CALLDATALOAD PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 PUSH1 0x44 CALLDATALOAD AND PUSH1 0x64 CALLDATALOAD PUSH2 0x2D3 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD ISZERO ISZERO PUSH2 0x2D9 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x226 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH1 0x4 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x24 DUP1 CALLDATALOAD SWAP2 PUSH1 0x44 CALLDATALOAD SWAP2 DUP3 ADD SWAP2 ADD CALLDATALOAD PUSH2 0x2D3 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x264 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x169 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH2 0x2DD JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x292 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x108 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD PUSH2 0x2D9 JUMP JUMPDEST POP POP POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 SWAP1 JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST POP POP JUMP JUMPDEST POP PUSH1 0x0 SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 MSIZE CODECOPY POP SWAP14 DELEGATECALL PUSH20 0x7F2C20AB76D2234E8EBF0339991EA5A8041C563A PUSH26 0x52C49BEBA6002900000000000000000000000000000000000000 ",
   "sourceMap": "163:701:25:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;584:103;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;584:103:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;313:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;313:109:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;803:58;;8:9:-1;5:2;;;30:1;27;20:12;5:2;803:58:25;;;;;;;;;;;;;;;;;;;;235:75;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;235:75:25;;;;;;;;;;;;;690:60;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;690:60:25;;;;;;;;;;;515:66;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;515:66:25;;;;;;;;;;;;;;;;;;;;;425:87;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;425:87:25;;;;;;;753:47;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;753:47:25;;;;;;;;;584:103;;;;;;;;;;:::o;313:109::-;414:4;313:109;;;;;;;;:::o;803:58::-;850:7;803:58;:::o;235:75::-;;;;;:::o;690:60::-;;;:::o;425:87::-;-1:-1:-1;489:4:25;;425:87::o"
  },
  "methodIdentifiers": {
   "cancelOracleRequest(bytes32,uint256,bytes4,uint256)": "6ee4d553",
   "fulfillOracleRequest(bytes32,uint256,address,bytes4,uint256,bytes32)": "4ab0d190",
   "getAuthorizationStatus(address)": "d3e9c314",
   "onTokenTransfer(address,uint256,bytes)": "a4c0ed36",
   "oracleRequest(address,uint256,bytes32,address,bytes4,uint256,uint256,bytes)": "40429946",
   "setFulfillmentPermission(address,bool)": "7fcd56db",
   "withdraw(address,uint256)": "f3fef3a3",
   "withdrawable()": "50188301"
  }
 },
 "metadata": "{\"compiler\":{\"version\":\"0.4.24+commit.e67f0147\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes32\"},{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"bytes4\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"oracleRequest\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"bytes4\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"fulfillOracleRequest\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"withdrawable\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes4\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"cancelOracleRequest\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"bool\"}],\"name\":\"setFulfillmentPermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onTokenTransfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"getAuthorizationStatus\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/tests/EmptyOracle.sol\":\"EmptyOracle\"},\"evmVersion\":\"byzantium\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/interfaces/ChainlinkRequestInterface.sol\":{\"keccak256\":\"0x7d3983584065248fba8f0ce75fd86feac43ade43784466f87ea502254ddec992\",\"urls\":[\"bzzr://30de07df8cb9fb4ec53aff0f115f88d65936ffd6e90d2aeb031a05d6bf4de6c1\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/interfaces/OracleInterface.sol\":{\"keccak256\":\"0x44f2d7022bf1598dfb2c2c915edba1634088ea29ca25953c641afc3cc3b1a346\",\"urls\":[\"bzzr://d29326f52f4e1387cba2f75c6b577c41bd50dc3eb8a5b3d6c0f16674fb4e3367\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.4/tests/EmptyOracle.sol\":{\"keccak256\":\"0x3b4574ee360b824b819005eb3534c56a0293973f807a035e8cf7304bb85cccbd\",\"urls\":[\"bzzr://b5eb16fadf2529f48b4854e711a0e90547d4b4c444571772c96f3ec975f60b71\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('EmptyOracle.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.EmptyOracle = EmptyOracle
