const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployPriceConsumerV3(chainId) {
    const priceFeed = networkConfig[chainId]["ethUsdPriceFeed"]

    const priceConsumerV3Factory = await ethers.getContractFactory("PriceConsumerV3")
    const priceConsumerV3 = await priceConsumerV3Factory.deploy(priceFeed)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await priceConsumerV3.deployTransaction.wait(waitBlockConfirmations)

    console.log(`ETH/USD Price Consumer deployed to ${priceConsumerV3.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: priceConsumerV3.address,
            constructorArguments: [priceFeed],
        })
    }
}

module.exports = {
    deployPriceConsumerV3,
}
