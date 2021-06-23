<br/>
<p align="center">
<a href="https://chain.link" target="_blank">
<img src="https://raw.githubusercontent.com/smartcontractkit/chainlink-hardhat-box/master/box-img-lg.png" width="225" alt="Chainlink Hardhat logo">
</a>
</p>
<br/>

# Chainlink Hardhat Box
 Implementation of the following 3 Chainlink features using the [Hardhat](https://hardhat.org/) development environment:
 - [Request & Receive data](https://docs.chain.link/docs/request-and-receive-data)
 - [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts)
 - [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)
 
 ## Requirements

- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/)

## Installation

Set your `KOVAN_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/). You'll also need to set the variable `PRIVATE_KEY` which is your private key from you wallet, ie metamask. 

You can set this in your `.env` file if you're unfamiliar with how setting environment variables work. 

`.env` example:
```
KOVAN_RPC_URL='www.infura.io/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```
`bash` example
```
export KOVAN_RPC_URL='www.infura.io/asdfadsfafdadf'
export MNEMONIC='cat dog frog...'
export MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```

If you plan on deploying to a local [Hardhat network](https://hardhat.org/hardhat-network/) that's a fork of the Ethereum mainnet instead of a public test network like Kovan, you'll also need to set your `MAINNET_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) and uncomment the `forking` section in `hardhat.config.js`. You can get one for free at [Alchemy's site.](https://alchemyapi.io/). 

You can also use a `PRIVATE_KEY` instead of a `MNEMONIC` environment variable by uncommenting the section in the `hardhat.config.js`, and commenting out the `MNEMONIC` line. 

Then you can install all the dependencies

```bash
git clone https://github.com/smartcontractkit/chainlink-hardhat-box
cd chainlink-hardhat-box
```
then

```bash
npm install
```

Or

```bash
yarn
```

## Deploy

Deployment scripts are in the [deploy](https://github.com/pappas999/chainlink-hardhat-box/tree/main/deploy) directory. If required, edit the desired environment specific variables or constructor parameters in each script, then run the hardhat deployment plugin as follows. If no network is specified, it will default to the Kovan network.

This will deploy to a local hardhat network

```bash
npx hardhat deploy 
```

To deploy to testnet:
```bash
npx hardhat deploy --network kovan
```

## Test
Tests are located in the [test](https://github.com/pappas999/chainlink-hardhat-box/tree/main/test) directory and can be modified as required. To run them:

```bash
npx hardhat test
```

## Run

The deployment output will give you the contract addresses as they are deployed. You can then use these contract addresses in conjunction with Hardhat tasks to perform operations on each contract


### Chainlink Price Feeds
The Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

```bash
npx hardhat read-price-feed --contract insert-contract-address-here --network network
```

### Request & Receive Data
The APIConsumer contract has two tasks, one to request external data based on a set of parameters, and one to check to see what the result of the data request is. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here --network network
```

Once it's funded, you can request external data by passing in a number of parameters to the request-data task. The contract parameter is mandatory, the rest are optional

```bash
npx hardhat request-data --contract insert-contract-address-here --network network
```

Once you have successfully made a request for external data, you can see the result via the read-data task
```bash
npx hardhat read-data --contract insert-contract-address-here --network network
```


### VRF Get a random number
The VRFConsumer contract has two tasks, one to request a random number, and one to read the result of the random number request. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here --network network
```

Once it's funded, you can perform a VRF request with the request-random-number task:

```bash
npx hardhat request-random-number --contract insert-contract-address-here --network network
```

Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
npx hardhat read-random-number --contract insert-contract-address-here --network network
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network kovan 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

### Linting

```
yarn lint:fix
```
