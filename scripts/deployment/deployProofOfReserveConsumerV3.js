const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployProofOfReserveConsumerV3() {
    const proofOfReserveConsumerV3Factory = await ethers.getContractFactory("ReserveConsumerV3")
    const proofOfReserveConsumerV3 = await proofOfReserveConsumerV3Factory.deploy()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await proofOfReserveConsumerV3.deployTransaction.wait(waitBlockConfirmations)

    console.log(
        `Proof of Reserve Consumer deployed to ${proofOfReserveConsumerV3.address} on ${network.name}`
    )

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: proofOfReserveConsumerV3.address,
            constructorArguments: [],
        })
    }
}

module.exports = {
    deployProofOfReserveConsumerV3,
}
