const { getNetworkConfig } = require("../utils")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

task("on-demand-remove-consumer", "Adds a client contract to the On-Demand billing subscription")
    .addParam("subid", "Subscription ID")
    .addParam(
        "consumer",
        "Address of the On-Demand client contract to remove from billing subscription"
    )
    .setAction(async (taskArgs) => {
        const networkConfig = getNetworkConfig(network.name)

        const subscriptionId = taskArgs.subid
        const consumer = taskArgs.consumer

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

        const existingConsumers = preSubInfo[2].map((addr) => addr.toLowerCase())
        if (!existingConsumers.includes(consumer.toLowerCase())) {
            throw Error(
                `Consumer address ${consumer} is not registered to use subscription ${subscriptionId}`
            )
        }

        console.log(
            `Removing consumer contract address ${consumer} to subscription ${subscriptionId}`
        )
        const rmTx = await registry.removeConsumer(subscriptionId, consumer)

        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(
            `Waiting ${waitBlockConfirmations} blocks for transaction ${rmTx.hash} to be confirmed...`
        )
        await rmTx.wait(waitBlockConfirmations)
        console.log(
            `Removed consumer contract address ${consumer} from subscription ${subscriptionId}`
        )

        const postSubInfo = await registry.getSubscription(subscriptionId)
        console.log(
            `${postSubInfo[2].length} authorized consumer contract${
                postSubInfo[2].length === 1 ? "" : "s"
            } for subscription ${subscriptionId}:`
        )
        console.log(postSubInfo[2])
    })
