module.exports = {
  registryInterface: [
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
      "type": "function"
    }
  ],
  resolverInterface: [
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        }
      ],
      "name": "addr",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
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
      "name": "content",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
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
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "kind",
          "type": "bytes32"
        }
      ],
      "name": "has",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
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
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setAddr",
      "outputs": [],
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
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "setContent",
      "outputs": [],
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
          "name": "name",
          "type": "string"
        }
      ],
      "name": "setName",
      "outputs": [],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "contentType",
          "type": "uint256"
        }
      ],
      "name": "ABI",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "type": "function"
    }
  ]
}
