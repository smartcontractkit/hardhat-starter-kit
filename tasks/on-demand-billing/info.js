const { getNetworkConfig } = require("../utils")

task(
    "on-demand-sub-info",
    "Gets billing subscription balance and lists consumers for On-Demand Consumer contracts"
)
    .addParam("subid", "Subscription ID")
    .setAction(async (taskArgs) => {
        const networkConfig = getNetworkConfig(network.name)

        const subscriptionId = taskArgs.subid

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

        console.log(`Subscription ${subscriptionId} owner: ${subInfo[1]}`)
        console.log(`Balance: ${ethers.utils.formatEther(subInfo[0])} LINK`)
        console.log(
            `${subInfo[2].length} authorized consumer contract${
                subInfo[2].length === 1 ? "" : "s"
            }:`
        )
        console.log(subInfo[2])
    })
