# Solidity Language Grammar

The [ANTLR (ANother Tool for Language Recognition) ](https://www.antlr.org/) grammar for [Solidity](https://solidity.readthedocs.io/) is maintained in [Solidity.g4](./Solidity.g4).

This is a fork of ([@federicobond](https://github.com/federicobond))'s original [repo](https://github.com/solidityj/solidity-antlr4),
with some extra features taken from [Consensys Diligence's alternative fork](https://github.com/ConsenSys/solidity-antlr4).

## Build

Run [build.sh](./build.sh) to download the ANTLR jar file and compile the [Solidity.g4](./Solidity.g4) file. The build will output the Java classes to the `src` folder and compiled Java classes to the `target` folder. The ANTLR tokens used by the Java parser are in the `src` folder.

## Tests

Run [run-tests.sh](./run-tests.sh) to parse [test.sol](./test.sol).

## Used By

* [Node.js Solidity parser](https://github.com/solidity-parser/parser)

## License

[MIT](./LICENSE)
