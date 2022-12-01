const { getNetworkConfig } = require("../utils")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

task(
    "on-demand-transfer-sub",
    "Accepts ownership of an On-Demand subscription after a a transfer is requested"
)
    .addParam("subid", "Subscription ID")
    .addParam("newowner", "Address of the new owner")
    .setAction(async (taskArgs) => {
        const networkConfig = getNetworkConfig(network.name)

        const subscriptionId = taskArgs.subid
        const newOwner = taskArgs.newowner

        const RegistryFactory = await ethers.getContractFactory("OCR2DRRegistry")
        const registry = await RegistryFactory.attach(networkConfig["ocr2odOracleRegistry"])

        let subInfo
        try {
            subInfo = await registry.getSubscription(subscriptionId)
        } catch (error) {
            if (error.errorName === "InvalidSubscription") {
                throw Error(`Subscription ID ${subscriptionId} is invalid or does not exist`)
            }
            throw error
        }

        const signerAddr = (await ethers.getSigners())[0].address

        if (subInfo[1].toLowerCase() !== signerAddr.toLowerCase()) {
            throw Error(
                `Subscription ID ${subscriptionId} is owned by wallet address ${subInfo[1].toLowerCase()}, not ${signerAddr.toLowerCase()}`
            )
        }

        console.log(
            `Requesting ownership transfer of subscription ${subscriptionId} to new owner ${newOwner}`
        )
        const transferTx = await registry.requestSubscriptionOwnerTransfer(subscriptionId, newOwner)

        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(
            `Waiting ${waitBlockConfirmations} blocks for transaction ${transferTx.hash} to be confirmed...`
        )
        await transferTx.wait(waitBlockConfirmations)

        console.log(
            `Ownership transfer to ${newOwner} requested for subscription ${subscriptionId}.  The new owner must now accept the transfer request.`
        )
    })
