const { getNetworkConfig } = require("../utils")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

task("on-demand-cancel-sub", "Cancels On-Demand billing subscription")
    .addParam("subid", "Subscription ID")
    .addOptionalParam(
        "refundaddress",
        "Address where the remaining subscription is sent (defaults to caller's address)"
    )
    .setAction(async (taskArgs) => {
        const networkConfig = getNetworkConfig(network.name)

        const subscriptionId = taskArgs.subid
        const refundAddress = taskArgs.refundAddress ?? (await ethers.getSigners())[0].address

        const RegistryFactory = await ethers.getContractFactory("OCR2DRRegistry")
        const registry = await RegistryFactory.attach(networkConfig["ocr2odOracleRegistry"])

        let preSubInfo
        try {
            preSubInfo = await registry.getSubscription(subscriptionId)
        } catch (error) {
            if (error.errorName === "InvalidSubscription") {
                throw Error(`Subscription ID "${subscriptionId}" is invalid or does not exist`)
            }
            throw error
        }

        console.log(
            `Canceling subscription ${subscriptionId} and refunding remaining balance to ${refundAddress}`
        )
        // TODO: Cancel does not appear to work properly
        const cancelTx = await registry.cancelSubscription(subscriptionId, refundAddress)

        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(
            `Waiting ${waitBlockConfirmations} blocks for transaction ${cancelTx.hash} to be confirmed...`
        )
        await cancelTx.wait(waitBlockConfirmations)

        console.log(`Subscription ${subscriptionId} cancelled`)
    })
