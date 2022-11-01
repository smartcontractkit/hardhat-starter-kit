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
    let mockOracle
    let linkTokenAddress
    let oracleAddress

    if (chainId == 31337) {
        const linkTokenFactory = await ethers.getContractFactory("LinkToken")
        linkToken = await linkTokenFactory.connect(deployer).deploy()

        const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
        mockOracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()
        const OracleDeploymentTransaction = await mockOracleFactory.deployNewOracle()
        const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait()
        const OCR2DROracleAddress = OracleDeploymentReceipt.events[1].args.oracle
        mockOracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress, deployer)

        linkTokenAddress = linkToken.address
        oracleAddress = mockOracle.address

        // Set up OCR2DR Oracle
        await mockOracle.acceptOwnership()
        await mockOracle.setDONPublicKey(
            ethers.utils.toUtf8Bytes(networkConfig[chainId]["OCR2ODMockPublicKey"])
        )
    } else {
        oracleAddress = networkConfig[chainId]["ocr2odOracle"]
        linkTokenAddress = networkConfig[chainId]["linkToken"]
        linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
    }

    const args = [oracleAddress]
    const apiConsumerFactory = await ethers.getContractFactory("OnDemandAPIConsumer")
    const apiConsumer = await apiConsumerFactory.deploy(...args)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await apiConsumer.deployTransaction.wait(waitBlockConfirmations)

    console.log(`OnDemandAPIConsumer deployed to ${apiConsumer.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: apiConsumer.address,
            constructorArguments: args,
        })
    }

    // auto-funding
    const fundAmount = networkConfig[chainId]["fundAmount"]
    await linkToken.transfer(apiConsumer.address, fundAmount)

    console.log(`OnDemandAPIConsumer funded with ${fundAmount} JUELS`)

    return { apiConsumer, mockOracle }
}

module.exports = {
    deployOnDemandApiConsumer,
}
