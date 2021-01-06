# Chainlink Hardhat Box
 Implementation of the following 3 Chainlink features using the [Hardhat](https://hardhat.org/) development environment:
 - [Request & Receive data](https://docs.chain.link/docs/request-and-receive-data)
 - [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts)
 - [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)
 
 ## Requirements

- NPM

## Installation

Set your `KOVAN_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/). You'll also need to set the variable `PK` which is your private key from you wallet, ie metamask. 

```
export KOVAN_RPC_URL='www.infura.io/asdfadsfafdadf'
export PK='abcdef'
```

Then you can install all the dependencies

```bash
npm install
```

Or

```bash
yarn install
```

## Deploy

If needed, edit the [deploy.js](https://github.com/pappas999/chainlink-hardhat-box/blob/main/scripts/deploy.js) file to set the desired environment specific parameters on each contract, or to comment out contracts that you don't want to deploy, then run the deployment script:

```bash
npx hardhat run --network kovan scripts/deploy.js  
```

## Run

The deployment output will give you the contract addresses as they are deployed. You can then use these contract addresses in conjunction with Hardhat tasks to perform operations on each contract


### Chainlink Price Feeds
The Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

```bash
npx hardhat read-price-feed --contract insert-contract-address-here
```

### Request & Receive Data
The APIConsumer contract has two tasks, one to request external data based on a set of parameters, and one to check to see what the result of the data request is. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here
```

Once it's funded, you can request external data by passing in a number of parameters to the request-data task. The contract parameter is mandatory, the rest are optional

| Parameter     | Description                               | Default Value                                                   |
| ------------- |:------------------------------------------| :---------------------------------------------------------------|
| contract      | The address of the API Consumer contract  |                                                                 |
| oracleAddress | Oracle contract address                   | 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e                      |
| jobId         | Job Id of the job you wish to use         | 29fa9aa13bf1468788b7cc4a500a45b8                                |
| payment       | Payment in LINK tokens required           | 1000000000000000000                                             |
| url           | URL to access                             | https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD |
| path          | JSON path to traverse                     | USD                                                             |
| times         | Multiplier if using an integer            | 100                                                             |

```bash
npx hardhat request-data --contract insert-contract-address-here
```

Once you have successfully made a request for external data, you can see the result via the read-data task
```bash
npx hardhat read-data --contract insert-contract-address-here
```


### VRF Get a random number
The VRFConsumer contract has two tasks, one to request a random number, and one to read the result of the random number request. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here
```

Once it's funded, you can perform a VRF request with the request-random-number task, passing in the required seed number:

```bash
npx hardhat request-random-number --contract insert-contract-address-here --seed '777777' 
```

Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
npx hardhat read-random-number --contract insert-contract-address-here
```

