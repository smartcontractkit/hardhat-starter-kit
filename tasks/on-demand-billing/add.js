const { getNetworkConfig } = require("../utils")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

task("on-demand-add-consumer", "Adds a client contract to the On-Demand billing subscription")
    .addParam("subid", "Subscription ID")
    .addParam("consumer", "Address of the On-Demand client contract to authorize for billing")
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
        if (existingConsumers.includes(consumer.toLowerCase())) {
            throw Error(
                `Consumer ${consumer} is already authorized to use subscription ${subscriptionId}`
            )
        }

        console.log(
            `Adding consumer contract address ${consumer} to subscription ${subscriptionId}`
        )
        const addTx = await registry.addConsumer(subscriptionId, consumer)

        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(
            `Waiting ${waitBlockConfirmations} blocks for transaction ${addTx.hash} to be confirmed...`
        )
        await addTx.wait(waitBlockConfirmations)
        console.log(`Added consumer contract address ${consumer} to subscription ${subscriptionId}`)

        const postSubInfo = await registry.getSubscription(subscriptionId)
        console.log(
            `${postSubInfo[2].length} authorized consumer contract${
                postSubInfo[2].length === 1 ? "" : "s"
            } for subscription ${subscriptionId}:`
        )
        console.log(postSubInfo[2])
    })
