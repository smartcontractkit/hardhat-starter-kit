const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployPriceConsumerV3(chainId) {
    let priceFeedAddress

    if (developmentChains.includes(network.name)) {
        const DECIMALS = "18"
        const INITIAL_PRICE = "200000000000000000000"

        const mockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator")
        const mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE)

        priceFeedAddress = mockV3Aggregator.address
    } else {
        priceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const priceConsumerV3Factory = await ethers.getContractFactory("PriceConsumerV3")
    const priceConsumerV3 = await priceConsumerV3Factory.deploy(priceFeedAddress)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await priceConsumerV3.deployTransaction.wait(waitBlockConfirmations)

    console.log(`ETH/USD Price Consumer deployed to ${priceConsumerV3.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: priceConsumerV3.address,
            constructorArguments: [priceFeedAddress],
        })
    }
}

module.exports = {
    deployPriceConsumerV3,
}
