const { getNetworkConfig } = require("../utils")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")

task("on-demand-create-sub", "Creates a new billing subscription for On-Demand Consumer contracts")
    .addOptionalParam("amount", "Inital amount used to fund the subscription in LINK")
    .addOptionalParam("consumer", "Inital On-Demand client address to add to subscription")
    .setAction(async (taskArgs) => {
        const networkConfig = getNetworkConfig(network.name)

        const linkAmount = taskArgs.amount
        const consumer = taskArgs.consumer

        const RegistryFactory = await ethers.getContractFactory("OCR2DRRegistry")
        const registry = await RegistryFactory.attach(networkConfig["ocr2odOracleRegistry"])

        console.log("Creating On-Demand billing subscription")
        const createSubscriptionTx = await registry.createSubscription()

        const createWaitBlockConfirmations =
            developmentChains.includes(network.name) || consumer || linkAmount
                ? 1
                : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(
            `Waiting ${createWaitBlockConfirmations} blocks for transaction ${createSubscriptionTx.hash} to be confirmed...`
        )
        const createSubscriptionReceipt = await createSubscriptionTx.wait(
            createWaitBlockConfirmations
        )

        const subscriptionId = createSubscriptionReceipt.events[0].args["subscriptionId"].toNumber()
        console.log(`Subscription created with ID: ${subscriptionId}`)

        if (linkAmount) {
            // Fund subscription
            const juelsAmount = ethers.utils.parseUnits(linkAmount)

            const LinkTokenFactory = await ethers.getContractFactory("LinkToken")
            const linkToken = await LinkTokenFactory.attach(networkConfig.linkToken)

            const accounts = await ethers.getSigners()
            const signer = accounts[0]

            const balance = await linkToken.balanceOf(signer.address)
            if (juelsAmount.gt(balance)) {
                throw Error(
                    `Insufficent LINK balance. Trying to fund subscription with ${ethers.utils.formatEther(
                        juelsAmount
                    )} LINK, but only have ${ethers.utils.formatEther(balance)}.`
                )
            }

            console.log(`Funding with ${ethers.utils.formatEther(juelsAmount)} LINK`)
            const fundTx = await linkToken.transferAndCall(
                networkConfig["ocr2odOracleRegistry"],
                juelsAmount,
                ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
            )
            const fundWaitBlockConfirmations =
                developmentChains.includes(network.name) || consumer
                    ? 1
                    : VERIFICATION_BLOCK_CONFIRMATIONS
            console.log(
                `Waiting ${fundWaitBlockConfirmations} blocks for transaction ${fundTx.hash} to be confirmed...`
            )
            await fundTx.wait(fundWaitBlockConfirmations)

            console.log(
                `Subscription ${subscriptionId} funded with ${ethers.utils.formatEther(
                    juelsAmount
                )} LINK`
            )
        }

        if (consumer) {
            // Add consumer
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

            console.log(`Authorized consumer contract: ${consumer}`)
        }
    })
