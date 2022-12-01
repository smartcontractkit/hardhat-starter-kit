const { simulateRequest, buildRequest } = require("../../scripts/onDemandRequestSimulator")
const { getDecodedResultLog } = require("../../scripts/onDemandRequestSimulator/simulateRequest")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains,
} = require("../../helper-hardhat-config")
const { getNetworkConfig } = require("../utils")
const readline = require("readline")

task("on-demand-request", "Calls an On Demand API consumer contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .addParam("subid", "The billing subscription ID used to pay for the request")
    .addOptionalParam(
        "gaslimit",
        "The maximum amount of gas that can be used to fulfill a request (defaults to 80,000)"
    )
    .setAction(async (taskArgs, hre) => {
        const networkConfig = getNetworkConfig(network.name)
        const contractAddr = taskArgs.contract
        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")
        const apiConsumerContract = APIConsumer.attach(contractAddr)
        const oracleAddress = networkConfig["ocr2odOracle"]
        const OracleFactory = await ethers.getContractFactory("OCR2DROracle")
        const oracleContract = OracleFactory.attach(oracleAddress)
        const registryAddress = oracleContract.getRegistry()
        const RegistryFactory = await ethers.getContractFactory("OCR2DRRegistry")
        const registry = await RegistryFactory.attach(registryAddress)
        const networkId = network.name
        const subscriptionId = taskArgs.subid
        const gasLimit = parseInt(taskArgs.gaslimit ?? "100000")

        console.log("Simulating on demand request locally...")

        const { success, resultLog } = await simulateRequest("../../on-demand-request-config.js")

        console.log(`\n${resultLog}`)

        if (!success) {
            return
        }

        const request = await buildRequest("../../on-demand-request-config.js")

        let subInfo
        try {
            subInfo = await registry.getSubscription(subscriptionId)
        } catch (error) {
            if (error.errorName === "InvalidSubscription") {
                throw Error(`Subscription ID "${subscriptionId}" is invalid or does not exist`)
            }
            throw error
        }

        const existingConsumers = subInfo[2].map((addr) => addr.toLowerCase())
        if (!existingConsumers.includes(contractAddr.toLowerCase())) {
            throw Error(
                `Consumer contract ${contractAddr} is not registered to use subscription ${subscriptionId}`
            )
        }
        const { lastBaseFeePerGas, maxPriorityFeePerGas } = await hre.ethers.provider.getFeeData()
        const estimatedCostJuels = await apiConsumerContract.estimateCost(
            [
                0, // Inline
                0, // Inline
                0, // JavaScript
                request.source,
                request.secrets ?? [],
                request.args ?? [],
            ],
            subscriptionId,
            gasLimit,
            maxPriorityFeePerGas.add(lastBaseFeePerGas)
        )
        const linkBalance = subInfo[0]
        if (subInfo[0].lt(estimatedCostJuels)) {
            throw Error(
                `Subscription ${subscriptionId} does not have sufficent funds. The estimate cost is ${estimatedCostJuels} Juels LINK, but has balance of ${linkBalance}`
            )
        }

        await new Promise(async (resolve, reject) => {
            const LinkUsdFeed = new ethers.Contract(
                networkConfig["linkUsdPriceFeed"],
                (await ethers.getContractFactory("MockV3Aggregator")).interface,
                await hre.ethers.getSigner()
            )
            const { answer } = await LinkUsdFeed.latestRoundData()
            const estimatedCostUsd = estimatedCostJuels.mul(answer)
            console.log(
                `If all callback gas is used, this request is estimated to cost ${hre.ethers.utils.formatUnits(
                    estimatedCostJuels,
                    18
                )} LINK which is equal to $${hre.ethers.utils.formatUnits(estimatedCostUsd, 26)}\n`
            )

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })

            rl.question("Continue? (y) Yes / (n) No\n", async function (input) {
                if (input.toLowerCase() !== "y" && input.toLowerCase() !== "yes") {
                    rl.close()
                    return resolve()
                }
                rl.pause()

                console.log(
                    "\nRequesting new data from On Demand API Consumer contract ",
                    contractAddr,
                    " on network ",
                    networkId
                )

                const requestTx = await apiConsumerContract.executeRequest(
                    request.source,
                    request.secrets ?? [],
                    request.args ?? [],
                    subscriptionId,
                    gasLimit
                )

                // TODO: loading spinner

                const waitBlockConfirmations = developmentChains.includes(network.name)
                    ? 1
                    : VERIFICATION_BLOCK_CONFIRMATIONS
                console.log(
                    `Waiting ${waitBlockConfirmations} blocks for transaction ${requestTx.hash} to be confirmed...`
                )
                const requestTxReceipt = await requestTx.wait(waitBlockConfirmations)

                setTimeout(
                    () =>
                        reject(
                            "A response not received within 5 minutes of the request being initiated and has been canceled. Your subscription was not charged. Please make a new request."
                        ),
                    300_000
                )

                const requestId = requestTxReceipt.events[2].args.id
                console.log(`Request ${requestId} initiated`)

                console.log(`Waiting for fulfillment...`)

                apiConsumerContract.on("OCRResponse", async (result, err) => {
                    console.log(`Request ${requestId} fulfilled!`)
                    if (result !== "0x") {
                        console.log(
                            `\nResponse represented as a hex string: ${result}\n${getDecodedResultLog(
                                require("../../on-demand-request-config"),
                                result
                            )}`
                        )
                    } else {
                        console.log(`\nResponse error: ${Buffer.from(err.slice(2), "hex")}\n`)
                    }
                    const eventBillingEnd = registry.filters.BillingEnd(null, requestId)
                    const event = await registry.queryFilter(eventBillingEnd)
                    const { totalCost } = event[0].args
                    console.log(
                        `Total cost: ${hre.ethers.utils.formatUnits(
                            totalCost,
                            18
                        )} LINK which is equal to $${hre.ethers.utils.formatUnits(
                            totalCost.mul(answer),
                            26
                        )}\n`
                    )
                    return resolve()
                })
            })
        })
    })
module.exports = {}
