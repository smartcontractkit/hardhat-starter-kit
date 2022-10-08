const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployNftFloorPriceConsumerV3() {
    const nftFloorPriceConsumerV3Factory = await ethers.getContractFactory(
        "NFTFloorPriceConsumerV3"
    )
    const nftFloorPriceConsumerV3 = await nftFloorPriceConsumerV3Factory.deploy()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    await nftFloorPriceConsumerV3.deployTransaction.wait(waitBlockConfirmations)

    console.log(
        `NFT Floor Price Consumer deployed to ${nftFloorPriceConsumerV3.address} on ${network.name}`
    )

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: nftFloorPriceConsumerV3.address,
            constructorArguments: [],
        })
    }
}

module.exports = {
    deployNftFloorPriceConsumerV3,
}
