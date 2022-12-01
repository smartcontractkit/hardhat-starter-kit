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

    console.log('Deploying new OCR2DR oracle')
    const OracleDeploymentTransaction = await oracleFactory.deployNewOracle()

    console.log(`Waiting for transaction ${OracleDeploymentTransaction.hash} to be confirmed...`)
    const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait(1)

    const OCR2DROracleAddress = OracleDeploymentReceipt.events[1].args.oracle
    oracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress, deployer)
    console.log(`OCR2ODOracle deployed to ${oracle.address} on ${network.name}`)

    // Set up OCR2DR Oracle
    console.log(`Accepting oracle contract ownership`)
    const acceptTx = await oracle.acceptOwnership()
    console.log(`Waiting for transaction ${acceptTx.hash} to be confirmed...`)
    await acceptTx.wait(1)
    console.log("Oracle ownership accepted")

    console.log(`Setting DON public key to ${networkConfig[chainId]["OCR2ODMockPublicKey"]}`)
    const setKeyTx = await oracle.setDONPublicKey(
        ethers.utils.toUtf8Bytes(networkConfig[chainId]["OCR2ODMockPublicKey"])
    )
    console.log(`Waiting for transaction ${setKeyTx.hash} to be confirmed...`)
    await setKeyTx.wait(1)
    console.log("DON public key set")

    const ocrConfig = require("../../OCR2DROracleConfig.json")
    console.log("Setting oracle OCR config")
    const setConfigTx = await oracle.setConfig(
        ocrConfig.Signers,
        ocrConfig.Transmitters,
        ocrConfig.F,
        ocrConfig.OnchainConfig,
        ocrConfig.OffchainConfigVersion,
        ocrConfig.OffchainConfig
    )
    console.log(`Waiting for transaction ${setConfigTx.hash} to be confirmed...`)
    await setConfigTx.wait(1)
    console.log("OCR2Oracle Config set")

    console.log("Authorizing oracle with registry")
    const registryFactory = await ethers.getContractFactory("OCR2DRRegistry")
    const registry = await registryFactory.attach(networkConfig[chainId]["ocr2odOracleRegistry"])
    const authTx = await registry.setAuthorizedSenders([oracle.address])
    console.log(`Waiting for transaction ${authTx.hash} to be confirmed...`)
    console.log("Oracle authorized with registry")

    console.log(`Setting oracle registry to ${networkConfig[chainId]["ocr2odOracleRegistry"]}`)
    const setRegistryTx = await oracle.setRegistry(networkConfig[chainId]["ocr2odOracleRegistry"])
    console.log(`Waiting for transaction ${setRegistryTx.hash} to be confirmed...`)
    console.log("Oracle registry set")

    console.log(
        `OCR2ODOracle successfully configured and deployed to ${oracle.address} on ${network.name}`
    )

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying contract...")
        await run("verify:verify", {
            address: oracle.address,
            constructorArguments: [],
        })
        console.log("Contract verified")
    }

    return { oracle }
}

module.exports = {
    deployOcr2odOracle,
}
