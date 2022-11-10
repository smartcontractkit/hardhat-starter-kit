const { validateConfig } = require("../../scripts/onDemandRequestSimulator/RequestSimulator/ConfigValidator")
const { executeRequest } = require("../../scripts/onDemandRequestSimulator/RequestSimulator/RequestSimulator")
const { buildRequest } = require("../../scripts/onDemandRequestSimulator/RequestSimulator/RequestBuilder")
const { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } = require("../../helper-hardhat-config")

task("on-demand-request", "Calls an On Demand API Consumer Contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name

        console.log('Simulating on demand request locally...')

        const config = require('../../on-demand-request-config')
        validateConfig(config)
        const { resultLog, error } = await executeRequest(config)
        console.log(resultLog)
        if (error) return

        const request = await buildRequest(config)

        console.log(
            "Requesting new data from On Demand API Consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )
        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")

        // Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        // Create connection to API Consumer Contract and call the createRequestTo function
        const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)

        // Set up a listener to log the requestID

        const waitForRequestSentEvent = new Promise((resolve, _) => {
            apiConsumerContract.on(
                'RequestSent',
                (requestId) => {
                    console.log("Request initiated with ID: ", requestId)
                    resolve()
                }
            )
    
            console.log("Requesting with the following input:\n", { ...request })
            const arguments = [request.source, request.secrets, request.args, 1]
            apiConsumerContract.executeRequest(...arguments)
        })

        await waitForRequestSentEvent
    })
module.exports = {}
