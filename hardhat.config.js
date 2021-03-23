//const { network } = require('hardhat');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-truffle5")
require("hardhat-deploy")
require('dotenv').config()


task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async taskArgs => {
    const account = web3.utils.toChecksumAddress(taskArgs.account)
    const balance = await web3.eth.getBalance(account)

    console.log(web3.utils.fromWei(balance, "ether"), "ETH")
  })

module.exports = {}

task("fund-link", "Funds a contract with LINK")
  .addParam("contract", "The address of the contract that requires LINK")
  .addOptionalParam("linkAddress", "Set the LINK token address")
  .setAction(async taskArgs => {
    console.log(linkAddress)
    const contractAddr = taskArgs.contract
    const networkId = network.name
    console.log("Funding contract ", contractAddr, " on network ", networkId)
    const LINK_TOKEN_ABI = [{ "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

    //set the LINK token contract address according to the environment
    switch (networkId) {
      case 'mainnet':
        linkContractAddr = '0x514910771af9ca656af840dff83e8264ecf986ca'
        break
      case 'kovan':
        linkContractAddr = '0xa36085F69e2889c224210F603D836748e7dC0088'
        break
      case 'rinkeby':
        linkContractAddr = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
        break
      case 'goerli':
        linkContractAddr = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
        break
      default: //default to kovan
        linkContractAddr = '0xa36085F69e2889c224210F603D836748e7dC0088'
    }
    //Fund with 1 LINK token
    const amount = web3.utils.toHex(1e18)

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to LINK token contract and initiate the transfer
    const linkTokenContract = new ethers.Contract(linkContractAddr, LINK_TOKEN_ABI, signer)
    var result = await linkTokenContract.transfer(contractAddr, amount).then(function (transaction) {
      console.log('Contract ', contractAddr, ' funded with 1 LINK. Transaction Hash: ', transaction.hash)
    })
  })

task("request-data", "Calls an API Consumer Contract to request external data")
  .addParam("contract", "The address of the API Consumer contract that you want to call")
  .addOptionalParam("oracle", "Oracle contract address", '0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e')
  .addOptionalParam("jobId", "Job Id of the job you wish to use", "29fa9aa13bf1468788b7cc4a500a45b8")
  .addOptionalParam("payment", "Payment in LINK tokens required", '1000000000000000000')
  .addOptionalParam("url", "URL to access", 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
  .addOptionalParam("path", "JSON path to traverse", 'USD')
  .addOptionalParam("times", "Multiplier if using an integer", '100')
  .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract
    const networkId = network.name
    console.log("Calling API Consumer contract ", contractAddr, " on network ", networkId)
    const API_CONSUMER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_link", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "bytes4", "name": "_callbackFunctionId", "type": "bytes4" }, { "internalType": "uint256", "name": "_expiration", "type": "uint256" }], "name": "cancelRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_oracle", "type": "address" }, { "internalType": "bytes32", "name": "_jobId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "string", "name": "_url", "type": "string" }, { "internalType": "string", "name": "_path", "type": "string" }, { "internalType": "int256", "name": "_times", "type": "int256" }], "name": "createRequestTo", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "data", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_data", "type": "uint256" }], "name": "fulfill", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getChainlinkToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to API Consumer Contract and call the createRequestTo function
    const apiConsumerContract = new ethers.Contract(contractAddr, API_CONSUMER_ABI, signer)
    var result = await apiConsumerContract.createRequestTo(taskArgs.oracle,
      ethers.utils.toUtf8Bytes(taskArgs.jobId),
      taskArgs.payment,
      taskArgs.url,
      taskArgs.path,
      taskArgs.times).then(function (transaction) {
        console.log('Contract ', contractAddr, ' external data request successfully called. Transaction Hash: ', transaction.hash)
        console.log("Run the following to read the returned result:")
        console.log("npx hardhat read-data --contract ", contractAddr)

      })
  })

