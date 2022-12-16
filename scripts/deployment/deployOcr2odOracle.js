const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployOcr2odOracle(chainId = network.config.chainId) {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    const ethLinkFeedAddress = networkConfig[chainId]["linkEthPriceFeed"]
    const linkTokenAddress = networkConfig[chainId]["linkToken"]

    console.log("Deploying OCR2DR registry")
    const registryFactory = await ethers.getContractFactory("OCR2DRRegistry")
    const registry = await registryFactory.deploy(linkTokenAddress, ethLinkFeedAddress)
    console.log(`Waiting for transaction ${registry.deployTransaction.hash} to be confirmed...`)
    await registry.deployTransaction.wait(1)
    console.log(`OCR2ODRegistry deployed to ${registry.address} on ${network.name}`)

    console.log("Setting registy configuration")
    const config = {
        maxGasLimit: 450_000,
        stalenessSeconds: 86_400,
        gasAfterPaymentCalculation: 21_000 + 5_000 + 2_100 + 20_000 + 2 * 2_100 - 15_000 + 7_315,
        weiPerUnitLink: ethers.BigNumber.from("5000000000000000"),
        gasOverhead: 100_000,
        requestTimeoutSeconds: 300,
    }
    const setConfigTx = await registry.setConfig(
        config.maxGasLimit,
        config.stalenessSeconds,
        config.gasAfterPaymentCalculation,
        config.weiPerUnitLink,
        config.gasOverhead,
        config.requestTimeoutSeconds
    )
    console.log(`Waiting for transaction ${setConfigTx.hash} to be confirmed...`)
    await setConfigTx.wait(1)
    console.log("Registry configuration set")

    console.log("Deploying OCR2DR oracle factory")
    const oracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
    const oracleFactory = await oracleFactoryFactory.deploy()
    console.log(
        `Waiting for transaction ${oracleFactory.deployTransaction.hash} to be confirmed...`
    )
    await oracleFactory.deployTransaction.wait(1)
    console.log(`OCR2ODOracleFactory deployed to ${oracleFactory.address} on ${network.name}`)

    console.log("Deploying OCR2DR oracle")
    const OracleDeploymentTransaction = await oracleFactory.deployNewOracle()
    console.log(`Waiting for transaction ${OracleDeploymentTransaction.hash} to be confirmed...`)
    const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait(1)

    const OCR2DROracleAddress = OracleDeploymentReceipt.events[1].args.oracle
    const oracle = await ethers.getContractAt("OCR2DROracle", OCR2DROracleAddress, deployer)
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

    console.log("Authorizing oracle with registry")
    const authTx = await registry.setAuthorizedSenders([oracle.address])
    console.log(`Waiting for transaction ${authTx.hash} to be confirmed...`)
    console.log("Oracle authorized with registry")

    console.log(`Setting oracle registry to ${registry.address}`)
    const setRegistryTx = await oracle.setRegistry(registry.address)
    console.log(`Waiting for transaction ${setRegistryTx.hash} to be confirmed...`)
    console.log("Oracle registry set")

    console.log(`OCR2ODOracle successfully deployed to ${oracle.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying registry contract...")
        await run("verify:verify", {
            address: oracleFactory.address,
            constructorArguments: [],
        })
        console.log("Oracle registry contract verified")

        console.log("Verifying oracle factory contract...")
        await run("verify:verify", {
            address: oracleFactory.address,
            constructorArguments: [],
        })
        console.log("Oracle factory contract verified")

        console.log("Verifying oracle contract...")
        await run("verify:verify", {
            address: oracle.address,
            constructorArguments: [],
        })
        console.log("Oracle contract verified")
    }

    return { oracle }
}

module.exports = {
    deployOcr2odOracle,
}
