const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployOcr2odOracleFactory() {
    const oracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
    const oracleFactory = await oracleFactoryFactory.deploy()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${oracleFactory.deployTransaction.hash} to be confirmed...`)
    await oracleFactory.deployTransaction.wait(waitBlockConfirmations)

    console.log(`OCR2ODOracleFactory deployed to ${oracleFactory.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: oracleFactory.address,
            constructorArguments: [],
        })
    }

    return { oracleFactory }
}

module.exports = {
    deployOcr2odOracleFactory,
}