task("read-data", "Calls an API Consumer Contract to read data obtained from an external API")
  .addParam("contract", "The address of the API Consumer contract that you want to call")
  .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract
    const networkId = network.name
    console.log("Reading data from API Consumer contract ", contractAddr, " on network ", networkId)
    const API_CONSUMER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_link", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "bytes4", "name": "_callbackFunctionId", "type": "bytes4" }, { "internalType": "uint256", "name": "_expiration", "type": "uint256" }], "name": "cancelRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_oracle", "type": "address" }, { "internalType": "bytes32", "name": "_jobId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "string", "name": "_url", "type": "string" }, { "internalType": "string", "name": "_path", "type": "string" }, { "internalType": "int256", "name": "_times", "type": "int256" }], "name": "createRequestTo", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "data", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_data", "type": "uint256" }], "name": "fulfill", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getChainlinkToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to API Consumer Contract and call the createRequestTo function
    const apiConsumerContract = new ethers.Contract(contractAddr, API_CONSUMER_ABI, signer)
    var result = await apiConsumerContract.data().then(function (data) {
      console.log('Data is: ', web3.utils.hexToNumber(data._hex))
    })
  })

task("request-random-number", "Requests a random number for a Chainlink VRF enabled smart contract")
  .addParam("contract", "The address of the API Consumer contract that you want to call")
  .addParam("seed", "The seed to be used in the requst for randomness", 777, types.int)
  .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract
    const seed = taskArgs.seed
    const networkId = network.name
    console.log("Requesting a random number using VRF consumer contract ", contractAddr, " on network ", networkId)
    const RANDOM_NUMBER_CONSUMER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_vrfCoordinator", "type": "address" }, { "internalType": "address", "name": "_link", "type": "address" }, { "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_fee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "userProvidedSeed", "type": "uint256" }], "name": "getRandomNumber", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "randomResult", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "randomness", "type": "uint256" }], "name": "rawFulfillRandomness", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_seed", "type": "uint256" }], "name": "requestRandomness", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to VRF Contract and call the getRandomNumber function
    const vrfConsumerContract = new ethers.Contract(contractAddr, RANDOM_NUMBER_CONSUMER_ABI, signer)
    var result = await vrfConsumerContract.getRandomNumber(seed).then(function (transaction) {
      console.log('Contract ', contractAddr, ' external data request successfully called. Transaction Hash: ', transaction.hash)
      console.log("Run the following to read the returned random number:")
      console.log("npx hardhat read-random-number --contract ", contractAddr)
    })
  })

task("read-random-number", "Reads the random number returned to a contract by Chainlink VRF")
  .addParam("contract", "The address of the VRF contract that you want to read")
  .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract
    const networkId = network.name
    console.log("Reading data from VRF contract ", contractAddr, " on network ", networkId)
    const RANDOM_NUMBER_CONSUMER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_vrfCoordinator", "type": "address" }, { "internalType": "address", "name": "_link", "type": "address" }, { "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_fee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "userProvidedSeed", "type": "uint256" }], "name": "getRandomNumber", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "randomResult", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "randomness", "type": "uint256" }], "name": "rawFulfillRandomness", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_seed", "type": "uint256" }], "name": "requestRandomness", "outputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to API Consumer Contract and call the createRequestTo function
    const vrfConsumerContract = new ethers.Contract(contractAddr, RANDOM_NUMBER_CONSUMER_ABI, signer)
    var result = await vrfConsumerContract.randomResult().then(function (data) {
      console.log('Random Number is: ', web3.utils.hexToNumberString(data._hex))
    })
  })

task("read-price-feed", "Gets the latest price from a Chainlink Price Feed")
  .addParam("contract", "The address of the Price Feed consumer contract that you want to read")
  .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract
    const networkId = network.name
    console.log("Reading data from Price Feed consumer contract ", contractAddr, " on network ", networkId)
    const PRICE_FEED_CONSUMER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getLatestPrice", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }]

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //Create connection to API Consumer Contract and call the createRequestTo function
    const priceFeedConsumerContract = new ethers.Contract(contractAddr, PRICE_FEED_CONSUMER_ABI, signer)
    var result = await priceFeedConsumerContract.getLatestPrice().then(function (data) {
      console.log('Current price is: ', web3.utils.hexToNumber(data._hex))
    })
  })

task(
  "blockNumber",
  "Prints the current block number",
  async (_, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber)
    })
  }
)


const mainnetRpcUrl = process.env.ALCHEMY_MAINNET_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const kovanRpcUrl = process.env.KOVAN_RPC_URL || "https://eth-kovan.alchemyapi.io/v2/your-api-key"
const privateKey = process.env.PRIVATE_KEY || "your private key"
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: mainnetRpcUrl
      // }
    },
    kovan: {
      url: kovanRpcUrl,
      accounts: [privateKey],
      saveDeployments: true
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.6.6"
      }
    ]
  }
}
