<br/>
<p align="center">
<a href="https://chain.link" target="_blank">
<img src="./box-img-lg.png" width="225" alt="Chainlink Hardhat logo">
</a>
</p>
<br/>
 
 ## Tip
> Please be attention that Chainlink Any API is removed from this starter kit because Chainlink Any API is currently replaced by [Chainlink Functions](https://docs.chain.link/chainlink-functions). Please find the starter kit for Chainlink Functions [here](https://github.com/smartcontractkit/functions-hardhat-starter-kit)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/smartcontractkit/hardhat-starter-kit)

[![GitPOAP Badge](https://public-api.gitpoap.io/v1/repo/smartcontractkit/hardhat-starter-kit/badge)](https://www.gitpoap.io/gp/649)

- [Chainlink Hardhat Starter Kit](#chainlink-hardhat-starter-kit)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
    - [Typescript](#typescript)
- [Usage](#usage)
  - [Deploying Contracts](#deploying-contracts)
  - [Run a Local Network](#run-a-local-network)
  - [Using a Testnet or Live Network (like Mainnet or Polygon)](#using-a-testnet-or-live-network-like-mainnet-or-polygon)
    - [Sepolia Ethereum Testnet Setup](#sepolia-ethereum-testnet-setup)
  - [Forking](#forking)
- [Test](#test)
- [Interacting with Deployed Contracts](#interacting-with-deployed-contracts)
  - [Chainlink Price Feeds](#chainlink-price-feeds)
  - [VRF Get a random number](#vrf-get-a-random-number)
  - [Automation](#automation)
  - [Verify on Etherscan](#verify-on-etherscan)
- [Linting](#linting)
- [Code Formatting](#code-formatting)
- [Estimating Gas](#estimating-gas)
- [Code Coverage](#code-coverage)
- [Fuzzing](#fuzzing)
- [Contributing](#contributing)
- [Thank You!](#thank-you)
  - [Resources](#resources)

# Chainlink Hardhat Starter Kit
 Implementation of the following 3 Chainlink features using the [Hardhat](https://hardhat.org/) development environment:
 - [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts)
 - [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)
 - [Chainlink Automation](https://docs.chain.link/chainlink-automation/introduction)
 

 For [Chainlink Functions](https://docs.chain.link/chainlink-functions) please go to these tarter kits: [Hardhat](https://github.com/smartcontractkit/functions-hardhat-starter-kit)  |  [Foundry (coming soon)](https://github.com/smartcontractkit/functions-foundry-starter-kit)

For [Chainlink CCIP (Cross Chain Interoperability Prototocol)](https://docs.chain.link/ccip) please go to these starter kits: [Hardhat](https://github.com/smartcontractkit/ccip-starter-kit-hardhat) | [Foundry](https://github.com/smartcontractkit/ccip-starter-kit-foundry)

# Getting Started 

It's recommended that you've gone through the [hardhat getting started documentation](https://hardhat.org/getting-started/) before proceeding here. 

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an output like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` And get an output like: `x.x.x`
    - You might need to install it with npm

> If you're familiar with `npx` and `npm` instead of `yarn`, you can use `npx` for execution and `npm` for installing dependencies. 

## Quickstart

1. Clone and install dependencies

After installing all the requirements, run the following:

```bash
git clone https://github.com/smartcontractkit/hardhat-starter-kit/
cd hardhat-starter-kit
```
Then:
```
npm install
```

The recommendation is to use npm 7 or later. If you are using an older version of npm, you'll also need to install all the packages used by the toolbox.
```
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
```

That's also the case if you are using yarn.
```
yarn add --dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
```

2. You can now do stuff!

```
npx hardhat test
```

or

```
npm run test
```

or

```
yarn test
```

### Typescript

To use typescript, run:

```
git checkout typescript
npm install
```

# Usage

If you run `npx hardhat --help` you'll get an output of all the tasks you can run. 

## Deploying Contracts

```
npm run deploy
```

This will deploy your contracts to a local network. Additionally, if on a local network, it will deploy mock Chainlink contracts for you to interact with. If you'd like to interact with your deployed contracts, skip down to [Interacting with Deployed Contracts](#interacting-with-deployed-contracts).

## Run a Local Network

One of the best ways to test and interact with smart contracts is by using a local network. To run a local network with all your contracts in it, execute the following command:

```
npx hardhat node
```

You'll get a local blockchain, private keys, contracts deployed (from the `deployment` folder scripts), and an endpoint to potentially add to an EVM wallet. 

## Using a Testnet or Live Network (like Mainnet or Polygon)

In your `hardhat.config.js` you'll see section like:

```
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
```

This section of the file is where you define which networks you want to interact with. You can read more about that whole file in the [hardhat documentation.](https://hardhat.org/config/)

To interact with a live or test network, you'll need:

1. An rpc URL 
2. A Private Key
3. ETH & LINK token (either testnet or real)

Let's look at an example of setting these up using the Sepolia testnet. 

### Sepolia Ethereum Testnet Setup

First, we will need to set environment variables. We can do so by setting them in our `.env` file (create it if it's not there). You can also read more about [environment variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) from the linked twilio blog. You'll find a sample of what this file will look like in `.env.example`

> IMPORTANT: MAKE SURE YOU'D DON'T EXPOSE THE KEYS YOU PUT IN THIS `.env` FILE. By that, I mean don't push them to a public repo, and please try to keep them keys you use in development not associated with any real funds. 

1. Set your `SEPOLIA_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)

You can get one for free from [Alchemy](https://www.alchemy.com/), [Infura](https://infura.io/), or [Moralis](https://moralis.io/speedy-nodes/). This is your connection to the blockchain. 

2. Set your `PRIVATE_KEY` environment variable. 

This is your private key from your wallet, ie [MetaMask](https://metamask.io/). This is needed for deploying contracts to public networks. You can optionally set your `MNEMONIC` environment variable instead with some changes to the `hardhat.config.js`.

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

When developing, it's best practice to use a Metamask that isn't associated with any real money. A good way to do this is to make a new browser profile (on Chrome, Brave, Firefox, etc) and install Metamask on that browser, and never send this wallet money.  

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:
```
SEPOLIA_RPC_URL='https://sepolia.infura.io/v3/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
```
`bash` example:
```
export SEPOLIA_RPC_URL='https://sepolia.infura.io/v3/asdfadsfafdadf'
export PRIVATE_KEY='abcdef'
```

> You can also use a `MNEMONIC` instead of a `PRIVATE_KEY` environment variable by uncommenting the section in the `hardhat.config.js`, and commenting out the `PRIVATE_KEY` line. However this is not recommended. 

For other networks like mainnet and polygon, you can use different environment variables for your RPC URL and your private key. See the `hardhat.config.js` to learn more. 

3. Get some Sepolia Testnet ETH and LINK 

Head over to the [Chainlink faucets](https://faucets.chain.link/) and get some ETH and LINK. Please follow [the chainlink documentation](https://docs.chain.link/docs/acquire-link/) if unfamiliar. 

4. Create VRF V2 subscription

Head over to [VRF Subscription Page](https://vrf.chain.link/sepolia) and create the new subscription. Save your subscription ID and put it in `helper-hardhat-config.js` file as `subscriptionId`

5. Running commands

You should now be all setup! You can run any command and just pass the `--network sepolia` now!

To deploy contracts:

```
npm run deploy --network sepolia
```

To run staging testnet tests
```
npm run test-staging
```

## Forking 
 
If you would like to run tests on a [forked network](https://hardhat.org/hardhat-network/guides/mainnet-forking.html), follow these steps: 

1. Set a `MAINNET_RPC_URL` environment variable that connects to the mainnet.
2. Choose a block number to select a state of the network you are forking and set it as `FORKING_BLOCK_NUMBER` environment variable. If ignored, it will use the latest block each time which can lead to test inconsistency.
3. Set `enabled` flag to `true`/`false` to enable/disable forking feature
```
      forking: {
        url: MAINNET_RPC_URL,
        blockNumber: FORKING_BLOCK_NUMBER,
        enabled: false,
      }
```


# Test
Tests are located in the [test](./test/) directory, and are split between unit tests and staging/testnet tests. Unit tests should only be run on local environments, and staging tests should only run on live environments.

To run unit tests:

```
npx hardhat test
```

or

```
npm run test
```

or

```
yarn test
```

To run staging tests on Sepolia network:

```
npx hardhat test --network sepolia
```
or
```bash
npm run test-staging
```

## Performance optimizations

Since all tests are written in a way to be independent from each other, you can save time by running them in parallel. Make sure that `AUTO_FUND=false` inside `.env` file. There are some limitations with parallel testing, read more about them [here](https://hardhat.org/guides/parallel-tests.html)

To run tests in parallel:
```
npx hardhat test --parallel
```
or
```
npm run test --parallel
```

# Interacting with Deployed Contracts

After deploying your contracts, the deployment output will give you the contract addresses as they are deployed. You can then use these contract addresses in conjunction with Hardhat tasks to perform operations on each contract.


## Chainlink Price Feeds
The Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

```bash
npx hardhat read-price-feed --contract insert-contract-address-here --network network
```


## VRF Get a random number
The VRFConsumer contract has two tasks, one to request a random number, and one to read the result of the random number request. 
As explained in the [developer documentation](https://docs.chain.link/vrf/v2/introduction), there are two methods:
- The [Subscription method](https://docs.chain.link/vrf/v2/subscription)
- The [Direct Funding method](https://docs.chain.link/vrf/v2/direct-funding)

Read the docs first to understand which method is the most suitable for your use case.

### VRF Subscription method
To start, go to [VRF Subscription Page](https://vrf.chain.link/sepolia) and create the new subscription. Save your subscription ID and put it in `helper-hardhat-config.js` file as `subscriptionId`:

```javascript
5: {
    // rest of the config
    subscriptionId: "777"
}
```

Then, deploy your VRF V2 contract consumer to the network of your recent subscription using subscription id as constructor argument.

```bash
npm run deploy --network network   
```

Finally, you need to go to your subscription page one more time and add the address of deployed contract as a new consumer. Once that's done, you can perform a VRF request with the request-random-number task:

```bash
npx hardhat request-random-number --contract insert-contract-address-here --network network
```

Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
npx hardhat read-random-number --contract insert-contract-address-here --network network
```

### VRF Direct Funding method
Deploy your VRF V2 contract consumer to the network.

```bash
npm run deploy --network network   
```

or (if you are using yarn)

```bash
yarn deploy --network network   
```

Now you have to fund your consumer contract with LINK tokens:

```bash
npx hardhat transfer-link --recipient insert-contract-address-here --amount insert-amount-in-juels-here --network network
```

Once that's done, you can perform a VRF request with the request-random-number task:

```bash
npx hardhat request-random-number-direct-funding --callbackgaslimit insert-callback-gas-limit-here --requestconfirmations insert-request-confirmations-here --numwords insert-number-words-here --contract insert-contract-address-here --network network
```

Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
npx hardhat read-random-number-direct-funding --contract insert-contract-address-here --network network
```

## Automation
The AutomationCounter contract is a simple Chainlink Automation enabled contract that simply maintains a counter variable that gets incremented each time the performUpkeep task is performed by a Chainlink Automation. Once the contract is deployed, you should head to [https://automation.chain.link/](https://automation.chain.link/) to register it for upkeeps, then you can use the task below to view the counter variable that gets incremented by Chainlink Automation


```bash
npx hardhat read-automation-counter --contract insert-contract-address-here --network network
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis). If you have it set, your deploy script will try to verify them by default, but if you want to verify any manually, you can run: 

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network sepolia 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x694AA1769357215DE4FAC081bf1f309aDC325306"
```

# Linting

This will [lint](https://stackoverflow.com/questions/8503559/what-is-linting) your smart contracts.  

```
npm run lint:fix
```

# Code Formatting

This will format both your javascript and solidity to look nicer. 

```
npm run format
```

# Estimating Gas

To estimate gas, just set a `REPORT_GAS` environment variable to true, and then run:

```
npx hardhat test
```

If you'd like to see the gas prices in USD or other currency, add a `COINMARKETCAP_API_KEY` from [Coinmarketcap](https://coinmarketcap.com/api/documentation/v1/).

# Code coverage

To see a measure in percent of the degree to which the smart contract source code is executed when a particular test suite is run, type
```
npm run coverage
```

# Fuzzing

We are going to use Echidna as a Fuzz testing tool. You need to have [Docker](https://www.docker.com/) installed with at least 8GB virtual memory allocated (To update this parameter go to _Settings->Resources->Advanced->Memory_). 

To start Echidna instance run

```
npm run fuzzing
```

If you are using it for the first time, you will need to wait for Docker to download [eth-security-toolbox](https://hub.docker.com/r/trailofbits/eth-security-toolbox) image for us.

To start Fuzzing run
```
echidna-test /src/contracts/test/fuzzing/AutomationCounterEchidnaTest.sol --contract AutomationCounterEchidnaTest --config /src/contracts/test/fuzzing/config.yaml
```

To exit Echidna type
```bash
exit
```

# Contributing

Contributions are always welcome! Open a PR or an issue!

# Thank You!

## Resources

- [Chainlink Documentation](https://docs.chain.link/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
