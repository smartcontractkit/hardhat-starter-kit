const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployOcr2odOracle(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let oracle
    let oracleFactory
    let oracleFactoryAddress

    if (chainId == 31337) {
        const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
        oracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()
    } else {
        oracleFactoryAddress = networkConfig[chainId]["ocr2odOracleFactory"]
        oracleFactory = await ethers.getContractAt(
            "OCR2DROracleFactory",
            oracleFactoryAddress,
            deployer
        )
    }

    const OracleDeploymentTransaction = await oracleFactory.deployNewOracle()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait(waitBlockConfirmations)
    const OCR2DROracleAddress = OracleDeploymentReceipt.events[1].args.oracle
    oracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress, deployer)

    // Set up OCR2DR Oracle
    await oracle.acceptOwnership()

    await oracle.setDONPublicKey(
        ethers.utils.toUtf8Bytes(networkConfig[chainId]["OCR2ODMockPublicKey"])
    )

    // TODO: set OCR2 config

    console.log(`OCR2ODOracle deployed to ${oracle.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: oracle.address,
            constructorArguments: [],
        })
    }

    return { oracle }
}

module.exports = {
    deployOcr2odOracle,
}
