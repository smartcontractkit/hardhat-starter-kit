const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployOcr2odOracleFactory() {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    let mockOracleFactory

    const mockOracleFactoryFactory = await ethers.getContractFactory("OCR2DROracleFactory")
    mockOracleFactory = await mockOracleFactoryFactory.connect(deployer).deploy()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${mockOracleFactory.deployTransaction.hash} to be confirmed...`)
    await mockOracleFactory.deployTransaction.wait(waitBlockConfirmations)

    console.log(`OCR2ODOracleFactory deployed to ${mockOracleFactory.address} on ${network.name}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: mockOracleFactory.address,
            constructorArguments: [],
        })
    }

    return { mockOracleFactory }
}

module.exports = {
    deployOcr2odOracleFactory,
}
