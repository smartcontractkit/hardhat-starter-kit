const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

async function deployAutomatedApiConsumer(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let linkToken
    let mockOracle
    let linkTokenAddress
    let oracleAddress

    if (chainId == 31337) {
        const linkTokenFactory = await ethers.getContractFactory("LinkToken")
        linkToken = await linkTokenFactory.connect(deployer).deploy()

        const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
        mockOracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()
        const OracleDeploymentTransaction = await mockOracleFactory.deployNewOracle(
            networkConfig[chainId]["OCRODMockPublicKey"]
        )
        const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait()
        const OCR2DROracleAddress = OracleDeploymentReceipt.events[0].args.oracle
        mockOracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress)

        linkTokenAddress = linkToken.address
        oracleAddress = mockOracle.address

        // Set up OCR2DR Oracle
        await mockOracle.setAuthorizedSenders([deployer.address])
    } else {
        oracleAddress = networkConfig[chainId]["oracle"]
        linkTokenAddress = networkConfig[chainId]["linkToken"]
        linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
    }

    const source = `function run(args, queryResponses) {
        const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
        return Math.round(avgPrice * args[0]);
    }`
    const arguments = [] // TODO
    const queries = [] // TODO
    const secrets = [] // TODO
    const updateInterval = networkConfig[chainId]["keepersUpdateInterval"] || "30"

    const args = [oracleAddress, source, arguments, queries, secrets, updateInterval]
    const apiConsumerFactory = await ethers.getContractFactory("AutomatedAPIConsumer")
    const apiConsumer = await apiConsumerFactory.deploy(...args)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await apiConsumer.deployTransaction.wait(waitBlockConfirmations)

    console.log(`AutomatedAPIConsumer deployed to ${apiConsumer.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: apiConsumer.address,
            constructorArguments: args,
        })
    }

    // auto-funding
    const fundAmount = networkConfig[chainId]["fundAmount"]
    await linkToken.transfer(apiConsumer.address, fundAmount)

    console.log(`AutomatedAPIConsumer funded with ${fundAmount} JUELS`)

    return { apiConsumer, mockOracle }
}

module.exports = {
    deployAutomatedApiConsumer,
}
