const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployRandomNumberConsumer(chainId) {
    let VRFCoordinatorV2Mock
    let subscriptionId
    let vrfCoordinatorAddress

    if (chainId == 31337) {
        const BASE_FEE = "100000000000000000"
        const GAS_PRICE_LINK = "1000000000" // 0.000000001 LINK per gas

        const VRFCoordinatorV2MockFactory = await ethers.getContractFactory("VRFCoordinatorV2Mock")
        VRFCoordinatorV2Mock = await VRFCoordinatorV2MockFactory.deploy(BASE_FEE, GAS_PRICE_LINK)
        vrfCoordinatorAddress = VRFCoordinatorV2Mock.address

        const fundAmount = networkConfig[chainId]["fundAmount"] || "1000000000000000000"
        const transaction = await VRFCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transaction.wait(1)
        subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])
        await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount)
    } else {
        subscriptionId = networkConfig[chainId]["subscriptionId"]
        vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"]
    }

    const keyHash = networkConfig[chainId]["keyHash"]

    const randomNumberConsumerV2Factory = await ethers.getContractFactory("RandomNumberConsumerV2")
    const randomNumberConsumerV2 = await randomNumberConsumerV2Factory.deploy(
        subscriptionId,
        vrfCoordinatorAddress,
        keyHash
    )

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await randomNumberConsumerV2.deployTransaction.wait(waitBlockConfirmations)

    console.log(
        `Random Number Consumer deployed to ${randomNumberConsumerV2.address} on ${network.name}`
    )

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: randomNumberConsumerV2.address,
            constructorArguments: [subscriptionId, vrfCoordinatorAddress, keyHash],
        })
    }

    if (chainId == 31337) {
        VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomNumberConsumerV2.address)
    }
}

module.exports = {
    deployRandomNumberConsumer,
}
