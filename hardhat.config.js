/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-truffle5")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("./tasks/accounts")
require("./tasks/balance")
require("./tasks/withdraw-link")
require("./tasks/block-number")
require("./tasks/price-consumer")
require("./tasks/random-number-consumer")
require("./tasks/api-consumer")
require("./tasks/keepers")
require("@appliedblockchain/chainlink-plugins-fund-link")

require('dotenv').config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "https://eth-kovan.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"
// optional
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your private key"

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
        },
        localhost: {
        },
        kovan: {
            url: KOVAN_RPC_URL,
            accounts: [PRIVATE_KEY],
            //accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            // accounts: [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true,
        },
        ganache: {
            url: 'http://localhost:8545',
            accounts: {
                mnemonic: MNEMONIC,
            }
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            // accounts: [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true,
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
        },
    },
    etherscan: {
        // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			rinkeby: ETHERSCAN_API_KEY,
			kovan: ETHERSCAN_API_KEY,
			polygon: POLYGONSCAN_API_KEY,
		},
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
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
                version: "0.8.7"
            },
            {
                version: "0.6.6"
            },
            {
                version: "0.4.24"
            }
        ]
    },
    mocha: {
        timeout: 300000
    }
}

