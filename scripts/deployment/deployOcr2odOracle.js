const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

async function deployOcr2odOracle(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let linkToken
    let oracle
    let oracleFactory
    let oracleFactoryAddress
    let linkTokenAddress

    if (chainId == 31337) {
        const linkTokenFactory = await ethers.getContractFactory("LinkToken")
        linkToken = await linkTokenFactory.connect(deployer).deploy()

        const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
        oracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()

        linkTokenAddress = linkToken.address
    } else {
        oracleFactoryAddress = networkConfig[chainId]["ocr2odOracleFactory"]
        oracleFactory = await ethers.getContractAt(
            "OCR2DROracleFactory",
            oracleFactoryAddress,
            deployer
        )
        linkTokenAddress = networkConfig[chainId]["linkToken"]
        linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
    }

    const OracleDeploymentTransaction = await oracleFactory.deployNewOracle(
        ethers.utils.toUtf8Bytes(networkConfig[chainId]["OCR2ODMockPublicKey"])
    )

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait(waitBlockConfirmations)

    const OCR2DROracleAddress = OracleDeploymentReceipt.events[0].args.oracle
    oracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress)

    // Set up OCR2DR Oracle
    await oracle.setAuthorizedSenders([deployer.address])

    console.log(`OCR2ODOracle deployed to ${oracle.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: oracle.address,
            constructorArguments: [networkConfig[chainId]["OCR2ODMockPublicKey"]],
        })
    }

    // auto-funding
    const fundAmount = networkConfig[chainId]["fundAmount"]
    await linkToken.transfer(oracle.address, fundAmount)

    console.log(`OCR2ODOracle funded with ${fundAmount} JUELS`)

    return { oracle }
}

module.exports = {
    deployOcr2odOracle,
}
