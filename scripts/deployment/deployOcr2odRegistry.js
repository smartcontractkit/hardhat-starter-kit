const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")

const config = {
    maxGasLimit: 450_000,
    stalenessSeconds: 86_400,
    gasAfterPaymentCalculation: 21_000 + 5_000 + 2_100 + 20_000 + 2 * 2_100 - 15_000 + 7_315,
    weiPerUnitLink: ethers.BigNumber.from("5000000000000000"),
    gasOverhead: 100_000,
}

async function deployOcr2odRegistry(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let registry
    let ethLinkFeedAddress
    let linkTokenAddress

    if (chainId == 31337) {
        const mockEthLinkFactory = await ethers.getContractFactory("MockV3Aggregator")
        mockEthLinkFeed = await mockEthLinkFactory
            .connect(deployer)
            .deploy(0, ethers.BigNumber.from(5021530000000000))
        ethLinkFeedAddress = mockEthLinkFeed.address

        const linkTokenFactory = await ethers.getContractFactory("LinkToken")
        linkToken = await linkTokenFactory.connect(deployer).deploy()
        linkTokenAddress = linkToken.address
    } else {
        ethLinkFeedAddress = networkConfig[chainId]["linkEthPriceFeed"]
        linkTokenAddress = networkConfig[chainId]["linkToken"]
    }

    const registryFactory = await ethers.getContractFactory("OCR2DRRegistry")
    registry = await registryFactory.deploy(linkTokenAddress, ethLinkFeedAddress)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await registry.deployTransaction.wait(waitBlockConfirmations)

    // Set up OCR2DR Registry
    await registry.setConfig(
        config.maxGasLimit,
        config.stalenessSeconds,
        config.gasAfterPaymentCalculation,
        config.weiPerUnitLink,
        config.gasOverhead
    )

    console.log(`OCR2ODRegistry deployed to ${registry.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: registry.address,
            constructorArguments: [linkTokenAddress, ethLinkFeedAddress],
        })
    }

    return { registry }
}

module.exports = {
    deployOcr2odRegistry,
}
