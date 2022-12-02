const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

async function deployOnDemandApiConsumer(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let linkToken
    let linkTokenAddress
    let mockRegistry
    let mockOracle
    let ethLinkFeedAddress
    let oracleAddress
    let subscriptionId

    if (chainId == 31337) {
        // Deploy LINK token
        const linkTokenFactory = await ethers.getContractFactory("LinkToken")
        linkToken = await linkTokenFactory.connect(deployer).deploy()
        linkTokenAddress = linkToken.address

        // Deploy LINK/ETH V3 Aggregator
        const mockEthLinkFactory = await ethers.getContractFactory("MockV3Aggregator")
        mockEthLinkFeed = await mockEthLinkFactory
            .connect(deployer)
            .deploy(0, ethers.BigNumber.from(5021530000000000))
        ethLinkFeedAddress = mockEthLinkFeed.address

        // Deploy Registry
        const registryFactory = await ethers.getContractFactory("OCR2DRRegistry")
        mockRegistry = await registryFactory
            .connect(deployer)
            .deploy(linkTokenAddress, ethLinkFeedAddress)

        // Configure the Registry
        const config = {
            maxGasLimit: 1_000_000,
            stalenessSeconds: 86_400,
            gasAfterPaymentCalculation:
                21_000 + 5_000 + 2_100 + 20_000 + 2 * 2_100 - 15_000 + 7_315,
            weiPerUnitLink: ethers.BigNumber.from("5000000000000000"),
            gasOverhead: 100_000,
        }
        await mockRegistry.setConfig(
            config.maxGasLimit,
            config.stalenessSeconds,
            config.gasAfterPaymentCalculation,
            config.weiPerUnitLink,
            config.gasOverhead
        )

        // Deploy Oracle
        const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
        mockOracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()
        const OracleDeploymentTransaction = await mockOracleFactory.deployNewOracle()
        const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait()
        const OCR2DROracleAddress = OracleDeploymentReceipt.events[1].args.oracle
        mockOracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress, deployer)
        oracleAddress = mockOracle.address

        // Configure the OCR2DR Oracle
        await mockOracle.acceptOwnership()
        await mockOracle.setDONPublicKey(
            ethers.utils.toUtf8Bytes(networkConfig[chainId]["OCR2ODMockPublicKey"])
        )
        await mockOracle.setRegistry(mockRegistry.address)

        // Register the Oracle with the Registry
        await mockRegistry.setAuthorizedSenders([mockOracle.address])

        // Create subscription
        const createSubscriptionTx = await mockRegistry.createSubscription()
        const createSubscriptionReceipt = await createSubscriptionTx.wait()
        subscriptionId = createSubscriptionReceipt.events[0].args["subscriptionId"].toNumber()

        // Fund subscription
        await linkToken.transferAndCall(
            mockRegistry.address,
            ethers.BigNumber.from("1000000000000000000").mul(5), // 5 LINK
            ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
        )
    } else {
        oracleAddress = networkConfig[chainId]["ocr2odOracle"]
        linkTokenAddress = networkConfig[chainId]["linkToken"]
        linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
    }

    const apiConsumerFactory = await ethers.getContractFactory("OnDemandAPIConsumer")

    console.log('Deploying OnDemandAPIConsumer contract')
    const apiConsumer = await apiConsumerFactory.deploy(oracleAddress)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log(
        `Waiting ${waitBlockConfirmations} blocks for transaction ${apiConsumer.deployTransaction.hash} to be confirmed...`
    )
    await apiConsumer.deployTransaction.wait(waitBlockConfirmations)

    console.log(`OnDemandAPIConsumer deployed to ${apiConsumer.address} on ${network.name}`)

    if (chainId == 31337) {
        // Allow OnDemandConsumer to use the subscription
        await mockRegistry.addConsumer(subscriptionId, apiConsumer.address)
    }

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying contract...")
        await run("verify:verify", {
            address: apiConsumer.address,
            constructorArguments: [oracleAddress],
        })
        console.log("Contract verified")
    }

    return { apiConsumer, mockOracle, mockRegistry, subscriptionId }
}

module.exports = {
    deployOnDemandApiConsumer,
}
