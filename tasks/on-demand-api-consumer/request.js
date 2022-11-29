const { simulateRequest, buildRequest } = require('../../scripts/onDemandRequestSimulator')
const { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } = require("../../helper-hardhat-config")

task("on-demand-request", "Calls an On Demand API Consumer contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    ).addParam(
        "subid",
        "The billing subscription ID used to pay for the request"
    ).addOptionalParam(
        "gaslimit",
        "The maximum amount of gas that can be used to fulfill a request (defaults to 1,000,000)"
    ).setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        const subscriptionId = taskArgs.subid
        const gasLimit = parseInt(taskArgs.gaslimit ?? '1000000')

        console.log('Simulating on demand request locally...')

        const { success, resultLog } = await simulateRequest('../../on-demand-request-config.js')
  
        console.log(resultLog)

        if (!success) {
          return
        }

        const request = await buildRequest('../../on-demand-request-config.js')

        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")
        const apiConsumerContract = APIConsumer.attach(contractAddr)

        console.log(
            "Requesting new data from On Demand API Consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )

        // TODO:
        //  1. Check if subscription is valid & that consumer is authorized
        //  2. Check if subscription has enough funding

        await new Promise(async (resolve, _) => {
            const requestTx = await apiConsumerContract.executeRequest(request.source, request.secrets, request.args, subscriptionId, gasLimit)

            const waitBlockConfirmations = developmentChains.includes(network.name)
                ? 1
                : VERIFICATION_BLOCK_CONFIRMATIONS
            console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${requestTx.hash} to be confirmed...`)
            const requestTxReceipt = await requestTx.wait(waitBlockConfirmations)
            
            const requestId = requestTxReceipt.events[2].args.requestId
            console.log(`Request ${requestId} initiated`)

            console.log(`Waiting for fulfillment...`)
            // TODO: Add fulfill event to OnDemandAPIConsumer contract to print event fulfill data (decoded in expected format) or error
            apiConsumerContract.on(
                'Fulfill',
                (requestId) => {
                    console.log("Request initiated with ID: ", requestId)
                    resolve()
                }
            )
    
            console.log("Requesting with the following input:\n", { ...request })
            const arguments = [request.source, request.secrets, request.args, 1]
            apiConsumerContract.executeRequest(...arguments)
        })
    })
module.exports = {}
